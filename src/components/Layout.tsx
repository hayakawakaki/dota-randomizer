import { Background } from "@components/ui";
import Header from "@components/Header";
import "@css/components/layout.css";

import type { ReactNode } from "react";

type LayoutType = {
  children: ReactNode;
};

function Layout({ children }: LayoutType) {
  return (
    <>
      <Header />
      <main className="app-wrapper">
        <div className="app-container">{children}</div>
      </main>
      <Background image="/images/background.webp" />
    </>
  );
}

export default Layout;
