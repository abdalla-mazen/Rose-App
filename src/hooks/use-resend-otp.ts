"use client";

import { resendOtpAction } from "@/lib/actions/resend-otp-action";
import { useMutation } from "@tanstack/react-query";

export function useResendOtp() {
  const mutation = useMutation({
    mutationFn: async (email: string) => await resendOtpAction(email),
  });

  return {
    resend: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
