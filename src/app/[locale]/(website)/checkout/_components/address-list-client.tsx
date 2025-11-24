"use client";

import { useState } from "react";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { ShippingAddress } from "@/lib/types/address";
import { MoveRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddressSelectorProps {
  addresses: ShippingAddress[];
  onAddressSelect: (address: ShippingAddress) => void;
}

export default function AddressSelector({ addresses, onAddressSelect }: AddressSelectorProps) {
  // Translation
  const t = useTranslations();

  // State
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null);

  // Functions
  const handleNext = () => {
    if (selectedAddress) onAddressSelect(selectedAddress);
  };

  return (
    <div className="flex flex-col gap-4 w-full p-0">
      {/* Header */}
      <h1 className="text-3xl font-semibold">{t("address-header")}</h1>

      {/* Addresses */}
      {addresses.length === 0 ? (
        <div className="text-zinc-600 text-center py-8">{t("addAddress")}</div>
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
                  "cursor-pointer flex-col items-start gap-2 transition py-3.5 px-4 hover:border-maroon-600",
                  isSelected && "border-zinc-300 bg-maroon-600",
                )}
              >
                <ItemContent className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ItemTitle
                        className={cn(
                          "text-zinc-800 font-semibold text-2xl",
                          isSelected && "text-white",
                        )}
                      >
                        {address.city}
                      </ItemTitle>
                    </div>

                    <ItemDescription
                      className={cn(
                        "flex items-center gap-2 text-zinc-700",
                        isSelected && "text-white",
                      )}
                    >
                      <span
                        className={cn(
                          "bg-maroon-600 rounded-full h-8 w-8 flex items-center justify-center",
                          isSelected && "bg-white",
                        )}
                      >
                        <Phone
                          size={20}
                          className={cn("text-white", isSelected && "text-maroon-600")}
                        />
                      </span>
                      {address.phone}
                    </ItemDescription>
                  </div>

                  <ItemDescription
                    className={cn(
                      "text-zinc-800 bg-zinc-100 rounded-full px-3 py-1 mt-2 inline-block w-fit",
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
              "mt-4 text-white text-lg py-3 transition w-40 rounded-lg self-end flex items-center justify-center gap-4",
              selectedAddress
                ? "bg-maroon-600  hover:bg-maroon-700"
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
