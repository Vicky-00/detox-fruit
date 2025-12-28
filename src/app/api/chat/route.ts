import { NextResponse } from "next/server";
import fruitsData from "@/data/fruits.json";
import { validateMix } from "@/lib/validateMix";
import { Fruit } from "@/types";

const fruits = fruitsData as unknown as Fruit[];

export async function POST(req: Request) {
  const { message } = await req.json();
  const text = message.toLowerCase();

  // Clean punctuation for better matching
  const cleaned = text.replace(/[?.!,]/g, "");

  // --- 1. Greeting Handling ---
  if (["hi", "hello", "hey", "greetings"].some(w => cleaned === w || cleaned.startsWith(w + " "))) {
    return NextResponse.json({
      reply: "Hello! 👋 I'm your Detox Assistant.\n\nI can help you with:\n• Fruit benefits (e.g. 'Apple benefits')\n• Health goals (e.g. 'Good for skin')\n• Mix compatibility (e.g. 'Can I mix apple and banana?')"
    });
  }

  // --- 2. Health Goal Matching ---
  const goals: Record<string, string[]> = {
    skin: ["skin", "glow", "acne", "complexion"],
    gut: ["gut", "digestion", "bloating", "stomach"],
    immunity: ["immunity", "immune", "sick", "cold"],
    energy: ["energy", "tired", "boost", "fatigue"],
    hydration: ["hydration", "thirsty", "water"],
  };

  for (const [goal, keywords] of Object.entries(goals)) {
    if (keywords.some(k => cleaned.includes(k))) {
      // Find fruits that mention this goal in their benefits
      const matchedFruits = fruits.filter(f =>
        f.benefits.some(b => b.toLowerCase().includes(goal) || keywords.some(k => b.toLowerCase().includes(k)))
      );

      if (matchedFruits.length > 0) {
        const names = matchedFruits.map(f => f.name).slice(0, 4).join(", ");
        return NextResponse.json({
          reply: `For **${goal}**, I recommend trying: ${names}. 🌿\n\nThey are packed with nutrients to support your ${goal}.`
        });
      }
    }
  }

  // --- 3. Specific Fruit Benefits ---
  const mentionedFruit = fruits.find(f => cleaned.includes(f.id) || cleaned.includes(f.name.toLowerCase()));
  if (mentionedFruit && (cleaned.includes("benefit") || cleaned.includes("good for") || cleaned.includes("what is"))) {
    return NextResponse.json({
      reply: `**${mentionedFruit.name}** is amazing! 🍎\n\nBenefits:\n• ${mentionedFruit.benefits.join("\n• ")}\n\n(Calories: ${mentionedFruit.nutrients.calories})`
    });
  }

  // --- 4. Mix Compatibility ---
  if (cleaned.includes("mix") || cleaned.includes("combine") || cleaned.includes("together")) {
    const selectedFruits = fruits.filter(f => cleaned.includes(f.id) || cleaned.includes(f.name.toLowerCase()));

    if (selectedFruits.length >= 2) {
      const ids = selectedFruits.map(f => f.id);
      const validation = validateMix(ids);

      if (validation.valid) {
        return NextResponse.json({ reply: `Yes! ${selectedFruits.map(f => f.name).join(" + ")} is a great mix. ✅` });
      } else {
        return NextResponse.json({ reply: `⚠️ Caution: ${validation.message}` });
      }
    }
  }

  // --- 5. Fallback (Polite & Helpful) ---
  // Future AI Hook: // if (!response) response = await callLLM(text);

  return NextResponse.json({
    reply: "I'm not sure about that one yet. 🤔\n\nTry asking me:\n• \"What is good for skin?\"\n• \"Benefits of Kiwi\"\n• \"Can I mix Lemon and Milk?\""
  });
}
