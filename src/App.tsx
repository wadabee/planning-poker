import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import CardPlayer from "./components/CardPlayer";
import CardMyPokerCard from "./components/CardMyPokerCard";
import { Button, Grid, Stack } from "@mui/material";
import CardStory from "./components/CardStory";

type Player = {
  id: string;
  name: string;
  loading: boolean;
  selectedCard: number;
};

const App: React.FC = () => {
  const players: Player[] = [
    {
      id: "id001",
      name: "John",
      loading: true,
      selectedCard: 3,
    },
    {
      id: "id002",
      name: "Tom",
      loading: false,
      selectedCard: 5,
    },
    {
      id: "id003",
      name: "Ken",
      loading: false,
      selectedCard: 5,
    },
  ];

  return (
    <Box sx={{ m: 3 }}>
      <h1>Planning Poker</h1>

      <Stack spacing={2} alignItems="center">
        <CardStory title="タイトル" content="ストーリーの内容" />

        <Grid container spacing={2}>
          {players.map((player, idx) => (
            <Grid key={idx} item xs={6} md={4}>
              <CardPlayer name={player.name} loading={player.loading} />
            </Grid>
          ))}
        </Grid>
        <CardMyPokerCard />

        <div>
          <Button variant="contained">OPEN CARD</Button>
        </div>
      </Stack>
    </Box>
  );
};

export default App;
