import Button from "@components/ui/Button";
import SliderCheckBox from "@components/ui/SliderCheckBox";
import {
  COMPLEXITY_BUTTONS,
  ATTRIBUTE_BUTTONS,
  RANDOMIZE_SETTING_BUTTONS,
} from "@/constant";
import type { HeroComplexity, HeroAttribute } from "@/types/heroes";
import type { RandomSetting, RandomSettingKey } from "@/types/randomize";
import "@css/components/heroes/panel.css";

type HeroesFilterProps = {
  updateAttribute: (value: HeroAttribute) => void;
  updateComplexity: (value: HeroComplexity) => void;
  updateRandomizationSetting: (value: RandomSettingKey) => void;
  randomizeSetting: RandomSetting;
};

function HeroesConfigPanel({
  updateAttribute,
  updateComplexity,
  updateRandomizationSetting,
  randomizeSetting,
}: HeroesFilterProps) {
  return (
    <aside className="heroes-config-panel">
      <div>
        {RANDOMIZE_SETTING_BUTTONS.map((item) => (
          <SliderCheckBox
            key={`setting-button-${item.key}`}
            label={item.label}
            checked={randomizeSetting[item.key]}
            onChange={() => updateRandomizationSetting(item.key)}
          />
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
