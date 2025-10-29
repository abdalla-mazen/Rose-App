import React from "react";

export default function Subtitle({ title }: { title: string }) {
  return (
    <h2 className="before:-bottom-0.5 after:bottom-0 after:-z-10 before:absolute after:absolute relative before:bg-softPink-600 after:bg-softPink-100 dark:before:bg-softPink-500 dark:after:bg-zinc-700 after:rounded-r-md before:w-1/3 after:w-3/4 before:h-[2px] after:h-[40%] font-bold text-maroon-600 dark:text-softPink-200 text-4xl before:content-[''] after:content-[''] before:start-0 after:start-0">
      {title}
    </h2>
  );
}
