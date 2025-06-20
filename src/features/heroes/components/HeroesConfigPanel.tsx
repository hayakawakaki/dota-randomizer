import ToggleButton from "@components/ui/ToggleButton";
import SliderCheckBox from "@components/ui/SliderCheckBox";

import {
  COMPLEXITY_BUTTONS,
  ATTRIBUTE_BUTTONS,
  RANDOMIZE_SETTING_BUTTONS,
} from "@/constant";

import type {
  HeroComplexity,
  HeroAttribute,
  HeroRandomizeSetting,
  HeroRandomizeSettingKey,
} from "@features/heroes";

import "@features/heroes/styles/HeroesConfigPanel.css";

type HeroesFilterProps = {
  attribute: Set<HeroAttribute>;
  updateAttribute: (value: HeroAttribute) => void;
  complexity: HeroComplexity;
  updateComplexity: (value: HeroComplexity) => void;
  updateRandomizationSetting: (value: HeroRandomizeSettingKey) => void;
  randomizeSetting: HeroRandomizeSetting;
};

export function HeroesConfigPanel({
  attribute,
  updateAttribute,
  complexity,
  updateComplexity,
  updateRandomizationSetting,
  randomizeSetting,
}: HeroesFilterProps) {
  return (
    <aside className="heroes-config-panel shadow-container">
      <section>
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
      </section>
      <section>
        <h3>Attributes Filter</h3>
        <div>
          {ATTRIBUTE_BUTTONS.map((item) => (
            <ToggleButton
              className={`attr-buttons attr-${item.value}`}
              activeClassName="attr-buttons-active"
              isActive={attribute.has(item.value)}
              onClick={() => updateAttribute(item.value)}
              key={`attr-button-${item.label}`}
            >
              <img src={`/images/attr/${item.image}`} />
            </ToggleButton>
          ))}
        </div>
      </section>
      <section>
        <h3>Complexity Filter</h3>
        <div>
          {COMPLEXITY_BUTTONS.map((item) => (
            <ToggleButton
              className="complexity-buttons"
              activeClassName="complexity-buttons-active"
              isActive={complexity >= item.value}
              onClick={() => updateComplexity(item.value)}
              key={`complexity-button-${item.label}`}
            >
              <img
                src="/images/diamond.webp"
                alt={`Complexity - ${item.label}`}
              />
            </ToggleButton>
          ))}
        </div>
      </section>
    </aside>
  );
}
