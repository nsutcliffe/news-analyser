import express from "express";
import { OpenAIResponse } from "../model/OpenAI";
import { summariseAndAnalyse } from "../services/openAiService";
import { storeData } from "../services/databaseService";
import { PositiveNegativeNeutral } from "../model/NewsSummaries";
import axios from "axios";
import OpenAI from "openai";

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
    console.log(response);
    await storeData(title, response._2, translateSentiment(response._1), url);

    res.json({
      message: "Article Summarised and Stored",
      data: response,
    });
  } catch (error: unknown) {
    console.error(error);
    // Handle OpenAI 429 error

    if (error instanceof OpenAI.APIError) {
      if (error.status === 429 || error.code === "rate_limit_exceeded") {
        return res.status(429).json({
          errorCode: "RATE_LIMIT_EXCEEDED",
          message: "OpenAI rate limit or quota exceeded.",
        });
      }

      // bubble any other OpenAI API error as-is
      return res.status(error.status ?? 500).json({
        errorCode: "OPENAI_ERROR",
        message: error.message,
      });
    }

    res.status(500).json({
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong processing the article.",
    });
  }
});

export default router;
