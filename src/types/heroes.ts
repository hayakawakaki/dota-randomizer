import { heroComplexity, heroAttribute } from "@/constant";

type HeroComplexity = typeof heroComplexity[keyof typeof heroComplexity];
type HeroAttribute = typeof heroAttribute[keyof typeof heroAttribute];

export type HeroTypes = {
  id: number;
  name: string;
  name_loc: string;
  name_english_loc: string;
  primary_attr: HeroAttribute;
  complexity: HeroComplexity;
}