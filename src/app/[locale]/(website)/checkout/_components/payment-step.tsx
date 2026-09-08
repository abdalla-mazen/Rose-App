"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { ArrowLeft, Check } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";

import Image from "next/image";

import { applyCreditPaymentAction } from "@/lib/actions/apply-credit-payment.action";

import { cashPayment } from "@/lib/actions/apply-cash-payment.action";

import { AddressPayload, ShippingAddress } from "@/lib/types/address";

import { useTranslations } from "next-intl";

export interface CheckoutPayload {
  shippingAddress: ShippingAddress;
}

interface PaymentStepProps {
  selectedAddress: ShippingAddress | null;
  onBack: () => void;
  onNext?: () => void;
}

export default function PaymentStep({ selectedAddress, onBack, onNext }: PaymentStepProps) {
  // Translations
  const t = useTranslations();

  // State
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Navigation
  const router = useRouter();

  // Functions
  async function handleSelect(modelId: string) {
    setError(null);

    setSelectedId(modelId === selectedId ? null : modelId);
  }

  // Variables
  const models = [
    {
      id: "cash",
      name: t("cash_name"),
      description: t("cash_description"),
      image: "/images/cash.png",
    },
    {
      id: "credit",
      name: t("credit_name"),
      description: t("credit_description"),
      image: "/images/payment-card.png",
    },
  ];

  async function handleNext() {
    // Validation to select a payment method
    if (!selectedId) {
      setError(t("select_payment_method"));
      return;
    }

    // Find selected payment model
    const model = models.find((m) => m.id === selectedId);

    if (!model) {
      setError(t("invalid_payment_method"));
      return;
    }

    setLoading(true);

    setError(null);

    try {
      // Validate address selection
      if (!selectedAddress) {
        setError(t("select_address"));
        return;
      }

      // Create the payload to be sent
      const payload: AddressPayload = {
        shippingAddress: {
          street: selectedAddress?.street,
          phone: selectedAddress?.phone,
          city: selectedAddress?.city,
          lat: selectedAddress?.lat,
          long: selectedAddress?.long,
        },
      };

      let result;

      // Handle payment type
      if (model.id === "cash") {
        result = await cashPayment(payload);

        console.log(result);
      } else if (model.id === "credit") {
        result = await applyCreditPaymentAction(payload);
      }

      if (result?.message === "success") {
        console.log(result);

        console.log("Successfully applied payment");

        // Redirect to stripe
        if (result.session?.url) {
          window.location.href = result.session.url;

          return;
        }

        // Redirect to all orders
        if (onNext) onNext();
        else router.push("/all-orders?status=success");
      }
    } catch (err) {
      // Handle unexpected error
      setError(err instanceof Error ? err.message : t("unexpected_error"));
    } finally {
      // Stop loading state
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 p-0">
      {" "}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {" "}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="flex w-16 shrink-0 items-center justify-center gap-2 bg-zinc-100 p-3.5 hover:bg-maroon-50 sm:w-20 rtl:flex-row-reverse dark:bg-softPink-300 hover:dark:bg-softPink-400"
        >
          {" "}
          <ArrowLeft className="h-5 w-5 shrink-0 rtl:rotate-180" />{" "}
          <span className="hidden sm:inline">{t("back")}</span>{" "}
        </Button>
        {/* Page title */}
        <h1 className="text-2xl font-semibold sm:text-3xl">{t("paymentMethod")}</h1>
      </div>
      {/* Main content area */}
      <div className="flex w-full flex-col gap-6 text-center">
        <ItemGroup className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {models.map((model) => {
            const active = selectedId === model.id;

            return (
              <Item
                key={model.id}
                variant={active ? "default" : "outline"}
                className={`cursor-pointer rounded-lg p-2 text-zinc-800 transition-shadow ${
                  active ? "border border-zinc-200 bg-zinc-50 text-maroon-600" : "hover:shadow-sm"
                }`}
                onClick={() => handleSelect(model.id)}
                aria-pressed={active}
                role="button"
              >
                {/* Payment method image with checkmark */}
                <ItemHeader className="relative flex w-full items-center justify-center">
                  <div className="relative w-full max-w-[195px]">
                    <Image
                      src={model.image}
                      alt={model.name}
                      width={195}
                      height={195}
                      className="aspect-square h-auto w-full rounded-sm object-cover"
                    />

                    {active && (
                      <div className="absolute right-2 top-2 rounded-full bg-white/80 p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </ItemHeader>

                {/* Payment method details */}
                <ItemContent className="flex flex-col items-center gap-2 px-1 sm:px-2">
                  <ItemTitle className="text-xl font-semibold sm:text-2xl">{model.name}</ItemTitle>

                  <ItemDescription className="text-center text-sm text-zinc-500">
                    {model.description}
                  </ItemDescription>
                </ItemContent>
              </Item>
            );
          })}
        </ItemGroup>

        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {error && <p className="text-center text-sm text-red-600 sm:text-end">{error}</p>}

          <Button
            onClick={handleNext}
            disabled={!selectedId || loading}
            variant="primary"
            className="w-full sm:w-48"
          >
            {loading ? t("processing") : t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
