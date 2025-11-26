"use server";

export async function newPassword(data: Record<string, FormDataEntryValue>) {
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await response.json();
  return payload;
}
