import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoomList } from "../@types/Room";
import useRoom from "../hooks/useRoom";

export const CreateRoom = () => {
  const { createRoom, getMyRooms } = useRoom();
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState<RoomList>([]);

  const handleCreate = () => {
    createRoom(roomName).then((roomId) => {
      navigate(`/play/${roomId}`);
    });
  };

  const handleEnterRoom = (roomId: string) => {
    navigate(`/play/${roomId}`);
  };

  useEffect(() => {
    getMyRooms().then((rooms) => {
      setRoomList(rooms);
    });
  }, []);

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

      <Card>
        <CardContent>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h5" component="div">
              以前作成した部屋に入る
            </Typography>

            {roomList.map((room) => (
              <Button
                key={room.roomId}
                fullWidth
                variant="outlined"
                onClick={() => handleEnterRoom(room.roomId)}
              >
                {room.roomName}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CreateRoom;
