import { useState, type FormEvent } from "react";
//import { mockGNewsResponse } from "../test/MockGNewsResponse";
import type { GNewsArticle, GNewsResponse } from "../model/GNews";
import axios from "axios";

interface SearchBarProps {
  onResults: (articles: GNewsArticle[]) => void;
}

function SearchBar({ onResults }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    let data: GNewsArticle[] = [];

    try {
      const response = await axios.get<GNewsResponse>("/api/search-news", {
        params: {
          q: searchTerm,
        },
      });
      data = response.data.articles;
      console.log(data);
    } catch (err) {
      //TODO: Factor out into "handle axios error" thing
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with a non-2xx code
          console.error(
            "Server responded with an error:",
            err.response.status,
            err.response.data
          );
          alert(
            `Server Error ${err.response.status}: ${JSON.stringify(
              err.response.data
            )}`
          );
        } else if (err.request) {
          // Request was made but no response received
          console.error(
            "No response received from server. Possible network error."
          );
          alert("Network error: unable to reach the server. Is it running?");
        } else {
          // Something happened setting up the request
          console.error("Axios setup error:", err.message);
          alert(`Unexpected error: ${err.message}`);
        }
      } else {
        console.error("Non-Axios error:", err);
        alert(`Unexpected error: ${err}`);
      }
    }
    //data = mockGNewsResponse.articles;
    onResults(data);
  };

  return (
    <div className="container" style={{ maxWidth: "1200px" }}>
      <form onSubmit={handleSearch}>
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control rounded-pill me-2"
            placeholder="Search ..."
            key="newsSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary rounded-pill" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
