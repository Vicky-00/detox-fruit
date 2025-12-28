"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import fruitsData from "@/data/fruits.json";
import { validateMix } from "@/lib/validateMix";
import { Fruit } from "@/types";
import SuccessModal from "./SuccessModal";

const fruits = fruitsData as unknown as Fruit[];

export default function BuilderSummary() {
  const { selectedFruits, type, reset } = useBuilderStore();
  const [showModal, setShowModal] = useState(false);

  if (selectedFruits.length === 0) return null;

  const validation = validateMix(selectedFruits);
  const selectedFruitDetails = selectedFruits.map(id => fruits.find(f => f.id === id)).filter(Boolean) as Fruit[];

  const handleBlend = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    reset(); // Clear selection after success
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden sticky bottom-4 md:static md:bottom-auto">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <span>🥤</span> Your {type === 'juice' ? 'Juice' : 'Detox Water'}
          </h3>
          <span className="text-xs font-semibold bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500">
            {selectedFruits.length} Items
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Ingredients List */}
          <ul className="space-y-3">
            {selectedFruitDetails.map((fruit) => (
              <li key={fruit.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">
                    {fruit.name[0]}
                  </div>
                  <span className="text-slate-700 font-medium">{fruit.name}</span>
                </div>
                <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {fruit.nutrients.calories} cal
                </span>
              </li>
            ))}
          </ul>

          {/* Validation Status */}
          <div className={`
            p-3 rounded-lg text-sm font-medium flex items-center gap-2
            ${validation.valid ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}
          `}>
            <span>{validation.valid ? "✅" : "⚠️"}</span>
            <span>{validation.message}</span>
          </div>

          {/* Total Calories (Approx) */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-sm">
            <span className="text-slate-500">Total Calories (Est.)</span>
            <span className="font-bold text-slate-900">
              {selectedFruitDetails.reduce((acc, f) => acc + (Number(f.nutrients.calories) || 0), 0)} kcal
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleBlend}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!validation.valid}
          >
            Blend My Drink ⚡
          </button>

        </div>
      </div>

      <SuccessModal isOpen={showModal} onClose={handleClose} />
    </>
  );
}
