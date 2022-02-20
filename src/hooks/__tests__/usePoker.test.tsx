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
import PokerApi from "../../api/poker";

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
    renderHook(() => usePoker("testRoom"), {
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

  describe("hasSelectedAllUsers", () => {
    test("-1のplayerが存在しない場合はtrue", () => {
      const tmpState: PokerState = {
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
      const mock = jest.fn();
      const { result } = render(tmpState, mock);
      let actual;
      act(() => {
        actual = result.current.hasSelectedAllUsers();
      });
      expect(actual).toBe(true);
    });

    test("-1のplayerが存在する場合はfalse", () => {
      const tmpState: PokerState = {
        isOpen: true,
        myId: "test1",
        players: {
          test1: {
            name: "name1",
            selectedCard: 1,
          },
          test2: {
            name: "name2",
            selectedCard: -1,
          },
        },
      };
      const mock = jest.fn();
      const { result } = render(tmpState, mock);
      let actual;
      act(() => {
        actual = result.current.hasSelectedAllUsers();
      });
      expect(actual).toBe(false);
    });
  });

  describe("myName", () => {
    test("myIdに紐づく名前が取得されること", () => {
      const dispatch = jest.fn();
      const { result } = render(state, dispatch);
      let actual;
      act(() => {
        actual = result.current.myName;
      });
      expect(actual).toBe("name1");
    });

    test("myIdが設定されていない場合は空白", () => {
      const testState: PokerState = {
        myId: "",
        isOpen: false,
        players: {
          test1: {
            name: "name1",
            selectedCard: -1,
          },
        },
      };
      const dispatch = jest.fn();
      const { result } = render(testState, dispatch);
      let actual;
      act(() => {
        actual = result.current.myName;
      });
      expect(actual).toBe("");
    });
  });

  describe("fetchPoker+unsubscribe", () => {
    test("dispatchとAPIが呼び出されていること+unsubscribeが実行できること", () => {
      const api = jest.spyOn(PokerApi, "snapshot");
      const mockUnsub = jest.fn();
      api.mockImplementation((testRoom: string, cbFunc: any) => {
        const doc = {
          data: jest.fn(() => ({
            players: ["test1"],
            isOpen: false,
          })),
        };
        cbFunc(doc);
        return mockUnsub;
      });

      const dispatch = jest.fn();
      const { result } = render(state, dispatch);
      act(() => {
        result.current.fetchPoker();
        result.current.unsubscribe();
      });

      expect(dispatch.mock.calls).toHaveLength(1);
      expect(dispatch.mock.calls[0]).toHaveLength(1);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "setFetchData",
        fetchedData: {
          players: ["test1"],
          isOpen: false,
        },
      });

      expect(mockUnsub.mock.calls).toHaveLength(1);
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

  describe("setMyCard", () => {
    test("dispatchのsetMyCardとAPIが呼び出されていること", () => {
      const api = jest.spyOn(PokerApi, "updateSelectedCard");
      api.mockImplementation();

      const dispatch = jest.fn();
      const { result } = render(state, dispatch);
      act(() => {
        result.current.setMyCard(9);
      });

      expect(dispatch.mock.calls).toHaveLength(1);
      expect(dispatch.mock.calls[0]).toHaveLength(1);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "setMyCard",
        myCard: 9,
      });

      expect(api.mock.calls).toHaveLength(1);
      expect(api.mock.calls[0]).toHaveLength(3);
      expect(api.mock.calls[0][0]).toBe("testRoom");
      expect(api.mock.calls[0][1]).toBe(state.myId);
      expect(api.mock.calls[0][2]).toBe(9);
    });
  });

  describe("openCard", () => {
    test("dispatchのopenCardとAPIが呼び出されていること", () => {
      const api = jest.spyOn(PokerApi, "updateOpen");
      api.mockImplementation();

      const dispatch = jest.fn();
      const { result } = render(state, dispatch);
      act(() => {
        result.current.openCard();
      });

      expect(dispatch.mock.calls).toHaveLength(1);
      expect(dispatch.mock.calls[0]).toHaveLength(1);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "openCard",
      });

      expect(api.mock.calls).toHaveLength(1);
      expect(api.mock.calls[0]).toHaveLength(2);
      expect(api.mock.calls[0][0]).toBe("testRoom");
      expect(api.mock.calls[0][1]).toBe(true);
    });
  });
});
