import { useEffect, useRef } from "react";

export function useSmoothScroll<T extends HTMLElement>(
  scrollSpeed: number = 0.5,
  smoothness: number = 0.5
) {
  const containerRef = useRef<T>(null);
  const targetScrollRef = useRef<number>(0);
  const currentScrollRef = useRef<number>(0);
  const animationIdRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = (): void => {
      if (!container) return;

      currentScrollRef.current +=
        (targetScrollRef.current - currentScrollRef.current) * smoothness;
      container.scrollTop = currentScrollRef.current;

      if (Math.abs(targetScrollRef.current - currentScrollRef.current) > 0.1) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        animationIdRef.current = null;
        isAnimatingRef.current = false;
      }
    };

    const onStartAnimation = (): void => {
      if (!animationIdRef.current && !isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animate();
      }
    };

    const onHandleScroll = (e: WheelEvent): void => {
      e.preventDefault();

      targetScrollRef.current += e.deltaY * scrollSpeed;

      const maxScroll = container.scrollHeight - container.clientHeight;

      targetScrollRef.current = Math.max(
        0,
        Math.min(maxScroll, targetScrollRef.current)
      );

      onStartAnimation();
    };

    container.addEventListener("wheel", onHandleScroll, { passive: false });

    currentScrollRef.current = container.scrollTop;
    targetScrollRef.current = container.scrollTop;

    return () => {
      container.removeEventListener("wheel", onHandleScroll);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return containerRef;
}
