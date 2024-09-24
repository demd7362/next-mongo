import mongoose, { Document, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  likes: number;
  dislikes: number;
  views: number;
  // comments: mongoose.Types.ObjectId[]; // 수정된 부분
}

const postSchema: Schema = new Schema({
  title: { // 게시물 제목
    type: String,
    required: true,
    trim: true
  },
  content: { // 게시물 내용
    type: String,
    required: true
  },
  author: { // 작성자 정보 (사용자 ID)
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true, // createdAt, updatedAt 필드 추가
  versionKey: false // __v 필드에서 삭제
})

postSchema.plugin(mongoosePaginate)

const Post = mongoose.models.Post || mongoose.model<IPost, mongoose.PaginateModel<IPost>>('Post', postSchema, 'post')

export default Post
