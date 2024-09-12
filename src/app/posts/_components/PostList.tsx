import React from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function PostList({ posts, currentPage, totalPages }: PostListProps) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">게시글 목록</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                <Link href={`/posts/${post.id}`}>
                  {post.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.createdAt}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/posts?page=${page}`}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${page === currentPage
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {page}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
