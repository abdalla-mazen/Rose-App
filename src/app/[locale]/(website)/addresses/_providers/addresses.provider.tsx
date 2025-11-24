import { useUserAddresses } from "../_hooks/use-user-addresses";
import { createContext, useState } from "react";

// Types
type AddressesContextProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isLoading: boolean;
  selectedEditedAddressID: string | undefined;
  setSelectedEditedAddressID: React.Dispatch<React.SetStateAction<string | undefined>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

// Create context
const AddressesContext = createContext<AddressesContextProps | undefined>(undefined);

function AddressesProvider({ children }: { children: React.ReactNode }) {
  // Data
  const { data, isLoading } = useUserAddresses();
  const [selectedEditedAddressID, setSelectedEditedAddressID] = useState<string | undefined>(
    undefined,
  );
  const [step, setStep] = useState<number>(1);

  // Value
  const value = {
    data,
    isLoading,
    setSelectedEditedAddressID,
    selectedEditedAddressID,
    step,
    setStep,
  };

  return <AddressesContext.Provider value={value}>{children}</AddressesContext.Provider>;
}

export { AddressesContext, AddressesProvider };
