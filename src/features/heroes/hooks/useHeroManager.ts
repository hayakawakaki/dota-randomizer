import { useState, useMemo, useCallback } from "react";
import { useSuspenseFetch } from "@hooks/useFetch";
import type {
  HeroTypes,
  HeroComplexity,
  HeroAttribute,
} from "@/features/heroes";

export type HeroManagerReturn = {
  heroes: HeroTypes[];
  heroComplexity: HeroComplexity;
  heroAttribute: Set<HeroAttribute>;
  updateHeroAttribute: (value: HeroAttribute) => void;
  updateHeroComplexity: (value: HeroComplexity) => void;
};

export function useHeroManager(): HeroManagerReturn {
  const { data } = useSuspenseFetch<HeroTypes[]>("/api/heroes.json");
  const [heroComplexity, setHeroComplexity] = useState<HeroComplexity>(0);
  const [heroAttribute, setHeroAttribute] = useState<Set<HeroAttribute>>(
    () => new Set()
  );

  const heroes = useMemo(() => {
    if (!data) return [];
    let currentHeroes = data;
    if (currentHeroes.length === 0) return [];

    // Attribute filter
    if (heroAttribute.size > 0) {
      currentHeroes = currentHeroes.filter((item) =>
        heroAttribute.has(item.primary_attr)
      );
    }

    // Complexity filter
    if (heroComplexity > 0) {
      currentHeroes = currentHeroes.filter(
        (item) => item.complexity === heroComplexity
      );
    }

    return currentHeroes;
  }, [data, heroAttribute, heroComplexity]);

  const updateHeroAttribute = useCallback((value: HeroAttribute) => {
    setHeroAttribute((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }, []);

  const updateHeroComplexity = useCallback((value: HeroComplexity) => {
    setHeroComplexity((currentValue) => {
      return currentValue !== value ? value : 0;
    });
  }, []);

  return {
    heroes,
    heroComplexity,
    heroAttribute,
    updateHeroAttribute,
    updateHeroComplexity,
  };
}
