import type { ReactNode } from "react";

type LayoutType = {
  children: ReactNode;
};

function Layout({ children }: LayoutType) {
  return <>{children}</>;
}

export default Layout;
