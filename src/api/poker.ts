import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
  Unsubscribe,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

const COLLECTION = "poker";

const docRef = (id: string) => doc(db, COLLECTION, id);

const addRoom = (roomName: string): Promise<string> => {
  return addDoc(collection(db, COLLECTION), {
    roomName: roomName,
    players: {},
    isOpen: false,
  }).then((ref) => {
    return Promise.resolve(ref.id);
  });
};

const snapshot = (
  id: string,
  onNext: (snapshot: DocumentSnapshot<DocumentData>) => void
): Unsubscribe => {
  return onSnapshot(docRef(id), onNext);
};

const existsPlayer = async (
  roomId: string,
  playerId: string
): Promise<boolean> => {
  const doc = await getDoc(docRef(roomId));
  if (doc.exists()) {
    const player = doc.data().players[playerId];
    if (player) {
      return true;
    }
  }
  return false;
};

const addPlayer = (id: string, playerId: string, name: string): void => {
  updateDoc(docRef(id), {
    [`players.${playerId}`]: {
      name: name,
      selectedCard: -1,
    },
  });
};

const updateSelectedCard = (
  id: string,
  playerId: string,
  selectedCard: number
): void => {
  updateDoc(docRef(id), {
    [`players.${playerId}.selectedCard`]: selectedCard,
  });
};

const updateOpen = (id: string, isOpen: boolean) => {
  updateDoc(docRef(id), {
    isOpen: isOpen,
  });
};

const PokerApi = {
  addRoom,
  snapshot,
  addPlayer,
  existsPlayer,
  updateOpen,
  updateSelectedCard,
};
export default PokerApi;
