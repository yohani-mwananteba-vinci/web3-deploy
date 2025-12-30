import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Add from "./pages/Add";
import List from "./pages/List";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("Welcome");
  if (currentPage == "Welcome") {
    return <Welcome setCurrentPage={setCurrentPage} />;
  }

  if (currentPage == "Add") {
    return <Add setCurrentPage={setCurrentPage} />;
  }

  if (currentPage == "List") {
    return <List setCurrentPage={setCurrentPage} />;
  }
  return (
    <>
      <Home />
    </>
  );
}

export default App;
