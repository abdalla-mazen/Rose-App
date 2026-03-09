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

import Link from "next/link";

type ProductTableProps = {
  products: Product[];
};
export default function ProductTable({ products }: ProductTableProps) {
  console.log(products);
  const [query, setQuery] = useState("");
  const [isPending] = useTransition();

  // Handle Search
  const handleSearch = (value: string) => {
    setQuery(value);
  };
  return (
    <div className="space-y-6 w-full pb-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">All Products</h1>
        <Link href="/dashboard/products/add-product">
          <Button className="bg-maroon-600 text-white text-xs py-2 mt-2 px-4 hover:bg-maroon-700">
            + Add a new product
          </Button>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="search"
          className="border rounded-lg px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={isPending}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-zinc-50 dark:bg-zinc-800">
              <TableHead className="text-zinc-900 text-sm font-medium px-5 dark:text-white">
                Name
              </TableHead>
              <TableHead className="text-zinc-900 text-sm font-medium dark:text-white">
                Price
              </TableHead>
              <TableHead className="text-zinc-900 text-sm font-medium dark:text-white">
                Stock
              </TableHead>
              <TableHead className="text-zinc-900 text-sm font-medium dark:text-white">
                Sales
              </TableHead>
              <TableHead className="text-zinc-900 text-sm font-medium dark:text-white">
                Ratings
              </TableHead>
              <TableHead className="text-right sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products?.length > 0 ? (
              products.map((prod: Product) => (
                <TableRow key={prod._id} className="hover:bg-red-50 dark:hover:bg-zinc-700">
                  <TableCell className="font-medium px-5">{prod.title}</TableCell>
                  <TableCell>{prod.price}</TableCell>
                  <TableCell className={prod.quantity <= 5 ? "text-red-600 font-medium" : ""}>
                    {prod.quantity}
                  </TableCell>
                  <TableCell>{prod?.sold?.toLocaleString()}</TableCell>
                  <TableCell>{prod.rateAvg}</TableCell>
                  <TableCell className="w-fit">
                    <div className="flex justify-end gap-2 px-5">
                      <Link href={`/dashboard/products/${prod._id}`}>
                        <Button className="flex items-center w-16 bg-blue-50 text-blue-600 text-xs py-1 px-2 hover:bg-blue-100">
                          <Pencil size={14} className="mr-1" /> Edit
                        </Button>
                      </Link>
                      <Button className="w-20 bg-red-50 text-red-600 text-xs py-1 px-2 hover:bg-red-100 flex items-center justify-center">
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No Products Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
