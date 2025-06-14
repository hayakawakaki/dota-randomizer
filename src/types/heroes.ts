import { HERO_COMPLEXITY, HERO_ATTRIBUTE } from "@/constant";

export type HeroTypes = {
  id: number;
  name: string;
  name_loc: string;
  name_english_loc: string;
  primary_attr: HeroAttribute;
  complexity: HeroComplexity;
};

export type HeroComplexity =
  (typeof HERO_COMPLEXITY)[keyof typeof HERO_COMPLEXITY]["value"];
export type HeroAttribute =
  (typeof HERO_ATTRIBUTE)[keyof typeof HERO_ATTRIBUTE]["value"];
