import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { CreateBox } from "../@types/box.type.js";
import { shallowCompare } from "../lib/shallow-compare.js";

export const useAppStore = <S, A, R>(
  box: CreateBox<S, A>,
  selector: (state: S) => R = (s) => s as unknown as R,
): [R, A] => {
  const lastSnapshot = useRef<R | undefined>(undefined);

  const getSnapshot = useCallback(() => {
    const newSnapshot = selector(box.getState());

    if (
      lastSnapshot.current === undefined ||
      !shallowCompare(lastSnapshot, newSnapshot)
    ) {
      lastSnapshot.current = newSnapshot;
      return newSnapshot;
    }

    return lastSnapshot.current;
  }, [selector, box]);

  const state = useSyncExternalStore(box.subscribe, getSnapshot, getSnapshot);
  const dispatch = useMemo(() => box.dispatch, [box.dispatch]);

  return [state, dispatch] as const;
};
