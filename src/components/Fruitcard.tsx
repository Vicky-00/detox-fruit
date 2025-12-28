"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import { Fruit } from "@/types";

export default function FruitCard({ fruit }: { fruit: Fruit }) {
    const { selectedFruits, toggleFruit } = useBuilderStore();
    const isSelected = selectedFruits.includes(fruit.id);

    return (
        <div
            onClick={() => toggleFruit(fruit.id)}
            className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer border transition-all duration-300
        ${isSelected
                    ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200 shadow-md"
                    : "border-slate-100 bg-white hover:border-primary-300 card-hover"
                }
      `}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className={`font-bold text-xl ${isSelected ? "text-primary-800" : "text-slate-800"}`}>
                    {fruit.name}
                </h3>
                {isSelected && (
                    <span className="text-primary-600 bg-white rounded-full p-1 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                )}
            </div>

            <ul className="space-y-2">
                {Object.entries(fruit.nutrients).map(([key, value]) => (
                    <li key={key} className="flex justify-between text-sm text-slate-600">
                        <span className="capitalize font-medium text-slate-500">{key}</span>
                        <span className="font-semibold">{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
