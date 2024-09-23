import React from 'react'
import Link from 'next/link'
import { formatDate, formatDateTime } from '@/utils/date'
import { getPostsByPagination } from '@/app/actions'
import { Pagination, SearchParams } from '@/types/global'
import { PenSquare, ChevronLeft, ChevronRight, ThumbsUp, MessageCircle } from 'lucide-react'

export interface Post {
  _id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}

export default async function Page({ searchParams }: any) {
  const page = Number(searchParams['page'] || '1')
  const pagination: Pagination = await getPostsByPagination(page)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800"></h1>
        <Link href="/posts/write" className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-3 transition duration-300 ease-in-out transform hover:scale-110 shadow-lg">
          <PenSquare size={24} />
        </Link>
      </div>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">제목</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">작성자</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">추천</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">작성일</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {pagination.docs.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/posts/${post._id}`} className="text-indigo-600 hover:text-indigo-900 font-medium">
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <div className="flex items-center justify-center">
                    <ThumbsUp size={16} className="text-indigo-500 mr-1" />
                    {post.likes}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(post.createdAt)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <Link href={`/posts?page=${Math.max(1, pagination.page - 1)}`} className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
            <ChevronLeft size={20} />
          </Link>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/posts?page=${pageNum}`}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition duration-150 ease-in-out
                ${pageNum === pagination.page
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </Link>
          ))}
          <Link href={`/posts?page=${Math.min(pagination.totalPages, pagination.page + 1)}`} className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
            <ChevronRight size={20} />
          </Link>
        </nav>
      </div>
    </div>
  )
}
