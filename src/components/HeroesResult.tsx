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
      {randomHero}
      {randomizeSetting["LANES"] && randomizedLaneRef.current && (
        <p>{randomizedLaneRef.current}</p>
      )}
      <div>
        <button onClick={randomizeHero}>Randomize</button>
      </div>
    </div>
  );
}
