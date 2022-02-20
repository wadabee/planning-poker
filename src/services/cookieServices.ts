import Cookies from "js-cookie";

const getMyId = (roomId: string): string | undefined => {
  return Cookies.get(roomId);
};
const setMyId = (roomId: string, playerId: string): void => {
  Cookies.set(roomId, playerId, {
    expires: 7,
  });
};

const CookieService = {
  getMyId,
  setMyId,
};

export default CookieService;
