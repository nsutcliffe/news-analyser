import type { FormEvent, Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onSubmit: (e: FormEvent) => void;
  loading?: boolean;
}

function SearchBar({ searchTerm, setSearchTerm, onSubmit, loading }: SearchBarProps) {
  return (
    <div className="container" style={{ maxWidth: "1200px" }}>
      <form onSubmit={onSubmit}>
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control rounded-pill me-2"
            placeholder="Search ..."
            key="newsSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
          <button className="btn btn-primary rounded-pill" type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
