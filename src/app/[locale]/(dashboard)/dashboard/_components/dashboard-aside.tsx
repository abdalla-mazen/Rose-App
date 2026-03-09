"use client";

import {
  CalendarHeart,
  ClipboardList,
  EllipsisVertical,
  LayoutDashboard,
  LucideFlower,
  Package,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DropdownBtns from "./dropdown-btns";
import { cn } from "@/lib/utils";
import getUniqueColor from "@/lib/utils/get-user-uniqe-bg";

// Links array
const LINKS = [
  {
    href: "/",
    label: "Preview website",
    icon: <LucideFlower />,
  },
  {
    href: "/dashboard",
    label: "Overview",
    icon: <LayoutDashboard />,
  },
  {
    href: "/dashboard/categories",
    label: "Categories",
    icon: <ClipboardList />,
  },
  {
    href: "/dashboard/occasions",
    label: "Occasions",
    icon: <CalendarHeart />,
  },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: <Package />,
  },
];

export default function DashboardAside() {
  // State
  const [showDropdownBtns, setShowDropdownBtns] = useState(false);

  // Pathname
  const pathName = usePathname();

  //Removes the first pathname segment
  const normalizedPath = pathName.replace(/^\/[^/]+/, "");

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") return normalizedPath === "/dashboard";
    return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
  };

  // Session
  const { data: session } = useSession();

  const userPhoto = session?.user.photo;
  const displayName = session?.user.firstName;

  // Open dropdown handler
  const dropdownHandler = () => {
    setShowDropdownBtns((prev) => !prev);
  };

  return (
    <aside className="fixed flex flex-col items-center bg-white p-4 border-zinc-100 border-r w-[19rem] h-screen dark:bg-zinc-800 ">
      {/* Logo */}
      <Image
        src={"/assets/images/logo.png"}
        alt="Logo"
        width={120}
        height={112}
        className="mt-8 mb-6"
      />

      {/* Links */}
      <nav>
        <ul>
          {LINKS.map((link) => {
            const isPreviewLink = link.href === "/";
            const isActive = isLinkActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 hover:bg-maroon-50 mb-4 p-2.5 rounded-lg outline-maroon-400 w-60 h-14 font-bold text-zinc-800 hover:text-maroon-600 dark:text-white hover:dark:text-softPink-500  text-lg capitalize cursor-pointer",
                    {
                      "text-maroon-600 bg-maroon-50  dark:bg-softPink-400 dark:text-white ":
                        isActive,
                      "bg-maroon-600 text-white  dark:bg-softPink-500 justify-center font-semibold text-base ":
                        isPreviewLink,
                    },
                  )}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="bottom-4 left-4 absolute flex items-center gap-2.5 pt-4 border-zinc-100 border-t capitalize">
        {/* Display the user photo or the first letter if no photo */}
        {userPhoto ? (
          <Image
            src={userPhoto}
            className="rounded-full object-cover"
            alt={displayName + "photo"}
            width={54}
            height={54}
          />
        ) : (
          <div
            className="flex justify-center items-center rounded-full w-12 h-12 font-semibold text-white"
            style={{ background: getUniqueColor(displayName || "U") }}
          >
            {displayName?.[0]}
          </div>
        )}

        {/* UserName and email */}
        <div className="flex flex-col">
          <span className="font-bold text-zinc-800 text-sm dark:text-white">
            {session?.user?.firstName}
          </span>
          <span className="font-semibold text-zinc-5 lowercase text-xs 00">
            {session?.user?.email}
          </span>
        </div>

        {/* Dropdown */}
        <button onClick={dropdownHandler}>
          <div className="relative z-50">
            {showDropdownBtns && <DropdownBtns dropdownHandler={dropdownHandler} />}
          </div>
          <EllipsisVertical className="text-zinc-500 translate-x-4 translate-y-1" />
        </button>
      </div>
    </aside>
  );
}
