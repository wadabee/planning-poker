import { Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import ChipPlayer from "./ChipPlayer";
import ReactLoading from "react-loading";
import { blue } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import usePoker from "../hooks/usePoker";
import { useParams } from "react-router-dom";
import { RoomPathParams } from "../@types/Params";

type Props = {
  name: string;
  selectedValue: number;
  online: boolean;
};

const CardPlayer: React.FC<Props> = ({ name, selectedValue, online }) => {
  const { roomId } = useParams<RoomPathParams>();
  const { isOpen } = usePoker("" + roomId);
  const loading = useMemo(() => selectedValue < 0, [selectedValue]);
  const color = loading ? "" : blue[700];
  const loadingColor = blue[500];

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Card
            variant="outlined"
            sx={{
              minWidth: 50,
              textAlign: "center",
              backgroundColor: color,
            }}
          >
            <CardContent>
              {loading ? (
                online ? (
                  <ReactLoading type="bubbles" color={loadingColor} />
                ) : (
                  ""
                )
              ) : isOpen ? (
                <Typography variant="h4" color="white">
                  {selectedValue}
                </Typography>
              ) : (
                <CheckIcon sx={{ color: "white", fontSize: 50 }} />
              )}
            </CardContent>
          </Card>
          <ChipPlayer name={name} online={online}></ChipPlayer>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardPlayer;
