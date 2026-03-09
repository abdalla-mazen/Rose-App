import { userToken } from "../utils/get-token";

export default async function getCart() {
    const token = await userToken();
    const response =  await fetch(`${process.env.API}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const payload = await response.json();
    return payload;
}