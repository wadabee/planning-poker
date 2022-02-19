import {
  DocumentData,
  DocumentSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import short from "short-uuid";
import { useContext } from "react";
import PokerApi from "../api/poker";
("../api/poker");
import { PokerContext } from "../providers/poker";

const usePoker = (roomId: string) => {
  const { snapshot, updateOpen, updateSelectedCard } = PokerApi;
  const { state, dispatch } = useContext(PokerContext);
  const uuid = short();

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

  const myName: string = state.players[state.myId]?.name ?? "";

  const addPlayer = (name: string): string => {
    const playerId = uuid.generate();
    PokerApi.addPlayer(roomId, playerId, name);
    return playerId;
  };

  const setMyId = (myId: string) => {
    dispatch({
      type: "setMyId",
      myId: myId,
    });
  };

  const setMyCard = (myCard: number) => {
    updateSelectedCard(roomId, state.myId, myCard);
    dispatch({
      type: "setMyCard",
      myCard: myCard,
    });
  };

  const openCard = () => {
    updateOpen(roomId, true);
    dispatch({
      type: "openCard",
    });
  };

  let unsub: Unsubscribe | undefined = undefined;

  const fetchPoker = () => {
    unsub = snapshot(roomId, (doc: DocumentSnapshot<DocumentData>) => {
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
    myName,
    fetchPoker,
    addPlayer,
    setMyId,
    setMyCard,
    openCard,
    unsubscribe,
  };
};

export default usePoker;
