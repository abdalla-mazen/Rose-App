"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import OtpTimer from "./otp-timer";
import { useVerifyOtpMutation } from "@/hooks/use-otp";
import { createOtpSchema, OtpSchemaType } from "@/lib/schemas/otp.schema";

type OtpFormProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
};

export default function OtpForm({ email, setEmail, setTimeLeft }: OtpFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations();
  const otpSchema = createOtpSchema(t);

  // Restore email & timer from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      router.push("/forget");
      return;
    }
    setEmail(storedEmail);

    const storedTimer = localStorage.getItem("timer");
    const remainingTime = storedTimer ? parseInt(storedTimer, 10) : 60;
    setTimeLeft(remainingTime);
  }, [setEmail, setTimeLeft, router]);

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
      router.push("/newpassword");
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: t("otp-error-title"),
        description: error.message || t("otp-error-description"),
      });
    },
  });

  // Form submit
  const onSubmit = (data: OtpSchemaType) => {
    verifyMutation.mutate(data);
  };

  if (!email) return null;

  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="font-semibold text-2xl">{t("otp-title")}</h1>

      {/* Description + Edit email */}
      <div className="text-sm mb-9 flex items-center gap-2 flex-wrap">
        <span>
          {t("otp-description")} <span className="font-medium">{email}</span>
        </span>
        <Link
          href="/forgot-password"
          className="text-blue-700 text-sm underline hover:text-blue-800"
        >
          {t("otp-edit")}
        </Link>
        <div className="relative w-full after:block after:h-[1px] after:bg-zinc-200" />
      </div>

      {/* OTP form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col items-center"
        >
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
            className="bg-red-800 text-white hover:bg-red-900 w-full"
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? t("otp-verifying") : t("otp-verify")}
          </Button>

          <div className="relative w-full after:block after:h-[1px] after:bg-zinc-200 after:mt-4" />
        </form>
      </Form>
    </div>
  );
}
