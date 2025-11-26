"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import StepsProgress from "../../../../../components/shared/steps-progress";
import { AddNewAddressScheme, useAddNewAddressScheme } from "@/lib/schemas/new-address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddressMap from "./address-map";
import { useEffect, useState } from "react";
import { useAddNewAddress } from "../_hooks/use-add-new-address";
import { useSession } from "next-auth/react";
import { useEditUserAddress } from "../_hooks/use-edit-user-address";

// Types
type NewAddressFormProps = { setStep: (val: number) => void; editingAddress?: userAddress };
export default function NewAddressForm({ setStep, editingAddress }: NewAddressFormProps) {
  // Translations
  const t = useTranslations();

  // Scheme
  const scheme = useAddNewAddressScheme();

  // State
  const [selectedCoords, setSelectedCoords] = useState<Coordinates | null>(null);
  const [localStep, setLocalStep] = useState<number>(1);

  // Form
  const form = useForm<AddNewAddressScheme>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      city: "",
      address: "",
      phone: "",
    },
    resolver: zodResolver(scheme),
  });

  // Effects - Pre-fill form when editingAddress changes
  useEffect(() => {
    if (editingAddress) {
      form.reset({
        city: editingAddress.city ?? "",
        address: editingAddress.street ?? "",
        phone: editingAddress.phone ?? "",
      });
      setSelectedCoords({
        lat: +editingAddress.lat,
        lng: +editingAddress.long,
      });
    } else {
      // Reset form when not editing
      form.reset({
        city: "",
        address: "",
        phone: "",
      });
      setSelectedCoords(null);
      setLocalStep(1);
    }
  }, [editingAddress, form]);

  // Initialize mutation without payload - we'll pass data when calling mutate
  const addAddressMutation = useAddNewAddress();
  const editAddressMutation = useEditUserAddress();

  // Get user name from the session
  const { data } = useSession();

  // Handle step 1 submission
  const onSubmitStep1 = () => {
    // Form is valid, proceed to step 2
    setLocalStep(2);
  };

  // Handle final submission with coordinates
  const onFinalSubmit = async () => {
    if (!selectedCoords) {
      alert("Please select a location on the map");
      return;
    }

    try {
      // Get current form values
      const formValues = form.getValues();

      const AddressPayload: userAddress = {
        street: formValues.address,
        city: formValues.city,
        phone: formValues.phone,
        lat: selectedCoords.lat?.toString() ?? "",
        long: selectedCoords.lng?.toString() ?? "",
        username: data!.user.firstName, // Make sure this gets populated if needed
      };

      if (editingAddress) {
        await editAddressMutation.mutateAsync({ ...AddressPayload, _id: editingAddress._id });
      } else {
        // Call mutation with the payload
        await addAddressMutation.mutateAsync(AddressPayload);
      }

      // Only proceed if mutation was successful
      setStep(1);
    } catch (error) {
      console.error("Failed to add address:", error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <div className="p-2">
      {/* Step 1 - Address Details */}
      {localStep === 1 && (
        <div>
          <h2 className="mb-6 font-bold text-zinc-800 text-3xl capitalize">
            {editingAddress ? t("update-your-address") : t("add-new-address")}
          </h2>

          <div className="mb-4">
            <StepsProgress currentStep={1} />
          </div>

          <h3 className="mb-4 pb-3 border-zinc-200 border-b font-medium text-maroon-600 text-2xl capitalize">
            {t("enter-address-details")}
          </h3>

          <Form {...form}>
            <form
              id="address-form"
              onSubmit={form.handleSubmit(onSubmitStep1)}
              className="space-y-4 w-full"
            >
              {/* City field */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm capitalize">{t("city")}</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder={t("review-title-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm capitalize">{t("address")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("review-comment-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-11 font-medium text-sm capitalize">
                      {t("phone")}
                    </FormLabel>
                    <FormControl>
                      <PhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Next step - Use submit button for proper form validation */}
              <Button
                variant="primary"
                type="submit"
                disabled={
                  (!form.formState.isValid && !editingAddress) ||
                  form.formState.isSubmitting ||
                  !form.formState.isValid
                }
                className="mt-8 capitalize"
              >
                {t("next")}
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* Step 2 - Map Selection */}
      {localStep === 2 && (
        <div>
          <AddressMap
            setStep={setLocalStep}
            onSelect={setSelectedCoords}
            initialCenter={selectedCoords}
          />
          <div className="flex justify-between items-center translate-y-4">
            <Button
              variant="primary"
              onClick={onFinalSubmit}
              disabled={addAddressMutation.isPending || !selectedCoords}
              className="capitalize"
            >
              {addAddressMutation.isPending ? t("adding-address") : t("add-address")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
