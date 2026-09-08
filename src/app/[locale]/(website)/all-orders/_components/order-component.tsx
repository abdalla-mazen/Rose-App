"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  CreditCard,
  Package,
  Truck,
  XCircle,
  Clock,
} from "lucide-react";
// import { useTranslations } from "next-intl";

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  discount: number;
  rateAvg: number;
  rateCount: number;
  sold: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface OrderItem {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  phone: string;
  lat: string;
  long: string;
}

export type PaymentType = "cash" | "credit";

export type OrderState = "pending" | "canceled" | "completed";

export interface Order {
  shippingAddress?: ShippingAddress;
  _id: string;
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentType: PaymentType;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  state: OrderState;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  __v: number;
}

export interface OrdersMetadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface OrdersResponse {
  message: "success";
  metadata: OrdersMetadata;
  orders: Order[];
}

interface AllOrdersProps {
  initialOrders: Order[];
  initialError?: string | null;
}

export default function AllOrders({
  initialOrders,
  initialError = null,
}: AllOrdersProps) {
  // const t = useTranslations();

  const [orders] = useState<Order[]>(initialOrders);
  const [error] = useState<string | null>(initialError);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <Package className="h-14 w-14 text-maroon-600 dark:text-softPink-400" />

        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          No orders yet
        </h2>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Package className="h-8 w-8 text-maroon-600 dark:text-softPink-400" />

        <h1 className="text-2xl font-semibold text-zinc-800 sm:text-3xl dark:text-zinc-100">
          All Orders
        </h1>
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="w-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none"
          >
            {/* Order Header */}
            <div className="flex flex-col gap-4 border-b border-zinc-200 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-700">
              <div>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                  {order.orderNumber}
                </h2>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Order State */}
              <div
                className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                  order.state === "pending"
                    ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    : order.state === "canceled"
                      ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                      : "bg-maroon-50 text-maroon-600 dark:bg-maroon-950/40 dark:text-softPink-400"
                }`}
              >
                {order.state === "pending" && (
                  <Clock className="h-4 w-4" />
                )}

                {order.state === "canceled" && (
                  <XCircle className="h-4 w-4" />
                )}

                {order.state === "completed" && (
                  <CheckCircle2 className="h-4 w-4" />
                )}

                {order.state}
              </div>
            </div>

            {/* Products */}
            <div className="my-5 flex flex-col gap-4">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-lg bg-zinc-50 p-3 sm:flex-row sm:items-center sm:justify-between dark:bg-zinc-800/60"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Product Image */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
                      <Image
                        src={item.product.imgCover}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-zinc-800 sm:text-lg dark:text-zinc-100">
                        {item.product.title}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 font-medium text-maroon-600 dark:text-softPink-400">
                        {item.price} EGP
                      </p>
                    </div>
                  </div>

                  <p className="self-end font-semibold text-zinc-800 sm:self-auto dark:text-zinc-100">
                    {item.price * item.quantity} EGP
                  </p>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex flex-col gap-4 border-t border-zinc-200 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-700">
              {/* Payment & Delivery */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CreditCard className="h-5 w-5 text-maroon-600 dark:text-softPink-400" />

                  <span>Payment: {order.paymentType}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      order.isPaid
                        ? "text-green-600 dark:text-green-400"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  />

                  <span>{order.isPaid ? "Paid" : "Not Paid"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <Truck
                    className={`h-5 w-5 ${
                      order.isDelivered
                        ? "text-green-600 dark:text-green-400"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  />

                  <span>
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Total:
                </span>

                <span className="text-xl font-bold text-maroon-600 dark:text-softPink-400">
                  {order.totalPrice} EGP
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
