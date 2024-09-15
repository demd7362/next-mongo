import mongoose, { Document, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId
  author: string;
  content: string;
  likes: number;
}

const commentSchema: Schema = new Schema({
  postId: { // 부모 post id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: { // 게시물 내용
    type: String,
    required: true
  },
  author: { // 작성자 정보 (사용자 ID)
    type: String,
    required: true
  },
  likes: { // 좋아요 수
    type: Number,
    default: 0
  }
}, {
  timestamps: true, // createdAt, updatedAt 필드 추가
  versionKey: false // __v 필드에서 삭제
})

commentSchema.plugin(mongoosePaginate)


const Comment = mongoose.models.Comment || mongoose.model<IComment, mongoose.PaginateModel<IComment>>('Comment', commentSchema, 'comment')

export default Comment
