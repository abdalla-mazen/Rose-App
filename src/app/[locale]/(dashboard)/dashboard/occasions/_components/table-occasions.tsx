"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Pencil, Trash2, Search } from "lucide-react";
import useDeleteOccasions from "../_hooks/use-delete-occasions";
import { Occasion } from "@/lib/types/occasion";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationComponent from "@/components/shared/custom-pagination";
import DeleteDialog from "@/components/shared/delete-dialog";

interface Props {
  data: Occasion[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export default function TableOccasions({ data, totalPages, currentPage }: Props) {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hooks
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const { deleteOccasion } = useDeleteOccasions();

  // Handle Search
  const handleSearch = (value: string) => {
    setQuery(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4 w-full pb-6">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="search"
          className="border rounded-lg px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t("search")}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={isPending}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl">
        <Table className="px-5">
          <TableHeader>
            <TableRow className="bg-zinc-50">
              <TableHead className="w-40 text-zinc-900 text-sm font-medium px-5">
                {t("name")}
              </TableHead>
              <TableHead className="text-zinc-900 text-sm font-medium">{t("products")}</TableHead>
              <TableHead className="text-right sr-only">{t("actions-buttons")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  {t("loading")}...
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item._id} className="hover:bg-maroon-50">
                  <TableCell className="font-medium px-5">{item.name}</TableCell>
                  <TableCell>
                    {item.productsCount} {t("products")}
                  </TableCell>
                  <TableCell className="w-fit">
                    <div className="flex justify-end gap-2 px-5">
                      <Button
                        className="flex items-center w-16 bg-[#0063D0]/10 text-blue-600 text-xs py-1 px-2 hover:bg-[#0063D0]/30 "
                        onClick={() => router.push(`/dashboard/occasions/${item._id}`)}
                      >
                        <Pencil size={14} />
                        {t("edit")}
                      </Button>

                      <DeleteDialog
                        deletedItem={item.name}
                        itemId={item._id}
                        deleteHook={deleteOccasion}
                        trigger={
                          <Button className="w-20 bg-red-500/10 text-red-600 text-xs py-1 px-2 hover:bg-red-500/30 flex items-center justify-center">
                            <Trash2 size={14} className="mr-1" />
                            {t("delete")}
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  {t("no-data")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Component */}
      <PaginationComponent
        totalPages={totalPages}
        initialPage={currentPage}
        currentPage={currentPage}
      />
    </div>
  );
}
