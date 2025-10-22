import { getToken } from "@/lib/utils/get-token";

export async function POST(data: SendReview) {
  // Get token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  console.log("The token is ", token);

  // Check if no token
  if (!token) {
    throw new Error(
      "Authentication required. Please log in to submit a review."
    );
  }

  console.log("API URL:", process.env.NEXT_PUBLIC_API);
  console.log("Body:", data);
  console.log("Token:", token ? "Exists" : "Missing");

  // Fetch
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/reviews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    throw new Error("Failed to submit review");
  }

  const payload = await response.json();

  return payload;
}
