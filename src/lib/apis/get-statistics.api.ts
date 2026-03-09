// import getToken from "../utils/get-token";

import getToken from "../utils/get-token";

export async function getStatics() {
  const token = await getToken();

  console.log("Token object:", token);
  console.log("Access Token:", token?.accessToken);

  if (!token) return null;

  const response = await fetch(`https://flower.elevateegy.com/api/v1/statistics/overall`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const payload = await response.json();
  return payload;
}
