"use client";

import { usePathname } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

type LayoutProps = {
  children: ReactNode;
};

// Context to share layout visibility
const LayoutContext = createContext({ shouldShowLayout: true });

export const useLayoutVisibility = () => useContext(LayoutContext);

export default function ClientLayoutController({ children }: LayoutProps) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login", "/register", "/forget", "/otp", "/newpassword"];
  const shouldShowLayout = !noLayoutRoutes.some(
    (route) => pathname === route || pathname.endsWith(route) || pathname.includes(route),
  );

  return <LayoutContext.Provider value={{ shouldShowLayout }}>{children}</LayoutContext.Provider>;
}
