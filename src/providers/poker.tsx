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
};

// const initialState: PokerState = {
//   myId: "id003",
//   players: [
//     {
//       id: "id001",
//       name: "John",
//       selectedCard: 3,
//     },
//     {
//       id: "id002",
//       name: "Tom",
//       selectedCard: 1,
//     },
//     {
//       id: "id003",
//       name: "Ken",
//       selectedCard: -1,
//     },
//   ],
//   isOpen: false,
// };

export const PokerContext = createContext({} as PokerContextType);

// eslint-disable-next-line @typescript-eslint/ban-types
export const PokerProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(pokerReducer, initialState);

  return <PokerContext.Provider value={{ state, dispatch }} {...props} />;
};
