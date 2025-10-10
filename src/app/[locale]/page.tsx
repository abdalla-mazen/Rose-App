import TestimonialPage from "@/app/[locale]/_components/testimonial/index";
import ToggleLocale from "@/components/layout/header/toggel-locale";
import { RouteProps } from "@/lib/types/global";

export default async function Home({ params: { locale } }: RouteProps) {
  return (
    <>
      <ToggleLocale />
    </>
  );
}
