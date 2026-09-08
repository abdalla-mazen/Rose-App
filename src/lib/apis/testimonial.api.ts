export async function GetTestimonial() {
  const res = await fetch("https://flower.elevateegy.com/api/v1/testimonials", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payload: ApiResponse<TestimonialApiResponse> = await res.json();

  if (!("testimonials" in payload)) {
    throw new Error(
      "message" in payload && typeof payload.message === "string"
        ? payload.message
        : "Failed to fetch testimonials",
    );
  }

  let testimonials = payload.testimonials || [];

  if (testimonials.length === 1) {
    testimonials = Array(6).fill(testimonials[0]);
  }

  const testimonialsWithKeys = testimonials.map((item, index) => ({
    ...item,
    __key: `${item._id || "fake"}-${index}`,
  }));

  return testimonialsWithKeys;
}
