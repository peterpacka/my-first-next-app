import SignInForm from '@/components/auth/signInForm'
import React from 'react'

const SignInPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-5 bg-background">
            <div className="text-center space-y-1">
                <h1 className="text-4xl font-bold text-primary">Sign In</h1>
                <p className="text-lg text-white leading-6 mt-1 md:mt-0">
                    Welcome back! Please sign in to your account.
                </p>
            </div>
            <SignInForm />
        </main>
    )
}

export default SignInPage