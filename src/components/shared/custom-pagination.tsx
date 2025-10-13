"use client";

import type { PaginationProps } from "@/lib/types/pagination";
import { useLocale } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";

export default function PaginationComponent({
  totalPages,
  initialPage,
}: PaginationProps) {
  //locale
  const locale = useLocale();

  //state
  const [currentPage, setCurrentPage] = useState(initialPage);

  //function
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //pagination functionality
  const getPageNumber = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  //format
  const formatNumber = (num: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(num);

  const pages = getPageNumber();

  return (
    <div className="flex justify-center items-center mt-6">
      <Pagination>
        <PaginationContent className="flex items-center gap-1 w-80 h-8">
          {/* First page button */}
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={cn(
                "gap-2 bg-white disabled:bg-zinc-100 dark:bg-zinc-700 p-2 border-[1px] border-zinc-100 disabled:border-zinc-300 dark:border-zinc-700 rounded[8px] w-8 h-8 text-zinc-800 disabled:text-zinc-400 dark:text-zinc-50 text-xs",
                currentPage === 1 && "opacity-50"
              )}
            >
              <ChevronsLeft className="w-4 h-4 rtl:rotate-180" />
            </PaginationLink>
          </PaginationItem>

          {/* Previous button */}
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "gap-2 bg-white disabled:bg-zinc-100 dark:bg-zinc-700 p-2 border-[1px] border-zinc-100 disabled:border-zinc-300 dark:border-zinc-700 rounded[8px] w-8 h-8 text-zinc-800 disabled:text-zinc-400 dark:text-zinc-50 text-xs",
                currentPage === 1 && "opacity-50"
              )}
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </PaginationLink>
          </PaginationItem>

          {/* Page numbers */}
          {pages.map((page, i) =>
            typeof page === "number" ? (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                  className={cn(
                    "gap-2 bg-white dark:bg-zinc-700 p-2 border-[1px] border-zinc-100 dark:border-zinc-700 w-8 h-8 dark:text-zinc-50 text-xs",
                    page === currentPage &&
                      "text-white bg-maroon-600 border-maroon-600 dark:bg-softPink-200 dark:text-zinc-700 dark:border-softPink-200"
                  )}
                >
                  {formatNumber(page)}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={i}>
                <div
                  className={cn(
                    "flex justify-center items-center bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-[12px] w-8 h-8 text-zinc-400 text-xs select-none"
                  )}
                >
                  …
                </div>
              </PaginationItem>
            )
          )}

          {/* Next button */}
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "gap-2 bg-white disabled:bg-zinc-100 dark:bg-zinc-700 p-2 border-[1px] border-zinc-100 disabled:border-zinc-300 dark:border-zinc-700 rounded[8px] w-8 h-8 text-zinc-800 disabled:text-zinc-400 dark:text-zinc-50 text-xs",
                currentPage === totalPages && "opacity-50"
              )}
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </PaginationLink>
          </PaginationItem>

          {/* Last page button */}
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={cn(
                "gap-2 bg-white disabled:bg-zinc-100 dark:bg-zinc-700 p-2 border-[1px] border-zinc-100 disabled:border-zinc-300 dark:border-zinc-700 rounded[8px] w-8 h-8 text-zinc-800 disabled:text-zinc-400 dark:text-zinc-50 text-xs",
                currentPage === totalPages && "opacity-50"
              )}
            >
              <ChevronsRight className="w-4 h-4 rtl:rotate-180" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
