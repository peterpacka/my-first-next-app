import { cookies } from "next/headers";
import { dbConnect } from "@/database/db";
import { Session } from "@/database/models/sessionsModel";
import { User } from "@/database/models/usersModel";

type ReturnedUserData = {
    username: string;
    email: string;
    userId: string;
    session: string;
    createdAt: Date;
};

export async function getUserFromSessionCookie(): Promise<ReturnedUserData | null> {
    await dbConnect();
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get("session");
    if (!sessionCookie) {
        return null;
    }

    // Find session in MongoDB
    const session = await Session.findOne({ session: sessionCookie.value });
    if (!session) {
        return null;
    }

    // Find user by session.userId
    const user: any = await User.findById(session.userId);
    if (!user) {
        return null;
    }

    return {
        session: session.session,
        userId: user._id.toString(),
        createdAt: session.createdAt,
        email: user.email,
        username: user.username,
    };
}