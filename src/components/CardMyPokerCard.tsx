import { Card, CardContent, Grid, Stack } from "@mui/material";
import React from "react";
import ChipPlayer from "./ChipPlayer";
import PokerCard from "./PokerCard";

const CardMyPokerCard: React.FC = () => {
  const cardValue = [0, 1, 3, 5, 8, 13];

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Grid container spacing={2}>
            {cardValue.map((val) => {
              return (
                <Grid key={val} item xs={"auto"} alignContent={"center"}>
                  <PokerCard value={val}></PokerCard>
                </Grid>
              );
            })}
          </Grid>
          <ChipPlayer name="My Name" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardMyPokerCard;
