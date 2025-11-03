import { JSON_HEADER } from "../constants/shared.constant";
import getToken from "../utils/get-token";

// Fetch products API in best selling component
export async function GetUserDataApi() {
  // Get token
  const token = await getToken();

  const response = await fetch(`${process.env.API}/auth/profile-data`, {
    cache: "no-store",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload: ApiResponse<{ user: UserData }> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.user;
}
