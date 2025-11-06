import { useUserAddresses } from "../_hooks/use-user-addresses";
import AddressItem from "./address-item";
import AddressItemSkeleton from "../_skeletons/address-item.skeleton";

export default function AddressesList() {
  // Data
  const { data, isLoading } = useUserAddresses();

  // Loading state
  if (isLoading) {
    return <AddressItemSkeleton />;
  }

  return (
    <ul className="space-y-9 pt-4 h-80 overflow-x-hidden overflow-y-auto">
      {/* Mapping over the addresses */}
      {data?.addresses.map((address: userAddress) => (
        <AddressItem address={address} key={address._id} />
      ))}
    </ul>
  );
}
