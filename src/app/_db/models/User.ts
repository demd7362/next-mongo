import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  nickname: string;
  email: string;
  password: string;
  provider?: string;
}

const userSchema: Schema = new Schema({
  nickname: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  provider: { type: String, required: false },
}, {
  timestamps: true, // createdAt, updatedAt 필드 추가
  versionKey: false // __v 필드에서 삭제
})

// 최초 실행 시에만 생성, 그렇지 않다면 메모리에 올라가있는 model 값 사용
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema, 'user')

export default User
