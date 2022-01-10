import { Card, CardContent } from "@mui/material";
import React from "react";

type Props = {
  value: number;
};

const PokerCard: React.FC<Props> = (props) => {
  return (
    <Card sx={{ minWidth: 50, textAlign: "center", backgroundColor: "blue" }}>
      <CardContent>{props.value}</CardContent>
    </Card>
  );
};

export default PokerCard;
