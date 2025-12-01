import { useTranslations } from "next-intl";
import GeneralPages from "../../../../../components/shared/general-pages";

export default function NotFound() {
  // Translation
  const t = useTranslations();
  return (
    <GeneralPages
      src="/assets/images/general/not-found.svg"
      alt="Not authorized"
      height={360}
      width={360}
      primaryText={t("not-found-primary")}
      secondaryText={t("not-found-secondary")}
      className={true}
    />
  );
}
