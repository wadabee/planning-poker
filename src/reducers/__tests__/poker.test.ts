import { pokerReducer } from "../poker";

describe("pokerReducer", () => {
  describe("setMyId", () => {
    test("myIdが設定されること", () => {
      const actual = pokerReducer(
        {
          myId: "",
          isOpen: false,
          players: {},
        },
        {
          type: "setMyId",
          myId: "test001",
        }
      );
      expect(actual).toEqual({
        myId: "test001",
        isOpen: false,
        players: {},
      });
    });
  });
  describe("setFetchData", () => {
    test("fetchしたデータが設定されること", () => {
      const actual = pokerReducer(
        {
          myId: "",
          isOpen: false,
          players: {},
        },
        {
          type: "setFetchData",
          fetchedData: {
            isOpen: true,
            players: {
              test01: {
                name: "test",
                selectedCard: 1,
              },
            },
          },
        }
      );
      expect(actual).toEqual({
        myId: "",
        isOpen: true,
        players: {
          test01: {
            name: "test",
            selectedCard: 1,
          },
        },
      });
    });
  });

  describe("setMyCard", () => {
    test("指定したユーザのselectedCardが更新されること", () => {
      const actual = pokerReducer(
        {
          myId: "test001",
          isOpen: false,
          players: {
            test001: {
              name: "test1",
              selectedCard: -1,
            },
            test002: {
              name: "test2",
              selectedCard: -2,
            },
          },
        },
        {
          type: "setMyCard",
          myCard: 5,
        }
      );
      expect(actual).toEqual({
        myId: "test001",
        isOpen: false,
        players: {
          test001: {
            name: "test1",
            selectedCard: 5,
          },
          test002: {
            name: "test2",
            selectedCard: -2,
          },
        },
      });
    });
  });
  describe("openCard", () => {
    test("isOpenが設定されること", () => {
      const actual = pokerReducer(
        {
          myId: "",
          isOpen: false,
          players: {},
        },
        {
          type: "openCard",
        }
      );
      expect(actual).toEqual({
        myId: "",
        isOpen: true,
        players: {},
      });
    });
  });
});
