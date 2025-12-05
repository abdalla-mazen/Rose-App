"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import DashboardAside from "./dashboard-aside";
import Breadcrumb from "./dashboard-breadcrumb";
import { ProductBreadcrumbProvider } from "@/lib/contexts/product-breadcrumb.context";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProductBreadcrumbProvider>
        <div className="flex min-h-screen">
          <DashboardAside />

          {/* Main Content */}
          <div className="translate-x-80">
            <Breadcrumb />

            <main>{children}</main>
          </div>
        </div>
      </ProductBreadcrumbProvider>
    </SessionProvider>
  );
}
