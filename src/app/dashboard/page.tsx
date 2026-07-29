"use client";

import { useEffect, useState } from "react";
import StudentNavbar from "@/components/ui/StudentNavbar";
import { getStudents } from "@/lib/googleSheet";

function StatCard({
  title,
  value,
  icon,
  highlight = false,
}: {
  title: string;
  value: string | number;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group rounded-2xl border transition-all duration-300
      ${
        highlight
          ? "border-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/20"
          : "border-zinc-800 bg-zinc-900/80 hover:border-yellow-400"
      }
      p-4 sm:p-5`}
    >
      <div className="flex items-start justify-between">

        <div>

          <p
            className={`text-xs uppercase tracking-widest ${
              highlight
                ? "text-black/70"
                : "text-gray-400"
            }`}
          >
            {title}
          </p>

          <h2
            className={`mt-2 font-bold ${
              highlight
                ? "text-3xl sm:text-4xl"
                : "text-2xl sm:text-3xl text-yellow-400"
            }`}
          >
            {value}
          </h2>

        </div>

        <div className="text-3xl">
          {icon}
        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {

  const [student, setStudent] = useState<any>(null);
  const [rank, setRank] = useState("-");
  const [score, setScore] = useState(0);

  useEffect(() => {

    async function loadDashboard() {

      const data = sessionStorage.getItem("student");

      if (!data) {
        window.location.href = "/login";
        return;
      }

      const loggedInStudent = JSON.parse(data);

      const students = await getStudents();

      const latestStudent = students.find(
        (s) =>
          s.gmail.trim().toLowerCase() ===
          loggedInStudent.gmail.trim().toLowerCase()
      );

      const updatedStudent = latestStudent
        ? {
            ...loggedInStudent,
            ...latestStudent,
          }
        : loggedInStudent;

      setStudent(updatedStudent);

      sessionStorage.setItem(
        "student",
        JSON.stringify(updatedStudent)
      );

      const rankedStudents = [...students].sort((a, b) => {

        const scoreA =
          (a.questions || 0) +
          (a.studyHours || 0) * 20;

        const scoreB =
          (b.questions || 0) +
          (b.studyHours || 0) * 20;

        return scoreB - scoreA;

      });

      const studentRank =
        rankedStudents.findIndex(
          (s) =>
            s.gmail.trim().toLowerCase() ===
            updatedStudent.gmail.trim().toLowerCase()
        ) + 1;

      setRank(
        studentRank > 0
          ? studentRank.toString()
          : "-"
      );

      setScore(
        (updatedStudent.questions || 0) +
          (updatedStudent.studyHours || 0) * 20
      );

    }

    loadDashboard();

  }, []);

  if (!student) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="text-center">

        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />

        <p className="text-lg text-gray-300">
          Loading Dashboard...
        </p>

      </div>

    </div>
  );
}
return (
  <>
    <StudentNavbar />

    <main className="min-h-screen bg-gradient-to-b from-black via-[#090909] to-black text-white">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* Header */}

        <section className="mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <p className="uppercase tracking-[0.35em] text-[11px] text-yellow-400 font-semibold">
                Curious Minds Portal
              </p>

              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">

                Welcome back,
                <span className="block text-yellow-400 mt-1">
                  {student.name}
                </span>

              </h1>

              <p className="mt-3 text-sm sm:text-base text-gray-400">

                {student.batch} • {student.std}

              </p>

            </div>

            {/* Performance Card */}

            <div className="w-full lg:w-[340px] rounded-2xl border border-yellow-400/20 bg-zinc-900/80 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Overall Performance
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                    {score}
                  </h2>

                </div>

                <div className="text-4xl">
                  ⭐
                </div>

              </div>

              <div className="mt-5 h-2 rounded-full bg-zinc-800 overflow-hidden">

                <div
                  className="h-full rounded-full bg-yellow-400 transition-all duration-700"
                  style={{
                    width: `${Math.min(score / 10, 100)}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </section>

        {/* Statistics */}

        <section className="mb-8">

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

            <StatCard
              title="Study Hours"
              value={student.studyHours || 0}
              icon="📚"
            />

            <StatCard
              title="Questions"
              value={student.questions || 0}
              icon="📝"
            />

            <StatCard
              title="Test Score"
              value={student.testScore || "-"}
              icon="🎯"
            />

            <StatCard
              title="Rank"
              value={`#${rank}`}
              icon="🏆"
            />

            <StatCard
              title="Performance"
              value={score}
              icon="⭐"
              highlight
            />

          </div>

        </section>
        {/* Subject Performance */}

<section className="mb-10">

  <div className="flex items-center justify-between mb-5">

    <div>

      <p className="uppercase tracking-[0.30em] text-[11px] text-yellow-400 font-semibold">
        Academic Overview
      </p>

      <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
        Subject Performance
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Latest performance across all subjects
      </p>

    </div>

  </div>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

    {/* Physics */}

    <div className="group rounded-2xl border border-blue-500/20 bg-zinc-900/80 p-4 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-widest text-gray-400">
            Physics
          </p>

          <h3 className="mt-1 text-lg font-semibold text-blue-300">
            ⚛️ Physics
          </h3>

        </div>

        <div className="text-2xl">
          📘
        </div>

      </div>

      <h2 className="mt-5 text-3xl font-bold">
        {student.physics || 0}
      </h2>

      <div className="mt-4 h-2 rounded-full bg-zinc-800 overflow-hidden">

        <div
          className="h-full rounded-full bg-blue-400"
          style={{
            width: `${Math.min(student.physics || 0,100)}%`,
          }}
        />

      </div>

    </div>

    {/* Chemistry */}

    <div className="group rounded-2xl border border-green-500/20 bg-zinc-900/80 p-4 transition-all duration-300 hover:border-green-400 hover:-translate-y-1">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-widest text-gray-400">
            Chemistry
          </p>

          <h3 className="mt-1 text-lg font-semibold text-green-300">
            🧪 Chemistry
          </h3>

        </div>

        <div className="text-2xl">
          ⚗️
        </div>

      </div>

      <h2 className="mt-5 text-3xl font-bold">
        {student.chemistry || 0}
      </h2>

      <div className="mt-4 h-2 rounded-full bg-zinc-800 overflow-hidden">

        <div
          className="h-full rounded-full bg-green-400"
          style={{
            width: `${Math.min(student.chemistry || 0,100)}%`,
          }}
        />

      </div>

    </div>

    {/* Mathematics */}

    <div className="group rounded-2xl border border-purple-500/20 bg-zinc-900/80 p-4 transition-all duration-300 hover:border-purple-400 hover:-translate-y-1">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-widest text-gray-400">
            Mathematics
          </p>

          <h3 className="mt-1 text-lg font-semibold text-purple-300">
            ➗ Mathematics
          </h3>

        </div>

        <div className="text-2xl">
          📐
        </div>

      </div>

      <h2 className="mt-5 text-3xl font-bold">
        {student.maths || 0}
      </h2>

      <div className="mt-4 h-2 rounded-full bg-zinc-800 overflow-hidden">

        <div
          className="h-full rounded-full bg-purple-400"
          style={{
            width: `${Math.min(student.maths || 0,100)}%`,
          }}
        />

      </div>

    </div>

    {/* Biology */}

    <div className="group rounded-2xl border border-pink-500/20 bg-zinc-900/80 p-4 transition-all duration-300 hover:border-pink-400 hover:-translate-y-1">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-widest text-gray-400">
            Biology
          </p>

          <h3 className="mt-1 text-lg font-semibold text-pink-300">
            🧬 Biology
          </h3>

        </div>

        <div className="text-2xl">
          🌿
        </div>

      </div>

      <h2 className="mt-5 text-3xl font-bold">
        {student.biology || 0}
      </h2>

      <div className="mt-4 h-2 rounded-full bg-zinc-800 overflow-hidden">

        <div
          className="h-full rounded-full bg-pink-400"
          style={{
            width: `${Math.min(student.biology || 0,100)}%`,
          }}
        />

      </div>

    </div>

  </div>

</section>
{/* Quick Actions */}

<section>

  <div className="mb-5">

    <p className="uppercase tracking-[0.30em] text-[11px] text-yellow-400 font-semibold">
      Shortcuts
    </p>

    <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
      Quick Actions
    </h2>

    <p className="mt-1 text-sm text-gray-400">
      Access the most important features with a single click.
    </p>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    {/* Submit Progress */}

    <a
      href="/submit-study"
      className="group overflow-hidden rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400 to-yellow-500 p-5 text-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-yellow-400/20"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/10 text-2xl">
          📚
        </div>

        <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold">
          Daily
        </span>

      </div>

      <h3 className="mt-5 text-xl font-bold">
        Submit Today's Progress
      </h3>

      <p className="mt-2 text-sm leading-6 text-black/70">
        Update today's study hours, solved questions and test score.
      </p>

      <div className="mt-6 flex items-center gap-2 font-semibold">
        Continue
        <span className="transition group-hover:translate-x-1">
          →
        </span>
      </div>

    </a>

    {/* Leaderboard */}

    <a
      href="/leaderboard"
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-2xl">
          🏆
        </div>

        <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs text-yellow-400">
          Ranking
        </span>

      </div>

      <h3 className="mt-5 text-xl font-bold text-yellow-400">
        Leaderboard
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        Compare your progress with every Curious Minds student.
      </p>

      <div className="mt-6 flex items-center gap-2 text-yellow-400 font-semibold">
        View Rankings
        <span className="transition group-hover:translate-x-1">
          →
        </span>
      </div>

    </a>

    {/* Profile */}

    <a
      href="/profile"
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-2xl">
          👤
        </div>

        <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs text-yellow-400">
          Account
        </span>

      </div>

      <h3 className="mt-5 text-xl font-bold text-yellow-400">
        My Profile
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        View your profile, academic details and overall performance.
      </p>

      <div className="mt-6 flex items-center gap-2 text-yellow-400 font-semibold">
        Open Profile
        <span className="transition group-hover:translate-x-1">
          →
        </span>
      </div>

    </a>

  </div>

  {/* Footer */}

  <div className="mt-12 border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

    <div>

      <h4 className="font-semibold text-yellow-400">
        Curious Minds Portal
      </h4>

      <p className="text-sm text-gray-500 mt-1">
        Success Finds. Keep learning, keep growing.
      </p>

    </div>

    <div className="text-xs text-gray-600">
      © 2026 Curious Minds. All Rights Reserved.
    </div>

  </div>

</section>

      </div>

    </main>

  </>

        );
}
