import { formatDateTime } from '@/utils/date'
import { getCommentsByPagination } from '@/app/actions'
import CommentButtonWrapper from '@/app/posts/_components/CommentButtonWrapper'
import Link from 'next/link'
import React from 'react'

export interface Comment {
  _id: string;
  postId: string;
  author: string;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId, searchParams }: CommentListProps & SearchParams) {
  const page = Number(searchParams['page'] || '1')
  const pagination = await getCommentsByPagination(postId, page)
  const comments = pagination.docs

  return (
    <>
      <div>
        {comments.map((comment: Comment) => (
          <div key={comment._id} className="border-b py-2 flex justify-between items-start">
            <div>
              <p className="font-bold">{comment.author}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{formatDateTime(comment.createdAt)}</p>
            </div>
            <CommentButtonWrapper commentId={JSON.parse(JSON.stringify(comment._id))} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <Link key={page} href={`/posts/${postId}?page=${page}`} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${page === pagination.page
              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            }`}>
              {page}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
