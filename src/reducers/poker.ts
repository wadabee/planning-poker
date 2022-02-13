import _ from "lodash";

type Player = {
  id: string;
  name: string;
  selectedCard: number;
};

export type PokerState = {
  myId: string;
  players: Player[];
  isOpen: boolean;
};

export type PokerActions =
  | {
      type: "setState";
      state: PokerState;
    }
  | {
      type: "setMyCard";
      myCard: number;
    }
  | {
      type: "openCard";
    };

const getMyIndex = (state: PokerState) => {
  return state.players.findIndex((player) => player.id === state.myId);
};

export const pokerReducer: React.Reducer<PokerState, PokerActions> = (
  state: PokerState,
  actions: PokerActions
) => {
  switch (actions.type) {
    case "setState":
      return actions.state;
    case "setMyCard": {
      const state_ = _.cloneDeep(state);
      const idx = getMyIndex(state);
      if (idx > -1) {
        state_.players[idx].selectedCard = actions.myCard;
      }
      return state_;
    }
    case "openCard":
      return {
        ...state,
        isOpen: true,
      };
  }
};
