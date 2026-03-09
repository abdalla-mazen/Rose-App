import getCart from "@/lib/apis/get-cart.api";
import { CartResponse } from "@/lib/types/cart";
import CartClient from "./_components/cart-client";

export default async function Page() {
  const dataCart: CartResponse = await getCart();

  return <CartClient dataCart={dataCart} />;
}