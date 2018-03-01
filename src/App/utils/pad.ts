export function pad(string: string, amount: number, padChar: string) {
  let returnString = String(string);
  const requiredLength = amount - returnString.length;
  for (var i = 0; i < requiredLength; i++) {
    returnString = padChar + returnString;
  }
  return returnString;
}
