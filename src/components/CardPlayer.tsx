import { Card, CardContent, Stack } from "@mui/material";
import React from "react";
import ChipPlayer from "./ChipPlayer";
import ReactLoading from "react-loading";
import { blue } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  name: string;
  loading: boolean;
};

const CardPlayer: React.FC<Props> = ({ name, loading }) => {
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
