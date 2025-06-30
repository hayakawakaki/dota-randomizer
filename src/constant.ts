import { CodeIcon } from "@phosphor-icons/react/dist/csr/Code";

export const HERO_COMPLEXITY = {
  UNDEFINED: { value: 0, label: "Default" },
  EASY: { value: 1, label: "Easy" },
  NORMAL: { value: 2, label: "Normal" },
  HARD: { value: 3, label: "Hard" },
} as const;

export const HERO_ATTRIBUTE = {
  STRENGTH: { value: 1, label: "Strength" },
  AGILITY: { value: 2, label: "Agility" },
  INTELLIGENCE: { value: 3, label: "Intelligence" },
  UNIVERSAL: { value: 4, label: "Universal" },
} as const;

export const HERO_RANDOMIZE_SETTING = {
  LANES: { key: "LANES", label: "Randomize Lanes", default: true },
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
  {
    label: "View Code",
    icon: CodeIcon,
    link: "https://github.com/hayakawakaki/dota-randomizer",
  },
] as const;

//= UI Related Constants
export const ATTRIBUTE_BUTTONS = [
  HERO_ATTRIBUTE.STRENGTH,
  HERO_ATTRIBUTE.AGILITY,
  HERO_ATTRIBUTE.INTELLIGENCE,
  HERO_ATTRIBUTE.UNIVERSAL,
];

export const COMPLEXITY_BUTTONS = [
  HERO_COMPLEXITY.EASY,
  HERO_COMPLEXITY.NORMAL,
  HERO_COMPLEXITY.HARD,
];

export const RANDOMIZE_SETTING_BUTTONS = [
  HERO_RANDOMIZE_SETTING.SKIPANIMATION,
  HERO_RANDOMIZE_SETTING.LANES,
];
