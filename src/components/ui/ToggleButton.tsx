import type { ReactNode } from "react";

type ToggleButtonProps = {
  children?: ReactNode;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
  activeClassName?: string;
};

function ToggleButton({
  children,
  onClick,
  className,
  isActive = false,
  activeClassName,
}: ToggleButtonProps) {
  const classes = [className, isActive && activeClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      style={{ maxWidth: "content" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ToggleButton;
