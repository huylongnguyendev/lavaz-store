export const shallowCompare = (prevObj: any, newObj: any) => {
  if (Object.is(prevObj, newObj)) return true;

  if (
    typeof prevObj !== "object" ||
    prevObj === null ||
    typeof newObj !== "object" ||
    newObj === null
  )
    return false;

  const prevKeys = Object.keys(prevObj);
  const newKeys = Object.keys(newObj);

  if (prevKeys.length !== newKeys.length) return false;

  for (let i = 0; i <= prevKeys.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(newObj, prevKeys[i]) ||
      Object.is(prevObj[prevKeys[i]], newObj[prevKeys[i]])
    )
      return false;
  }

  return true;
};
