import PokerApi from "../api/poker";

const useRoom = () => {
  const { addRoom } = PokerApi;
  const createRoom = (roomName: string): Promise<string> => {
    return addRoom(roomName);
  };

  return {
    createRoom,
  };
};

export default useRoom;
