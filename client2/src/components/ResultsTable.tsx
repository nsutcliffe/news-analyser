import type { GNewsArticle } from "../model/GNews";

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
          </tr>
        </thead>
        <tbody>
          {articles.map((article, idx) => (
            <tr key={idx}>
              <th scope="row">{idx}</th>
              <td>{article.publishedAt}</td>
              <td>{article.title}</td>
              <td>
                <a href={article.url}>{article.url}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}

export default ResultsTable;
