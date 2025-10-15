"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useMutation } from "@tanstack/react-query";
import Divider from "./divider";
import { useToast } from "@/hooks/use-toast";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

export default function OTPPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isResending, setIsResending] = useState(false);

  // Get email & timer from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("reset_email");
    if (!storedEmail) {
      router.push("/en/forgot-password");
      return;
    }
    setEmail(storedEmail);

    const storedTimer = localStorage.getItem("timer");
    const remainingTime = storedTimer ? parseInt(storedTimer, 10) : 60;
    setTimeLeft(remainingTime);
  }, [router]);


  // test
  //   useEffect(() => {
  //   setEmail("test@example.com");
  //   setTimeLeft(60);
  // }, []);

  // Countdown timer (with persistence)
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

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Verify OTP
  const verifyMutation = useMutation({
    mutationFn: async (data: { otp: string; email: string }) => {
      const res = await fetch(
        "https://flower.elevateegy.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resetCode: data.otp,
            email: data.email,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Invalid OTP");
      return result;
    },
    onSuccess: () => {
      toast({ title: "OTP verified successfully!" });
      localStorage.removeItem("timer");
      router.push("/en/reset-password");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to verify OTP",
        description: error.message || "Something went wrong",
      });
    },
  });

  // Resend OTP
  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    try {
      const res = await fetch(
        "https://flower.elevateegy.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to resend code");

      toast({ title: "New code sent to your email" });
      setTimeLeft(60);
      localStorage.setItem("timer", "60");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Failed to resend OTP",
        description: err.message,
      });
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = (data: z.infer<typeof otpSchema>) => {
    if (!email) return;
    verifyMutation.mutate({ otp: data.otp, email });
  };

  if (!email) return null;

  return (
    <div className="flex justify-center items-center bg-background px-4 min-h-screen text-foreground">
      <div className="flex flex-col justify-between items-center gap-10 p-6 w-[406px] min-h-[526px]">
        <Image src="/images/otp.png" alt="OTP Illustration" width={280} height={45} />

        <div className="w-full">
          <h1 className="font-semibold text-2xl">Enter the OTP Code</h1>

          <div className="text-sm mb-9 flex items-center gap-2 flex-wrap">
            <span>
              We have sent a 6-digit code to <span>{email}</span>
            </span>
            <button
              onClick={() => router.push("/en/forgot-password")}
              className="text-blue-700 text-sm underline"
            >
              Edit
            </button>
            <Divider />
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col items-center"
          >
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              {...form.register("otp")}
              value={form.watch("otp")}
              onChange={(value) => form.setValue("otp", value)}
            >
              <InputOTPGroup className="gap-2">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {form.formState.errors.otp && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.otp.message}
              </p>
            )}

            <div className="flex justify-end w-full">
              {timeLeft > 0 ? (
                <Button
                  type="button"
                  variant="link"
                  disabled
                  className="text-md font-medium no-underline"
                >
                  Send a new code ({timeLeft}s)
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResend}
                  disabled={isResending}
                >
                  {isResending ? "Sending..." : "Send a new code"}
                </Button>
              )}
            </div>

            <Button
              type="submit"
              className="bg-red-800 text-white hover:bg-red-800 w-full"
              disabled={verifyMutation.isPending}
            >
              {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
            </Button>

            <Divider className="w-full" />
          </form>
        </div>

        <div className="text-sm font-medium text-center">
          Need help?{" "}
          <button
            onClick={() => router.push("/en/contact")}
            className="text-red-800 no-underline"
          >
            Contact us
          </button>
        </div>

        <Image src="/images/otp.png" alt="OTP Illustration" width={280} height={45} />
      </div>
    </div>
  );
}
