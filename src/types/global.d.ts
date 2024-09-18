import { Post } from '@/app/posts/_components/PostList'

interface SearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface Pagination {
  docs: Post[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}
