import Button from "@components/ui/Button";
import {
  COMPLEXITY_BUTTONS,
  ATTRIBUTE_BUTTONS,
  RANDOMIZE_SETTING_BUTTONS,
} from "@/constant";
import type { HeroComplexity, HeroAttribute } from "@/types/heroes";
import type { RandomSettingKey } from "@/types/randomize";

type HeroesFilterProps = {
  updateAttribute: (value: HeroAttribute) => void;
  updateComplexity: (value: HeroComplexity) => void;
  updateRandomizationSetting: (value: RandomSettingKey) => void;
};

function HeroesConfigPanel({
  updateAttribute,
  updateComplexity,
  updateRandomizationSetting,
}: HeroesFilterProps) {
  return (
    <aside>
      <div>
        {RANDOMIZE_SETTING_BUTTONS.map((item, index) => (
          <Button
            onClick={() => updateRandomizationSetting(item.key)}
            key={`setting-button-${index}`}
          >
            {item.label}
          </Button>
        ))}
      </div>
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

export default HeroesConfigPanel;
