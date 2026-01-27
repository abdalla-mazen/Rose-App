"use server";



type VerifyOtpResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export async function verifyOtpAction({
  otp,
}: {
  otp: string;
}): Promise<VerifyOtpResponse> {
  if (!otp )
    return { success: false, message: "OTP and email are required" };

  try {
    const res = await fetch(`${process.env.API}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( { resetCode: otp } ),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "OTP verification failed",
      };
    }

    return {
      success: true,
      data,
      message: data?.message || "OTP verified successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
