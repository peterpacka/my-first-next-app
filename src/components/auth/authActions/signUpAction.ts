"use server"
import { dbConnect } from '@/database/db'
import emailCheck from '@/utils/emailCheck'
import bcrypt from 'bcrypt'
import { User } from '@/database/models/usersModel'
import { headers } from 'next/headers'
import { rateLimiter } from '@/utils/rateLimiter'

type SignUpFormData = {
    username: string | null
    email: string | null
    password: string | null
}

type SignUpFormState = {
    error?: string
    success?: boolean
}

export async function signUpAction(prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {

    const forwardedFor = (await headers()).get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
    try {
        await rateLimiter.consume(ip);
    } catch (error) {
        return { error: "Too many attempts. Please try again later." };
    }

    const data: SignUpFormData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    if (!data.username || !data.email || !data.password) {
        return { error: "All fields are required." }
    }
    if (data.username.length > 15 || data.email.length > 50 || data.password.length > 30) {
        return { error: "One or more fields are too long." }
    }
    if (emailCheck(data.email) === false) {
        return { error: "Invalid email address." }
    }

    await dbConnect();

    // Check if user exists with same username or email
    const userExists = await User.findOne({
        $or: [
            { email: data.email },
            { username: data.username }
        ]
    });

    if (userExists) {
        return { error: "A user with this email or username already exists." }
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(data.password as string, 10);

    // Save new user to the database
    const newUser = new User({
        username: data.username,
        email: data.email,
        password: hashPassword,
    });

    await newUser.save();

    return { success: true }
}