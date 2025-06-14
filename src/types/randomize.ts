import { RANDOMIZE_SETTING, LANE_NAMES } from "@/constant";

export type RandomSettingKey =
  (typeof RANDOMIZE_SETTING)[keyof typeof RANDOMIZE_SETTING]["key"];
export type RandomSetting = Record<RandomSettingKey, boolean>;

export type RandomLanes = (typeof LANE_NAMES)[keyof typeof LANE_NAMES];
