"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import fruits from "@/data/fruits.json";
import { validateMix } from "@/lib/validateMix";

export default function BuilderSummary() {
  const { selectedFruits, type } = useBuilderStore();

  if (selectedFruits.length === 0) return null;

  const validation = validateMix(selectedFruits);

  return (
    <div className="mt-8 p-4 border rounded-xl">
      <h3 className="font-semibold mb-2">
        {type.toUpperCase()} Summary
      </h3>

      <p className={validation.valid ? "text-green-600" : "text-red-600"}>
        {validation.message}
      </p>

      <ul className="mt-2 text-sm text-gray-700">
        {selectedFruits.map((id) => {
          const fruit = fruits.find((f) => f.id === id);
          return <li key={id}>• {fruit?.name}</li>;
        })}
      </ul>
    </div>
  );
}
