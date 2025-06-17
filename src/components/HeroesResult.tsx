import type { RefObject } from "react";
import type { RandomSetting } from "@/types/randomize";

type HeroesResultProps = {
  randomHero: string;
  randomizeHero: () => void;
  randomizedLaneRef: RefObject<string | null>;
  randomizeSetting: RandomSetting;
};

export default function HeroesResult({
  randomHero,
  randomizeHero,
  randomizedLaneRef,
  randomizeSetting,
}: HeroesResultProps) {
  return (
    <div>
      {randomHero === "Random" ? (
        <p>Not Selected</p>
      ) : (
        <img src={`/images/heroes/${randomHero}.webp`} alt="Randomized Hero" />
      )}
      {randomizeSetting["LANES"] && randomizedLaneRef.current && (
        <p>{randomizedLaneRef.current}</p>
      )}
      <div>
        <button onClick={randomizeHero}>Randomize</button>
      </div>
    </div>
  );
}
