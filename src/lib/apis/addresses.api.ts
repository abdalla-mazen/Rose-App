export async function getUserAddresses() {
  try {
    const res = await fetch("/api/user-addresses");

    if (!res.ok) {
      return { message: "Something went wrong", code: res.status };
    }

    const payload = await res.json();

    console.log(payload);

    return payload;
  } catch (error) {
    console.error("getUserAddresses error:", error);
    return { message: "Unexpected error occurred", code: 500 };
  }
}
