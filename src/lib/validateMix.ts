import fruits from "@/data/fruits.json";

export function validateMix(selected: string[]) {
  const fruitMap = Object.fromEntries(
    fruits.map((f) => [f.id, f])
  );

  for (let fruitId of selected) {
    const fruit = fruitMap[fruitId];
    for (let other of selected) {
      if (
        fruit.notRecommendedWith?.includes(other)
      ) {
        return {
          valid: false,
          message: `${fruit.name} is not recommended with ${fruitMap[other].name}`,
        };
      }
    }
  }

  return { valid: true, message: "Good combination 👍" };
}
