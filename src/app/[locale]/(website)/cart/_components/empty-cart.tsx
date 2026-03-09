import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import React from "react";

export default function EmptyCart() {
  return (
    <Card className="border-rose-100">
      <CardContent className="flex flex-col items-center justify-center py-24 gap-4">
        <ShoppingBag className="w-16 h-16 text-rose-200" />
        <p className="text-gray-400 text-lg font-medium">Your cart is empty</p>
        <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white gap-2 rounded-xl">
          <Link href="/" className="w-full flex items-center justify-center gap-2 text-white">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
