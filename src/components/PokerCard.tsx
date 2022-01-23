import { Card, CardContent } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";

type Props = {
  value: number;
  isSelected: boolean;
  onClick: (value: number) => void;
};

const PokerCard: React.FC<Props> = (props) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(props.isSelected ? blue[500] : "");
  }, [props.isSelected]);

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 50,
        textAlign: "center",
        backgroundColor: color,
      }}
      onClick={() => props.onClick(props.value)}
    >
      <CardContent>{props.value}</CardContent>
    </Card>
  );
};

export default PokerCard;
