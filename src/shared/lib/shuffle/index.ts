export function shuffle<T>(array: T[]): T[] {
  const initArray = [...array];

  for (let i = initArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [initArray[i], initArray[j]] = [initArray[j], initArray[i]];
  }
  return initArray;
}
