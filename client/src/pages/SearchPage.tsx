import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultsTable from "../components/ResultsTable";
import type { GNewsArticle, GNewsResponse } from "../model/GNews";
import axios from "axios";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<GNewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let data: GNewsArticle[] = [];
    try {
      const response = await axios.get<GNewsResponse>("/api/search-news", {
        params: { q: searchTerm },
      });
      data = response.data.articles;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          alert(
            `Server Error ${err.response.status}: ${JSON.stringify(
              err.response.data
            )}`
          );
        } else if (err.request) {
          alert("Network error: unable to reach the server. Is it running?");
        } else {
          alert(`Unexpected error: ${err.message}`);
        }
      } else {
        alert(`Unexpected error: ${err}`);
      }
    }
    setResults(data);
    setLoading(false);
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmit={handleSearch}
        loading={loading}
      />
      <br />
      <ResultsTable articles={results} />
    </div>
  );
}
