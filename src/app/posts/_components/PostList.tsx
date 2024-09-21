import React from 'react'
import Link from 'next/link'
import { formatDate, formatDateTime } from '@/utils/date'
import { getPostsByPagination } from '@/app/actions'
import { Pagination, SearchParams } from '@/types/global'
import { PenSquare, ChevronLeft, ChevronRight } from 'lucide-react'

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

export default async function PostList({ searchParams }: SearchParams) {
  const page = Number(searchParams['page'] || '1')
  const pagination: Pagination = await getPostsByPagination(page)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">게시판</h1>
        <Link href="/posts/write" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-300 ease-in-out transform hover:scale-110">
          <PenSquare size={24} />
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">추천수</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {pagination.docs.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/posts/${post._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.likes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(post.createdAt)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <Link href={`/posts?page=${Math.max(1, pagination.page - 1)}`} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <ChevronLeft size={20} />
          </Link>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/posts?page=${pageNum}`}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${pageNum === pagination.page
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </Link>
          ))}
          <Link href={`/posts?page=${Math.min(pagination.totalPages, pagination.page + 1)}`} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <ChevronRight size={20} />
          </Link>
        </nav>
      </div>
    </div>
  )
}
