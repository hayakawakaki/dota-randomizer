import { useMemo } from "react";
import { useHeroContext } from "@/features/heroes";
import { HeroIcon } from "@/features/heroes";
import { useDevice } from "@/hooks/device";
import "@features/heroes/styles/HeroesGrid.css";

export function HeroesGrid() {
  const { heroes } = useHeroContext();
  const { currentDevice, isDeviceAtLeast } = useDevice();

  //= Prevent grid item from re-rendering mainly when randomizing
  const gridItems = useMemo(() => {
    console.log("Grid Re-rendered");
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
      <div className="heroes-grid">{gridItems}</div>
    </div>
  );
}
