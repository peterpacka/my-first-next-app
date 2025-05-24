import SignUpForm from '@/components/auth/signUpForm'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-5 bg-background">
      <div className="text-center space-y-1">
        <h1 className="text-4xl font-bold text-primary">Sign Up</h1>
        <p className="text-lg mt-1 md:mt-0 text-white leading-6">
          Create a new account to get started.
        </p>
      </div>
      <SignUpForm />
    </main>
  )
}

export default SignUpPage