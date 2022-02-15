import {
  DocumentData,
  DocumentSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { useContext } from "react";
import { snapshot, updateOpen, updateSelectedCard } from "../api/poker";
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
    updateSelectedCard(state.myId, myCard);
    dispatch({
      type: "setMyCard",
      myCard: myCard,
    });
  };

  const openCard = () => {
    updateOpen(true);
    dispatch({
      type: "openCard",
    });
  };

  let unsub: Unsubscribe | undefined = undefined;

  const fetchPoker = () => {
    unsub = snapshot((doc: DocumentSnapshot<DocumentData>) => {
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
