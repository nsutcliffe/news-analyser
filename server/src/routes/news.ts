import express from "express";
import axios from "axios";
import { GNewsResponse } from "../model/GNews";

const router = express.Router();

const gnewsSearchLink = "https://gnews.io/api/v4/search";

function buildGNewsRequest(searchTerm: string): string {
  const params = {
    q: searchTerm,
    apikey: process.env.GNEWS_API_KEY,
    lang: "en",
    country: "gb",
    max: 10,
  };

  const stringParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );

  const searchParams = new URLSearchParams(stringParams);

  const queryString = searchParams.toString();

  return `${gnewsSearchLink}?${queryString}`;
}

console.debug("Registering routes in news router");

router.get("/", async (req, res) => {
  const searchQuery = req.query.q as string | undefined;
  console.log(`Search request for query term ${searchQuery}`);
  if (!searchQuery) {
    return res
      .status(400)
      .json({ error: "Missing required query parameter: 'q'" });
  }

  try {
    const response = await axios.get<GNewsResponse>(
      buildGNewsRequest(searchQuery)
    );

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        return res.status(400).json({
          error: "Bad request to external API; if your search term contains special characters, try surrounding it with double quotes",
          details: error.response.data,
        });
      }
      // Handle other HTTP errors from external API
      return res.status(error.response.status).json({
        error: "External API error",
        details: error.response.data,
      });
    }
    // Handle other (non-Axios or network) errors
    console.error(error);
    res.status(500).json({ error: "Failed to fetch external data" });
  }
});

export default router;
