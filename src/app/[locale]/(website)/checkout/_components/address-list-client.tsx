"use client";

import { useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { ShippingAddress } from "@/lib/types/address";
import { MoveRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddressSelectorProps {
  addresses: ShippingAddress[];
  onAddressSelect: (address: ShippingAddress) => void;
}

export default function AddressSelector({
  addresses,
  onAddressSelect,
}: AddressSelectorProps) {
  // Translation
  const t = useTranslations();

  // State
  const [selectedAddress, setSelectedAddress] =
    useState<ShippingAddress | null>(null);

  // Functions
  const handleNext = () => {
    if (selectedAddress) onAddressSelect(selectedAddress);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-0">
      {/* Header */}
      <h1 className="text-2xl font-semibold sm:text-3xl">
        {t("address-header")}
      </h1>

      {/* Addresses */}
      {addresses.length === 0 ? (
        <div className="py-8 text-center text-zinc-600">
          {t("addAddress")}
        </div>
      ) : (
        <>
          {addresses.map((address) => {
            const isSelected = selectedAddress?._id === address._id;

            return (
              <Item
                key={address._id}
                variant="outline"
                onClick={() => setSelectedAddress(address)}
                className={cn(
                  "cursor-pointer flex-col items-start gap-2 px-3 py-3 transition sm:px-4 sm:py-3.5 dark:bg-softPink-300 hover:border-maroon-600 dark:hover:border-softPink-300",
                  isSelected &&
                    "border-zinc-300 bg-maroon-600 dark:bg-softPink-500",
                )}
              >
                <ItemContent className="w-full min-w-0">
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <ItemTitle
                        className={cn(
                          "break-words text-xl font-semibold text-zinc-800 sm:text-2xl",
                          isSelected && "text-white",
                        )}
                      >
                        {address.city}
                      </ItemTitle>
                    </div>

                    <ItemDescription
                      className={cn(
                        "flex items-center gap-2 break-all text-zinc-700 sm:break-normal",
                        isSelected && "text-white",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon-600 dark:bg-softPink-500",
                          isSelected && "bg-white",
                        )}
                      >
                        <Phone
                          size={20}
                          className={cn(
                            "text-white",
                            isSelected && "text-maroon-600",
                          )}
                        />
                      </span>

                      {address.phone}
                    </ItemDescription>
                  </div>

                  <ItemDescription
                    className={cn(
                      "mt-2 inline-block w-fit max-w-full break-words rounded-full bg-zinc-100 px-3 py-1 text-zinc-800",
                      isSelected && "bg-zinc-800 text-white",
                    )}
                  >
                    {address.street}
                  </ItemDescription>
                </ItemContent>
              </Item>
            );
          })}

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={!selectedAddress}
            className={cn(
              "mt-4 flex w-full items-center justify-center gap-4 rounded-lg py-3 text-lg text-white transition sm:w-40 sm:self-end",
              selectedAddress
                ? "bg-maroon-600 hover:bg-maroon-700 dark:bg-softPink-700 hover:dark:bg-softPink-800"
                : "bg-gray-300 cursor-not-allowed",
            )}
          >
            {t("next")}
            <MoveRight className="rtl:rotate-180" size={20} />
          </Button>
        </>
      )}
    </div>
  );
}