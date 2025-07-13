import type { GNewsArticle } from "../model/GNews";
import SummariseButton from "./SummariseButton";

interface ResultsTableProps {
  articles: GNewsArticle[];
}

function ResultsTable({ articles }: ResultsTableProps) {
  return (
    articles.length > 0 && (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              #
            </th>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              Published Date
            </th>
            <th scope="col">Title</th>
            <th scope="col">Link to Source</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, idx) => (
            <tr key={idx + 1}>
              <th scope="row">{idx + 1}</th>
              <td>{article.publishedAt}</td>
              <td>{article.title}</td>
              <td>
                <a
                  href={article.url}
                  className="truncate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.url}
                </a>
              </td>
              <td>
                <SummariseButton article={article} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}

export default ResultsTable;
