import GeneralPages from "../../../../components/shared/general-pages";

export default function NotAuthorized() {
  return (
    <html>
      <body>
        <GeneralPages
          src="/assets/images/general/lock-shield.svg"
          alt="Not authorized"
          width={360}
          height={360}
          primaryText="  You are not authorized to access this page."
          secondaryText="If you think this is wrong, please contact the support.
"
          button={true}
        />
      </body>
    </html>
  );
}
