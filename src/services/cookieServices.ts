import Cookies from "js-cookie";

const getMyId = (roomId: string): string | undefined => {
  return Cookies.get(roomId);
};
const setMyId = (roomId: string, playerId: string): void => {
  Cookies.set(roomId, playerId, {
    expires: 7,
  });
};

const getAllRoomId = (): string[] => {
  const cookies = Cookies.get();
  return Object.keys(cookies);
};

const CookieService = {
  getMyId,
  setMyId,
  getAllRoomId,
};

export default CookieService;
