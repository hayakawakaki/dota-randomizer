import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  status?: undefined | "active" | "disabled";
  action: () => void;
};

function Button({ children, status, action }: ButtonProps) {
  return (
    <button className={`button ${status ? status : ""}`} onClick={action}>
      {children}
    </button>
  );
}

export default Button;
