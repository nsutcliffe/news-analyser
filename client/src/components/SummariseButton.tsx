import axios from "axios";
import type { GNewsArticle } from "../model/GNews";
import { useState } from "react";

type SummariseButtonProps = {
  article: GNewsArticle;
};

function SummariseButton({ article }: SummariseButtonProps) {
  const [status, setStatus] = useState("idle");

  const submitForAnalysis = async (article: GNewsArticle) => {
    setStatus("submitting");

    try {
      const response = await axios.post("/api/analyse-article", {
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
      });
      console.log(response);
      setStatus("success");
    } catch (error: unknown) {
      setStatus("error");
      if (!axios.isAxiosError(error)) {
        alert("Something went wrong. Please try again.");
        return;
      }

      const status = error.response?.status;
      if (status === 429) {
        alert(
          "We’ve hit the usage limit for summaries. Please try again in a few minutes. If the problem persists, ask the server admin to check quota."
        );
        return;
      }
      alert(
        "Our server had a problem processing that article. Please try again shortly."
      );
      return;
    }
  };
  let buttonFormat = "btn-primary";
  let label = "Summarise →";
  if (status === "submitting") {
    label = "...";
    buttonFormat = "btn-secondary";
  } else if (status === "success") {
    label = "✓ Done!";
    buttonFormat = "btn-success";
  } else if (status === "error") {
    label = "Summarise →";
    buttonFormat = "btn-primary";
  }

  return (
    <button
      className={`btn ${buttonFormat} btn-sm`}
      onClick={() => submitForAnalysis(article)}
      disabled={status === "submitting" || status === "success"}
    >
      {label}
    </button>
  );
}

export default SummariseButton;
