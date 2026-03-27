import axios from 'axios';
import { apiClient } from './client';
import type { AmpathApiResponse, Blog, BlogApiItem, BlogListPayload } from '../types/blog';

const AMPATH_WEB_URL = 'https://ampath.com/';

// Replace this with the signed-in user's city or a location-based city once that data is available.
export const DEFAULT_BLOG_CITY = 'Hyderabad';

function normalizeImageUrl(imageUrl?: string | null, fallbackImage?: string | null): string | null {
  const value = imageUrl || fallbackImage;
  if (!value) return null;

  try {
    return new URL(value, AMPATH_WEB_URL).toString();
  } catch {
    return null;
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function createExcerpt(html: string, maxLength = 140): string {
  const plainText = stripHtml(html);
  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}

function normalizeBlog(item: BlogApiItem): Blog {
  return {
    id: String(item.id),
    title: item.title?.trim() || 'Untitled Blog',
    content: item.content || '',
    createdAt: item.created_at || '',
    imageUrl: normalizeImageUrl(item.imageurl, item.image),
    category: item.category || null,
    excerpt: createExcerpt(item.content || ''),
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

    return apiMessage || error.message || 'Something went wrong while contacting the blog service.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while contacting the blog service.';
}

export async function getBlogs(city: string): Promise<Blog[]> {
  const response = await apiClient.post<AmpathApiResponse<BlogListPayload>>('get_blog/', {
    city,
  });

  const items = response.data?.data?.blog ?? [];
  return items.map(normalizeBlog);
}

export async function getBlogById(blogId: number | string): Promise<Blog | null> {
  const response = await apiClient.get<AmpathApiResponse<BlogApiItem | null | []>>('getBlogById', {
    params: { blog_id: blogId },
  });

  const item = response.data?.data;
  if (!item || Array.isArray(item)) {
    return null;
  }

  return normalizeBlog(item);
}
