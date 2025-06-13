import { useState, useRef, useMemo } from "react";
import { useFetch } from "@hooks/useFetch";
import type { HeroTypes, HeroComplexity, HeroAttribute } from "@/types/heroes";
import { HERO_COMPLEXITY } from "@/constant";

type UseHeroReturn = {
  filteredHeroes: HeroTypes[];
  loading: boolean;
  error: string | null;
  randomHero: string;
  randomizeHero: () => void;
  complexity: HeroComplexity;
  attribute: Set<HeroAttribute>;
  updateAttribute: (value: HeroAttribute) => void;
  updateComplexity: (value: HeroComplexity) => void;
  clearFilters: () => void;
}

export function useHeroes(): UseHeroReturn {
  const {
    data: heroes,
    loading,
    error,
  } = useFetch<HeroTypes[]>("/api/heroes.json");

  const [complexity, setComplexity] = useState<HeroComplexity>(
    HERO_COMPLEXITY.UNDEFINED
  );
  const [attribute, setAttribute] = useState<Set<HeroAttribute>>(new Set());

  const [randomHero, setRandomHero] = useState("Not Selected");
  const lastRandomizedHeroRef = useRef<number | null>(null);

  const filteredHeroes = useMemo(() => {
    if (!heroes) return [];
    let currentHeroes = heroes;
    if (currentHeroes.length === 0) return [];

    // Attribute filter
    if (attribute.size > 0) {
      currentHeroes = currentHeroes.filter((item) =>
        attribute.has(item.primary_attr)
      );
    }

    // Complexity filter
    if (complexity > HERO_COMPLEXITY.UNDEFINED) {
      currentHeroes = currentHeroes.filter(
        (item) => item.complexity === complexity
      );
    }

    return currentHeroes;
  }, [heroes, attribute, complexity]);

  function updateAttribute(value: HeroAttribute) {
    setAttribute((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }

  function updateComplexity(value: HeroComplexity) {
    if (value === complexity) {
      setComplexity(HERO_COMPLEXITY.UNDEFINED);
      return;
    }
    setComplexity(value);
  }

  function randomizeHero() {
    if (!filteredHeroes || filteredHeroes.length === 0) return;

    let idx = Math.floor(Math.random() * filteredHeroes.length);

    // Prevents same hero to be randomized
    while (filteredHeroes.length > 1 && lastRandomizedHeroRef.current === idx)
      idx = Math.floor(Math.random() * filteredHeroes.length);

    lastRandomizedHeroRef.current = idx;
    setRandomHero(filteredHeroes[idx].name_loc);
  }

  function clearFilters() {
    setComplexity(HERO_COMPLEXITY.UNDEFINED);
    setAttribute(new Set());
  }

   return {
    filteredHeroes,
    loading,
    error,
    randomHero,
    randomizeHero,
    complexity,
    attribute,
    updateAttribute,
    updateComplexity,
    clearFilters,
   }
}