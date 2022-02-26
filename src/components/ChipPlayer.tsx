import { Avatar, Chip } from "@mui/material";
import React, { useMemo } from "react";
import { green } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  name: string;
  online: boolean;
};

const ChipPlayer: React.FC<Props> = ({ name, online }) => {
  const iconColor = useMemo(() => {
    return online ? green["A700"] : "";
  }, [online]);

  return (
    <Chip
      avatar={
        <Avatar sx={{ bgcolor: iconColor }}>
          {online ? "" : <CloseIcon />}
        </Avatar>
      }
      label={name}
      variant="outlined"
    />
  );
};

export default ChipPlayer;
