"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import DashboardAside from "./dashboard-aside";
import Breadcrumb from "./dashboard-breadcrumb";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen">
          <DashboardAside />

          {/* Main Content */}
          <div className="w-4/5  overflow-y-auto translate-x-80">
            <Breadcrumb />

            <main >{children}</main>
          </div>
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
