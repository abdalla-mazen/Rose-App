// Dashboard Layout

import DashboardClientLayout from "./_components/dashboard-client-layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <DashboardClientLayout>{children}</DashboardClientLayout>
      </body>
    </html>
  );
}
