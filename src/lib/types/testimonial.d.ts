export interface Testimonial {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    photo: string;
  };
  rating: number;
  content: string;
  createdAt: string;
}

export interface TestimonialApiResponse {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  testimonials: Testimonial[];
}
