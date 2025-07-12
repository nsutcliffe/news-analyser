import dotenv from "dotenv";
dotenv.config();
import express from "express";
import newsRouter from "./routes/news";
import submitToLLMRouter from "./routes/submitToLLM";
import { ConnectivityError, RateLimitError } from "./model/Errors";
import { Request, Response, NextFunction } from "express";

const app = express();
const port = 3000;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/news", newsRouter);
app.use("/analyse-article", submitToLLMRouter);

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

  // fallback for unknown errors
  console.error(err);
  res.status(500).json({
    errorCode: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
