import {
  ref,
  onValue,
  push,
  onDisconnect,
  set,
  DataSnapshot,
} from "firebase/database";
import { rtdb } from "../firebase/firestore";

export const setPresence = (roomId: string, playerId: string) => {
  const myConnectionsRef = ref(rtdb, `online/${roomId}/${playerId}`);

  const connectedRef = ref(rtdb, ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      // 接続時にデータを登録
      const con = push(myConnectionsRef);

      // 接続が切れたらデータを削除
      onDisconnect(con).remove();

      // trueを設定
      set(con, true);
    }
  });
};

export const snapshot = (
  roomId: string,
  onNext: (snap: DataSnapshot) => void
) => {
  const onlineRef = ref(rtdb, `online/${roomId}`);
  onValue(onlineRef, onNext);
};
