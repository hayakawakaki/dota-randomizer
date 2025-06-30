import { useState } from "react";
import { useHeroContext, HeroIcon } from "@/features/heroes";
import { XIcon, ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import "@features/heroes/styles/HeroesResult.css";

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
          <p>Randomize</p>
          <span className="random-icon">{<ArrowsClockwiseIcon />}</span>
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
              {isRandomizing || (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Randomize
                </motion.p>
              )}
              {isRandomizing && (
                <motion.span
                  animate={{ rotate: isRandomizing ? 360 : undefined }}
                  transition={
                    isRandomizing
                      ? { duration: 1, ease: "linear", repeat: Infinity }
                      : { duration: 0 }
                  }
                  className="random-icon"
                >
                  {<ArrowsClockwiseIcon />}
                </motion.span>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
