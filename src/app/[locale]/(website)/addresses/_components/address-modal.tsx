// "use client";

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import UserAddress from "./user-addresses";
// import NewAddressForm from "./new-address-form";
// import { useContext, useState } from "react";
// import { AddressesContext } from "../_providers/addresses.provider";

// // Context hook
// export function useAddresses() {
//   const context = useContext(AddressesContext);
//   if (context === undefined) {
//     throw new Error("useAddresses must be used within an AddressesProvider");
//   }

//   return context;
// }

// export default function AddressesModal() {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   // Context
//   const { data, selectedEditedAddressID, setStep, step } = useAddresses();

//   const editingAddress = data?.addresses.find(
//     (address: userAddress) => address._id === selectedEditedAddressID,
//   );

//   // Handle the modal: to set it's state to 1 even if it closed in another state
//   const handleIsOpen = () => {
//     if (!isOpen) {
//       setStep(1);
//     }
//   };

//   return (
//     <Dialog onOpenChange={handleIsOpen}>
//       {/* Dialog trigger */}
//       {/* <DialogTrigger asChild>
//         <Button variant="outline">Open Dialog</Button>
//       </DialogTrigger> */}
// <DialogTrigger asChild>
//   <button
//     type="button"
//     className="group w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-maroon-200 hover:shadow-lg"
//   >
//     <div className="flex items-center gap-4">
//       {/* Icon */}
//       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600 transition-colors group-hover:bg-maroon-600 group-hover:text-white">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 4v16m8-8H4"
//           />
//         </svg>
//       </div>

//       {/* Content */}
//       <div className="flex-1">
//         <h3 className="font-semibold text-gray-900">
//           Add New Address
//         </h3>

//         <p className="mt-1 text-sm text-gray-500">
//           Add a new delivery address
//         </p>
//       </div>

//       {/* Arrow */}
//       <div className="text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-maroon-600">
//         →
//       </div>
//     </div>
//   </button>
// </DialogTrigger>

//       {/* Steps */}
//       <DialogContent className="sm:max-w-[53rem]">
//         {/* User Address */}
//         {step === 1 && <UserAddress setStep={setStep} />}

//         {/* New address form  */}
//         {step === 2 && <NewAddressForm editingAddress={editingAddress} setStep={setStep} />}
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserAddress from "./user-addresses";
import NewAddressForm from "./new-address-form";
import { useContext, useState } from "react";
import { AddressesContext } from "../_providers/addresses.provider";
import { MapPin, Plus, ArrowRight } from "lucide-react";

// Context hook
export function useAddresses() {
  const context = useContext(AddressesContext);

  if (context === undefined) {
    throw new Error("useAddresses must be used within an AddressesProvider");
  }

  return context;
}

export default function AddressesModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, selectedEditedAddressID, setStep, step } = useAddresses();

  const editingAddress = data?.addresses.find(
    (address: userAddress) => address._id === selectedEditedAddressID,
  );

  const handleIsOpen = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      setStep(1);
    }
  };

  return (
    <div className="min-h-[500px] border-b  bg-gray-50 p-6 transition-colors dark:bg-[#18181b] md:p-10">
      {/* Page Header */}
      <div className="mb-8">
        {/* Location Icon */}
        <div
          className="
        mb-5 flex h-14 w-14 items-center justify-center rounded-2xl
        bg-rose-50 text-rose-500
        dark:bg-rose-950/40 dark:text-rose-400
      "
        >
          <MapPin className="h-7 w-7" />
        </div>

        <h1
          className="
        text-3xl font-bold tracking-tight
        text-gray-900
        dark:text-white
      "
        >
          My Addresses
        </h1>

        <p
          className="
        mt-2 max-w-xl text-sm
        text-gray-500
        dark:text-zinc-400
      "
        >
          Manage your delivery addresses and add new locations for your orders.
        </p>
      </div>

      {/* Add Address */}
      <Dialog open={isOpen} onOpenChange={handleIsOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="
          group w-full rounded-2xl border p-6 text-left
          bg-white border-gray-200 shadow-sm
          transition-all duration-300
          hover:-translate-y-1
          hover:border-rose-200
          hover:shadow-lg

          dark:bg-[#222228]
          dark:border-[#34343d]
          dark:shadow-black/10
          dark:hover:border-rose-500/40
          dark:hover:bg-[#27272e]
          dark:hover:shadow-black/20
        "
          >
            <div className="flex items-center gap-5">
              {/* Plus Icon */}
              <div
                className="
              flex h-14 w-14 shrink-0 items-center justify-center
              rounded-2xl
              bg-rose-50 text-rose-500
              transition-all duration-300

              group-hover:bg-rose-500
              group-hover:text-white
              group-hover:scale-105

              dark:bg-rose-950/40
              dark:text-rose-400
              dark:group-hover:bg-rose-500
              dark:group-hover:text-white
            "
              >
                <Plus className="h-7 w-7" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2
                  className="
                text-lg font-semibold
                text-gray-900
                dark:text-white
              "
                >
                  Add New Address
                </h2>

                <p
                  className="
                mt-1 text-sm
                text-gray-500
                dark:text-zinc-400
              "
                >
                  Add a new delivery address to your account
                </p>
              </div>

              {/* Arrow */}
              <div
                className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-gray-100 text-gray-400
              transition-all duration-300

              group-hover:bg-rose-50
              group-hover:text-rose-500

              dark:bg-[#2d2d35]
              dark:text-zinc-500
              dark:group-hover:bg-rose-500/10
              dark:group-hover:text-rose-400
            "
              >
                <ArrowRight
                  className="
                h-5 w-5
                transition-transform duration-300
                group-hover:translate-x-1
              "
                />
              </div>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent
          className="
        rounded-2xl
        border-gray-200
        bg-white

        dark:border-[#34343d]
        dark:bg-[#222228]
      "
        >
          {step === 1 && <UserAddress setStep={setStep} />}

          {step === 2 && <NewAddressForm editingAddress={editingAddress} setStep={setStep} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
