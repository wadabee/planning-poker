import { useContext } from "react";
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
    dispatch({
      type: "openCard",
    });
  };

  return {
    state,
    isOpen: state.isOpen,
    hasSelectedAllUsers,
    setMyCard,
    openCard,
  };
};

export default usePoker;
