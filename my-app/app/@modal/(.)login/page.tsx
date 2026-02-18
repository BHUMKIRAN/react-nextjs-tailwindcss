"use client"

import { useRouter } from "next/navigation"

export default function LoginModal() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-[350px] relative">

        <button
          onClick={() => router.back()}
          className="absolute top-2 right-3 text-xl"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-4">Login Modal</h1>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3 rounded"
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </div>
    </div>
  )
}
