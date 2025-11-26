"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserAddress from "./user-addresses";
import NewAddressForm from "./new-address-form";
import { useContext, useState } from "react";
import { AddressesContext } from "../_providers/addresses.provider";

// Context hook
export function useAddresses() {
  const context = useContext(AddressesContext);
  if (context === undefined) {
    throw new Error("useAddresses must be used within an AddressesProvider");
  }

  return context;
}

export default function AddressesModal() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Context
  const { data, selectedEditedAddressID, setStep, step } = useAddresses();

  const editingAddress = data?.addresses.find(
    (address: userAddress) => address._id === selectedEditedAddressID,
  );

  // Handle the modal: to set it's state to 1 even if it closed in another state
  const handleIsOpen = () => {
    if (!isOpen) {
      setStep(1);
    }
  };

  return (
    <Dialog onOpenChange={handleIsOpen}>
      {/* Dialog trigger */}
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>

      {/* Steps */}
      <DialogContent className="sm:max-w-[53rem]">
        {/* User Address */}
        {step === 1 && <UserAddress setStep={setStep} />}

        {/* New address form  */}
        {step === 2 && <NewAddressForm editingAddress={editingAddress} setStep={setStep} />}
      </DialogContent>
    </Dialog>
  );
}
