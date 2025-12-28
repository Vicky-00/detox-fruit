import fruits from "@/data/fruits.json";
import FruitCard from "@/components/Fruitcard";
import DrinkTypeToggle from "@/components/DrinkTypeToggle";
import BuilderSummary from "@/components/BuilderSummary";

export default function Home() {
  return (
    <section>
      <DrinkTypeToggle />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fruits.map((fruit) => (
          <FruitCard key={fruit.id} fruit={fruit} />
        ))}
      </div>

      <BuilderSummary />
    </section>
  );
}
