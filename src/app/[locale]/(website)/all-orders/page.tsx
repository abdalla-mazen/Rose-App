
// import { useSearchParams } from "next/navigation";
// import AllOrders from "./_components/order-component.jsx";

// export default function AllOrdersPage() {
//   const searchParams = useSearchParams();
//   const status = searchParams.get("status");

//   return (
//     <div className="p-4">
//       {status === "success" ? (
//         // <h1>Payment Successful! </h1>

// <AllOrders  />

//       ) : status === "cancel" ? (
//         <h1>Payment Cancelled </h1>
//       ) : (
//         <h1>Your Orders</h1>
//       )}
//     </div>
//   );
// }

import AllOrders from "./_components/order-component";
import { getAllOrders } from "@/lib/apis/get-allorders-api";

export default async function AllOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  if (status !== "success") {
    return (
      <div className="p-4">
        {status === "cancel" ? <h1>Payment Cancelled</h1> : <h1>Your Orders</h1>}
      </div>
    );
  }

  let initialOrders = [];
  let initialError: string | null = null;

  try {
    const response = await getAllOrders();
    initialOrders = response.orders;
  } catch (err) {
    initialError = err instanceof Error ? err.message : "Something went wrong";
  }

  return (
    <div className="p-4">
      <AllOrders initialOrders={initialOrders} initialError={initialError} />
    </div>
  );
}