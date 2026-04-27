import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function EmptyCart() {
  const t = useTranslations();

  return (
    <section className="mx-auto">
      <Card className="border-rose-100">
        <CardContent className="flex flex-col items-center justify-center py-24 gap-4">
          {/* <ShoppingBag className="w-16 h-16 text-rose-200" /> */}
          <Image src="/assets/images/cart/empty.png" alt="empty-cart" width={100} height={100} />
          <p className="text-gray-400 text-lg font-medium">{t("cart-empty")}</p>
        </CardContent>
      </Card>
      <Button
        asChild
        className="mt-4 bg-maroon-600 hover:bg-maroon-700 md:w-1/3 w-full text-white gap-2 rounded-xl"
      >
        <Link href="/" className="w-full flex items-center justify-center gap-2 text-white">
          <ArrowLeft className="w-4 h-4" />
          {t("continue-shopping")}
        </Link>
      </Button>
    </section>
  );
}
