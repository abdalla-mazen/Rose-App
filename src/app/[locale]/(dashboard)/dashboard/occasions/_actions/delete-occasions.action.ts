"use server";

import { JSON_HEADER } from "@/lib/constants/shared.constant";
import getToken from "@/lib/utils/get-token";

export default async function deleteOccasionAction(id: string) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/occasions/${id}`, {
    method: "DELETE",
    headers: {
     ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload = await response.json();

  return payload;
}
