import { userToken } from "../utils/get-token";

export default async function getWishlist() {
  // Get token from cookies
  const token = await userToken();
  const response =  await fetch(`${process.env.API}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
