"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import DashboardAside from "./dashboard-aside";
import Breadcrumb from "./dashboard-breadcrumb";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductBreadcrumbProvider } from "@/lib/contexts/product-breadcrumb.context";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </SessionProvider>
  );
}
