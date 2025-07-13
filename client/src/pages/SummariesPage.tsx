import { useEffect, useState } from "react";
import SummariesTable from "../components/SummaryTable";
import axios from "axios";
import type { NewsSummary } from "../model/NewsSummary";
import type { GridValidRowModel } from "@mui/x-data-grid";

interface GetArticlesResponse {
  rows: NewsSummary[];
}

export default function SummariesPage() {
  const [rows, setRows] = useState<GridValidRowModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get<GetArticlesResponse>(
          "/api/get-articles"
        );

        const allArticles = response.data.rows;
        const rows: GridValidRowModel[] = allArticles.map((r) => ({
          id: r._id,
          title: r.articleTitle,
          sentiment: r.sentiment,
          summary: r.articleSummary,
          url: r.originalArticleURL,
        }));
        setRows(rows);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return <SummariesTable rows={rows} loading={loading} />;
}
