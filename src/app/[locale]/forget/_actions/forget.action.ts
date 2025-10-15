"use server";

export async function forgetAction(data: Record<string, FormDataEntryValue>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/forgotPassword`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload = await response.json();
  console.log(process.env.NEXT_PUBLIC_API);
  return payload;
}
