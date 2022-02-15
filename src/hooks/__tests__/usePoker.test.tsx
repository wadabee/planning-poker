/* eslint-disable @typescript-eslint/no-explicit-any */
import usePoker from "../usePoker";
import {
  renderHook,
  act,
  WrapperComponent,
} from "@testing-library/react-hooks";
import { PokerContext } from "../../providers/poker";
import { PokerState } from "../../reducers/poker";
import React from "react";

describe("usePoker", () => {
  const wrapper: WrapperComponent<{ state: PokerState; dispatch: any }> = ({
    children,
    state,
    dispatch,
  }) => (
    <PokerContext.Provider value={{ state, dispatch }}>
      {children}
    </PokerContext.Provider>
  );

  const render = (state: PokerState, dispatch: any) =>
    renderHook(() => usePoker(), {
      wrapper,
      initialProps: {
        state,
        dispatch,
      },
    });

  const state: PokerState = {
    isOpen: true,
    myId: "test1",
    players: {
      test1: {
        name: "name1",
        selectedCard: 1,
      },
      test2: {
        name: "name2",
        selectedCard: 2,
      },
    },
  };

  describe("players", () => {
    test("myIdを除くplayerが取得されること", () => {
      const mock = jest.fn();
      const { result } = render(state, mock);
      act(() => {
        result.current.players;
      });
      expect(result.current.players).toEqual([
        {
          name: "name2",
          selectedCard: 2,
        },
      ]);
    });
  });

  describe("setMyId", () => {
    test("dispatchのsetMyIdが呼び出されていること", () => {
      const dispatch = jest.fn();
      const { result } = render(state, dispatch);
      act(() => {
        result.current.setMyId("test");
      });

      expect(dispatch.mock.calls).toHaveLength(1);
      expect(dispatch.mock.calls[0]).toHaveLength(1);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "setMyId",
        myId: "test",
      });
    });
  });
});
