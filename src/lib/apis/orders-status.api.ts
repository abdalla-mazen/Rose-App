export async function getOrdersStatus() {
  try {
    const res = await fetch(`/api/orders-status`);

    // Check the response
    if (!res.ok) {
      return { message: "Something went wrong", code: res.status };
    }

    const payload = await res.json();

    return payload;
  } catch (error) {
    return error;
  }
}
