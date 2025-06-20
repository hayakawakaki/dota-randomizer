import type { RefObject } from "react";
import type { HeroRandomizeSetting } from "@features/heroes";
import "@features/heroes/styles/HeroesResult.css";

type HeroesResultProps = {
  randomHero: string | null;
  isRandomizing: boolean;
  randomizeHero: () => void;
  randomizedLaneRef: RefObject<string | null>;
  randomizeSetting: HeroRandomizeSetting;
};

export function HeroesResult({
  randomHero,
  isRandomizing,
  randomizeHero,
  randomizedLaneRef,
  randomizeSetting,
}: HeroesResultProps) {
  return (
    <div className="heroes-result">
      <div className="result-container shadow-container">
        <div>
          <button
            className="randomize-button"
            onClick={randomizeHero}
            disabled={isRandomizing}
          >
            {isRandomizing ? "Randomizing..." : "Randomize"}
          </button>
        </div>
        {randomHero !== null ? (
          <img
            className="result-image"
            src={`/images/heroes/${randomHero}.webp`}
            alt={`${randomHero}'s Image`}
          />
        ) : (
          <img
            className="result-image"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6a/A_blank_flag.png"
            alt={`${randomHero}'s Image`}
          />
        )}
        {randomizeSetting["LANES"] && randomizedLaneRef.current && (
          <p className="result-lane">{randomizedLaneRef.current}</p>
        )}
      </div>
    </div>
  );
}
