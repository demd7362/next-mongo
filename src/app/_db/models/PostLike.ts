import mongoose, { Document, Schema } from 'mongoose';

export interface IPostLike extends Document {
  postId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  isLike: boolean
}

const postLikeSchema: Schema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isLike: {
    type: Boolean
  }
}, {
  timestamps: true, // createdAt, updatedAt 필드 추가
  versionKey: false // __v 필드에서 삭제
});


const PostLike = mongoose.models.PostLike || mongoose.model<IPostLike>('PostLike', postLikeSchema, 'postLike ');

export default PostLike;
