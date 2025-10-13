import AuthBottomLink from "@/components/shared/auth/auth-bottom-link";
import AuthTitle from "@/components/shared/auth/auth-title";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="text-center">
      <AuthTitle title="Become part of our family!" />

      <div className=""></div>

      <AuthBottomLink
        message="Already have an account?"
        linkHref="/auth/signin"
        linkText="Login"
      />
    </main>
  );
}
