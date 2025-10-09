import React from "react";
import ReactQueryProvider from "./_components/react-query.provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {/* react query dev tools */}
      <ReactQueryDevtools />
      {children}
    </ReactQueryProvider>
  );
}
