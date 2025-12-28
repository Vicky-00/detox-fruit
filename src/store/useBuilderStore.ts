import { create } from "zustand";

type BuilderState = {
  type: "juice" | "water";
  selectedFruits: string[];
  setType: (type: "juice" | "water") => void;
  toggleFruit: (id: string) => void;
  reset: () => void;
};

export const useBuilderStore = create<BuilderState>((set) => ({
  type: "juice",
  selectedFruits: [],
  setType: (type) => set({ type }),
  toggleFruit: (id) =>
    set((state) => ({
      selectedFruits: state.selectedFruits.includes(id)
        ? state.selectedFruits.filter((f) => f !== id)
        : [...state.selectedFruits, id],
    })),
  reset: () => set({ selectedFruits: [] }),
}));
