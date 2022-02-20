import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoom from "../hooks/useRoom";

export const CreateRoom = () => {
  const { createRoom } = useRoom();
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");

  const handleCreate = () => {
    createRoom(roomName).then((roomId) => {
      navigate(`/play/${roomId}`);
    });
  };

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Card>
        <CardContent>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h5" component="div">
              部屋を作成する
            </Typography>
            <TextField
              label="部屋名"
              variant="outlined"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreate}>
              作成
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CreateRoom;
