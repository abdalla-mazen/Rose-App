"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  let pathArray = pathname.split("/").filter((x) => x);

  // Remove locale segments (en or ar)
  if (pathArray[0] === "en" || pathArray[0] === "ar") {
    pathArray = pathArray.slice(1);
  }

  return (
    <nav className="bg-white p-4 border-zinc-100 border-b w-full text-gray-500 text-sm">
      <ol className="flex items-center gap-1">
        {/* <li>
          <Link href="/dashboard" className="hover:underline capitalize">
            dashboard
          </Link>
        </li> */}

        {pathArray.map((segment, index) => {
          const href = pathArray.slice(0, index + 1).join(">");
          const isLast = index === pathArray.length - 1;

          return (
            <li key={href} className="flex items-center gap-1 font-normal text-sm capitalize">
              {isLast ? (
                <span className="text-maroon-600">
                  {decodeURIComponent(segment.replace("-", " "))}
                </span>
              ) : (
                <>
                  <Link href={href} className="hover:underline">
                    {decodeURIComponent(segment.replace("-", " "))}
                  </Link>
                  <span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
