import { DEVICES, type DeviceType, type useDeviceReturn } from "./device.types";
import { useState, useEffect } from "react";

export function useDevice(): useDeviceReturn {
  const [currentDevice, setCurrentDevice] = useState<DeviceType>("MOBILE");

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      setCurrentDevice(getCurrentDevice(width));
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  function getCurrentDevice(width: number): DeviceType {
    const devices = Object.entries(DEVICES).reverse();

    for (let i = 0; i < devices.length; ++i) {
      const [deviceName, deviceBreakpoint] = devices[i];
      if (width >= deviceBreakpoint) return deviceName as DeviceType;
    }

    return "MOBILE";
  }

  function isDeviceAtLeast(device: DeviceType): boolean {
    return DEVICES[currentDevice] >= DEVICES[device];
  }

  const isMobile = !isDeviceAtLeast("LAPTOP");
  const isNonMobile = isDeviceAtLeast("LAPTOP");

  return {
    currentDevice,
    isDeviceAtLeast,
    isMobile,
    isNonMobile,
  };
}
