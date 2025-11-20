"use client";

import StepsProgress from "../../../../components/shared/steps-progress";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// Get leaflet map with no ssr to work in client only
const Map = dynamic(() => import("./leaflet-map").then((m) => m.default), { ssr: false });

// Type
type AddressMapPropTypes = {
  setStep: (step: number) => void;
  onSelect: (coords: Coordinates) => void;
  initialCenter?: Coordinates | null;
};

export default function AddressMap({ setStep, onSelect, initialCenter }: AddressMapPropTypes) {
  // Translations
  const t = useTranslations();

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h2 className="mb-6 font-bold text-zinc-800 text-3xl capitalize">{t("add-new-address")}</h2>

      {/* Progress bar */}
      <div className="mb-4">
        <StepsProgress currentStep={2} />
      </div>

      {/* Find you location */}
      <div className="flex items-center gap-1.5 mb-4 pb-4 border-zinc-200 border-b">
        <div className="flex justify-center items-center bg-maroon-600 rounded-full w-9 h-9 text-white">
          <ArrowLeft
            className="w-5 h-5 rtl:rotate-180 cursor-pointer"
            onClick={() => setStep(1)}
            size={20}
          />
        </div>
        <span className="font-medium text-maroon-600 text-2xl capitalize">
          {t("find-your-location")}
        </span>
      </div>

      {/* Map container */}
      <Map
        initialCenter={initialCenter ?? undefined}
        onChange={onSelect}
        onSelect={onSelect}
        setStep={setStep}
      />
    </div>
  );
}
