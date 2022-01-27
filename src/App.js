import { Routes, Route } from "react-router-dom";
import "./App.css";
import Workflow from "./components/Workflow";

function App({ fetchSearchData }) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Workflow />} />
      </Routes>
    </div>
  );
}

export default App;
