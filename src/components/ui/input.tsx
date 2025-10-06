"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, Upload } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

// interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   placeholder?: string;
//   error?: boolean;
//   buttonText?: string;
// }

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-1 text-zinc-800 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed hover:border-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-50 md:text-sm",
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

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <div className="relative ">
        {" "}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-1 text-zinc-800 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 hover:border-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-50 md:text-sm ps-10",
            error && "border-red-600 focus-visible:ring-maroon-600",
            "dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />{" "}
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400  "
        />{" "}
      </div>
    );
  }
);

InputSearch.displayName = "InputSearch";

const FileInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
     <div className="relative">
       <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-1 text-zinc-800 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed hover:border-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-50 md:text-sm",
          error && "border-red-600 focus-visible:ring-maroon-600",
          "dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <Upload />
      <span>Upload</span>
      </div>
     </div>
    );
  }
);

FileInput.displayName = "FileInput";

// const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
//   (
//     {
//       label = "Label",
//       placeholder = "No file chosen",
//       error = false,
//       buttonText = "Upload file",
//       className,
//       id,
//       onChange,
//       multiple,
//       ...props
//     },
//     ref
//   ) => {
//     const inputId = id ?? "file-input-" + Math.random().toString(36).slice(2, 9);
//     const [fileNames, setFileNames] = React.useState<string>("");

//     function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//       const files = e.target.files;
//       if (files && files.length > 0) {
//         const names = Array.from(files).map((f) => f.name).join(", ");
//         setFileNames(names);
//       } else {
//         setFileNames("");
//       }
//       if (onChange) onChange(e);
//     }
//  return (
//       <div className={cn("flex flex-col w-full", className)}>
//         {/* Label above */}
//         {label && (
//           <label htmlFor={inputId} className="mb-1 text-sm text-zinc-600">
//             {label}
//           </label>
//         )}

//         {/* Visible box */}
//         <div
//           className={cn(
//             "flex items-center justify-between gap-3 rounded-lg border px-3 py-2 min-h-[44px] bg-white",
//             error ? "border-red-600" : "border-zinc-200",
//             "dark:bg-zinc-800 dark:border-zinc-700",
//             "shadow-sm"
//           )}
//         >
//           {/* left: filename or placeholder */}
//           <div className="flex-1 min-w-0">
//             <div
//               className={cn(
//                 "text-sm text-zinc-700 truncate",
//                 fileNames ? "text-zinc-800" : "text-zinc-400",
//                 "dark:text-zinc-100 dark:placeholder:text-zinc-400"
//               )}
//             >
//               {fileNames || placeholder}
//             </div>
//           </div>

//           {/* right: upload button (label for the hidden input) */}
//           <label
//             htmlFor={inputId}
//             className={cn(
//               "inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1 text-sm font-medium cursor-pointer",
//               "text-rose-600 hover:bg-rose-50",
//               "dark:hover:bg-zinc-700"
//             )}
//           >
//             <Upload className="h-4 w-4" />
//             <span>{buttonText}</span>
//           </label>

//           {/* hidden actual input */}
//           <input
//             id={inputId}
//             ref={ref}
//             type="file"
//             className="hidden"
//             onChange={handleChange}
//             multiple={multiple}
//             {...props}
//           />
//         </div>
//       </div>
//     );
//   }
// );
// FileInput.displayName = "FileInput";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    switch (type) {
      case "search":
        return (
          <InputSearch
            ref={ref}
            className={className}
            type={type}
            error={error}
            {...props}
          />
        );
      case "file":
        return (
          <FileInput
            ref={ref}
            className={className}
            type={type}
            error={error}
            {...props}
          />
        );
      default:
        return (
          <TextInput
            ref={ref}
            className={className}
            type={type}
            error={error}
            {...props}
          />
        );
    }
  }
);

Input.displayName = "Input";

export { Input };
