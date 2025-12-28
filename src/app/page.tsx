"use client";

import fruits from "@/data/fruits.json";
import FruitCard from "@/components/Fruitcard";
import DrinkTypeToggle from "@/components/DrinkTypeToggle";
import BuilderSummary from "@/components/BuilderSummary";
import { useBuilderStore } from "@/store/useBuilderStore";

export default function Home() {
  const { type } = useBuilderStore();

  return (
    <section>
      <DrinkTypeToggle />

      <p className="text-gray-600 mb-4">
        Select up to {type === "juice" ? "4 fruits for juice" : "2 fruits for water"}.
        We’ll show health benefits and compatibility.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fruits.map((fruit) => (
          <FruitCard key={fruit.id} fruit={fruit} />
        ))}
      </div>

      <BuilderSummary />
    </section>
  );
}
