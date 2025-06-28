import { createContext, type ReactNode } from "react";
import {
  useHeroManager,
  useHeroRandom,
  type HeroManagerReturn,
  type HeroRandomReturn,
} from "@features/heroes";

type HeroContextType = HeroManagerReturn & HeroRandomReturn;
export const HeroContext = createContext<HeroContextType | undefined>(
  undefined
);

type HeroProviderProps = {
  children: ReactNode;
};

export function HeroProvider({ children }: HeroProviderProps) {
  const heroData = useHeroManager();
  const randomData = useHeroRandom(heroData.heroes);

  const providerValue = { ...heroData, ...randomData };

  return <HeroContext value={providerValue}>{children}</HeroContext>;
}
