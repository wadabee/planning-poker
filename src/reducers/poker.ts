import _ from "lodash";

export type PokerState = {
  myId: string;
  players: {
    [id: string]: {
      selectedCard: number;
      name: string;
      online: boolean;
    };
  };
  isOpen: boolean;
};

export type PokerActions =
  | {
      type: "setMyId";
      myId: string;
    }
  | {
      type: "setFetchData";
      fetchedData: Omit<PokerState, "myId">;
    }
  | {
      type: "setMyCard";
      myCard: number;
    }
  | {
      type: "openCard";
    };

export const pokerReducer: React.Reducer<PokerState, PokerActions> = (
  state: PokerState,
  actions: PokerActions
) => {
  switch (actions.type) {
    case "setMyId":
      return {
        ...state,
        myId: actions.myId,
      };
    case "setFetchData":
      return {
        ...state,
        ...actions.fetchedData,
      };
    case "setMyCard": {
      const state_ = _.cloneDeep(state);

      state_.players[state.myId].selectedCard = actions.myCard;
      return state_;
    }
    case "openCard":
      return {
        ...state,
        isOpen: true,
      };
  }
};
