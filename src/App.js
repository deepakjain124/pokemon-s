import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokemondetail from "./Components/Pokemondetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/:name" element={<Pokemondetail />} />
      </Routes>
    </Router>
  );
}

export default App;
