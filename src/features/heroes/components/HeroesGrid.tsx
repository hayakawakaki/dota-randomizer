import "@features/heroes/styles/HeroesGrid.css";
import { useHeroContext } from "@/features/heroes";
import { HeroIcon } from "@/features/heroes";

export function HeroesGrid() {
  const { heroes } = useHeroContext();

  return (
    <div className="heroes-container">
      <div className="heroes-grid">
        {heroes.map((item) => (
          <HeroIcon
            key={`hero-${item.id}`}
            heroName={item.name_english_loc}
            imageName={item.name}
            attrID={item.primary_attr}
          />
        ))}
      </div>
    </div>
  );
}
