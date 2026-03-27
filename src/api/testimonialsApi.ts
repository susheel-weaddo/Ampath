import axios from 'axios';
import { apiClient } from './client';

export interface TestimonialApiItem {
  id: number;
  image: string;
  testimonial: string;
  customer: string;
  designation: string;
  created_at: string;
  updated_at: string;
  rating: number;
  imageurl: string;
}

export interface TestimonialsApiResponse {
  result: string;
  status: number;
  code: number;
  message: string;
  data: {
    testimonial: TestimonialApiItem[];
    count: number;
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  designation: string;
  rating: number;
  imageurl: string;
  createdAt: string;
}

function normalizeTestimonial(item: TestimonialApiItem): Testimonial {
  return {
    id: String(item.id),
    quote: item.testimonial || '',
    name: item.customer || 'Anonymous',
    designation: item.designation || '',
    rating: item.rating || 0,
    imageurl: item.imageurl || '',
    createdAt: item.created_at || '',
  };
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const apiMessage =
      typeof error.response?.data?.message === 'string'
        ? error.response.data.message
        : typeof error.response?.data?.error === 'string'
          ? error.response.data.error
          : null;

    return apiMessage || error.message || 'Something went wrong while fetching testimonials.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while fetching testimonials.';
}

export async function getTestimonials(city: string): Promise<Testimonial[]> {
  const response = await apiClient.get<TestimonialsApiResponse>('home', {
    params: {
      city,
      type: 'testimonial',
    },
  });

  const items = response.data?.data?.testimonial ?? [];
  return items.map(normalizeTestimonial);
}
