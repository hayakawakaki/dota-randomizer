import { useMemo, useRef } from "react";
import { useHeroContext, HeroIcon } from "@/features/heroes";
import { useDevice } from "@/hooks/device";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import "@features/heroes/styles/HeroesGrid.css";

export function HeroesGrid() {
  const { heroes } = useHeroContext();
  const { currentDevice, isDeviceAtLeast } = useDevice();

  const gridContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-icon",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: { each: 0.05, from: "start", grid: "auto" },
        }
      );

      const hoverElements: HTMLElement[] = gsap.utils.toArray(".hero-icon");
      hoverElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          gsap.to(element, { duration: 0.1, y: -3 });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(element, { duration: 0.1, y: 0 });
        });
      });
    },
    { dependencies: [heroes], scope: gridContainerRef, revertOnUpdate: true }
  );

  //= Prevent grid item from re-rendering mainly when randomizing
  const gridItems = useMemo(() => {
    return heroes.map((item) => (
      <HeroIcon
        key={`hero-${item.id}`}
        heroName={item.name_english_loc}
        imageName={item.name}
        attrID={item.primary_attr}
        showName={isDeviceAtLeast("TABLET")}
      />
    ));
  }, [heroes, currentDevice]);

  return (
    <div className="heroes-container">
      <div ref={gridContainerRef} className="heroes-grid">
        {gridItems}
      </div>
    </div>
  );
}
