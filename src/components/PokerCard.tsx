import { Card, CardActionArea, CardContent } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";

type Props = {
  value: number;
  isSelected: boolean;
  disabled?: boolean;
  onClick: (value: number) => void;
};

const PokerCard: React.FC<Props> = ({
  value,
  isSelected,
  disabled = false,
  onClick,
}) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(isSelected ? blue[500] : "");
  }, [isSelected]);

  return (
    <Card variant="outlined">
      <CardActionArea
        sx={{
          minWidth: 50,
          textAlign: "center",
          backgroundColor: color,
        }}
        disabled={disabled}
        onClick={() => onClick(value)}
      >
        <CardContent>{value}</CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokerCard;
