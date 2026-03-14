import { cn } from "@/lib/utils";
import React from "react";

export default function Subtitle({ title }: { title: string }) {
  return (
    <h2
      className={cn(
        "capitalize relative font-bold mx-auto md:mx-0 text-maroon-600 dark:text-softPink-200 text-xl md:text-3xl lg:text-4xl",
        "before:absolute before:-bottom-0.5 before:start-0 before:w-1/3 before:h-[2px] before:bg-softPink-600 dark:before:bg-softPink-500 before:content-['']",
        "after:absolute after:bottom-0 after:start-0 after:-z-10 after:w-3/4 after:h-[40%] after:bg-softPink-100 dark:after:bg-zinc-700 after:rounded-r-md after:content-['']",
      )}
    >
      {title}
    </h2>
  );
}
