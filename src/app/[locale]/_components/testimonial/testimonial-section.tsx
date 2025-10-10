import { GetTestimonial } from "@/lib/apis/testimonial.api";
import { TestemonialCard } from "./testemonial-card";

export default async function TestimonialSection() {
  const testimonials = await GetTestimonial();
  return (
    <div className="w-full h-[550px] bg-maroon-50 dark:bg-zinc-700 py-16">
      <TestemonialCard testimonials={testimonials} />
    </div>
  );
}
