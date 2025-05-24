import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-16">
      <div className="bg-card p-8 rounded-xl shadow-lg text-center space-y-4">
        <h2 className="text-4xl font-bold text-primary">Welcome to My Next.js App</h2>
        <p className="text-lg text-gray-300">
          Experience a modern, dark-themed Next.js app with beautiful UI.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/sign-in" className="bg-secondary hover:bg-accent text-white px-6 py-3 rounded-full transition-colors duration-200 shadow">
            Sign In
          </Link>
          <Link href="/sign-up" className="bg-background border border-accent text-accent px-6 py-3 rounded-full transition-colors duration-200 shadow hover:bg-accent hover:text-background">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
