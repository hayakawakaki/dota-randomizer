import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useDevice, DeviceProvider, useDeviceContext } from "./index";

const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
};

const mockResizeEvent = (width: number) => {
  mockInnerWidth(width);
  act(() => {
    window.dispatchEvent(new Event("resize"));
  });
};

describe("useDevice hook", () => {
  beforeEach(() => {
    mockInnerWidth(425); //Default to mobile
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should have an initial value of the current device based on the window width", () => {
    mockInnerWidth(1440);

    const { result } = renderHook(() => useDevice());

    expect(result.current.currentDevice).toBe("DESKTOP");
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isNonMobile).toBe(true);
  });

  it("should return the correct device type (MOBILE)", () => {
    mockInnerWidth(425);
    const { result } = renderHook(() => useDevice());

    expect(result.current.currentDevice).toBe("MOBILE");
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isNonMobile).toBe(false);
  });
  it("should return the correct device type (TABLET)", () => {
    mockInnerWidth(768);
    const { result } = renderHook(() => useDevice());

    expect(result.current.currentDevice).toBe("TABLET");
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isNonMobile).toBe(false);
  });
  it("should return the correct device type (LAPTOP)", () => {
    mockInnerWidth(1024);
    const { result } = renderHook(() => useDevice());

    expect(result.current.currentDevice).toBe("LAPTOP");
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isNonMobile).toBe(true);
  });
  it("should return the correct device type (DESKTOP)", () => {
    mockInnerWidth(1440);
    const { result } = renderHook(() => useDevice());

    expect(result.current.currentDevice).toBe("DESKTOP");
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isNonMobile).toBe(true);
  });

  it("should update device on window resize", () => {
    mockInnerWidth(425);

    const { result } = renderHook(() => useDevice());

    expect(result.current.currentDevice).toBe("MOBILE");

    mockResizeEvent(768);

    expect(result.current.currentDevice).toBe("TABLET");
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isNonMobile).toBe(false);

    mockResizeEvent(1024);

    expect(result.current.currentDevice).toBe("LAPTOP");
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isNonMobile).toBe(true);
  });

  it("should handle isDeviceAtLeast correctly", () => {
    mockInnerWidth(1024);

    const { result } = renderHook(() => useDevice());

    expect(result.current.isDeviceAtLeast("MOBILE")).toBe(true);
    expect(result.current.isDeviceAtLeast("TABLET")).toBe(true);
    expect(result.current.isDeviceAtLeast("LAPTOP")).toBe(true);
    expect(result.current.isDeviceAtLeast("DESKTOP")).toBe(false);
  });
  it("should clean up event listener during unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useDevice());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});

describe("DeviceContext", () => {
  beforeEach(() => {
    mockInnerWidth(375);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const TestComponent = () => {
    const { currentDevice, isMobile, isNonMobile } = useDeviceContext();

    return (
      <div>
        <span data-testid="device">{currentDevice}</span>
        <span data-testid="is-mobile">{isMobile.toString()}</span>
        <span data-testid="is-non-mobile">{isNonMobile.toString()}</span>
      </div>
    );
  };

  it("should provide device context to children", () => {
    mockInnerWidth(768);

    render(
      <DeviceProvider>
        <TestComponent />
      </DeviceProvider>
    );

    expect(screen.getByTestId("device")).toHaveTextContent("TABLET");
    expect(screen.getByTestId("is-mobile")).toHaveTextContent("true");
    expect(screen.getByTestId("is-non-mobile")).toHaveTextContent("false");
  });

  it("should update context when the window resizes", () => {
    mockInnerWidth(425);

    render(
      <DeviceProvider>
        <TestComponent />
      </DeviceProvider>
    );

    expect(screen.getByTestId("device")).toHaveTextContent("MOBILE");
    expect(screen.getByTestId("is-mobile")).toHaveTextContent("true");
    expect(screen.getByTestId("is-non-mobile")).toHaveTextContent("false");

    mockResizeEvent(1024);

    expect(screen.getByTestId("device")).toHaveTextContent("LAPTOP");
    expect(screen.getByTestId("is-mobile")).toHaveTextContent("false");
    expect(screen.getByTestId("is-non-mobile")).toHaveTextContent("true");
  });

  it("should throw error when useDeviceContext is used outside provider", () => {
    const ErrorComponent = () => {
      useDeviceContext();
      return null;
    };

    expect(() => {
      render(<ErrorComponent />);
    }).toThrow("useDeviceContext must be used within a DeviceProvider");
  });
});
