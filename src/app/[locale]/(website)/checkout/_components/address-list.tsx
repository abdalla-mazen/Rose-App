import { GetAddress } from "@/lib/apis/get-address.api";
import AddressSelector from "./address-list-client";
import { ShippingAddress } from "@/lib/types/address";

interface AddressesListProps {
  onAddressSelect: (address: ShippingAddress) => void;
}

export default async function AddressesList({ onAddressSelect }: AddressesListProps) {
  // Fetch addresses
  const addresses: ShippingAddress[] = (await GetAddress()) ?? [];

  return <AddressSelector addresses={addresses} onAddressSelect={onAddressSelect} />;
}
