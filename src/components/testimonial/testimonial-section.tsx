import { GetTestimonial } from "@/lib/apis/testimonial.api";
import { TestemonialCard } from "./testemonial-card";

export default async function TestimonialSection() {
  const testimonials = await GetTestimonial();
  return (
    <div className="bg-maroon-50 dark:bg-zinc-700 py-16 w-full h-[550px]">
      <TestemonialCard testimonials={testimonials} />
    </div>
  );
}
