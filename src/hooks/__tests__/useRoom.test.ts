import { act, renderHook } from "@testing-library/react-hooks";
import PokerApi from "../../api/poker";
import useRoom from "../useRoom";

describe("useRoom", () => {
  const render = () => renderHook(() => useRoom());

  describe("createRoom", () => {
    test("addRoomが呼び出されていること", () => {
      const api = jest.spyOn(PokerApi, "addRoom");
      api.mockImplementation(() => "id001");

      const { result } = render();
      let actual;
      act(() => {
        actual = result.current.createRoom("room1");
      });

      expect(actual).toBe("id001");

      expect(api.mock.calls).toHaveLength(1);
      expect(api.mock.calls[0]).toHaveLength(1);
      expect(api.mock.calls[0][0]).toBe("room1");
    });
  });
});
