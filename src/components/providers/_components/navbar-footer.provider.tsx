import Header from "@/components/layout/header";
import ClientLayoutController from "./client-layout-controller";
import LayoutWrapper from "./layout-wrapper.provider";
import Footer from "@/components/layout/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientLayoutController>
        <LayoutWrapper header={<Header />} footer={<Footer />}>
          {children}
        </LayoutWrapper>
      </ClientLayoutController>
    </>
  );
}
