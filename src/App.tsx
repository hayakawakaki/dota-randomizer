import { useState, useEffect, useMemo } from "react";
import Button from "@components/ui/Button";
import HeroesGrid from "@components/HeroesGrid";
import Layout from "@components/Layout";
import Loading from "@components/Loading";
import { heroComplexity, heroAttribute } from "@/constant";
import type { HeroTypes, HeroComplexity, HeroAttribute } from "@/types/heroes";

function App() {
  const [randomHero, setRandomHero] = useState("Not Selected");
  const [heroes, setHeroes] = useState<HeroTypes[]>([]);
  const [complexity, setComplexity] = useState<HeroComplexity>(
    heroComplexity.UNDEFINED
  );
  const [attribute, setAttribute] = useState<HeroAttribute>(
    heroAttribute.UNDEFINED
  );

  let lastRandomizedHero: number;

  function onUpdateAttribute(value: HeroAttribute) {
    if (value === attribute) {
      setAttribute(heroAttribute.UNDEFINED);
      return;
    }
    setAttribute(value);
  }

  function onUpdateComplexity(value: HeroComplexity) {
    if (value === complexity) {
      setAttribute(heroComplexity.UNDEFINED);
      return;
    }
    setComplexity(value);
  }

  function randomizeHero() {
    if (filteredHeroes && filteredHeroes.length === 0) return [];

    let idx = Math.floor(Math.random() * filteredHeroes.length);
    while (lastRandomizedHero && lastRandomizedHero === idx)
      idx = Math.floor(Math.random() * filteredHeroes.length);
    lastRandomizedHero = idx;
    setRandomHero(filteredHeroes[idx].name_loc);
  }

  useEffect(() => {
    async function fetchHeroes() {
      const controller = new AbortController();
      const signal = controller.signal;
      try {
        const res = await fetch("/api/heroes.json", { signal });
        if (!res.ok) {
          throw new Error(`Heroes fetch error! status: ${res.status}`);
        }
        const heroData = await res.json();
        setHeroes(heroData);
      } catch (err) {
        if (err === "AbortError") {
          return;
        } else {
          console.error("Fetch failed:", err);
        }
      }
    }
    fetchHeroes();
  }, []);

  const filteredHeroes = useMemo(() => {
    let currentHeroes = heroes;
    if (currentHeroes && currentHeroes.length === 0) return [];

    // Filter based on attribute
    if (attribute > heroAttribute.UNDEFINED) {
      currentHeroes = currentHeroes.filter(
        (item) => item.primary_attr === attribute
      );
    }

    // Filter based on complexity
    if (complexity > heroComplexity.UNDEFINED) {
      currentHeroes = currentHeroes.filter(
        (item) => item.complexity === complexity
      );
    }

    return currentHeroes;
  }, [heroes, attribute, complexity]);

  return (
    <Layout>
      <div>
        <button onClick={randomizeHero}>Randomize Hero</button>
        <p>{randomHero}</p>
      </div>
      <div>
        <Button onClick={() => onUpdateAttribute(heroAttribute.STRENGTH)}>
          Strength
        </Button>
        <Button onClick={() => onUpdateAttribute(heroAttribute.AGILITY)}>
          Agility
        </Button>
        <Button onClick={() => onUpdateAttribute(heroAttribute.INTELLIGENCE)}>
          Intelligence
        </Button>
        <Button onClick={() => onUpdateAttribute(heroAttribute.UNIVERSAL)}>
          Universal
        </Button>
      </div>
      <div>
        <Button onClick={() => onUpdateComplexity(heroComplexity.EASY)}>
          EASY
        </Button>
        <Button onClick={() => onUpdateComplexity(heroComplexity.NORMAL)}>
          NORMAL
        </Button>
        <Button onClick={() => onUpdateComplexity(heroComplexity.HARD)}>
          HARD
        </Button>
      </div>
      {heroes && heroes.length ? (
        <HeroesGrid heroData={filteredHeroes} />
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

export default App;
