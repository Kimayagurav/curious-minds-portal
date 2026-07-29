"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FACULTY } from "@/lib/faculty";

export default function FacultyLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin() {
    const faculty = FACULTY.find(
      (user) =>
        user.username === username.trim() &&
        user.password === password
    );

    if (!faculty) {
      setError("Invalid Username or Password");
      return;
    }

    sessionStorage.setItem(
      "faculty",
      JSON.stringify(faculty)
    );

    router.push("/faculty-dashboard");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-md shadow-2xl">

        <div className="flex justify-center mb-6">

          <Image
            src="/images/logo.png"
            alt="Curious Minds Logo"
            width={90}
            height={90}
          />

        </div>

        <h1 className="text-3xl text-yellow-400 font-bold text-center">
          Curious Minds
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Faculty & Admin Portal
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mt-8 rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-4 rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-white"
        />

        {error && (
          <p className="text-red-400 text-center mt-4">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold mt-8 hover:scale-105 transition"
        >
          Login
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          Authorized Faculty Access Only
        </p>

      </div>

    </div>
  );
}