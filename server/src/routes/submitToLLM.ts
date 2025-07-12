import express from "express";
import { OpenAIResponse } from "../model/OpenAI";
import { summariseAndAnalyse } from "../services/openAiService";
import { storeData } from "../services/databaseService";
import { PositiveNegativeNeutral } from "../model/NewsSummaries";
const router = express.Router();

function translateSentiment(sentiment: string): PositiveNegativeNeutral {
  if (sentiment == "P") return "Positive";
  else if (sentiment == "Ntl") return "Neutral";
  else if (sentiment == "Ng") return "Negative";
  else return "Unknown";
}

router.post("/", async (req, res) => {
  const { title, description, content, url } = req.body;
  if (!title || !description || !content || !url) {
    return res
      .status(400)
      .json({ error: "Both 'title' and 'content' fields are required." });
  }

  const articleText: string = `Title: ${title}
  Description: ${description}
  Content: ${content}`;

  try {
    const response: OpenAIResponse = await summariseAndAnalyse(articleText);
    await storeData(title, response._2, translateSentiment(response._1), url);

    res.json({
      message: "Article Summarised and Stored",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch external data" });
  }
});

export default router;
