import { NewsSummary, PositiveNegativeNeutral } from "../model/NewsSummaries";

export const storeData = async (
  articleTitle: string,
  articleSummary: string,
  sentiment: PositiveNegativeNeutral,
  url: String
) => {
  await NewsSummary.create({
    articleTitle: articleTitle,
    articleSummary: articleSummary,
    sentiment: sentiment,
    originalArticleURL: url,
  });
};
