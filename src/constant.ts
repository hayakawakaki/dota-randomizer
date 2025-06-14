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
