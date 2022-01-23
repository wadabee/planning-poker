import { Card, CardContent, Stack } from "@mui/material";
import React, { useMemo } from "react";
import ChipPlayer from "./ChipPlayer";
import ReactLoading from "react-loading";
import { blue } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { selectPlayers } from "../store/players/playersSlice";

type Props = {
  name: string;
  selectedValue: number;
};

const CardPlayer: React.FC<Props> = ({ name, selectedValue }) => {
  const { isOpen } = useSelector(selectPlayers);
  const loading = useMemo(() => selectedValue < 0, [selectedValue]);
  const color = loading ? "" : blue[500];
  const loadingColor = blue[500];

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Card
            variant="outlined"
            sx={{
              width: 80,
              textAlign: "center",
              backgroundColor: color,
            }}
          >
            <CardContent>
              {loading ? (
                <ReactLoading type="bubbles" color={loadingColor} />
              ) : isOpen ? (
                <>{selectedValue}</>
              ) : (
                <CheckIcon sx={{ color: "white", fontSize: 50 }} />
              )}
            </CardContent>
          </Card>
          <ChipPlayer name={name}></ChipPlayer>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardPlayer;
