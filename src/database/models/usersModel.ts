import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        username: { type: String, required: true, unique: true, maxlength: 30 },
        email: { type: String, required: true, unique: true, maxlength: 100 },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { collection: "users" }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);