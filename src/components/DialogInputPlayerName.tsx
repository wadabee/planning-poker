import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";

type Props = {
  open: boolean;
  onRegister: (playerName: string) => void;
};

const DialogInputPlayerName: React.FC<Props> = ({ open, onRegister }) => {
  const [playerName, setPlayerName] = useState("");

  const hasInputted = useMemo(() => playerName !== "", [playerName]);

  const handleRegister = () => {
    onRegister(playerName);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>名前の入力</DialogTitle>
      <DialogContent>
        <DialogContentText>あなたの名前を入力してください。</DialogContentText>
        <TextField
          value={playerName}
          autoFocus
          label="name"
          fullWidth
          variant="outlined"
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={!hasInputted}
          onClick={handleRegister}
        >
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogInputPlayerName;
