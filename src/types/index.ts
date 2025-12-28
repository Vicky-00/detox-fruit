export interface NutrientData {
    calories: number;
    [key: string]: string | number;
}

export interface Fruit {
    id: string;
    name: string;
    category: string;
    image: string;
    nutrients: NutrientData;
    benefits: string[];
    canMixWith: string[];
    notRecommendedWith: string[];
}
