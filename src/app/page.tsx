"use client";

import { useState } from "react";
import fruitsData from "@/data/fruits.json";
import FruitCard from "@/components/Fruitcard";
import DrinkTypeToggle from "@/components/DrinkTypeToggle";
import BuilderSummary from "@/components/BuilderSummary";
import { useBuilderStore } from "@/store/useBuilderStore";
import { Fruit } from "@/types";

const fruits = fruitsData as unknown as Fruit[];

// --- Constants ---
const DISPLAY_FRUITS = [
  { name: "Apple", emoji: "🍎", color: "bg-red-50 text-red-700 border-red-100" },
  { name: "Orange", emoji: "🍊", color: "bg-orange-50 text-orange-700 border-orange-100" },
  { name: "Guava", emoji: "🍈", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { name: "Poms", emoji: "🔴", color: "bg-rose-50 text-rose-700 border-rose-100" },
  { name: "Lemon", emoji: "🍋", color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
  { name: "Melon", emoji: "🍉", color: "bg-pink-50 text-pink-700 border-pink-100" },
  { name: "Pineapple", emoji: "🍍", color: "bg-amber-50 text-amber-700 border-amber-100" },
  { name: "Papaya", emoji: "🟠", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { name: "Kiwi", emoji: "🥝", color: "bg-lime-50 text-lime-700 border-lime-100" },
  { name: "Banana", emoji: "🍌", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { name: "Grapes", emoji: "🍇", color: "bg-purple-50 text-purple-700 border-purple-100" },
  { name: "Berry", emoji: "🍓", color: "bg-red-100 text-red-800 border-red-200" },
];

const HEALTH_GOALS = [
  { id: 'skin', name: 'Skin Glow', icon: '✨', desc: 'Vitamin C & Hydration' },
  { id: 'gut', name: 'Gut Health', icon: '🌿', desc: 'Fiber & Probiotics' },
  { id: 'immunity', name: 'Immunity', icon: '🛡️', desc: 'Antioxidants & Zinc' },
  { id: 'energy', name: 'Energy', icon: '⚡', desc: 'Natural Sugars & B-Vits' },
];

export default function Home() {
  const { type } = useBuilderStore();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const scrollToBuilder = () => {
    const element = document.getElementById('builder-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                Fresh & Organic 100%
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Scientific Nutrition. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  Personalized for You.
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Build your perfect detox drink. Mix fresh fruits to recharge your body, boost immunity, and glow from the inside out.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={scrollToBuilder}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg shadow-emerald-200 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Build Your Drink
                </button>
                <button className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-600 rounded-full font-bold text-lg transition-all">
                  Explore Nutrition
                </button>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-sm font-medium text-slate-500">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                      <span className="bg-slate-300 w-full h-full block"></span>
                    </div>
                  ))}
                </div>
                <p>Loved by 10,000+ healthy livers</p>
              </div>
            </div>

            {/* Right Visuals - Abundance Cloud */}
            <div className="relative">
              {/* Background decorative blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-100/40 to-blue-50/40 rounded-full blur-3xl -z-10"></div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 p-4">
                {DISPLAY_FRUITS.map((fruit, idx) => (
                  <div
                    key={fruit.name}
                    className={`
                      flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border backdrop-blur-sm shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 duration-300
                      ${fruit.color}
                      ${idx % 2 === 0 ? 'mt-4' : 'mb-4'} /* Staggered grid effect */
                    `}
                  >
                    <span className="text-3xl sm:text-4xl mb-1 filter drop-shadow-sm">{fruit.emoji}</span>
                    <span className="text-xs sm:text-sm font-bold opacity-90">{fruit.name}</span>
                  </div>
                ))}
              </div>

              {/* Floating Benefit Chips */}
              <div className="absolute -bottom-6 -left-4 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-sm font-bold text-slate-700 animate-bounce delay-700 duration-[3000ms]">
                ⚡ Energy Boost
              </div>
              <div className="absolute -top-6 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-sm font-bold text-slate-700 animate-bounce delay-1000 duration-[4000ms]">
                🛡️ Immunity
              </div>
              <div className="absolute top-1/2 -right-8 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-sm font-bold text-slate-700 hidden lg:block">
                ✨ Glowing Skin
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BUILDER SECTION --- */}
      <section id="builder-section" className="max-w-6xl mx-auto px-4 py-16 space-y-16">

        {/* Intro & Controls */}
        <div className="text-center space-y-6">
          <div>
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Interactive Builder</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Customize Your Blend</h2>
          </div>

          <div className="flex justify-center">
            <DrinkTypeToggle />
          </div>

          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            {type === "juice"
              ? "Select up to 4 fruits. We recommend 3 for balanced flavor."
              : "Select up to 2 fruits for a subtle, refreshing infusion."}
          </p>
        </div>

        {/* Health Goals Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {HEALTH_GOALS.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300
                ${selectedGoal === goal.id
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md scale-105 ring-2 ring-emerald-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:shadow-sm'
                }
              `}
            >
              <span className="text-2xl mb-2">{goal.icon}</span>
              <span className="font-bold text-sm">{goal.name}</span>
              <span className="text-xs opacity-75 mt-1">{goal.desc}</span>
            </button>
          ))}
        </div>

        {/* Fruit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fruits.map((fruit) => (
            <FruitCard key={fruit.id} fruit={fruit} />
          ))}
        </div>

        {/* Summary */}
        <div className="max-w-xl mx-auto">
          <BuilderSummary />
        </div>
      </section>
    </div>
  );
}
