"use client";

import { useEffect } from "react";
import { useProductBreadcrumb } from "@/lib/contexts/product-breadcrumb.context";

export default function SetBreadcrumbTitle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  // Access the breadcrumb context to update the breadcrumb title
  const { setTitle } = useProductBreadcrumb();

  useEffect(() => {
    // When the component mounts or the `title` changes,
    // update the breadcrumb title in the context
    if (title) setTitle(title);

    // Cleanup function => When the component unmounts, reset the breadcrumb title
    return () => setTitle("");
  }, [title, setTitle]); // Re run this effect whenever 'title' changes

  return <>{children}</>;
}
