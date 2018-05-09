
/**
 * https://stackoverflow.com/a/38327540/917957
 * @param list 
 * @param key 
 */
export function groupBy<T>(list: T[], keyGetter: (t: T) => string) {
  const map = new Map<string, T[]>();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
