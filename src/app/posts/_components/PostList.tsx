import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/utils/date'

export interface Post {
  _id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  comments: any[];
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

interface PostListProps {
  pagination: Pagination
}

export default function PostList({ pagination }: PostListProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">게시글 목록</h1>
        <Link href="/posts/write" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"> 글쓰기 </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {pagination.docs.reverse().map((post) => (
            <tr key={post._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                <Link href={`/posts/${post._id}`}>
                  {post.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(post.createdAt)}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <Link key={page} href={`/posts?page=${page}`} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${page === pagination.page
              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            }`}>
              {page}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
};
