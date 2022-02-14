import {
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  Unsubscribe,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

export const snapshot = (
  onNext: (snapshot: DocumentSnapshot<DocumentData>) => void
): Unsubscribe => {
  return onSnapshot(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), onNext);
};

export const updateSelectedCard = (
  userId: string,
  selectedCard: number
): void => {
  updateDoc(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), {
    [`players.${userId}.selectedCard`]: selectedCard,
  });
};

export const updateOpen = (isOpen: boolean) => {
  updateDoc(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), {
    isOpen: isOpen,
  });
};
