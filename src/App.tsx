import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import CardPlayer from "./components/CardPlayer";
import CardMyPokerCard from "./components/CardMyPokerCard";
import { Button, Grid, Stack } from "@mui/material";
import CardStory from "./components/CardStory";
import { useDispatch, useSelector } from "react-redux";
import {
  hasSelectedAllUsers,
  playersActions,
  selectPlayers,
} from "./store/players/playersSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { myId, players } = useSelector(selectPlayers);

  const canOpen = useSelector(hasSelectedAllUsers);

  const clickOpen = () => {
    dispatch(playersActions.openCard());
  };

  return (
    <Box sx={{ m: 3 }}>
      <h1>Planning Poker</h1>

      <Stack spacing={2} alignItems="center">
        <CardStory title="タイトル" content="ストーリーの内容" />

        <Grid container spacing={2}>
          {players.map((player, idx) =>
            player.id !== myId ? (
              <Grid key={idx} item xs={6} md={4}>
                <CardPlayer
                  name={player.name}
                  selectedValue={player.selectedCard}
                />
              </Grid>
            ) : null
          )}
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
