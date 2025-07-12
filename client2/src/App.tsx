import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";

import { useState } from "react";
import type { GNewsArticle } from "./model/GNews";
import Banner from "./components/Banner";

function App() {
  const [articles, setArticles] = useState<GNewsArticle[]>([]);

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <div>
        <Banner />
      </div>
      <br />
      <br />
      <div>
        <SearchBar onResults={setArticles} />
      </div>

      <br />
      <div>
        <ResultsTable articles={articles} />
      </div>
    </div>
  );
}

export default App;
