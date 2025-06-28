import "@features/heroes/styles/HeroIcon.css";

type HeroImageProps = {
  imageName: string | null;
  heroName?: string | null;
  attrID?: number | null;
  showName?: boolean;
  onHover: (e: HTMLDivElement, type: boolean) => void;
};

export function HeroIcon({
  imageName,
  heroName,
  attrID,
  showName,
  onHover,
}: HeroImageProps) {
  return (
    <div
      className="hero-icon"
      onMouseEnter={(e) => onHover(e.currentTarget, true)}
      onMouseLeave={(e) => onHover(e.currentTarget, false)}
    >
      <img
        className="hero-image"
        src={`/images/heroes/${imageName}.webp`}
        alt={`${heroName === null ? "Hero" : heroName}'s Image`}
      />
      {attrID && (
        <img
          className="hero-attr"
          src={`/images/attr/${attrID}.webp`}
          alt={`${heroName === null ? "Hero" : heroName}'s Attribute`}
        />
      )}
      {showName && heroName && <p className="hero-name">{heroName}</p>}
    </div>
  );
}
