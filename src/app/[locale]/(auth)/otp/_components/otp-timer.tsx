"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function OtpTimer({ email }: { email: string }) {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const storedTimer = localStorage.getItem("timer");
    const remaining = storedTimer ? parseInt(storedTimer, 10) : 60;
    setTimeLeft(remaining);
  }, []);

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

  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await fetch(`${API_URL}/auth/forgotPasswords`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
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

  return (
    <div className="flex justify-end w-full">
      {timeLeft > 0 ? (
        <Button type="button" variant="link" disabled className="text-md font-medium no-underline">
          Send a new code ({timeLeft}seconds)
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
  );
}
