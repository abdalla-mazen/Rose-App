"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslations } from "next-intl";
import AddressesList from "./addresses-list";
import { useAddresses } from "./address-modal";

export default function UserAddress({ setStep }: { setStep: (step: number) => void }) {
  // Translations
  const t = useTranslations();
  
  // Context
  const { setSelectedEditedAddressID } = useAddresses();

  const handleAddNewAddress = () => {
    setSelectedEditedAddressID(undefined); // Clear any previously selected address
    setStep(2);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-9 pb-4 border-zinc-200 border-b">
        <span className="font-bold text-zinc-800 text-3xl capitalize"> {t("my-addresses")}</span>
        <Button variant="secondary" className="w-44 capitalize" onClick={handleAddNewAddress}>
          {t("add-new-address")}
        </Button>
      </div>
      <AddressesList />
    </div>
  );
}
