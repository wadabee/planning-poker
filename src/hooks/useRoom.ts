import { addRoom } from "../db/poker";

const useRoom = () => {
  const createRoom = (roomName: string): Promise<string> => {
    return addRoom(roomName);
  };

  return {
    createRoom,
  };
};

export default useRoom;
