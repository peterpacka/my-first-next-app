"use client"
import Link from 'next/link'
import React, { useActionState } from 'react'
import { signUpAction } from './authActions/signUpAction'

const SignUpForm = () => {
    const [state, formAction, isPending] = useActionState(signUpAction, {})

    return (
        <form
            action={formAction}
            className="flex flex-col gap-6 bg-card p-10 rounded-2xl shadow-2xl w-full md:max-w-xl border border-border"
        >
            {state?.error && (
                <div className="text-red-500 text-sm mb-2 text-center">{state.error}</div>
            )}
            {state?.success && (
                <div className="text-green-500 text-sm mb-2 text-center">Registration successful!</div>
            )}
            <input
                name="username"
                type="text"
                placeholder="Username"
                className="px-5 py-3 rounded-lg bg-background border border-border text-white focus:outline-accent text-lg"
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                className="px-5 py-3 rounded-lg bg-background border border-border text-white focus:outline-accent text-lg"
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                className="px-5 py-3 rounded-lg bg-background border border-border text-white focus:outline-accent text-lg"
                required
            />
            <button
                disabled={isPending}
                type="submit"
                className="bg-secondary hover:bg-accent text-white px-8 py-3 rounded-full transition-colors duration-200 shadow-lg text-lg font-semibold disabled:opacity-60"
            >
                {isPending ? "Loading..." : "Sign Up"}
            </button>
            <div className="flex justify-between items-center mt-2">
                <span className="text-gray-400 text-sm">Have an account already?</span>
                <Link
                    href="/sign-in"
                    className="text-accent hover:underline hover:text-accent/95 text-sm font-medium"
                >
                    Sign in
                </Link>
            </div>
        </form>
    )
}

export default SignUpForm