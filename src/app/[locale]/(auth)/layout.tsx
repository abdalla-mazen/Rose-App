import ToggleLocale from "@/components/layout/header/toggel-locale";
import AuthToggleLocale from "@/components/shared/auth/auth-toggle-locale";
import Image from "next/image";
import React from "react";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      {/* Left side: Auth Content */}
      <div className="flex justify-center items-center bg-white dark:bg-zinc-800 w-1/2 min-h-screen text-maroon-700 dark:text-softPink-300">
        <div className="w-full max-w-[406px]">
          {/* Locale toggle button */}
          <AuthToggleLocale />

          {/* Top separator */}
          <Image
            src="/assets/images/auth/authLayoutSepa.png"
            alt="Layout separator"
            width={280}
            height={45}
            className="mx-auto my-10"
          />

          {children}

          {/* bottom Separator */}
          <Image
            src="/assets/images/auth/authLayoutSepa.png"
            alt="Layout separator"
            width={280}
            height={45}
            className="mx-auto my-10 scale-y-[-1] transform"
          />
        </div>
      </div>

      {/* Right side: Background image */}
      <div className="relative w-1/2">
        <Image
          src="/assets/images/auth/authLayout.png"
          alt="Authentication Layout Image"
          fill
          className=""
          priority
        />
      </div>
    </div>
  );
}
