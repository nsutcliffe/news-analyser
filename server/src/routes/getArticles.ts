import express from "express";
import { NewsSummary, NewsSummaryDoc } from "../model/NewsSummaries";

const router = express.Router();

router.get("/", async (req, res) => {
  const articles: NewsSummaryDoc[] = await NewsSummary.find({});
  console.log(articles);
  res.json({
    rows: articles,
  });
});

export default router;
