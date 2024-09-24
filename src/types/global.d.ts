
interface SearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface Pagination {
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

interface PostPagination extends Pagination {
  docs: Post[];
}

interface Post {
  _id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
  dislikes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}
