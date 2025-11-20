"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function StepsProgress({
  currentStep,
  totalSteps = 2,
}: {
  currentStep: number;
  totalSteps?: number;
}) {
  // Progress value goes until the active indicator
  // Step 1 -> 0% (initial) → 50%
  // Step 2 -> 100%
  const value = (currentStep / totalSteps) * 100;

  return (
    <div className="relative">
      {/* Custom Progress Bar */}
      <div className="bg-zinc-200 rounded-full w-full h-1.5 overflow-hidden">
        <div
          className={cn("z-10 bg-maroon-600 h-full transition-all duration-300", {
            "w-1/3": value === 50,
            "w-2/3": value === 100,
          })}
        />
      </div>

      {/* Step Indicators */}
      <div className="absolute inset-0 flex justify-evenly items-center">
        {Array.from({ length: totalSteps }, (_, index: number) => {
          const stepNumber = index + 1;
          let variant: "destructive" | "subtle" = "subtle";

          if (currentStep >= stepNumber) {
            variant = "destructive";
          }

          return (
            <Button
              key={stepNumber}
              size="icon"
              variant={variant}
              className="rounded-full w-6 h-6 text-xs"
            >
              {stepNumber}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
