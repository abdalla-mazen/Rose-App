"use client";

import { Menu, Lock, LogOut, UserRoundPen } from "lucide-react";
import React, { useState } from "react";
import AccountChangePassword from "./account-changepassword";
import { cn } from "@/lib/utils";
import AccountEditProfile from "./account-editprofile";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";

type Props = {
  userData: UserData | null;
};

export default function AccountClient({ userData }: Props) {
  // Translations
  const t = useTranslations();

  // Hooks
  const [activeTab, setActiveTab] = useState<"profile" | "changepassword">("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-9 w-full">
      {/* Sidebar */}
      <div className="hidden  md:flex flex-col justify-between bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg w-[300px] min-h-[720px]">
        {/* Components */}
        <div>
          <ul>
            <li
              onClick={() => setActiveTab("profile")}
              className={`flex items-center capitalize rounded-lg gap-3 px-5 py-3 font-medium cursor-pointer ${cn(
                activeTab === "profile"
                  ? "bg-zinc-800 dark:bg-zinc-700 text-zinc-50 rounded-lg"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-bg duration-100",
              )}`}
            >
              <UserRoundPen className="w-6 h-6" /> {t("my-account")}
            </li>
            <li
              onClick={() => setActiveTab("changepassword")}
              className={`flex capitalize cursor-pointer items-center rounded-lg gap-3 px-5 py-3 mt-2.5 font-medium ${cn(
                activeTab === "changepassword"
                  ? "bg-zinc-800 dark:bg-zinc-700 text-zinc-50 rounded-lg"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-bg duration-100",
              )}`}
            >
              <Lock className="w-6 h-6" /> {t("change-password")}
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div>
          <div
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="flex items-center gap-3 bg-zinc-100 hover:bg-zinc-200 px-4 py-3 rounded-lg text-maroon-500 capitalize transition-all duration-100 cursor-pointer"
          >
            <LogOut className="w-5 h-5" /> {t("logout")}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden flex flex-col w-full relative">
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold capitalize text-zinc-800 dark:text-zinc-100">
            {activeTab === "profile" ? t("my-account") : t("change-password")}
          </h2>
          <Menu
            className="w-6 h-6 cursor-pointer text-zinc-700 dark:text-zinc-300"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {isSidebarOpen && (
          <div className="absolute top-[68px] left-0 w-full bg-white dark:bg-zinc-900 shadow-md rounded-lg p-3 z-50 flex flex-col gap-2 border border-zinc-100 dark:border-zinc-800">
            <div
              onClick={() => {
                setActiveTab("profile");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center capitalize rounded-lg gap-3 px-4 py-3 font-medium cursor-pointer ${cn(
                activeTab === "profile"
                  ? "bg-zinc-800 dark:bg-zinc-700 text-zinc-50"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200",
              )}`}
            >
              <UserRoundPen className="w-5 h-5" /> {t("my-account")}
            </div>
            <div
              onClick={() => {
                setActiveTab("changepassword");
                setIsSidebarOpen(false);
              }}
              className={`flex capitalize cursor-pointer items-center rounded-lg gap-3 px-4 py-3 font-medium ${cn(
                activeTab === "changepassword"
                  ? "bg-zinc-800 dark:bg-zinc-700 text-zinc-50"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200",
              )}`}
            >
              <Lock className="w-5 h-5" /> {t("change-password")}
            </div>

            <hr className="my-1 border-zinc-100 dark:border-zinc-800" />

            <div
              onClick={() => {
                setIsSidebarOpen(false);
                signOut({
                  callbackUrl: "/login",
                });
              }}
              className="flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-3 rounded-lg text-maroon-500 capitalize cursor-pointer font-medium"
            >
              <LogOut className="w-5 h-5" /> {t("logout")}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        {/* Edit profile Component */}
        {activeTab === "profile" && <AccountEditProfile userData={userData} />}

        {/* Change password component */}
        {activeTab === "changepassword" && <AccountChangePassword />}
      </div>
    </div>
  );
}
