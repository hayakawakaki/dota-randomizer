import Button from "@components/ui/Button";
import { COMPLEXITY_BUTTONS, ATTRIBUTE_BUTTONS } from "@/constant";
import type { HeroComplexity, HeroAttribute } from "@/types/heroes";

type HeroesFilterProps = {
  updateAttribute: (value: HeroAttribute) => void;
  updateComplexity: (value: HeroComplexity) => void;
};

function HeroesFilter({
  updateAttribute,
  updateComplexity,
}: HeroesFilterProps) {
  return (
    <aside>
      <div>
        {ATTRIBUTE_BUTTONS.map((item) => (
          <Button
            onClick={() => updateAttribute(item.value)}
            key={`attr-button-${item.label}`}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div>
        {COMPLEXITY_BUTTONS.map((item) => (
          <Button
            onClick={() => updateComplexity(item.value)}
            key={`complexity-button-${item.label}`}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </aside>
  );
}

export default HeroesFilter;
