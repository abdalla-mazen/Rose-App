"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
}
/**
 *   <PasswordInput  id="password" name="password" label="Password"  error=" field is required"/>
 */
export default function PasswordInput({
  id,
  name,
  label,
  error,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      {/* label */}
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-400">
          {label}
        </label>
      )}

      {/* input */}
      <div className="relative">
        <Input
          id={id}
          name={name}
          placeholder="********"
          type={show ? "text" : "password"}
          className={cn(
            "flex h-12 w-full rounded-[.625rem] border border-zinc-300 bg-transparent px-3 py-1 text-zinc-800 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none   focus:border-maroon-600 disabled:cursor-not-allowed hover:border-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-50 md:text-sm",
            error && "border-red-600 focus-visible:ring-maroon-600",
            "dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:opacity-50"
          )}
        />

        {/* eye icon */}
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {show ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  );
}
