import express from "express";
import axios from "axios";
import { OpenAIResponse } from "../model/OpenAI";
import OpenAI from "openai";
import { ConnectivityError, RateLimitError } from "../model/Errors";
import { summariseAndAnalyse } from "../services/openAiService";
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description, content, source } = req.body;
  if (!title || !description || !content || !source) {
    return res
      .status(400)
      .json({ error: "Both 'title' and 'content' fields are required." });
  }

  const articleText: string = `Title: ${title}
  Description: ${description}
  Content: ${content}`;

  try {
    const response = await summariseAndAnalyse(articleText);
    res.json({
      message: "Fetched data from external API!",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch external data" }); //TODO: Could pass back error more clearly from GNews if we get an error from them
  }
});

export default router;
