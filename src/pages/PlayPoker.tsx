import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import CardMyPokerCard from "../components/CardMyPokerCard";
import CardPlayer from "../components/CardPlayer";
import CardStory from "../components/CardStory";
import usePoker from "../hooks/usePoker";

const PlayPoker = () => {
  const {
    players,
    setMyId,
    fetchPoker,
    unsubscribe,
    hasSelectedAllUsers,
    openCard,
  } = usePoker();

  const canOpen = useMemo(() => hasSelectedAllUsers(), [players]);

  const clickOpen = () => {
    openCard();
  };

  useEffect(() => {
    setMyId("id001");
    fetchPoker();
    return () => unsubscribe();
  }, []);

  return (
    <>
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
    </>
  );
};

export default PlayPoker;
