"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PanelRight } from "lucide-react";

export default function FiltersTrigger() {
  const { toggleSidebar, open, isMobile } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={`
        fixed mt-2 ms-2 z-50
        flex items-center gap-2
         bg-maroon-700 dark:bg-softPink-300 text-primary-foreground
        px-2 py-2 rounded-full
        shadow-lg hover:shadow-xl
        hover:bg-maroon-600 dark:hover:bg-softPink-400
        transition-all duration-300
        text-sm font-medium
        ${isMobile && "-left-2 absolute"} 
        ${open && "left-52 "}
        `}
    >
      <PanelRight className="w-4 h-4 rounded-full" />
    </button>
  );
}
