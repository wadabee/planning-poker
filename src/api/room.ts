import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

const getRoomName = (roomId: string): Promise<string | undefined> => {
  return getDoc(doc(db, "poker", roomId)).then((docRef) => {
    if (docRef.exists()) {
      return Promise.resolve(docRef.data().roomName);
    }
    return Promise.resolve(undefined);
  });
};

const RoomApi = {
  getRoomName,
};

export default RoomApi;
