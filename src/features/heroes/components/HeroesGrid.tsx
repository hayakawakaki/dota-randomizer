import { useMemo, useRef } from "react";
import { useHeroContext, HeroIcon } from "@/features/heroes";
import { useDevice } from "@/hooks/device";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { motion, AnimatePresence } from "motion/react";
import "@features/heroes/styles/HeroesGrid.css";

export function HeroesGrid() {
  const { heroes } = useHeroContext();
  const { currentDevice, isDeviceAtLeast } = useDevice();

  const scrollContainerRef = useSmoothScroll<HTMLDivElement>(0.3, 0.1);

  //= Prevent grid item from re-rendering mainly when randomizing
  const gridItems = useMemo(() => {
    return (
      <AnimatePresence>
        {heroes.map((item) => (
          <motion.div
            key={`hero-${item.id}`}
            layout
            variants={{
              hidden: { opacity: 0, scale: 0.5, y: 5 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              x: -20,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            <HeroIcon
              heroName={item.name_english_loc}
              imageName={item.name}
              attrID={item.primary_attr}
              showName={isDeviceAtLeast("TABLET")}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }, [heroes, currentDevice]);

  return (
    <motion.div
      ref={scrollContainerRef}
      className="heroes-container"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            from: "edges",
            staggerChildren: 0.01,
          },
        },
      }}
    >
      <div className="heroes-grid">{gridItems}</div>
    </motion.div>
  );
}
