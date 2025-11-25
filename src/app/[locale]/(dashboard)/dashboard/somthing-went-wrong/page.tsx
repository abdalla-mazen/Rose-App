import GeneralPages from "../../../../../components/shared/general-pages";

export default function SomthingWentWrong() {
  return (
    <GeneralPages
      src="/assets/images/general/server-down 1.svg"
      alt="Something went wrong"
      height={250}
      width={250}
      primaryText="Oops, something went wrong!"
      secondaryText="Something unexpected happened, please refresh the page or try again shortly."
    />
  );
}
