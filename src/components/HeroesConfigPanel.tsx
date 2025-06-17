import ToggleButton from "@components/ui/Button";
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
  attribute: Set<HeroAttribute>;
  updateAttribute: (value: HeroAttribute) => void;
  complexity: HeroComplexity;
  updateComplexity: (value: HeroComplexity) => void;
  updateRandomizationSetting: (value: RandomSettingKey) => void;
  randomizeSetting: RandomSetting;
};

function HeroesConfigPanel({
  attribute,
  updateAttribute,
  complexity,
  updateComplexity,
  updateRandomizationSetting,
  randomizeSetting,
}: HeroesFilterProps) {
  return (
    <section className="heroes-config-panel">
      <h3>Randomization Setting</h3>
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
          <ToggleButton
            className="panel-buttons"
            activeClassName="panel-buttons-active"
            isActive={attribute.has(item.value)}
            onClick={() => updateAttribute(item.value)}
            key={`attr-button-${item.label}`}
          >
            <img src={`/images/attr/${item.label.toLowerCase()}.webp`} />
          </ToggleButton>
        ))}
      </div>
      <div>
        {COMPLEXITY_BUTTONS.map((item, index) => (
          <ToggleButton
            isActive={complexity >= index}
            onClick={() => updateComplexity(item.value)}
            key={`complexity-button-${item.label}`}
          >
            {item.label}
          </ToggleButton>
        ))}
      </div>
    </section>
  );
}

export default HeroesConfigPanel;
