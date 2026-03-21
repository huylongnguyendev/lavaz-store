const isObject = (val: any) =>
  val !== null && typeof val === "object" && !Array.isArray(val);

export const validateState = (
  val: any,
  path: string,
  isRoot: boolean,
  seen = new WeakSet(),
) => {
  if (val === undefined)
    throw new Error(`[Lavaz]: ${path} cannot be undefined.`);

  if (typeof val === "function")
    throw new Error(`[Lavaz]: ${path} cannot be a function.`);

  if (isObject(val)) {
    if (seen.has(val)) return;
    seen.add(val);

    const keys = Object.keys(val);

    if (isRoot && keys.length === 0)
      throw new Error("[Lavaz]: `initialState` cannot be an empty object.");

    for (const key of keys) {
      validateState(val, `${path}.${key}`, false, seen);
    }
  }

  if (Array.isArray(val)) {
    val.forEach((item, index) => {
      validateState(item, `${path}[${index}]`, false, seen);
    });
  }
};
