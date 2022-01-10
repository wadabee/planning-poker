import { Card, CardContent } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCard, selectPokerCard } from "../store/pokerCard/pokerCardSlice";

type Props = {
  value: number;
};

const PokerCard: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { value } = useSelector(selectPokerCard);

  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(value === props.value ? blue[500] : "");
  }, [value, props.value]);

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(selectCard(props.value));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 50,
        textAlign: "center",
        backgroundColor: color,
      }}
      onClick={onClick}
    >
      <CardContent>{props.value}</CardContent>
    </Card>
  );
};

export default PokerCard;
