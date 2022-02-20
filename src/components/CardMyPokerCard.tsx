import { Button, Card, CardContent, Grid, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomPathParams } from "../@types/Params";
import usePoker from "../hooks/usePoker";
import ChipPlayer from "./ChipPlayer";
import PokerCard from "./PokerCard";

const CardMyPokerCard: React.FC = () => {
  const { roomId } = useParams<RoomPathParams>();
  const { setMyCard, myName, me } = usePoker("" + roomId);
  const cardValue = [1, 3, 5, 8, 13, 21];

  const [selectedCard, setSelectedCard] = useState(-1);

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

  useEffect(() => {
    if (me.selectedCard === -1) {
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
                    onClick={clickCard}
                  ></PokerCard>
                </Grid>
              );
            })}
          </Grid>
          <ChipPlayer name={myName} />
          <Button
            variant={"contained"}
            onClick={confirmCard}
            disabled={selectedCard <= 0}
          >
            カード確定
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardMyPokerCard;
