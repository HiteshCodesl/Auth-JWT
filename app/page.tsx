// app/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to AuthApp
        </h1>
        <p className="text-gray-600 mb-8">
          A simple authentication app to manage your users securely.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
