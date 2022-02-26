import React, { createContext, useReducer } from "react";
import { PokerActions, pokerReducer, PokerState } from "../reducers/poker";

export type PokerContextType = {
  state: PokerState;
  dispatch: React.Dispatch<PokerActions>;
};
const initialState: PokerState = {
  myId: "",
  isOpen: false,
  players: {},
  presence: {},
};

export const PokerContext = createContext({} as PokerContextType);

// eslint-disable-next-line @typescript-eslint/ban-types
export const PokerProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(pokerReducer, initialState);

  return <PokerContext.Provider value={{ state, dispatch }} {...props} />;
};
