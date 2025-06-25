export const DEVICES = {
  MOBILE: 0,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1440,
};

export type DeviceType = keyof typeof DEVICES;

export type useDeviceReturn = {
  currentDevice: DeviceType;
  isDeviceAtLeast: (device: DeviceType) => boolean;
  isMobile: boolean;
  isNonMobile: boolean;
};
