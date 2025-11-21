"use client";
import { useSearchParams } from "next/navigation";

export default function AllOrdersPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="p-4">
      {status === "success" ? (
        <h1>Payment Successful! </h1>
      ) : status === "cancel" ? (
        <h1>Payment Cancelled </h1>
      ) : (
        <h1>Your Orders</h1>
      )}
    </div>
  );
}
