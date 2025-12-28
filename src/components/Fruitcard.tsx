"use client";

import { useBuilderStore } from "@/store/useBuilderStore";

type Fruit = {
  id: string;
  name: string;
  nutrients: Record<string, string | number>;
};

export default function FruitCard({ fruit }: { fruit: Fruit }) {
  const { selectedFruits, toggleFruit } = useBuilderStore();
  const isSelected = selectedFruits.includes(fruit.id);

  return (
    <div
      onClick={() => toggleFruit(fruit.id)}
      className={`border rounded-xl p-4 cursor-pointer transition ${
        isSelected ? "border-black bg-gray-100" : "hover:shadow"
      }`}
    >
      <h3 className="font-semibold text-lg mb-2">{fruit.name}</h3>

      <ul className="text-sm text-gray-600">
        {Object.entries(fruit.nutrients).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
