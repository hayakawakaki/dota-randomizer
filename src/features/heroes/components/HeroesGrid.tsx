import { useMemo, useRef } from "react";
import { useHeroContext, HeroIcon } from "@/features/heroes";
import { useDevice } from "@/hooks/device";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import "@features/heroes/styles/HeroesGrid.css";
import { useSmoothScroll } from "@/hooks/useSlowScroll";

export function HeroesGrid() {
  const { heroes } = useHeroContext();
  const { currentDevice, isDeviceAtLeast } = useDevice();

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useSmoothScroll<HTMLDivElement>(0.3, 0.1);

  const { contextSafe } = useGSAP(
    () => {
      gsap.fromTo(
        ".hero-icon",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: { each: 0.05, from: "start", grid: "auto" },
        }
      );
    },
    { dependencies: [heroes], scope: gridContainerRef, revertOnUpdate: true }
  );

  const onHandleHover = contextSafe((ref: HTMLDivElement, type: boolean) => {
    if (type) gsap.to(ref, { duration: 0.1, y: -3 });
    else gsap.to(ref, { duration: 0.1, y: 0 });
  });

  //= Prevent grid item from re-rendering mainly when randomizing
  const gridItems = useMemo(() => {
    return heroes.map((item) => (
      <HeroIcon
        key={`hero-${item.id}`}
        heroName={item.name_english_loc}
        imageName={item.name}
        attrID={item.primary_attr}
        showName={isDeviceAtLeast("TABLET")}
        onHover={onHandleHover}
      />
    ));
  }, [heroes, currentDevice]);

  return (
    <div ref={scrollContainerRef} className="heroes-container">
      <div ref={gridContainerRef} className="heroes-grid">
        {gridItems}
      </div>
    </div>
  );
}
