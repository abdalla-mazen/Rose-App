import React from "react";
import Services from "./_components/service";
import Occasion from "./_components/occasion";
import ValentineCarousel from "./_components/carousel";

export default function HeroPage() {
  return (
    <div className="space-y-16 px-20 py-16">
      <ValentineCarousel />
      <Occasion />
      <Services />
    </div>
  );
}
