import "@features/heroes/styles/HeroesGrid.css";
import { useHeroContext } from "@/features/heroes";

export function HeroesGrid() {
  const { heroes } = useHeroContext();

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
