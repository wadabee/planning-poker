import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import PokerCard from "./components/PokerCard";

const App: React.FC = () => {
  const cardValue = [0, 1, 3, 5, 8, 13];
  return (
    <Box sx={{ m: 3 }}>
      <h1>Planning Poker</h1>

      <Grid container spacing={2}>
        {cardValue.map((val) => {
          return (
            <Grid key={val} item xs={"auto"} alignContent={"center"}>
              <PokerCard value={val}></PokerCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default App;
