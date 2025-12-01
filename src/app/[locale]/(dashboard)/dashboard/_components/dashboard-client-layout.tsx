"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import DashboardAside from "./dashboard-aside";
import Breadcrumb from "./dashboard-breadcrumb";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <DashboardAside />

        {/* Main Content */}
        <div className="w-[1200px] ltr:translate-x-80 rtl:-translate-x-80">
          <Breadcrumb />

          <main>{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
