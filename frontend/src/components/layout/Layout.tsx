import { ReactNode, forwardRef } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  function Layout({ children }, ref) {
    return (
      <div ref={ref} className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }
);
