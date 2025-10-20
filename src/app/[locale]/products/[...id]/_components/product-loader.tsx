import { LoaderCircle } from "lucide-react";
import React from "react";

export default function ProductLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoaderCircle className="text-maroon-600 animate-spin" />
    </div>
  );
}
