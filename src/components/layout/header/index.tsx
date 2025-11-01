import Image from "next/image";
import { ClipboardList, Gift, Headset, House, Info, PartyPopper, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import InputSearch from "@/components/ui/search-input";
import { ModeToggle } from "@/components/features/toggle-mode";
import { NavLink } from "@/components/shared/nav-link";
import ToggleLocale from "./toggel-locale";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getTranslations } from "next-intl/server";
import UserDropdown from "./user-dropdown";
import { AccountProfile } from "@/lib/types/account-profile";
import ToggleNotification from "./toggle-notification";

export default async function Header() {
  // translations
  const t = await getTranslations();

  // User session
  const session = await getServerSession(authOptions);

  // Assign type to session
  const accountSettings: AccountProfile | null = session?.user
    ? (session.user as AccountProfile)
    : null;

  //  links
  const links = [
    { href: "/", label: t("home"), icon: <House size={20} /> },
    { href: "/products", label: t("products"), icon: <Gift size={20} /> },
    {
      href: "/categories",
      label: t("categories"),
      icon: <ClipboardList size={20} />,
    },
    {
      href: "/occasions",
      label: t("occasions"),
      icon: <PartyPopper size={20} />,
    },
    { href: "/contact", label: t("contact"), icon: <Headset size={20} /> },
    { href: "/about", label: t("about"), icon: <Info size={20} /> },
  ];

  return (
    <>
      {/* Top header section */}
      <div className="flex flex-grow items-center dark:bg-zinc-800 dark:text-zinc-50">
        <Image
          src="/assets/images/logo.png"
          width={85}
          height={80}
          alt="logo of the website"
          className="ms-9 me-4 mt-1"
        />
        <div className="flex-1 items-center">
          <InputSearch
            className="me-4 h-12"
            id="search"
            name="search"
            placeholder={t("searchPlaceholder")}
          />
        </div>

        {/* User actions */}
        <div className="flex items-center gap-3">
          {session ? (
            <UserDropdown session={accountSettings} />
          ) : (
            <Link href="/login" className="flex items-center px-4 py-4">
              <User size={20} /> {t("login")}
            </Link>
          )}
          <ul className="flex items-center gap-3 px-4 py-3.5 border-x border-zinc-200">
            <ToggleNotification />

            <ModeToggle />
          </ul>

          <ToggleLocale />
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="dark:bg-softPink-200">
        <ul className="flex justify-center items-center gap-3 bg-maroon-700 dark:bg-softPink-200 px-4 py-3.5 border-x border-zinc-200 text-zinc-50">
          {links.map((item, index) => (
            <li key={index} className="mx-2">
              <NavLink href={item.href} className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
