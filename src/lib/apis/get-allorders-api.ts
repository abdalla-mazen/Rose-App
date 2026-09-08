import { userToken } from "../utils/get-token";

export async function getAllOrders() {
  const token = await userToken();
  const response = await fetch(`${process.env.API}/orders`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
