import type { RefObject } from "react";

type HeroesResultProps = {
  randomHero: string;
  randomizeHero: () => void;
  randomizedLaneRef: RefObject<string | null>;
};

export default function HeroesResult({
  randomHero,
  randomizeHero,
  randomizedLaneRef,
}: HeroesResultProps) {
  return (
    <div>
      {randomHero}
      {randomizedLaneRef.current && <p>{randomizedLaneRef.current}</p>}
      <div>
        <button onClick={randomizeHero}>Randomize</button>
      </div>
    </div>
  );
}
