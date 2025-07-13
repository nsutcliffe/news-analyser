import type { GNewsResponse } from "../model/GNews";

export const mockGNewsResponse: GNewsResponse = {
    totalArticles: 2,
    articles: [
      {
        title: "AI Revolutionizes News Industry",
        description: "Artificial Intelligence is reshaping journalism and reporting.",
        content:
          "In a major shift for media companies, AI tools are being integrated into newsrooms to help draft articles, summarize reports, and even analyze sentiment...",
        url: "https://example.com/articles/ai-news",
        image: "https://example.com/images/ai-news.jpg",
        publishedAt: "2025-07-10T12:34:56Z",
        source: {
          name: "Tech News Daily",
          url: "https://technewsdaily.com",
        },
      },
      {
        title: "Global Markets See Record Growth",
        description: "Stock markets around the world hit record highs this week.",
        content:
          "Investors celebrated as global stock indices surged to new heights, driven by strong corporate earnings and optimism about the economic outlook...",
        url: "https://example.com/articles/market-growth",
        image: "https://example.com/images/market-growth.jpg",
        publishedAt: "2025-07-09T08:15:30Z",
        source: {
          name: "Finance Times",
          url: "https://financetimes.com",
        },
      },
    ],
  };