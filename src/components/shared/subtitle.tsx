import React from "react";

export default function Subtitle({ title }: { title: string }) {
  return (
    <h2
      className="relative text-4xl font-bold text-[#741C21] dark:text-[#FFC2D0]
            before:content-[''] before:absolute before:-bottom-0.5 before:start-0
            before:w-1/3 before:h-[2px] before:bg-[#E65073] dark:before:bg-[#3F3F46]
            after:content-[''] after:absolute after:bottom-0 after:start-0
            after:w-3/4 after:h-[40%] after:bg-[#fbcfd7] dark:after:bg-[#FF668B] after:-z-10 after:rounded-r-md"
    >
      {title}
    </h2>
  );
}
