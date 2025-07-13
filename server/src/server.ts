import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Request, Response, NextFunction } from "express";

import newsRouter from "./routes/news";
import submitToLLMRouter from "./routes/submitToLLM";
import getArticlesRouter from "./routes/getArticles";
import { ConnectivityError, RateLimitError } from "./model/Errors";
import connectWithRetry from "./db/db";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

console.log("Registering routes");
app.use("/api/search-news", newsRouter);
app.use("/api/analyse-article", submitToLLMRouter);
app.use("/api/get-articles", getArticlesRouter);

// Serve static files from React build only in production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "..", "..", "client", "dist");
  app.use(express.static(clientPath));

  console.log("Registering routes in wildcard router");
  // This slightly odd wildcard is due to a bug in express 5; see https://github.com/expressjs/express/issues/6428
  app.get(/.*/, (req, res, next) => {
    // if the URL looks like a full URL, reject it
    if (req.originalUrl.startsWith("http")) {
      console.log("Refusing full URL:", req.originalUrl);
      return res.status(400).send("Bad request.");
    }
    res.sendFile(path.join(clientPath, "index.html"));
  });
}
console.log("Finished routes");

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof RateLimitError) {
    return res.status(429).json({
      errorCode: "RATE_LIMIT_EXCEEDED",
      message: err.message,
    });
  }

  if (err instanceof ConnectivityError) {
    return res.status(503).json({
      errorCode: "CONNECTIVITY_ERROR",
      message: err.message,
    });
  }

  // TODO: Error handling for database connection issues
  // fallback for unknown errors
  console.error(err);
  res.status(500).json({
    errorCode: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
  });
});

const startServer = async () => {
  try {
    await connectWithRetry();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
