export interface AmpathApiResponse<T> {
  result?: 'success' | 'fail' | string;
  status?: number;
  code?: number;
  message?: string;
  data?: T;
}

export interface BlogApiItem {
  id: number | string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  imageurl?: string | null;
  image?: string | null;
  category?: string | null;
  slug?: string | null;
}

export interface BlogListPayload {
  blog?: BlogApiItem[] | null;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  imageUrl: string | null;
  category: string | null;
  excerpt: string;
}
