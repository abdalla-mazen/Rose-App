"use client";

import { SessionProvider } from "next-auth/react";
import React, { useState } from "react";
import DashboardAside from "./dashboard-aside";
import Breadcrumb from "./dashboard-breadcrumb";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductBreadcrumbProvider } from "@/lib/contexts/product-breadcrumb.context";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ProductBreadcrumbProvider>
          <div className="min-h-screen bg-white dark:bg-zinc-800">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 w-[19rem] h-screen border-r bg-white dark:bg-zinc-900">
              <DashboardAside />
            </aside>

            {/* Main Content */}
            <div className="ml-[19rem] flex flex-col min-h-screen">
              {/* Breadcrumb */}
              <div className="border-b bg-white dark:bg-zinc-800 px-6 py-4">
                <Breadcrumb />
              </div>

              {/* Page Content */}
              <main className="flex-1 p-6 dark:bg-zinc-800 w-11/12 mx-auto">{children}</main>
            </div>
          </div>
        </ProductBreadcrumbProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
