import {
  HERO_COMPLEXITY,
  HERO_ATTRIBUTE,
  HERO_RANDOMIZE_SETTING,
  HERO_LANES,
} from "@/constant";

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

export type HeroLanes = (typeof HERO_LANES)[keyof typeof HERO_LANES];

export type HeroRandomizeSettingKey =
  (typeof HERO_RANDOMIZE_SETTING)[keyof typeof HERO_RANDOMIZE_SETTING]["key"];

export type HeroRandomizeSetting = Record<HeroRandomizeSettingKey, boolean>;
