import { CreateBox } from "../@types/box.type.js";

export const createStore = <T extends Record<string, CreateBox>>(
  boxes: T,
): T => {
  const isProduction =
    (typeof process !== "undefined" && process.env.NODE_ENV === "production") ||
    (typeof import.meta !== "undefined" &&
      (import.meta as any).env.NODE_ENV === "production");

  const isTest =
    typeof process !== "undefined" &&
    (process.env.NODE_ENV === "test" || !!process.env.VITEST);

  if (!isProduction || isTest) {
    const keys = Object.keys(boxes);
    if (keys.length === 0)
      throw new Error("[Lavaz]: `store` cannot be an empty object.");

    const boxRegister = new Map<string, string>();

    for (const [key, box] of Object.entries(boxes)) {
      const isExistingBox = boxRegister.get(box.boxId);

      if (isExistingBox)
        throw new Error(
          `[Lavaz]: Conflict. The box you are trying to assign to "${key}" is already used by "${isExistingBox}`,
        );

      boxRegister.set(box.boxId, key);
    }
  }

  return boxes;
};
