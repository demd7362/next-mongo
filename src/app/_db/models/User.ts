import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    nickname: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUser>('Post', UserSchema);

export default User;
