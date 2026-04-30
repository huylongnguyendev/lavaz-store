export function checkEnv() {
  const isProduction =
    (typeof process !== "undefined" &&
      process.env?.NODE_ENV === "production") ||
    (typeof import.meta !== "undefined" &&
      (import.meta as any).env?.NODE_ENV === "production") ||
    (import.meta as any).env?.MODE === "production";

  const isTest =
    (typeof process !== "undefined" &&
      (process.env?.NODE_ENV === "test" || !!process.env?.VITEST)) ||
    (typeof import.meta !== "undefined" &&
      ((import.meta as any).env?.NODE_ENV === "test" ||
        (import.meta as any).env?.MODE === "test"));

  return { isProduction, isTest };
}
