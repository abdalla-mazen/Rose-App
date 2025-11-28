// Dashboard Layout

import DashboardClientLayout from "./_components/dashboard-client-layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-zinc-50">
        <DashboardClientLayout >{children}</DashboardClientLayout>
      </body>
    </html>
  );
}
