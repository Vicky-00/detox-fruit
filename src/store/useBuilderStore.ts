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
  set((state) => {
    const limit = state.type === "juice" ? 4 : 2;

    if (state.selectedFruits.includes(id)) {
      return {
        selectedFruits: state.selectedFruits.filter((f) => f !== id),
      };
    }

    if (state.selectedFruits.length >= limit) {
      return state;
    }

    return { selectedFruits: [...state.selectedFruits, id] };
  }),

  reset: () => set({ selectedFruits: [] }),
}));
