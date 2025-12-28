import fruits from "@/data/fruits.json";
import FruitCard from "@/components/Fruitcard";

export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">
        Choose Your Fruits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fruits.map((fruit) => (
          <FruitCard key={fruit.id} fruit={fruit} />
        ))}
      </div>
    </section>
  );
}
