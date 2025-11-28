// app/cart/layout.tsx
import type { ReactNode } from "react";

export default function CartLayout({
  children,
  summary,
}: {
  children: ReactNode;
  /** parallel route slot (mounted later by checkout summary task) */
  summary: ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-[1fr_360px] md:p-6">
      <section aria-labelledby="cart-heading">{children}</section>
      {/* parallel slot (kept minimal in this task) */}
      <aside aria-label="order-summary" className="hidden md:block">
        {summary}
      </aside>
    </div>
  );
}
