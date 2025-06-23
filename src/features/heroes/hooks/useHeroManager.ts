import { useState, useMemo } from "react";
import { useSuspensedFetch } from "@hooks/useFetch";
import type {
  HeroTypes,
  HeroComplexity,
  HeroAttribute,
} from "@/features/heroes";

type HeroManagerReturn = {
  heroes: HeroTypes[];
  heroComplexity: HeroComplexity;
  heroAttribute: Set<HeroAttribute>;
  updateHeroAttribute: (value: HeroAttribute) => void;
  updateHeroComplexity: (value: HeroComplexity) => void;
  clearFilters: () => void;
};

export function useHeroManager(): HeroManagerReturn {
  const { data } = useSuspensedFetch<HeroTypes[]>("/api/heroes.json");
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

  function updateHeroAttribute(value: HeroAttribute) {
    setHeroAttribute((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }

  function updateHeroComplexity(value: HeroComplexity) {
    if (value === heroComplexity) {
      setHeroComplexity(0);
      return;
    }
    setHeroComplexity(value);
  }

  function clearFilters() {
    setHeroComplexity(0);
    setHeroAttribute(new Set());
  }

  return {
    heroes,
    heroComplexity,
    heroAttribute,
    updateHeroAttribute,
    updateHeroComplexity,
    clearFilters,
  };
}
