"use client";
import { LogOut, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function DropdownBtns({ dropdownHandler }: { dropdownHandler: () => void }) {
  const { data: session } = useSession();

  return (
    <ul className="bottom-4 absolute bg-white [&>*]:p-3 border border-zinc-100 rounded-lg divide-y-2 w-64 font-medium text-zinc-700 text-sm capitalize">
      {/* User Name */}
      <li className="font-semibold text-maroon-700 text-start translate-x-1">
        {session?.user.firstName} {session?.user.lastName}
      </li>

      {/* Account */}
      <li className="hover:text-maroon-500" onClick={dropdownHandler}>
        <Link href="/account" className={`flex cursor-pointer items-center gap-2.5 `}>
          <span>
            <UserRound />
          </span>
          <span>Account</span>
        </Link>
      </li>

      {/* Log Out */}
      <li onClick={dropdownHandler}>
        <div
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="flex items-center gap-2.5 rounded-b-lg hover:text-maroon-500 cursor-pointer"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </div>
      </li>
    </ul>
  );
}
