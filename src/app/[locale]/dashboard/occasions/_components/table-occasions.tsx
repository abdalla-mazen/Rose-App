"use client";

import { useState, useMemo } from "react";
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
import Link from "next/link";


interface Props {
  data: Occasion[];
}

export default function TableOccasions({ data }: Props) {
  // State
  const [query, setQuery] = useState("");

  // Filter
  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data?.filter((o) => o.name.toLowerCase().includes(q));
  }, [data, query]);

  // Mutations
  const { deleteOccasion } = useDeleteOccasions();

  return (
    <div className="space-y-4 w-full ">
      {/* Search Input */}
      <div className="relative ">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="search"
          className="border rounded-lg px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder=" Search... "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl ">
        {/* Table */}
        <Table className="px-5">
          <TableHeader>
            <TableRow className="bg-zinc-50  ">
              <TableHead className="w-40 text-zinc-900 text-sm font-medium px-5 ">Name</TableHead>
              <TableHead className="text-zinc-900 text-sm font-medium">Products</TableHead>
              <TableHead className="text-right sr-only">actions buttons</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <TableRow key={item._id} className="hover:bg-maroon-50">
                  <TableCell className="font-medium px-5 ">{item.name}</TableCell>
                  <TableCell>{item.productsCount} products</TableCell>
                  <TableCell className="w-fit">
                    <div className="flex justify-end gap-2 px-5">
                      <Button className="w-16 bg-[#0063D0]/10 text-blue-600 text-xs py-1 px-2 hover:bg-[#0063D0]/30">
                        <Pencil size={14} />
                        <Link href={`/dashboard/occasions/${item._id}`}>Edit</Link>
                      </Button>
                      <Button
                        onClick={() => deleteOccasion(item._id)}
                        className="w-20 bg-red-500/10 text-red-600 text-xs py-1 px-2 hover:bg-red-500/30"
                      >
                        <Trash2 size={14} /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
