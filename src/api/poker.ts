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
  onNext: (snapshot: DocumentSnapshot<DocumentData>) => void
): Unsubscribe => {
  return onSnapshot(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), onNext);
};

const updateSelectedCard = (userId: string, selectedCard: number): void => {
  updateDoc(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), {
    [`players.${userId}.selectedCard`]: selectedCard,
  });
};

const updateOpen = (isOpen: boolean) => {
  updateDoc(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), {
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
