import { createContext, useContext, type ReactNode } from "react";
import { useDevice, type useDeviceReturn } from "./index";

const DeviceContext = createContext<useDeviceReturn | undefined>(undefined);

type DeviceProviderType = {
  children: ReactNode;
};

export function DeviceProvider({ children }: DeviceProviderType) {
  const deviceData = useDevice();

  return <DeviceContext value={deviceData}>{children}</DeviceContext>;
}

export function useDeviceContext(): useDeviceReturn {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
}
