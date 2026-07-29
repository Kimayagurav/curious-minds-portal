"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginWithGoogle } from "@/lib/auth";
import { checkRegisteredStudent } from "@/lib/checkRegisteredStudent";
import { checkStudent } from "@/lib/checkStudent";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    // Prevent multiple clicks while login is already running
    if (loading) return;

    try {
      setLoading(true);

      // Open Google login popup
      const user = await loginWithGoogle();

      // Popup closed, cancelled, or no valid Google user returned
      if (!user || !user.email) {
        return;
      }

      const email = user.email.trim().toLowerCase();

      /*
        STEP 1:
        Check whether this Google email is registered
        in the Curious Minds Student Registration Sheet.
      */

      const registeredStudent =
        await checkRegisteredStudent(email);
        console.log("Google Email:", email);
console.log("Registered Student:", registeredStudent);

      if (!registeredStudent) {
        alert(
          "This Google account is not registered as a student. Please sign up first."
        );

        router.push("/signup");
        return;
      }

      /*
        STEP 2:
        Check the student's latest daily progress submission.

        If no daily submission exists yet, we still allow login
        using the registration data.
      */

      const latestSubmission = await checkStudent(email);

      /*
        Combine registration data with latest progress data.

        Registration sheet provides:
        - name
        - gmail
        - phone
        - standard
        - batch
        - stream

        Daily submission sheet provides:
        - study hours
        - questions
        - latest performance information
      */

      const studentData = {
        ...registeredStudent,
        ...(latestSubmission || {}),

        // Preserve important registration fields
        name:
          registeredStudent.name ||
          latestSubmission?.name ||
          user.displayName ||
          "Student",

        gmail: registeredStudent.gmail || email,

        std:
          registeredStudent.std ||
          latestSubmission?.std ||
          "",

        batch:
          registeredStudent.batch ||
          latestSubmission?.batch ||
          "",

        stream:
          registeredStudent.stream ||
          latestSubmission?.stream ||
          "",

        // Keep Google photo as fallback
        photoURL: user.photoURL || "",

        // Progress defaults
        studyHours:
          latestSubmission?.studyHours || 0,

        questions:
          latestSubmission?.questions || 0,
      };

      /*
        Save student session.

        This is used by:
        - Dashboard
        - Profile
        - Student Navbar
        - Other student pages
      */

      sessionStorage.setItem(
        "student",
        JSON.stringify(studentData)
      );

      // Successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("Student login failed:", error);

      alert(
        "Login failed. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

        <h1 className="text-center text-4xl font-bold text-yellow-400">
          Student Login
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Login with your registered Google account to access the Student Portal.
        </p>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="
            mt-8
            w-full
            rounded-xl
            bg-yellow-400
            py-4
            font-bold
            text-black
            transition
            hover:bg-yellow-300
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading
            ? "Signing in..."
            : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Use the same Google account that you used during student registration.
        </p>

      </div>

    </div>
  );
}