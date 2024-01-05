import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Details from "./pages/Details";
import { CharacterCacheProvider } from "./pages/CarachtersCacheContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CharacterCacheProvider>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Login />} />
            <Route path="/star-wars" element={<Movie />} />
            <Route path="/movie/:id" element={<Details />} />
          </Route>
        </Routes>
      </CharacterCacheProvider>
    </Router>
  </React.StrictMode>
);
