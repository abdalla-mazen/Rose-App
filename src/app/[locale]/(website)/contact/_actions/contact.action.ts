"use server";

export async function contactAction(data: Record<string, FormDataEntryValue>) {
  const response = await fetch(`${process.env.API}/contact`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await response.json();

  return payload;
}
