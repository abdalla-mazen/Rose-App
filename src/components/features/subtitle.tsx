import React from "react";

export default function Subtitle({ title }: { title: string }) {
  return (
    <h2
      className="relative text-4xl font-bold text-[#6e0e12]
            before:content-[''] before:absolute before:-bottom-0.5 before:start-0
            before:w-1/3 before:h-[2px] before:bg-[#f55374]
            after:content-[''] after:absolute after:bottom-0 after:start-0
            after:w-3/4 after:h-[40%] after:bg-[#fbcfd7] after:-z-10 after:rounded-r-md"
    >
      {title}
    </h2>
  );
}
