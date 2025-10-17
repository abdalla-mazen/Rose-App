"use client";

import Image from "next/image";
import OtpForm from "./otpform";
import { useState } from "react";
import { useRouter } from "next/navigation"; 


export default function OtpContainer() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);


  return (
    <div className="flex justify-center items-center bg-background px-4 min-h-screen text-foreground">
      <div className="flex flex-col justify-between items-center gap-10 p-6 w-[406px] min-h-[526px]">
        <Image src="/images/auth-top.png" alt="OTP Illustration" width={280} height={45} />
        <OtpForm email={email} setEmail={setEmail} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        <div className="text-sm font-medium text-center">
          Need help?{" "}
          <button
            onClick={() => (router.push("/en/contact"))}
            className="text-red-800 no-underline"
          >
            Contact us
          </button>
        </div>
        <Image src="/images/auth-b.png" alt="OTP Illustration" width={280} height={45} />
      </div>
    </div>
  );
}
