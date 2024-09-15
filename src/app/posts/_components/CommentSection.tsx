'use client'
import { formatDate } from '@/utils/date'
import { useEffect, useState } from 'react'
import $axios from '@/utils/axios'

interface Comment {
  _id: string;
  postId: string;
  author: string;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}


export default function CommentSection({ postId }: { postId: string }){
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const response = await $axios.get(`/api/posts/${postId}/comments`);
      setComments(response.data.data);
    } catch (error) {
      console.error('댓글을 불러오는 데 실패했습니다:', error);
    }
  };

  const addComment = async () => {
    try {
      await $axios.post(`/api/posts/${postId}/comments`, { content: newComment });
      setNewComment('');
      fetchComments(); // 댓글 목록 새로고침
    } catch (error) {
      console.error('댓글 추가에 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">댓글</h2>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addComment}
        >
          댓글 작성
        </button>
      </div>
      <div>
        {
          comments.map((comment: Comment) => (
            <div key={comment._id} className="border-b py-2">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};
