import { useHeroContext, HeroIcon } from "@/features/heroes";
import "@features/heroes/styles/HeroesResult.css";
import { useState } from "react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";

export function HeroesResult() {
  const {
    randomHero,
    randomizedLaneRef,
    isRandomizing,
    randomizeHero,
    randomizeSetting,
    heroNameRef,
  } = useHeroContext();
  const [compStyle, setcompStyle] = useState<string>("heroes-result");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  function onRerandomize() {
    randomizeHero();
  }

  return (
    <div className={compStyle}>
      {!isOpen ? (
        <button
          className="modal-open"
          onClick={handleOpen}
          disabled={isRandomizing || isOpen}
        >
          Randomize
        </button>
      ) : null}
      {isOpen ? (
        <button
          className="modal-close"
          onClick={handleClose}
          disabled={isRandomizing}
        >
          <XIcon />
        </button>
      ) : null}
      {isOpen ? (
        <div className="modal-item">
          <HeroIcon imageName={randomHero} heroName={heroNameRef.current} />
          {randomizeSetting["LANES"] && randomizedLaneRef.current && (
            <p className="result-lane">{randomizedLaneRef.current}</p>
          )}
          {isOpen ? (
            <button
              className="random-button"
              onClick={onRerandomize}
              disabled={isRandomizing}
            >
              {isRandomizing ? "Randomizing..." : "Randomize"}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
