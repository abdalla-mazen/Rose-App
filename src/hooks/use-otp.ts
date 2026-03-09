import { useMutation } from "@tanstack/react-query";
import { verifyOtpAction } from "@/lib/actions/otp.action";

type VerifyOtpData = {
  otp: string;
};

type VerifyOtpCallbacks = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useVerifyOtpMutation = (callbacks?: VerifyOtpCallbacks) => {
  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async (data: VerifyOtpData) => {
      const result = await verifyOtpAction(data);
      console.log(result);
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result;
    },
    onSuccess: callbacks?.onSuccess,
    onError: callbacks?.onError,
  });
};