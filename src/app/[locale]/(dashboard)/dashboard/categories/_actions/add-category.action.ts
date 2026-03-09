"use server";

import getToken from "@/lib/utils/get-token";

export default async function addCategoryAction(data: { name: string }) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();
  return payload;
}