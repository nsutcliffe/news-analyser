import OpenAI from "openai";
import { OpenAIResponse } from "../model/OpenAI";
import { ConnectivityError, RateLimitError } from "../model/Errors";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptInstructions = `Summarize text briefly and classify sentiment:
You are only allowed to use the values P, Ntl and Ng for sentiment classification. Note:
  P = Positive
  Ntl = Neutral
  Ng = Negative
  
  Reply ONLY with JSON on one line:
  {"_1":"<sentiment>","_2":"<summary>"}.`;

export const summariseAndAnalyse = async (
  articleText: String
): Promise<OpenAIResponse> => {
  const maxRetries = 3;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
          {
            role: "system",
            content: promptInstructions,
          },
          {
            role: "user",
            content: `Summarize this article: ${articleText}`,
          },
        ],
      });

      const message = completion.choices[0].message.content;

      if (message != null) {
        const json: OpenAIResponse = JSON.parse(message);
        return json;
      }

      console.warn("OpenAI returned null message, retrying...");
      retries++;
    } catch (error: any) {
      if (error.statusCode === 429) {
        throw new RateLimitError();
      } else {
        console.error("Non-retriable error:", error);
        throw error;
      }
    }
    await new Promise((r) => setTimeout(r, 500 * (retries + 1)));
  }
  throw new Error("Failed to get response from OpenAI after retries.");
};
