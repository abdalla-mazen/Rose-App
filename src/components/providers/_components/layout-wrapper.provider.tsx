"use client";
import { useLayoutVisibility } from "./client-layout-controller";
import { ReactNode } from "react";

type LayoutWrapperProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export default function LayoutWrapper({ header, footer, children }: LayoutWrapperProps) {
  const { shouldShowLayout } = useLayoutVisibility();

  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
