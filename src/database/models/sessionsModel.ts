import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISession extends Document {
    session: string;
    userId: mongoose.Types.ObjectId | string;
    createdAt: Date;
    expiresAt: Date;
}

const SessionSchema: Schema<ISession> = new Schema(
    {
        session: { type: String, required: true, unique: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, default: Date.now, expires: "1d" }, // 1 day expiration
    },
    { collection: "sessions" }
);

export const Session: Model<ISession> = mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);