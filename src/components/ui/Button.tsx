import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  status?: undefined | "active" | "disabled";
  onClick: () => void;
};

function Button({ children, status, onClick }: ButtonProps) {
  let style = "button";

  if (status) {
    style += ` ${status}`;
  }

  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
