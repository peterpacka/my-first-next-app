"use server"

import { dbConnect } from "@/database/db"
import { User } from "@/database/models/usersModel"
import { Session } from "@/database/models/sessionsModel"
import bcrypt from "bcrypt"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { v4 } from "uuid"
import { rateLimiter } from "@/utils/rateLimiter"


type SignInFormData = {
    email: string | null
    password: string | null
}

type SignInFormState = {
    error?: string
    success?: boolean
}

export async function signInAction(
    prevState: SignInFormState,
    formData: FormData
): Promise<SignInFormState> {

    const forwardedFor = (await headers()).get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
    try {
        await rateLimiter.consume(ip);
    } catch (error) {
        return { error: "Too many attempts. Please try again later." };
    }

    const data: SignInFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const callbackUrl = formData.get("callbackUrl") as string | null;

    if (!data.email || !data.password) {
        return { error: "All fields are required." }
    }
    if (data.email.length > 50 || data.password.length > 30) {
        return { error: "One or more fields are too long." }
    }

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email: data.email });
    if (!user) {
        return { error: "Email or password is incorrect." }
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(data.password as string, user.password);
    if (!isPasswordValid) {
        return { error: "Email or password is incorrect." }
    }

    // Create new session
    const newSessionToken = v4();
    const sessionData = new Session({
        session: newSessionToken,
        userId: user._id,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000),
    });
    await sessionData.save();

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", newSessionToken, {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: "strict",
    });

    redirect(callbackUrl || "/");
    return { success: true }
}