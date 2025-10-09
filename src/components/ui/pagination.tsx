// import * as React from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   MoreHorizontal,
// } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { ButtonProps, buttonVariants } from "@/components/ui/button";

// const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
//   <nav
//     role="navigation"
//     aria-label="pagination"
//     className={cn("mx-auto flex w-full justify-center   ", className)}
//     {...props}
//   />
// );
// Pagination.displayName = "Pagination";

// const PaginationContent = React.forwardRef<
//   HTMLUListElement,
//   React.ComponentProps<"ul">
// >(({ className, ...props }, ref) => (
//   <ul
//     ref={ref}
//     className={cn("flex flex-row items-center gap-1 ", className)}
//     {...props}
//   />
// ));
// PaginationContent.displayName = "PaginationContent";

// const PaginationItem = React.forwardRef<
//   HTMLLIElement,
//   React.ComponentProps<"li">
// >(({ className, ...props }, ref) => (
//   <li ref={ref} className={cn("bg-red-600", className)} {...props} />
// ));
// PaginationItem.displayName = "PaginationItem";

// type PaginationLinkProps = {
//   isActive?: boolean;
// } & Pick<ButtonProps, "size"> &
//   React.ComponentProps<"a">;

// const PaginationLink = ({
//   className,
//   isActive,
//   size = "icon",
//   ...props
// }: PaginationLinkProps) => (
//   <a
//     aria-current={isActive ? "page" : undefined}
//     className={cn(
//       buttonVariants({
//         variant: isActive ? "outline" : "ghost",
//         size,
//       }),
//       className
//     )}
//     {...props}
//   />
// );
// PaginationLink.displayName = "PaginationLink";

// const PaginationPrevious = ({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) => (
//   <PaginationLink
//     aria-label="Go to previous page"
//     size="default"
//     className={cn("gap-1 pl-2.5", className)}
//     {...props}
//   >

//     <span className="border border-zinc-100 p-2 rounded-xl">
//       <ChevronsLeft size={16} className="text-zinc-800 " />
//       <span className="sr-only">Next page</span>
//     </span>
//   </PaginationLink>
// );
// PaginationPrevious.displayName = "PaginationPrevious";

// const PaginationNext = ({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) => (
//   <PaginationLink
//     aria-label="Go to next page"
//     size="default"
//     className={cn("gap-1  p-2", className)}
//     {...props}
//   >
//     <span className="border border-zinc-100 p-2 rounded-xl">
//       <ChevronsRight size={16} className="text-zinc-800 " />
//       <span className="sr-only">Next page</span>
//     </span>
//   </PaginationLink>
// );
// PaginationNext.displayName = "PaginationNext";

// const PaginationEllipsis = ({
//   className,
//   ...props
// }: React.ComponentProps<"span">) => (
//   <span
//     aria-hidden
//     className={cn("flex h-8 w-8 items-center justify-center", className)}
//     {...props}
//   >
//     <span className="border border-zinc-100 p-2 rounded-xl">
//       <ChevronRight size={16} className="text-zinc-800 " />
//       <span className="sr-only">Next page</span>
//     </span>
//   </span>
// );
// PaginationEllipsis.displayName = "PaginationEllipsis";

// export {
//   Pagination,
//   PaginationContent,
//   PaginationLink,
//   PaginationItem,
//   PaginationPrevious,
//   PaginationNext,
//   PaginationEllipsis,
// };




import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

/**
 * Compact Pagination components
 * - أقل padding أفقي (compact)
 * - أيقونات Left/Right وEllipsis (left/right)
 * - يدعم isActive و disabled
 * - متناسق مع buttonVariants من shadcn/ui
 */

/* ---------- Container ---------- */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

/* ---------- List ---------- */
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
));
PaginationContent.displayName = "PaginationContent";

/* ---------- Item ---------- */
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => <li ref={ref} className={cn("inline-flex", className)} {...props} />);
PaginationItem.displayName = "PaginationItem";

/* ---------- Link (compact by default) ---------- */
type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon", // compact default
  disabled,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled ? true : undefined}
    tabIndex={disabled ? -1 : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : null,
        size,
      }),
      // compact override: remove large horizontal padding when needed
      "px-0  border border-zinc-200 rounded-xl",
      disabled && "opacity-50 pointer-events-none",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

/* ---------- Previous ---------- */
const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: Omit<PaginationLinkProps, "isActive">) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="icon"
    disabled={disabled}
    className={cn("gap-1", className)}
    {...props}
  >
    <span className="inline-flex items-center gap-1 rounded-xl  p-2">
      <ChevronsLeft size={16} className="text-zinc-800" />
      <span className="sr-only">Previous page</span>
    </span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/* ---------- Next ---------- */
const PaginationNext = ({
  className,
  disabled,
  ...props
}: Omit<PaginationLinkProps, "isActive">) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    disabled={disabled}
    className={cn("gap-1", className)}
    {...props}
  >
    <span className="inline-flex items-center gap-1 rounded-xl  p-2">
      <ChevronsRight size={16} className="text-zinc-800" />
      <span className="sr-only">Next page</span>
    </span>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/* ---------- Ellipsis (right) ---------- */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  >
    <span className="inline-flex items-center rounded-xl border p-2">
      <ChevronRight size={16} className="text-zinc-800" />
      <span className="sr-only">More pages</span>
    </span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

/* ---------- Ellipsis (left) ---------- */
const PaginationEllipsisLeft = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  >
    <span className="inline-flex items-center rounded-xl border p-2">
      <ChevronLeft size={16} className="text-zinc-800" />
      <span className="sr-only">Previous pages</span>
    </span>
  </span>
);
PaginationEllipsisLeft.displayName = "PaginationEllipsisLeft";

/* ---------- Page Number Button (compact) ---------- */
type PageButtonProps = {
  page: number | string;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string;
};

const PageButton = ({ page, isActive, onClick, href }: PageButtonProps) => {
  // uses PaginationLink but shows the page number
  return (
    <PaginationLink
      href={href}
      isActive={isActive}
      size="icon"
      className="min-w-[28px] flex items-center justify-center rounded-xl  p-2"
      onClick={onClick}
    >
      <span className={cn("text-sm rounded-xl border p-2", isActive ? "font-medium" : "font-normal")}>{page}</span>
    </PaginationLink>
  );
};
PageButton.displayName = "PageButton";

/* ---------- Exports ---------- */
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationEllipsisLeft,
  PageButton,
};
