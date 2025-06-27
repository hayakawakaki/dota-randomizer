import { useDevice } from "@/hooks/device";
import "@features/heroes/styles/HeroIcon.css";

type HeroImageProps = {
  imageName: string | null;
  heroName?: string | null;
  attrID?: number | null;
};

export function HeroIcon({ imageName, heroName, attrID }: HeroImageProps) {
  const { isDeviceAtLeast } = useDevice();

  return (
    <div className="hero-icon">
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
      {isDeviceAtLeast("TABLET") && heroName && (
        <p className="hero-name">{heroName}</p>
      )}
    </div>
  );
}
