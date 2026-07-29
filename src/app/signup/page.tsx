"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginWithGoogle } from "@/lib/auth";
import { registerStudent } from "@/lib/registerStudent";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [std, setStd] = useState("11th");
  const [batch, setBatch] = useState("JEE");
  const [stream, setStream] = useState("PCM");

  async function handleSignup() {
    try {
      if (!name.trim()) {
        alert("Please enter student full name.");
        return;
      }

      if (!phone.trim()) {
        alert("Please enter phone number.");
        return;
      }

      setLoading(true);

      const user = await loginWithGoogle();

if (!user || !user.email) {
  alert("Google Login failed.");
  return;
}

      await registerStudent({
        name,
        gmail: user.email!,
        phone,
        std,
        batch,
        stream,
      });

      alert("Registration Successful!");

      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-10">

      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-[450px] border border-zinc-800">

        <h1 className="text-4xl font-bold text-yellow-400 text-center">
          Student Registration
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Register once to access the Student Portal
        </p>

        {/* Student Name */}
        <input
          className="mt-8 w-full rounded-xl bg-zinc-800 p-4 text-white"
          placeholder="Student Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Phone Number */}
        <input
          type="tel"
          className="mt-4 w-full rounded-xl bg-zinc-800 p-4 text-white"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Standard */}
        <select
          className="mt-4 w-full rounded-xl bg-zinc-800 p-4 text-white"
          value={std}
          onChange={(e) => setStd(e.target.value)}
        >
          <option value="11th">11th</option>
          <option value="12th">12th</option>
        </select>

        {/* Batch */}
        <select
          className="mt-4 w-full rounded-xl bg-zinc-800 p-4 text-white"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
          <option value="MHTCET">MHTCET</option>
        </select>

        {/* Stream */}
        <select
          className="mt-4 w-full rounded-xl bg-zinc-800 p-4 text-white"
          value={stream}
          onChange={(e) => setStream(e.target.value)}
        >
          <option value="PCM">
            PCM — Physics, Chemistry, Mathematics
          </option>

          <option value="PCB">
            PCB — Physics, Chemistry, Biology
          </option>
        </select>

        {/* Register Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-yellow-400 py-4 font-bold text-black hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Registering..."
            : "Continue with Google & Register"}
        </button>

      </div>

    </div>
  );
}