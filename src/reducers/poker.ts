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
  presence: {
    [id: string]: string;
  };
};

export type PokerActions =
  | {
      type: "setMyId";
      myId: string;
    }
  | {
      type: "setFetchData";
      fetchedData: Omit<PokerState, "myId" | "presence">;
    }
  | {
      type: "setPresence";
      presence: PokerState["presence"];
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
    case "setPresence":
      return {
        ...state,
        presence: actions.presence,
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
