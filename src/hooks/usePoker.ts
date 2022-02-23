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
import CookieService from "../services/cookieServices";
import { Result } from "../@types/Poker";
import { PokerState } from "../reducers/poker";

const usePoker = (roomId: string) => {
  const { snapshot, updateOpen, updateSelectedCard, updateOnlineStatus } =
    PokerApi;
  const { state, dispatch } = useContext(PokerContext);
  const uuid = short();

  const getPlayers = (idList: string[]): Array<PokerState["players"]["id"]> => {
    return idList.map((key) => ({
      name: state.players[key].name,
      selectedCard: state.players[key].selectedCard,
      online: state.players[key].online,
    }));
  };

  const me = getPlayers(
    Object.keys(state.players).filter((key) => key === state.myId)
  )[0];

  const players = getPlayers(
    Object.keys(state.players).filter((key) => key !== state.myId)
  );

  const result: Result = (() => {
    const ret: Result = {};
    Object.values(state.players).forEach(({ selectedCard }) => {
      const key = selectedCard.toString();
      if (ret[key]) {
        ret[key]++;
      } else {
        ret[key] = 1;
      }
    });
    return ret;
  })();

  const hasSelectedAllUsers = (): boolean => {
    return Object.keys(state.players).every(
      (key) => state.players[key].selectedCard > 0
    );
  };

  const myName: string = state.players[state.myId]?.name ?? "";

  const login = async (): Promise<boolean> => {
    const myId = CookieService.getMyId(roomId);
    if (!myId) {
      return false;
    }
    if (await PokerApi.existsPlayer(roomId, myId)) {
      setMyId(myId);
      updateOnlineStatus(roomId, myId, true);
      return true;
    }
    return false;
  };

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

  const resetPoker = () => {
    PokerApi.resetPoker(roomId);
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
    updateOnlineStatus(roomId, state.myId, false).finally(() => {
      unsub ? unsub() : null;
    });
  };

  return {
    me,
    players: players,
    isOpen: state.isOpen,
    result,
    hasSelectedAllUsers,
    myName,
    login,
    fetchPoker,
    addPlayer,
    setMyId,
    setMyCard,
    openCard,
    unsubscribe,
    resetPoker,
  };
};

export default usePoker;
