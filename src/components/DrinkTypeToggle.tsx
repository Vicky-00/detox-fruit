"use client";

import { useBuilderStore } from "@/store/useBuilderStore";

export default function DrinkTypeToggle() {
  const { type, setType, reset } = useBuilderStore();

  return (
    <div className="flex gap-4 mb-6">
      {["juice", "water"].map((item) => (
        <button
          key={item}
          onClick={() => {
            setType(item as "juice" | "water");
            reset();
          }}
          className={`px-4 py-2 rounded-lg border ${
            type === item
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
