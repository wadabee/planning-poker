import { Button, Card, CardContent, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { playersActions } from "../store/players/playersSlice";
import ChipPlayer from "./ChipPlayer";
import PokerCard from "./PokerCard";

const CardMyPokerCard: React.FC = () => {
  const dispatch = useDispatch();
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
    dispatch(playersActions.setMyCard(selectedCard));
  };

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
          <ChipPlayer name="My Name" />
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
