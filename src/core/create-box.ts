import { BoxBuilder, Next, PrevFn } from "../types/box.type.js";
import { Persistance } from "../types/persist.type.js";
import { validateState } from "../lib/box-validator.js";
import { checkEnv } from "./checkEnv.js";

export const createBox = <S, A>(
  initialState: S,
  actions: (set: (next: Next<S>) => void) => A,
): BoxBuilder<S, A> => {
  const { isProduction, isTest } = checkEnv();
  let persistConfig: Persistance | null = null;

  const builder = {
    persist: (name: string, storage: "local" | "session" = "local") => {
      persistConfig = { name, storage };
      return builder;
    },

    create: () => {
      if (!isProduction || isTest)
        validateState(initialState, "initialState", true);

      let state = initialState;
      let listeners = new Set<(state: S) => void>();

      const storageKey = persistConfig ? `lavaz-${persistConfig.name}` : null;

      const getStorage = () => {
        if (typeof window === "undefined") return null;
        return persistConfig?.storage === "session"
          ? window.sessionStorage
          : window.localStorage;
      };

      if (typeof window !== "undefined" && storageKey) {
        try {
          const storage = getStorage(); // Chỉ gọi khi chắc chắn có window
          const savedSate = storage?.getItem(storageKey);
          if (savedSate) state = JSON.parse(savedSate);
        } catch (error) {
          if (!isProduction)
            console.warn(`[Lavaz]: Hydration failed for ${storageKey}`);
        }
      }

      const set = (next: Next<S>) => {
        const newState =
          typeof next === "function" ? (next as PrevFn<S>)(state) : next;

        if (newState === undefined)
          throw new Error("[Lavaz]: Cannot update `state` to `undefined`.");

        if (!Object.is(state, newState)) {
          state = newState;
          if (storageKey && typeof window !== "undefined") {
            getStorage()?.setItem(storageKey, JSON.stringify(state));
          }

          listeners.forEach((listener) => listener(state));
        }
      };

      const dispatch = actions(set);
      const subscribe = (cb: (state: S) => void) => {
        listeners.add(cb);
        return () => listeners.delete(cb);
      };

      return {
        getState: () => state,
        dispatch,
        subscribe,
        boxId:
          persistConfig?.name ||
          `box-${Math.random().toString(36).substring(2, 9)}`,
      };
    },
  };

  return builder;
};
