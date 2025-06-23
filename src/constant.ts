import { CodeIcon } from "@phosphor-icons/react/dist/csr/Code";

export const HERO_COMPLEXITY = {
  UNDEFINED: { value: 0, label: "Default" },
  EASY: { value: 1, label: "Easy" },
  NORMAL: { value: 2, label: "Normal" },
  HARD: { value: 3, label: "Hard" },
} as const;

export const HERO_ATTRIBUTE = {
  STRENGTH: { value: 1, label: "Strength", image: "strength.webp" },
  AGILITY: { value: 2, label: "Agility", image: "agility.webp" },
  INTELLIGENCE: { value: 3, label: "Intelligence", image: "intelligence.webp" },
  UNIVERSAL: { value: 4, label: "Universal", image: "universal.webp" },
} as const;

export const HERO_RANDOMIZE_SETTING = {
  LANES: { key: "LANES", label: "Randomize Lanes", default: false },
  SKIPANIMATION: {
    key: "SKIPANIMATION",
    label: "Skip Animation",
    default: false,
  },
} as const;

export const HERO_LANES = {
  POS1: "Carry",
  POS2: "Midlane",
  POS3: "Offlane",
  POS4: "Soft Support",
  POS5: "Hard Support",
} as const;

//= Links
export const LINKS = [
  { label: "View Code", icon: CodeIcon, link: "https://github.com" },
] as const;

//= UI Related Constants
export const ATTRIBUTE_BUTTONS = [
  HERO_ATTRIBUTE.STRENGTH,
  HERO_ATTRIBUTE.AGILITY,
  HERO_ATTRIBUTE.INTELLIGENCE,
  HERO_ATTRIBUTE.UNIVERSAL,
] as const;

export const COMPLEXITY_BUTTONS = [
  HERO_COMPLEXITY.EASY,
  HERO_COMPLEXITY.NORMAL,
  HERO_COMPLEXITY.HARD,
] as const;

export const RANDOMIZE_SETTING_BUTTONS = [
  HERO_RANDOMIZE_SETTING.SKIPANIMATION,
  HERO_RANDOMIZE_SETTING.LANES,
];
