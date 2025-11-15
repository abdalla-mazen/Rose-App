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
import { accountProfileSchema, AccountProfileValues } from "@/lib/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, LoaderCircle, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "@/components/shared/error-message";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteMyAccount, useEditprofile } from "../_hooks/use-editprofile";
import { toast } from "sonner";
import { uploadPhotoAction } from "../_actions/upload-photo.action";

type Props = {
  userData: UserData | null;
};

export default function AccountEditProfile({ userData }: Props) {
  // Translations
  const t = useTranslations();

  // Hooks
  const [preview, setPreview] = useState(
    userData?.photo || "/assets/images/account/default-profile.png",
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<AccountProfileValues>({
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      gender: userData?.gender,
    },
    resolver: zodResolver(accountProfileSchema),
  });

  const { editProfile, editProfileError, editProfilePending } = useEditprofile();
  const { deleteMyAccount, deleteMyAccountError, deleteMyAccountPending } = useDeleteMyAccount();

  // Change photo function
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    const formData = new FormData();
    formData.append("photo", file);

    const result = await uploadPhotoAction(formData);

    if (result.success) {
      toast.success(t("photo-success"), { position: "bottom-right", duration: 1500 });
    } else {
      toast.error(result.message || t("photo-error"), { position: "bottom-right", duration: 1500 });
    }
  };

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   // Display photo before upload
  //   const localPreview = URL.createObjectURL(file);
  //   setPreview(localPreview);

  //   const formData = new FormData();
  //   formData.append("photo", file);

  //   try {
  //     const res = await fetch("/api/upload-photo", {
  //       method: "PUT",
  //       body: formData,
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message || "Upload failed");
  //     }

  //     toast.success(t("photo-success"), {
  //       position: "bottom-right",
  //       duration: 1500,
  //     });
  //   } catch (err) {
  //     console.error("Upload error:", err);
  //     toast.error(t("photo-error"), {
  //       position: "bottom-right",
  //       duration: 1500,
  //     });
  //   }
  // };

  const onSubmit: SubmitHandler<AccountProfileValues> = async (data) => {
    const { gender, ...filteredData } = data;
    editProfile(filteredData);
  };

  return (
    <Form {...form}>
      <form className="text-start" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Profile photo container */}
        <div className="flex items-center gap-4">
          {/* Profile photo */}
          <div className="group relative mb-4 rounded-full w-32 h-32">
            <Image
              src={preview}
              alt="Default user profile photo"
              fill
              className="rounded-full object-cover"
            />

            {/* Overlay for upload icon */}
            <div
              className="right-0 bottom-0 absolute bg-zinc-50 p-1 border border-zinc-200 rounded-full dark:text-black cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUpload className="w-5 h-5" />
            </div>

            {/* Hidden file input */}
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Text info */}
          <div>
            <h3 className="mb-4 font-semibold text-xl">{t("upload-photo")}</h3>
            <p className="text-zinc-500">{t("upload-photo-paragraph")}</p>
          </div>
        </div>

        {/* Names */}
        <div className="flex gap-5">
          <div className="w-1/2">
            {/* First name */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize">{t("firstname")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} placeholder="seif" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            {/* Last name */}
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize">{t("lastname")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} placeholder="eldin" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="pt-2.5">
              {/* Label */}
              <FormLabel className="capitalize">{t("email")}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input {...field} placeholder="user@example.com" />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="pt-2.5">
              {/* Label */}
              <FormLabel className="capitalize">{t("phone")}</FormLabel>

              {/* Field */}
              <FormControl>
                <PhoneInput {...field} placeholder="01005493046" />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem className="pt-2.5">
              <FormLabel className="capitalize">{t("gender")}</FormLabel>
              <FormControl>
                <Input value={field.value === "male" ? t("male") : t("female")} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Edit profile error */}
        {editProfileError && <ErrorMessage message={editProfileError.message} />}

        {/* Delete account error */}
        {deleteMyAccountError && <ErrorMessage message={deleteMyAccountError.message} />}

        <div className="flex justify-between mt-20">
          {/* Delete account modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-56 text-maroon-500 capitalize">
                {t("delete-my-account")}
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center bg-[#2E2E300D] dark:bg-zinc-400 m-auto rounded-full w-28 h-28">
                  <div className="flex justify-center items-center bg-[#2E2E3026] dark:bg-zinc-600 rounded-full w-16 h-16">
                    <Trash className="w-7 h-7 dark:text-black" />
                  </div>
                </DialogTitle>

                <DialogDescription className="pt-7">
                  <h1 className="font-semibold text-[#2E2E30] dark:text-zinc-50 text-xl text-center">
                    {t("delete-account-confirm")}
                  </h1>
                  <p className="mt-3 text-maroon-500 text-center">
                    {t("delete-account-paragraph")}
                  </p>
                </DialogDescription>

                <div className="flex gap-2.5 pt-12">
                  {/* Cancel button*/}
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="bg-zinc-50 hover:bg-zinc-200 border border-zinc-300 font-medium text-zinc-800"
                    >
                      {t("nope")}
                    </Button>
                  </DialogClose>

                  {/* Delete button */}
                  <Button
                    type="button"
                    disabled={deleteMyAccountPending}
                    className="bg-red-600 hover:bg-red-700 w-full dark:text-zinc-50 capitalize"
                    onClick={() => deleteMyAccount()}
                  >
                    {t("yes-delete")}
                    {deleteMyAccountPending && <LoaderCircle className="animate-spin" />}
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Save changes button */}
          <Button
            type="submit"
            disabled={editProfilePending}
            className="bg-maroon-600 hover:bg-maroon-700 rounded-xl w-56 dark:text-white capitalize"
          >
            {t("save-changes")} {editProfilePending && <LoaderCircle className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
