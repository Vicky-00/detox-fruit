import fruitsData from "@/data/fruits.json";
import { Fruit } from "@/types";

const fruits = fruitsData as unknown as Fruit[];

export function validateMix(selected: string[]) {
  const fruitMap = Object.fromEntries(
    fruits.map((f) => [f.id, f])
  );

  for (let fruitId of selected) {
    const fruit = fruitMap[fruitId];
    if (!fruit) continue; // Safety check

    for (let other of selected) {
      if (fruitId === other) continue; // Skip self

      if (
        fruit.notRecommendedWith && // Check existence
        fruit.notRecommendedWith.includes(other)
      ) {
        return {
          valid: false,
          message: `${fruit.name} is not recommended with ${fruitMap[other]?.name || other}`,
        };
      }
    }
  }

  return { valid: true, message: "Good combination 👍" };
}
