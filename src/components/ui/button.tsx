import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

//variant defines a different color
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        primary:
          "bg-maroon-600 text-white  hover:bg-maroon-700 dark:bg-softPink-300 dark:text-zinc-800 dark:hover:bg-softPink-400 dark:hover:text-zinc-500  disabled:bg-zinc-400 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600",
        secondary:
          "bg-maroon-50 text-maroon-600  hover:bg-maroon-100 dark:bg-zinc-700 dark:text-softPink-300 dark:hover:bg-zinc-600 dark:hover:text-softPink-300 disabled:bg-zinc-400 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600",
        outline:
          "border border-maroon-600 bg-transparent text-maroon-600 hover:bg-maroon-50 haver:border-maroon-600 text-maroon-600 dark:bg-transparent dark:border-softPink-300 dark:text-softPink-300  disabled:bg-zinc-100 disabled:text-zinc-600 disabled:border-zinc-600  dark:disabled:text-zinc-600",
        subtle:
          "bg-zinc-50  border border-zinc-400 text-zinc-800 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:border-zinc-500 dark:hover:text-zinc-50 disabled:bg-zinc-300 disabled:text-zinc-400 disabled:border-zinc-300 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600",
        ghost:
          "bg-transparent hover:bg-zinc-100 text-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-50 disabled:bg-zinc-100 disabled:text-zinc-400 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:text-zinc-50 dark:hover:bg-red-600 dark:hover:text-red-50 disabled:bg-zinc-300 disabled:text-zinc-500  dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600",
      },
      size: {
        default: "h-9 px-16 py-3.5",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

/**
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 * @example
 * // Button with loading spinner
 * <Button variant="primary" loading>Saving...</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        <span className={cn("flex items-center gap-2")}>
          {children}
          {loading && <LoaderCircle className="animate-spin" />}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
