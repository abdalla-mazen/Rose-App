// import Image from "next/image";
// import { ClipboardList, Gift, Headset, House, Info, PartyPopper, User } from "lucide-react";
// import { Link } from "@/i18n/navigation";
// import InputSearch from "@/components/ui/search-input";
// import { ModeToggle } from "@/components/features/toggle-mode";
// import { NavLink } from "@/components/shared/nav-link";
// import ToggleLocale from "./toggel-locale";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/auth";
// import { getTranslations } from "next-intl/server";
// import UserDropdown from "./user-dropdown";
// import ToggleNotification from "./toggle-notification";
// import { GetUserDataApi } from "@/lib/apis/get-user-data.api";

// export default async function Header() {
//   // translations
//   const t = await getTranslations();

//   // User session
//   const session = await getServerSession(authOptions);

//   // Get user data
//   const userData = await GetUserDataApi();

//   //  links
//   const links = [
//     { href: "/", label: t("home"), icon: <House size={20} /> },
//     { href: "/products", label: t("products"), icon: <Gift size={20} /> },
//     {
//       href: "/categories",
//       label: t("categories"),
//       icon: <ClipboardList size={20} />,
//     },
//     {
//       href: "/occasions",
//       label: t("occasions"),
//       icon: <PartyPopper size={20} />,
//     },
//     { href: "/contact", label: t("contact"), icon: <Headset size={20} /> },
//     { href: "/about", label: t("about"), icon: <Info size={20} /> },
//   ];

//   return (
//     <>
//       {/* Top header section */}
//       <div className="flex flex-grow items-center dark:bg-zinc-800 dark:text-zinc-50">
//         <Image
//           src="/assets/images/logo.png"
//           width={85}
//           height={80}
//           alt="logo of the website"
//           className="ms-9 me-4 mt-1"
//         />
//         <div className="flex-1 items-center">
//           <InputSearch
//             className="me-4 h-12"
//             id="search"
//             name="search"
//             placeholder={t("searchPlaceholder")}
//           />
//         </div>

//         {/* User actions */}
//         <div className="flex items-center gap-3">
//           {session ? (
//             <UserDropdown userData={userData} />
//           ) : (
//             <Link href="/login" className="flex items-center px-4 py-4">
//               <User size={20} /> {t("login")}
//             </Link>
//           )}
//           <ul className="flex items-center gap-3 px-4 py-3.5 border-x border-zinc-200">
//             <ToggleNotification />

//             <ModeToggle />
//           </ul>

//           <ToggleLocale />
//         </div>
//       </div>

//       {/* Bottom navigation bar */}
//       <div className="dark:bg-softPink-200">
//         <ul className="flex justify-center items-center gap-3 bg-maroon-700 dark:bg-softPink-200 px-4 py-3.5 border-x border-zinc-200 text-zinc-50">
//           {links.map((item, index) => (
//             <li key={index} className="mx-2">
//               <NavLink href={item.href} className="flex items-center gap-2">
//                 {item.icon}
//                 {item.label}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

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
import ToggleNotification from "./toggle-notification";
import { GetUserDataApi } from "@/lib/apis/get-user-data.api";

export default async function Header() {
  const t = await getTranslations();
  const session = await getServerSession(authOptions);
  const userData = await GetUserDataApi();

  const links = [
    { href: "/", label: t("home"), icon: <House size={20} /> },
    { href: "/products", label: t("products"), icon: <Gift size={20} /> },
    { href: "/categories", label: t("categories"), icon: <ClipboardList size={20} /> },
    { href: "/occasions", label: t("occasions"), icon: <PartyPopper size={20} /> },
    { href: "/contact", label: t("contact"), icon: <Headset size={20} /> },
    { href: "/about", label: t("about"), icon: <Info size={20} /> },
  ];

  return (
    <header className="w-full">
      {/* Top header */}
      <div className="flex flex-col lg:flex-row items-center gap-3 dark:bg-zinc-800 dark:text-zinc-50 px-4 py-2">
        {/* Logo */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Image src="/assets/images/logo.png" width={85} height={80} alt="logo" className="mt-1" />

          {/* Mobile user actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <ToggleNotification />
            <ModeToggle />
            <ToggleLocale />
          </div>
        </div>

        {/* Search */}
        <div className="flex w-full">
          <div className="w-full lg:flex-1">
            <InputSearch
              className="h-12 w-full lg:me-4"
              id="search"
              name="search"
              placeholder={t("searchPlaceholder")}
            />
          </div>

          <div className="flex items-center justify-center">
            {session ? (
              <UserDropdown userData={userData} />
            ) : (
              <Link href="/login" className="flex items-center px-4 py-4">
                <User size={20} /> {t("login")}{" "}
              </Link>
            )}
          </div>
        </div>

        {/* Desktop user actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* {session ? (
            <UserDropdown userData={userData} />
          ) : (
            <Link href="/login" className="flex items-center px-4 py-4">
              <User size={20} /> {t("login")}{" "}
            </Link>
          )} */}

          <ul className="flex items-center gap-3 px-4 py-3.5 border-x border-zinc-200">
            <ToggleNotification />
            <ModeToggle />
          </ul>

          <ToggleLocale />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="dark:bg-softPink-200">
        <ul className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 bg-maroon-700 dark:bg-softPink-200 px-2 sm:px-4 py-2 sm:py-3.5 border-x border-zinc-200 text-zinc-50">
          {links.map((item, index) => (
            <li key={index} className="mx-1 sm:mx-2">
              <NavLink
                href={item.href}
                className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base px-2 py-1"
              >
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
