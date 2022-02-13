import React, { useEffect, useMemo } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import CardPlayer from "./components/CardPlayer";
import CardMyPokerCard from "./components/CardMyPokerCard";
import { Button, Grid, Stack } from "@mui/material";
import CardStory from "./components/CardStory";
import usePoker from "./hooks/usePoker";

const App: React.FC = () => {
  const { players, fetchPoker, unsubscribe, hasSelectedAllUsers, openCard } =
    usePoker();

  const canOpen = useMemo(() => hasSelectedAllUsers(), [players]);

  const clickOpen = () => {
    openCard();
  };

  useEffect(() => {
    fetchPoker();
    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ m: 3 }}>
      <h1>Planning Poker</h1>
      <Stack spacing={2} alignItems="center">
        <CardStory title="タイトル" content="ストーリーの内容" />

        <Grid container spacing={2}>
          {players.map((player, idx) => (
            <Grid key={idx} item xs={6} md={4}>
              <CardPlayer
                name={player.name}
                selectedValue={player.selectedCard}
              />
            </Grid>
          ))}
        </Grid>
        <CardMyPokerCard />

        <div>
          <Button
            variant="contained"
            color="success"
            disabled={!canOpen}
            onClick={clickOpen}
          >
            OPEN CARD
          </Button>
        </div>
      </Stack>
    </Box>
  );
};

export default App;
