import type { HeroTypes } from "@/features/heroes";
import "@features/heroes/styles/HeroesGrid.css";

type HeroesGridProps = {
  heroes: HeroTypes[];
};

export function HeroesGrid({ heroes }: HeroesGridProps) {
  return (
    <div className="heroes-container">
      <div className="heroes-grid">
        {heroes.map((item) => (
          <img
            className="heroes-grid-item"
            key={`hero-${item.id}`}
            src={`/images/heroes/${item.name}.webp`}
          />
        ))}
      </div>
    </div>
  );
}
