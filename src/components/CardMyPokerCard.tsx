import { Button, Card, CardContent, Grid, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomPathParams } from "../@types/Params";
import usePoker from "../hooks/usePoker";
import ChipPlayer from "./ChipPlayer";
import PokerCard from "./PokerCard";

const CardMyPokerCard: React.FC = () => {
  const { roomId } = useParams<RoomPathParams>();
  const { setMyCard, myName, me, isOpen } = usePoker("" + roomId);
  const cardValue = [1, 3, 5, 8, 13, 21];

  const [selectedCard, setSelectedCard] = useState(-1);

  const isDisabledOkBtn = useMemo(() => {
    return selectedCard < 0 || me.selectedCard >= 0;
  }, [me, selectedCard]);

  const isDisabledCancelBtn = useMemo(
    () => me?.selectedCard < 0 || isOpen,
    [me, isOpen]
  );

  const isDisabledPokerCard = useMemo(
    () => !isDisabledCancelBtn || isOpen,
    [isDisabledCancelBtn, isOpen]
  );

  const clickCard = (value: number) => {
    if (selectedCard === value) {
      setSelectedCard(-1);
    } else {
      setSelectedCard(value);
    }
  };

  const confirmCard = () => {
    setMyCard(selectedCard);
  };

  const cancelCard = () => {
    setSelectedCard(-1);
    setMyCard(-1);
  };

  useEffect(() => {
    if (me?.selectedCard === -1) {
      setSelectedCard(-1);
    }
  }, [me?.selectedCard]);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Grid container spacing={2}>
            {cardValue.map((val) => {
              return (
                <Grid key={val} item xs={"auto"} alignContent={"center"}>
                  <PokerCard
                    value={val}
                    isSelected={selectedCard === val}
                    disabled={isDisabledPokerCard}
                    onClick={clickCard}
                  ></PokerCard>
                </Grid>
              );
            })}
          </Grid>
          <ChipPlayer name={myName} online={true} />

          <Stack direction="row" spacing={2}>
            <Button
              variant={"contained"}
              color="error"
              onClick={cancelCard}
              disabled={isDisabledCancelBtn}
            >
              CANCEL
            </Button>

            <Button
              variant={"contained"}
              onClick={confirmCard}
              disabled={isDisabledOkBtn}
            >
              OK
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardMyPokerCard;
