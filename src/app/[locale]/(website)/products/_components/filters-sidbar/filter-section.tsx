// "use client";

// import { ReactNode } from "react";
// import { X } from "lucide-react";
// import { useTranslations } from "next-intl";

// interface FilterSectionProps {
//   title: string;
//   children: ReactNode;
//   onReset?: () => void;
//   hasActiveFilters?: boolean;
// }

// export default function FilterSection({
//   title,
//   children,
//   onReset,
//   hasActiveFilters = false,
// }: FilterSectionProps) {
//   const t = useTranslations();

//   return (
//     <div className="mb-6">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="text-md font-semibold">{title}</h3>
//         {hasActiveFilters && onReset && (
//           <button
//             onClick={onReset}
//             className="flex items-center gap-1 text-md text-red-600 hover:text-red-600 "
//             aria-label={`${t("reset")} ${title}`}
//           >
//             <X className="w-4 h-4" />
//             {/* {t("Reset")} */}
//             reset
//           </button>
//         )}
//       </div>
//       <div>{children}</div>
//     </div>
//   );
// }

"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
  title: string;
  children: ReactNode;
  onReset?: () => void;
  hasActiveFilters?: boolean;
}

export default function FilterSection({ title, children, onReset, hasActiveFilters }: Props) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        {hasActiveFilters && onReset && (
          <button onClick={onReset} className="flex items-center gap-1 text-red-600">
            <X size={14} />
            Reset
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
