"use client";

import StepsProgress from "@/components/shared/steps-progress";
import { useState } from "react";
import PaymentStep from "./payment-step";
import AddressSelector from "./address-list-client";
import { ShippingAddress } from "@/lib/types/address";

interface CheckoutStepsProps {
  addresses: ShippingAddress[];
}

export default function CheckoutSteps({ addresses }: CheckoutStepsProps) {
  // State
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null);

  // Variables
  const totalSteps = 2;

  // Functions
  const handleAddressSelect = (address: ShippingAddress) => {
    setSelectedAddress(address);
    setStep(2);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Progress Bar */}
      <StepsProgress currentStep={step} totalSteps={totalSteps} />

      {/* Steps */}
      {step === 1 && (
        <AddressSelector addresses={addresses} onAddressSelect={handleAddressSelect} />
      )}
      {step === 2 && <PaymentStep selectedAddress={selectedAddress} onBack={() => setStep(1)} />}
    </div>
  );
}
