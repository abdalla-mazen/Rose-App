// Dashboard Layout

import Providers from "@/components/providers";
import DashboardClientLayout from "./_components/dashboard-client-layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-zinc-50">
        <Providers>
          <DashboardClientLayout>{children}</DashboardClientLayout>
        </Providers>
      </body>
    </html>
  );
}
