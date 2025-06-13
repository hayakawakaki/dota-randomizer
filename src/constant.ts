export const HERO_COMPLEXITY = {
  UNDEFINED: 0,
  EASY: 1,
  NORMAL: 2,
  HARD: 3
} as const;

export const HERO_ATTRIBUTES = {
  STRENGTH: 1,
  AGILITY: 2,
  INTELLIGENCE: 3,
  UNIVERSAL: 4
} as const;

export const COMPLEXITY_BUTTONS = [
  { value: HERO_COMPLEXITY.EASY, label: 'Easy' },
  { value: HERO_COMPLEXITY.NORMAL, label: 'Normal' },
  { value: HERO_COMPLEXITY.HARD, label: 'Hard' }
] as const;

export const ATTRIBUTE_BUTTONS = [
  { value: HERO_ATTRIBUTES.STRENGTH, label: 'Strength' },
  { value: HERO_ATTRIBUTES.AGILITY, label: 'Agility' },
  { value: HERO_ATTRIBUTES.INTELLIGENCE, label: 'Intelligence' },
  { value: HERO_ATTRIBUTES.UNIVERSAL, label: 'Universal' }
] as const;