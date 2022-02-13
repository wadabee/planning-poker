import { doc, onSnapshot, Unsubscribe, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { db } from "../firebase/firestore";
import { PokerContext } from "../providers/poker";

const usePoker = () => {
  const { state, dispatch } = useContext(PokerContext);

  const hasSelectedAllUsers = (): boolean => {
    return state.players.every((player) => player.selectedCard > 0);
  };

  const setMyCard = (myCard: number) => {
    dispatch({
      type: "setMyCard",
      myCard: myCard,
    });
  };

  const openCard = () => {
    updateDoc(doc(db, "poker", "m9AgAGLLhz9t7bd5lWnQ"), {
      isOpen: true,
    });
    dispatch({
      type: "openCard",
    });
  };

  let unsub: Unsubscribe | undefined = undefined;

  const fetchPoker = () => {
    unsub = onSnapshot(doc(db, "poker", "m9AgAGLLhz9t7bd5lWnQ"), (doc) => {
      dispatch({
        type: "setState",
        state: {
          players: doc.data()?.players,
          myId: doc.data()?.myId,
          isOpen: doc.data()?.isOpen,
        },
      });
    });
  };

  const unsubscribe = () => {
    if (unsub) {
      unsub();
    }
  };

  return {
    players: state.players.filter((player) => player.id != state.myId),
    isOpen: state.isOpen,
    hasSelectedAllUsers,
    fetchPoker,
    setMyCard,
    openCard,
    unsubscribe,
  };
};

export default usePoker;
