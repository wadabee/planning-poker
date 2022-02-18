import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  Unsubscribe,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

const COLLECTION = "poker";

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
  return onSnapshot(doc(db, "poker", id), onNext);
};

const updateSelectedCard = (
  id: string,
  userId: string,
  selectedCard: number
): void => {
  updateDoc(doc(db, "poker", id), {
    [`players.${userId}.selectedCard`]: selectedCard,
  });
};

const updateOpen = (id: string, isOpen: boolean) => {
  updateDoc(doc(db, "poker", id), {
    isOpen: isOpen,
  });
};

const PokerApi = {
  addRoom,
  snapshot,
  updateOpen,
  updateSelectedCard,
};
export default PokerApi;
