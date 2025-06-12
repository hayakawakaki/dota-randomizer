import { useState, useRef, useMemo } from "react";
import { useFetch } from "@hooks/useFetch";
import Button from "@components/ui/Button";
import HeroesGrid from "@components/HeroesGrid";
import Layout from "@components/Layout";

import type { HeroTypes, HeroComplexity, HeroAttribute } from "@/types/heroes";
import {
  HERO_COMPLEXITY,
  COMPLEXITY_BUTTONS,
  ATTRIBUTES_BUTTONS,
} from "@/constant";

function App() {
  const {
    data: heroes,
    loading,
    error,
  } = useFetch<HeroTypes[]>("/api/heroes.json");

  const [randomHero, setRandomHero] = useState("Not Selected");
  const [complexity, setComplexity] = useState<HeroComplexity>(
    HERO_COMPLEXITY.UNDEFINED
  );
  const [attribute, setAttribute] = useState<Set<HeroAttribute>>(new Set());

  const lastRandomizedHeroRef = useRef<number | null>(null);

  const filteredHeroes = useMemo(() => {
    if (!heroes) return [];

    let currentHeroes = heroes;
    if (currentHeroes.length === 0) return [];

    // Filter based on attribute
    if (attribute.size > 0) {
      currentHeroes = currentHeroes.filter((item) =>
        attribute.has(item.primary_attr)
      );
    }

    // Filter based on complexity
    if (complexity > HERO_COMPLEXITY.UNDEFINED) {
      currentHeroes = currentHeroes.filter(
        (item) => item.complexity === complexity
      );
    }

    return currentHeroes;
  }, [heroes, attribute, complexity]);

  function onUpdateAttribute(value: HeroAttribute) {
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

  function onUpdateComplexity(value: HeroComplexity) {
    if (value === complexity) {
      setComplexity(HERO_COMPLEXITY.UNDEFINED);
      return;
    }
    setComplexity(value);
  }

  function randomizeHero() {
    if (!filteredHeroes || filteredHeroes.length === 0) return;

    let idx = Math.floor(Math.random() * filteredHeroes.length);
    while (filteredHeroes.length > 1 && lastRandomizedHeroRef.current === idx)
      idx = Math.floor(Math.random() * filteredHeroes.length);
    lastRandomizedHeroRef.current = idx;
    setRandomHero(filteredHeroes[idx].name_loc);
  }

  return (
    <Layout>
      <div>
        <button onClick={randomizeHero}>Randomize Hero</button>
        <p>{randomHero}</p>
      </div>
      <div>
        {ATTRIBUTES_BUTTONS.map((item) => (
          <Button
            onClick={() => onUpdateAttribute(item.value)}
            key={`attr-button-${item.label}`}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div>
        {COMPLEXITY_BUTTONS.map((item) => (
          <Button
            onClick={() => onUpdateComplexity(item.value)}
            key={`complexity-button-${item.label}`}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <HeroesGrid heroData={filteredHeroes} loading={loading} error={error} />
    </Layout>
  );
}

export default App;
