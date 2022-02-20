import { RoomList } from "../@types/Room";
import PokerApi from "../api/poker";
import RoomApi from "../api/room";
import CookieService from "../services/cookieServices";

const useRoom = () => {
  const { addRoom } = PokerApi;
  const createRoom = (roomName: string): Promise<string> => {
    return addRoom(roomName);
  };

  const getMyRooms = (): Promise<RoomList> => {
    const roomIdList = CookieService.getAllRoomId();

    return Promise.all(
      roomIdList.map((id) => {
        return RoomApi.getRoomName(id).then((name) => {
          return {
            roomId: id,
            roomName: name ?? "",
          };
        });
      })
    ).then((roomList) => {
      return roomList.filter((room) => room.roomName !== "");
    });
  };

  return {
    createRoom,
    getMyRooms,
  };
};

export default useRoom;
