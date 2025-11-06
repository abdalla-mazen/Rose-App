"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserAddress from "./user-addresses";
import NewAddressForm from "./new-address-form";
import { useState } from "react";

export default function AddressesModal() {
  const [step, setStep] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        {step === 2 && <NewAddressForm setStep={setStep} />}
      </DialogContent>
    </Dialog>
  );
}
