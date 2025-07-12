import type { GNewsArticle } from "../model/GNews";

interface ResultsTableProps {
  articles: GNewsArticle[];
}

function ResultsTable({ articles }: ResultsTableProps) {
  const submitForAnalysis = async (article: GNewsArticle) => {
    console.log(article);
  };

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
            <tr key={idx}>
              <th scope="row">{idx}</th>
              <td>{article.publishedAt}</td>
              <td>{article.title}</td>
              <td>
                <a href={article.url}>{article.url}</a>
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => submitForAnalysis(article)}
                >
                  Analyse →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}

export default ResultsTable;
