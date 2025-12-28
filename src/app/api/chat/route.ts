import { NextResponse } from "next/server";
import fruits from "@/data/fruits.json";
import { validateMix } from "@/lib/validateMix";

export async function POST(req: Request) {
  const { message } = await req.json();
  const text = message.toLowerCase();

  // Fruit benefit query
  const fruit = fruits.find((f) =>
    text.includes(f.name.toLowerCase())
  );

  if (fruit && text.includes("benefit")) {
    return NextResponse.json({
      reply: `${fruit.name} benefits: ${fruit.benefits.join(", ")}`
    });
  }

  // Mix validation query
  if (text.includes("mix")) {
    const selected = fruits
      .filter((f) => text.includes(f.id))
      .map((f) => f.id);

    if (selected.length >= 2) {
      const result = validateMix(selected);
      return NextResponse.json({ reply: result.message });
    }
  }

  // Default fallback
  return NextResponse.json({
    reply:
      "I can help you with fruit benefits, mix compatibility, and detox water suggestions 🍹"
  });
}
