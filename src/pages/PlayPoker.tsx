import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomPathParams } from "../@types/Params";
import CardMyPokerCard from "../components/CardMyPokerCard";
import CardPlayer from "../components/CardPlayer";
import ChartPokerResult from "../components/ChartPokerResult";
import DialogInputPlayerName from "../components/DialogInputPlayerName";
import usePoker from "../hooks/usePoker";
import CookieService from "../services/cookieServices";

const PlayPoker = () => {
  const { roomId } = useParams<RoomPathParams>();
  const {
    players,
    isOpen,
    setMyId,
    addPlayer,
    fetchPoker,
    unsubscribe,
    hasSelectedAllUsers,
    openCard,
    login,
    resetPoker,
  } = usePoker("" + roomId);

  const [openDialog, setOpenDialog] = useState(false);

  const canOpen = useMemo(() => hasSelectedAllUsers() && !isOpen, [players]);

  const clickOpen = () => {
    openCard();
  };

  const handlePlayerRegister = (playerName: string) => {
    const playerId = addPlayer(playerName);
    setMyId(playerId);
    CookieService.setMyId(roomId ?? "", playerId);
    setOpenDialog(false);
  };

  const clickReset = () => {
    resetPoker();
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
        <Stack direction="row" spacing={2}>
          {isOpen ? <ChartPokerResult /> : null}
        </Stack>

        <Grid container spacing={2} justifyContent="center">
          {players.map((player, idx) => (
            <Grid key={idx} item xs="auto">
              <CardPlayer
                name={player.name}
                selectedValue={player.selectedCard}
                online={player.online}
              />
            </Grid>
          ))}
        </Grid>

        {!isOpen ? (
          <Button
            variant="contained"
            color="success"
            disabled={!canOpen}
            onClick={clickOpen}
          >
            OPEN CARD
          </Button>
        ) : (
          <Button variant="contained" color="error" onClick={clickReset}>
            RESET
          </Button>
        )}

        <CardMyPokerCard />
      </Stack>

      <DialogInputPlayerName
        open={openDialog}
        onRegister={handlePlayerRegister}
      />
    </>
  );
};

export default PlayPoker;
