import { HERO_COMPLEXITY, HERO_ATTRIBUTES } from "@/constant";

export type HeroComplexity = typeof HERO_COMPLEXITY[keyof typeof HERO_COMPLEXITY];
export type HeroAttribute = typeof HERO_ATTRIBUTES[keyof typeof HERO_ATTRIBUTES];

export type HeroTypes = {
  id: number;
  name: string;
  name_loc: string;
  name_english_loc: string;
  primary_attr: HeroAttribute;
  complexity: HeroComplexity;
}