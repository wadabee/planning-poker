import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import CardPlayer from "./components/CardPlayer";
import CardMyPokerCard from "./components/CardMyPokerCard";

const App: React.FC = () => {
  return (
    <Box sx={{ m: 3 }}>
      <h1>Planning Poker</h1>

      <CardPlayer name="player1" loading={true} />
      <CardPlayer name="player2" loading={false} />

      <CardMyPokerCard />
    </Box>
  );
};

export default App;
