import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableOccasionsSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Name</TableHead>
          <TableHead>Products</TableHead>
          <TableHead className="text-right sr-only">actions buttons</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 12 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>

            <TableCell className="text-right">
              <Skeleton className="h-4 w-10 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
