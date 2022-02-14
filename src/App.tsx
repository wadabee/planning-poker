import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import PlayPoker from "./pages/PlayPoker";

const App: React.FC = () => {
  return (
    <Box sx={{ m: 3 }}>
      <h1>Planning Poker</h1>

      <Routes>
        <Route path="/play" element={<PlayPoker />} />
      </Routes>
    </Box>
  );
};

export default App;
