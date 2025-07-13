import express from "express";
import { NewsSummary, NewsSummaryDoc } from "../model/NewsSummaries";

const router = express.Router();

console.debug("Registering routes in getArticles router");

router.get("/", async (req, res) => {
  const articles: NewsSummaryDoc[] = await NewsSummary.find({});
  res.json({
    rows: articles,
  });
});

export default router;
