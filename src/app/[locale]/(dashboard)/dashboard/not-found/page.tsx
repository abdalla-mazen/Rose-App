import GeneralPages from "../../../../../components/shared/general-pages";

export default function NotFound() {
  return (
    <GeneralPages
      src="/assets/images/general/not-found.svg"
      alt="Not authorized"
      height={360}
      width={360}
      primaryText="This page does not exist."
      secondaryText="  We couldn’t find the page your are looking for, please make sure you are in the right
        path."
      className={true}
    />
  );
}
