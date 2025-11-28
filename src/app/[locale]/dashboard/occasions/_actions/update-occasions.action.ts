"use server";

import getToken from "@/lib/utils/get-token";

type UpdateOccasionData = {
  formData: FormData;
  id: string;
};

export default async function updateOccasionsAction({ formData, id }: UpdateOccasionData) {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/occasions/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token?.accessToken}`,
    },
    body: formData,
  });

  const payload = await response.json();
  return payload;
}
