"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * @example
 * <Input placeholder="your name " />
 * <Input type="email" placeholder="your email" error />
 * <Input type="number" placeholder="your age" />
 */
const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", error,className, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[.625rem] border border-zinc-300 bg-transparent px-3 py-1 text-zinc-800 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none   focus:border-maroon-600 disabled:cursor-not-allowed hover:border-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-50 md:text-sm",
          error && "border-red-600 focus-visible:ring-maroon-600",
          "dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:opacity-50",
        className
        )}
        ref={ref}
        {...props}
        
      />
    );
  }
);

TextInput.displayName = "TextInput";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", ...props }, ref) => {
    return <TextInput ref={ref} type={type} {...props} />;
  }
);

Input.displayName = "Input";

export { Input };
