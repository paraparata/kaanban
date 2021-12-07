export const wordsNormalizer = (words: string) => {
  const EXCEPTION_THREE = ["are", "is", "in", "and", "end"];
  const result = words.split(/[-_]/g);

  return result
    .map((result) => {
      if (result.length < 4 && !EXCEPTION_THREE.includes(result)) {
        return result.toUpperCase();
      }
      return result[0].toUpperCase() + result.substring(1);
    })
    .join(" ");
}
