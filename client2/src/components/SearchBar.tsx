import { useState, type FormEvent } from "react";
import { mockGNewsResponse } from "../test/MockGNewsResponse";
import type { GNewsArticle } from "../model/GNews";

interface SearchBarProps {
  onResults: (articles: GNewsArticle[]) => void;
}

function SearchBar({ onResults }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);

    // TODO: Implement call to backend
    const data: GNewsArticle[] = mockGNewsResponse.articles;
    onResults(data);
  };
  return (
    <div className="container" style={{ maxWidth: "1200px" }}>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Search ..."
            key="newsSearch"
            value={searchTerm}
            onChange={(changeEvent) => setSearchTerm(changeEvent.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary rounded-pill" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
