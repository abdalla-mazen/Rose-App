"use client";

import AddressesModal from "./_components/address-modal";
import { AddressesProvider } from "./_providers/addresses.provider";

export default function AddressesPage() {
  return (
    <div>
      <AddressesProvider>
        <AddressesModal />
      </AddressesProvider>
    </div>
  );
}
