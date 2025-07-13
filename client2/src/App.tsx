import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";

import { useState } from "react";
import type { GNewsArticle } from "./model/GNews";
import Banner from "./components/Banner";
import { Tabs, Tab, Box } from "@mui/material";
import "./styles.css";
import SummariesPage from "./pages/SummariesPage";

function App() {
  const [articles, setArticles] = useState<GNewsArticle[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  let content;

  if (tabIndex === 0) {
    content = (
      <>
        <div>
          <SearchBar onResults={setArticles} />
        </div>

        <br />
        <div>
          <ResultsTable articles={articles} />
        </div>
      </>
    );
  } else if (tabIndex === 1) {
    content = (
      <>
        <SummariesPage />
      </>
    );
  } else {
    content = null; // optional: fallback if needed
  }

  return (
    <Box sx={{ width: "100%" }}>
      <div>
        <Banner />
      </div>
      <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Search News" />
        <Tab label="Saved Summaries" />
      </Tabs>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <br />
        <br />
        <Box sx={{ mt: 2 }}>{content}</Box>
      </div>
    </Box>
  );
}

export default App;
