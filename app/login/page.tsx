"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md w-96 text-gray-800 placeholder:text-shadow-gray-400'
      >
        <h2 className='text-2xl font-bold mb-6'>Investor Login</h2>
        <input
          type='email'
          placeholder='Email'
          className='w-full mb-4 p-2 border rounded'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='w-full mb-6 p-2 border rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded'
        >
          Login
        </button>
      </form>
    </div>
  );
}
