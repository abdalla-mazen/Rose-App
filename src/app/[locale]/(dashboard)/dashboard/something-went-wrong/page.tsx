import { useTranslations } from "next-intl";
import GeneralPages from "../../../../../components/shared/general-pages";

export default function SomethingWentWrong() {
  // Translation
  const t = useTranslations();
  return (
    <GeneralPages
      src="/assets/images/general/server-down 1.svg"
      alt="Something went wrong"
      height={250}
      width={250}
      primaryText={t("something-went-wrong-primary")}
      secondaryText={t("something-went-wrong-secondary")}
    />
  );
}
