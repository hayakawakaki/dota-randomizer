import { useState } from "react";
import { useHeroContext, HeroIcon } from "@/features/heroes";
import "@features/heroes/styles/HeroesResult.css";
import { XIcon } from "@phosphor-icons/react/dist/ssr";

export function HeroesResult() {
  const [compStyle, setcompStyle] = useState<string>("heroes-result");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    randomHero,
    randomizedLaneRef,
    isRandomizing,
    randomizeHero,
    randomizeSetting,
  } = useHeroContext();

  async function handleOpen() {
    setcompStyle("heroes-result expanded");
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsOpen(!isOpen);
    randomizeHero();
  }

  function handleClose() {
    setIsOpen(!isOpen);
    setcompStyle("heroes-result");
  }

  return (
    <div className={compStyle}>
      {!isOpen && (
        <button
          className="modal-open"
          onClick={handleOpen}
          disabled={isRandomizing || isOpen}
        >
          Randomize
        </button>
      )}
      {isOpen && (
        <button
          className="modal-close"
          onClick={handleClose}
          disabled={isRandomizing}
        >
          <XIcon />
        </button>
      )}
      {isOpen && (
        <div className="modal-item">
          <HeroIcon
            imageName={randomHero === null ? "unknown" : randomHero.name}
            heroName={
              randomHero === null ? "Unknown Hero" : randomHero.name_loc
            }
            attrID={randomHero === null ? 0 : randomHero.primary_attr}
            showName={true}
          />
          {randomizeSetting["LANES"] && randomizedLaneRef.current && (
            <p className="result-lane">{randomizedLaneRef.current}</p>
          )}
          {isOpen && (
            <button
              className="random-button"
              onClick={randomizeHero}
              disabled={isRandomizing}
            >
              {isRandomizing ? "Randomizing..." : "Randomize"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
