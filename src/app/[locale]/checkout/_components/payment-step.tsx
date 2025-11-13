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
  selectedAddress: ShippingAddress  | null;
  onBack: () => void;
  onNext?: () => void;
}

export default function PaymentStep({ selectedAddress, onBack, onNext }: PaymentStepProps) {
  // Translations
  const t = useTranslations();

  //  State
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
          _id: selectedAddress?._id || "",
        },
      };

      let result;

      // Handle payment type
      if (model.id === "cash") {
        result = await cashPayment(payload);
      } else if (model.id === "credit") {
        result = await applyCreditPaymentAction(payload);
      }

      if (result?.message === "success") {
        // Redirect to stripe
        if (result.session?.url) {
          window.location.href = result.session.url;

          return;
        }
        // Redirect to all orders
        if (onNext) onNext();
        else router.push("/allOrders");
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
    <div className="flex flex-col gap-4 w-full p-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="hover:bg-maroon-50 bg-zinc-100 p-3.5 w-20 flex items-center justify-center gap-2 rtl:flex-row-reverse"
        >
          <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
          {t("back")}
        </Button>

        {/* Page title */}
        <h1 className="text-3xl font-semibold">{t("paymentMethod")}</h1>
      </div>

      {/* Main content area */}
      <div className="flex w-full flex-col gap-6 text-center">
        <ItemGroup className="grid grid-cols-2 w-full gap-4">
          {models.map((model) => {
            const active = selectedId === model.id;
            return (
              <Item
                key={model.id}
                variant={active ? "default" : "outline"}
                className={`cursor-pointer p-2 transition-shadow  rounded-lg text-zinc-800 ${
                  active ? "border border-zinc-200 bg-zinc-50 text-maroon-600" : "hover:shadow-sm"
                }`}
                onClick={() => handleSelect(model.id)}
                aria-pressed={active}
                role="button"
              >
                {/* Payment method image with checkmark */}
                <ItemHeader className="flex items-center justify-center w-48 relative">
                  <Image
                    src={model.image}
                    alt={model.name}
                    width={195}
                    height={195}
                    className="aspect-square rounded-sm object-cover"
                  />
                  {active && (
                    <div className="absolute top-2 right-2 rounded-full bg-white/80 p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </ItemHeader>

                {/* Payment method details */}
                <ItemContent className="flex flex-col items-center gap-2 ">
                  <ItemTitle className=" text-2xl font-semibold">{model.name}</ItemTitle>
                  <ItemDescription className="text-center text-zinc-500 text-sm">
                    {model.description}
                  </ItemDescription>
                </ItemContent>
              </Item>
            );
          })}
        </ItemGroup>

        <div className="flex flex-col items-end  gap-2">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            onClick={handleNext}
            disabled={!selectedId || loading}
            variant="primary"
            className="w-48"
          >
            {loading ? t("processing") : t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
