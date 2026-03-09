"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleX, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactValues, useContactSchema } from "@/lib/schemas/contact.schema";
import useContact from "../_hooks/use-contact";
import ErrorMessage from "@/components/shared/error-message";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  // Translation
  const t = useTranslations();

  // Contact Hook
  const { contact, error, isPending } = useContact();

  // Form
  const schema = useContactSchema();
  const form = useForm<ContactValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Submit
  const onSubmit = (data: ContactValues) => {
    contact(data);
  };

  // Handle Error
  const firstError = form.formState.errors.name?.message || form.formState.errors.email?.message;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="rounded-2xl shadow-lg">
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-serif font-semibold">{t("sendMessage")}</h2>

            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">{t("name")}</Label>
                <Input {...form.register("name")} placeholder={t("namePlaceholder")} />
              </div>

              <div>
                <Label className="text-sm">{t("email")}</Label>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
            </div>

            {/* Top Error Alert */}
            {firstError && (
              <>
                <div className="relative my-3 w-full">
                  <CircleX className="left-1/2 z-10 absolute bg-zinc-50 dark:bg-zinc-800 rounded-full w-fit text-maroon-600 dark:text-softPink-300 -translate-x-1/2 -translate-y-1/2" />
                </div>

                <Alert className="dark:bg-zinc-800 mb-4 bg-zinc-50 border-maroon-600 dark:border-softPink-300 text-center">
                  <AlertDescription className="text-zinc-700 bg-zinc-50 dark:text-zinc-50">
                    {firstError}
                  </AlertDescription>
                </Alert>
              </>
            )}

            {/* Phone */}
            <div>
              <Label className="text-sm">{t("phone")}</Label>
              <Input {...form.register("phone")} placeholder={t("phonePlaceholder")} />
            </div>

            {/* Subject */}
            <div>
              <Controller
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <>
                    <Label className="text-sm">{t("subject")}</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectSubject")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">{t("subjectOrder")}</SelectItem>
                        <SelectItem value="custom">{t("subjectCustom")}</SelectItem>
                        <SelectItem value="support">{t("subjectSupport")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
              />
            </div>

            {/* Message */}
            <div>
              <Label className="text-sm">{t("message")}</Label>
              <Textarea
                {...form.register("message")}
                placeholder={t("messagePlaceholder")}
                className="min-h-[120px]"
              />
            </div>

            {/* API Error */}
            <ErrorMessage message={error as unknown as string} />

            {/* Submit Button */}
            <Button
              disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
              type="submit"
              className="w-full bg-maroon-600 hover:bg-maroon-700 text-white rounded-xl dark:bg-softPink-500 dark:hover:bg-softPink-600"
            >
              {t("send")}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
