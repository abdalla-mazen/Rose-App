import { MapPin, PenLine, Phone, Trash2 } from "lucide-react";
import DeleteAddressModal from "./delete-address-modal";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAddresses } from "./address-modal";

export default function AddressItem({ address }: { address: { [key: string]: string } }) {
  // Context
  const { setSelectedEditedAddressID, setStep } = useAddresses();

  const handleEditClick = () => {
    setSelectedEditedAddressID(address?._id);
    setStep(2);

    console.log("Setting address ID:", address?._id);
  };

  return (
    <li className="relative mx-auto pt-6 pr-9 pb-5 pl-4 border border-zinc-300 hover:border-maroon-600 rounded-lg w-11/12 min-h-32">
      <div>
        {/* Street */}
        <span className="-top-5 absolute bg-white px-2 font-semibold text-maroon-600 text-2xl capitalize">
          {address.street}
        </span>

        {/* Map pin and city */}
        <div className="flex justify-between items-center">
          {/* Map pin */}
          <div className="flex justify-between items-center gap-1.5">
            <span className="flex justify-center items-center bg-emerald-500 rounded-full w-8 h-8 text-white">
              <MapPin className="" />
            </span>

            {/* City */}
            <span className="font-semibold text-zinc-800 text-2xl">{address.city}</span>
          </div>

          {/* Phone number */}
          <div className="flex justify-between items-center">
            <Phone className="mr-1 w-5 h-5 text-zinc-800" />
            <span className="font-medium text-zinc-600 text-lg">{address.phone}</span>
          </div>
        </div>

        {/* Street */}
        <p className="bg-zinc-100 mt-5 px-3 py-1 rounded-full w-fit max-w-full font-medium text-zinc-800 text-base">
          {address.street}
        </p>

        {/* Edit and delete buttons */}
        <div className="top-5 -right-4 absolute flex flex-col items-center gap-4">
          <span
            onClick={handleEditClick}
            className="flex justify-center items-center bg-zinc-50 border border-zinc-400 rounded-full w-9 h-9 cursor-pointer"
          >
            <PenLine className="w-4 h-4" />
          </span>

          {/* Delete Address Modal */}
          <DeleteAddressModal
            trigger={
              <DialogTrigger asChild>
                <span className="flex justify-center items-center bg-red-600 rounded-full w-9 h-9 text-white cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </span>
              </DialogTrigger>
            }
            addressId={address._id}
          />
        </div>
      </div>
    </li>
  );
}
