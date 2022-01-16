import { Chip } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import React from "react";

type Props = {
  name: string;
};

const ChipPlayer: React.FC<Props> = ({ name }) => {
  return <Chip icon={<FaceIcon />} label={name} variant="outlined" />;
};

export default ChipPlayer;
