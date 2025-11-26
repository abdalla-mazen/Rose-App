import { GetAddressesResponse, ShippingAddress } from "../types/address";
import getToken from "@/lib/utils/get-token";

export async function GetAddress(): Promise<ShippingAddress[]> {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/addresses`, {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload: GetAddressesResponse = await response.json();

  return payload.addresses;
}
