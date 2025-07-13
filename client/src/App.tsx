import { useState } from "react";
import Banner from "./components/Banner";
import { Tabs, Tab, Box } from "@mui/material";
import "./styles.css";
import SummariesPage from "./pages/SummariesPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  let content;

  if (tabIndex === 0) {
    content = <SearchPage />;
  } else if (tabIndex === 1) {
    content = <SummariesPage />;
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
