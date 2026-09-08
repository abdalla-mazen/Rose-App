"use server";

import getToken from "@/lib/utils/get-token";

export interface occasions {
  name: string;
  image: File;
}

export default async function addOccasions(formData: FormData) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/occasions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: formData,
  });
  const payload = await response.json();

  return payload;
}