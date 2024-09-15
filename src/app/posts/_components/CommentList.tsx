import { formatDateTime } from '@/utils/date'
import { getComments } from '@/app/actions'
import CommentButtonWrapper from '@/app/posts/_components/CommentButtonWrapper'

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

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await getComments(postId)

  return (
    <div>
      {comments.map((comment: Comment) => (
        <div key={comment._id} className="border-b py-2 flex justify-between items-start">
          <div>
            <p className="font-bold">{comment.author}</p>
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">{formatDateTime(comment.createdAt)}</p>
          </div>
          <CommentButtonWrapper commentId={comment._id} />
        </div>
      ))}
    </div>
  )
}
