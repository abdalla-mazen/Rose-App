"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function DashboardBreadcrumb() {
  const pathname = usePathname();
  let pathArray = pathname.split("/").filter((x) => x);

  // Remove locale segments (en or ar)
  if (pathArray[0] === "en" || pathArray[0] === "ar") {
    pathArray = pathArray.slice(1);
  }

  return (
    <nav className="bg-white p-4 border-zinc-100 border-b w-full text-gray-500 text-sm">
      <div className="flex items-center gap-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard" className="capitalize">
                  dashboard{" "}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathArray.length >= 2 && <BreadcrumbSeparator />}
            {pathArray.slice(1).map((link, index) => {
              const href = "/" + pathArray.slice(1, index + 1).join("/");
              const transformedLink = link.split("-").join(" ");
              const isLast = index === pathArray.slice(1).length - 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {!isLast ? (
                      <BreadcrumbLink asChild>
                        <Link href={href} className="capitalize">
                          {transformedLink}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="capitalize">{transformedLink}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
}
