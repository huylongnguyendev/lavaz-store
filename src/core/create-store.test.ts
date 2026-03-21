import { describe, expect, test } from "vitest";
import { createStore } from "./create-store.js";
import { createBox } from "./create-box.js";

describe("Lavaz Store System", () => {
  test("create-store", () => {
    const initialState = 0;

    const counterBox = createBox(initialState, (set) => ({
      increasment: () => set((prev) => prev + 1),
      decreasment: () => set((prev) => prev - 1),
    })).create();

    const store = createStore({ counter: counterBox });

    expect(store.counter.getState()).toBe(0);
    store.counter.dispatch.increasment();
    expect(store.counter.getState()).toBe(1);
  });

  test("allow chaining with .persist() before create", () => {
    const userBox = createBox({ name: "Guest" }, (set) => ({
      setName: (name: string) => set({ name }),
    }))
      .persist("user-session") // test the persist feature
      .create();

    const store = createStore({ user: userBox });

    expect(store.user.boxId).toBe("user-session");
    expect(store.user.getState().name).toBe("Guest");
  });

  test("throw error if Store is empty (empty object)", () => {
    expect(() => createStore({})).toThrow(
      "[Lavaz]: `store` cannot be an empty object.",
    );
  });

  test("throw error if at least two boxes have the same box-id", () => {
    // two boxes have the same box-id"
    const boxA = createBox(0, () => ({}))
      .persist("conflict-id")
      .create();
    const boxB = createBox(1, () => ({}))
      .persist("conflict-id")
      .create();

    expect(() => {
      createStore({ a: boxA, b: boxB });
    }).toThrow(/Conflict/);
  });
});
