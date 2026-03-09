"use server";

import getToken from "@/lib/utils/get-token";

export default async function updateCategoryAction({ id, data }: { id: string; data: { name: string } }) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();
  return payload;
}