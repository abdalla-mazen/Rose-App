"use server";

import getToken from "@/lib/utils/get-token";

export default async function deleteOccasionAction(id: string) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/occasions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload = await response.json();
  return payload;
}
