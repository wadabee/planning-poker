import { doc, onSnapshot, Unsubscribe, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { db } from "../firebase/firestore";
import { PokerContext } from "../providers/poker";

const usePoker = () => {
  const { state, dispatch } = useContext(PokerContext);

  const players = Object.keys(state.players)
    .filter((key) => key !== state.myId)
    .map((key) => ({
      name: state.players[key].name,
      selectedCard: state.players[key].selectedCard,
    }));

  const hasSelectedAllUsers = (): boolean => {
    return Object.keys(state.players).every(
      (key) => state.players[key].selectedCard > 0
    );
  };

  const setMyId = (myId: string) => {
    dispatch({
      type: "setMyId",
      myId: myId,
    });
  };

  const setMyCard = (myCard: number) => {
    updateDoc(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), {
      [`players.${state.myId}.selectedCard`]: myCard,
    });
    dispatch({
      type: "setMyCard",
      myCard: myCard,
    });
  };

  const openCard = () => {
    updateDoc(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), {
      isOpen: true,
    });
    dispatch({
      type: "openCard",
    });
  };

  let unsub: Unsubscribe | undefined = undefined;

  const fetchPoker = () => {
    unsub = onSnapshot(doc(db, "poker", "UehLm1kYNXvjWDVq90Oc"), (doc) => {
      dispatch({
        type: "setFetchData",
        fetchedData: {
          players: doc.data()?.players,
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
    players: players,
    isOpen: state.isOpen,
    hasSelectedAllUsers,
    fetchPoker,
    setMyId,
    setMyCard,
    openCard,
    unsubscribe,
  };
};

export default usePoker;
