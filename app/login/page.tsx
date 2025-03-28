"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (result?.error) {
      console.log(result.error);
    } else {
      route.push("/");
    }
  };

  return (
    <div className="flex h-screen min-h-[90ch] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-[#b4cf54]">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 p-2 border border-[#b4cf54] rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#b4cf54]"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-2 border border-[#b4cf54] rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#b4cf54]"
              placeholder="••••••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-2 text-white bg-[#b4cf54] font-bold rounded hover:bg-[#a3bd4a] transition"
          >
            Login
          </button>
        </form>
        <div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="text-2xl p-3 bg-neutral-200 text-blue-500 rounded-lg mt-6 cursor-pointer flex items-center gap-2 shadow-md"
            title="Google"
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
}
