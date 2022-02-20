import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomPathParams } from "../@types/Params";
import CardMyPokerCard from "../components/CardMyPokerCard";
import CardPlayer from "../components/CardPlayer";
import CardStory from "../components/CardStory";
import DialogInputPlayerName from "../components/DialogInputPlayerName";
import usePoker from "../hooks/usePoker";
import CookieService from "../services/cookieServices";

const PlayPoker = () => {
  const { roomId } = useParams<RoomPathParams>();
  const {
    players,
    setMyId,
    addPlayer,
    fetchPoker,
    unsubscribe,
    hasSelectedAllUsers,
    openCard,
    login,
  } = usePoker("" + roomId);

  const [openDialog, setOpenDialog] = useState(false);

  const canOpen = useMemo(() => hasSelectedAllUsers(), [players]);

  const clickOpen = () => {
    openCard();
  };

  const handlePlayerRegister = (playerName: string) => {
    const playerId = addPlayer(playerName);
    setMyId(playerId);
    CookieService.setMyId(roomId ?? "", playerId);
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchPoker();
    login().then((hasLoggedIn) => {
      if (!hasLoggedIn) {
        setOpenDialog(true);
      }
    });

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

      <DialogInputPlayerName
        open={openDialog}
        onRegister={handlePlayerRegister}
      />
    </>
  );
};

export default PlayPoker;
