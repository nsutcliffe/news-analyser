import mongoose, { Document, Schema } from "mongoose";

export type PositiveNegativeNeutral =
  | "Positive"
  | "Negative"
  | "Neutral"
  | "Unknown";
export interface NewsSummaryDoc extends Document {
  articleTitle: string;
  articleSummary: string;
  sentiment: PositiveNegativeNeutral;
  originalArticleURL: string;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<NewsSummaryDoc>(
  {
    articleTitle: { type: String, required: true },
    articleSummary: { type: String, required: true },
    sentiment: {
      type: String,
      enum: ["Positive", "Negative", "Neutral"],
      required: true,
    },
    originalArticleURL: { type: String, required: true },
  },
  { timestamps: true }
);

export const NewsSummary = mongoose.model<NewsSummaryDoc>(
  "NewsSummary",
  newsSchema
);
