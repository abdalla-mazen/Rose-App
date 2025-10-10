import { TestimonialApiResponse, Testimonial } from "../types/testimonial";

export async function GetTestimonial() {
  const res = await fetch(`https://flower.elevateegy.com/api/v1/testimonials`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const payload: ApiResponse<TestimonialApiResponse> = await res.json();
  if ("code" in payload) {
    throw new Error(payload.message);
  }

  let testimonials = payload.testimonials || [];

  if (testimonials.length === 1) {
    testimonials = Array(6).fill(testimonials[0]);
  }

  return testimonials;
}
