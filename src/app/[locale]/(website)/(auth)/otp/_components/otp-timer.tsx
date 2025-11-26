"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useResendOtp } from "@/hooks/use-resend-otp";
import { useTranslations } from "next-intl";

export default function OtpTimer({ email }: { email: string }) {
  const { toast } = useToast();
  const { resend, isPending } = useResendOtp();
  const t = useTranslations("OTP"); // ✅ Translation hook
  const [timeLeft, setTimeLeft] = useState(0);

  // Load timer from localStorage
  useEffect(() => {
    const storedTimer = localStorage.getItem("timer");
    const remaining = storedTimer ? parseInt(storedTimer, 10) : 60;
    setTimeLeft(remaining);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("timer");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("timer", newTime.toString());
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Resend OTP handler
  const handleResend = () => {
    resend(email, {
      onSuccess: (res: any) => {
        toast({ title: t("otp-resend-success") });
        setTimeLeft(60);
        localStorage.setItem("timer", "60");
      },
      onError: (err: any) => {
        toast({
          variant: "destructive",
          title: t("otp-resend-failed"),
          description: err.message || t("otp-resend-error"),
        });
      },
    });
  };

  return (
    <div className="flex justify-end w-full">
      {timeLeft > 0 ? (
        // Timer countdown
        <Button
          type="button"
          variant="link"
          disabled
          className="text-md font-medium no-underline"
        >
          {t("otp-resend-wait", { seconds: timeLeft })}
        </Button>
      ) : (
        // Resend button
        <Button
          type="button"
          variant="ghost"
          onClick={handleResend}
          disabled={isPending}
        >
          {isPending ? t("otp-resend-sending") : t("otp-resend")}
        </Button>
      )}
    </div>
  );
}
