import AddressItem from "./address-item";
import AddressItemSkeleton from "../_skeletons/address-item.skeleton";
import { useContext } from "react";
import { AddressesContext } from "../_providers/addresses.provider";

export default function AddressesList() {
  // Data
  const addressesContext = useContext(AddressesContext);

  // Loading state
  if (addressesContext?.isLoading) {
    return <AddressItemSkeleton />;
  }

  return (
    <ul className="space-y-9 pt-4 h-80 overflow-x-hidden overflow-y-auto">
      {/* Mapping over the addresses */}
      {addressesContext?.data?.addresses.map((address: userAddress) => (
        <AddressItem address={address} key={address._id} />
      ))}
    </ul>
  );
}
