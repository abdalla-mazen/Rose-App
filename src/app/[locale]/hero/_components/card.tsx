import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CardS() {
  return (
    <div>
      {/* Gift card container */}
      <Card className="text-white w-[280px] h-[420px] rounded-2xl overflow-hidden flex flex-col justify-between relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/images/gifts.png" alt="Gift boxes" fill className="object-cover" />
          <div className="absolute inset-0" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-end h-full p-6">
          {/* Price tag */}
          <p className="text-sm bg-red-50 text-red-800 w-fit px-2 rounded-full mb-2">
            Starting from 10.99 EGP
          </p>

          {/* Title */}
          <h3 className="text-xl font-semibold leading-tight mb-2">
            Special Gifts For The People You Love
          </h3>

          {/* button */}
          <Button className="bg-red-50 text-red-800 font-semibold hover:bg-red-50 rounded-xl px-5 mt-5 w-fit">
            Shop Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
