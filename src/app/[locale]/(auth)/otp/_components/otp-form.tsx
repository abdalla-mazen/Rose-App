"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { redirect, Link } from "@/i18n/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useToast } from "@/hooks/use-toast";
import { createOtpSchema, type OtpSchemaType } from "@/lib/schemas/otp.schema";
import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import  OtpTimer from "./otp-timer";
import { useVerifyOtpMutation } from "@/hooks/use-otp";

type OtpFormProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
};

export default function OtpForm({ email, setEmail, setTimeLeft }: OtpFormProps) {
  const { toast } = useToast();
  const t = useTranslations("OTP");
  const otpSchema = createOtpSchema(t);

  // Restore email & timer from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("reset_email");
    if (!storedEmail) {
      redirect("/forgot-password");
      return;
    }
    setEmail(storedEmail);

    const storedTimer = localStorage.getItem("timer");
    const remainingTime = storedTimer ? parseInt(storedTimer, 10) : 60;
    setTimeLeft(remainingTime);
  }, [setEmail, setTimeLeft]);

  // Setup form validation
  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Handle OTP verification
  const verifyMutation = useVerifyOtpMutation({
    onSuccess: () => {
      toast({
        title: t("otp-success-title"),
        description: t("otp-success-description"),
      });
      localStorage.removeItem("timer");
      redirect("/reset-password");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("otp-error-title"),
        description: error.message || t("otp-error-description"),
      });
    },
  });

  // Form submit
  const onSubmit = (data: OtpSchemaType) => {
    if (!email) return;
    verifyMutation.mutate({ otp: data.otp, email });
  };

  if (!email) return null;

  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="font-semibold text-2xl">{t("otp-title")}</h1>

      <div className="flex flex-wrap items-center gap-2 mb-9 text-sm">
        <span>
          {t("otp-description")} <span className="font-medium">{email}</span>
        </span><Link href="/forgot-password" className="text-blue-700 text-sm underline hover:text-blue-800">
          {t("otp-edit")}
        </Link>
        <div className="after:block relative after:bg-zinc-200 w-full after:h-[1px]" />
      </div>

      {/* OTP form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col items-center">
          {/* OTP input */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className="gap-2">
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Timer */}
          <OtpTimer email={email} />

          {/* Verify button */}
          <Button
            type="submit"
            className="bg-red-800 hover:bg-red-800 w-full text-white"
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? t("otp-verifying") : t("otp-verify")}
          </Button>
                  <div className="after:block relative after:bg-zinc-200 after:mt-4 w-full after:h-[1px]" />

        </form>
      </Form>
    </div>
  );
}
