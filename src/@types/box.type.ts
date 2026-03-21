export type PrevFn<S> = (prev: S) => S;
export type Next<S> = S | PrevFn<S>;
export type Subscribe<S> = (cb: (state: S) => void) => () => void;

export interface CreateBox<S = unknown, A = unknown> {
  getState: () => S;
  dispatch: A;
  subscribe: Subscribe<S>;
  boxId: string;
}

export interface BoxBuilder<S, A> {
  persist: (name: string, storage?: "local" | "session") => BoxBuilder<S, A>;
  create: () => CreateBox<S, A>;
}
