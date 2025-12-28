type Fruit = {
  id: string;
  name: string;
  image: string;
  nutrients: Record<string, string | number>;
};

export default function FruitCard({ fruit }: { fruit: Fruit }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow transition">
      <h3 className="font-semibold text-lg mb-2">{fruit.name}</h3>
      <ul className="text-sm text-gray-600">
        {Object.entries(fruit.nutrients).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
