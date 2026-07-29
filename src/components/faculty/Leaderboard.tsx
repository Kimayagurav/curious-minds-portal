"use client";

import Podium from "@/components/leaderboard/Podium";
import LeaderboardCard from "@/components/leaderboard/LeaderboardCard";

interface LeaderboardProps {
  students: any[];
}

export default function Leaderboard({
  students,
}: LeaderboardProps) {

  const rankedStudents = [...students].sort((a, b) => {

    const scoreA =
      (a.questions || 0) +
      (a.studyHours || 0) * 20;

    const scoreB =
      (b.questions || 0) +
      (b.studyHours || 0) * 20;

    return scoreB - scoreA;

  });

  const totalQuestions = rankedStudents.reduce(
    (sum, s) => sum + (s.questions || 0),
    0
  );

  const totalHours = rankedStudents.reduce(
    (sum, s) => sum + (s.studyHours || 0),
    0
  );

  return (

    <div className="space-y-6 md:space-y-8">

      {/* Hero */}

      <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-zinc-900 to-black p-5 md:p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="flex-1">

            <p className="uppercase tracking-[0.45em] text-[11px] md:text-sm text-yellow-400">

              Curious Minds

            </p>

            <h1 className="mt-2 text-3xl md:text-6xl font-bold leading-tight">

              Student
              <br />
              Leaderboard

            </h1>

            <p className="mt-4 text-sm md:text-lg text-zinc-400 max-w-2xl">

              Rankings are calculated using study hours and
              questions solved. Every hour and every question
              contributes to climbing the leaderboard.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:min-w-[300px]">

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

              <p className="text-xs md:text-sm text-yellow-400">

                Students

              </p>

              <h2 className="mt-2 text-3xl md:text-5xl font-bold">

                {rankedStudents.length}

              </h2>

            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

              <p className="text-xs md:text-sm text-yellow-400">

                Current #1

              </p>

              <h2 className="mt-2 text-lg md:text-2xl font-bold truncate">

                {rankedStudents.length
                  ? rankedStudents[0].name
                  : "-"}

              </h2>

            </div>

          </div>

        </div>

      </div>
            {/* Stats */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6 hover:border-yellow-400 transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs md:text-sm text-zinc-400">
                Ranked Students
              </p>

              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-yellow-400">
                {rankedStudents.length}
              </h2>

            </div>

            <div className="text-3xl">
              👨‍🎓
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6 hover:border-yellow-400 transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs md:text-sm text-zinc-400">
                Questions Solved
              </p>

              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-yellow-400">
                {totalQuestions}
              </h2>

            </div>

            <div className="text-3xl">
              📝
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6 hover:border-yellow-400 transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs md:text-sm text-zinc-400">
                Study Hours
              </p>

              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-yellow-400">
                {totalHours}
              </h2>

            </div>

            <div className="text-3xl">
              📚
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6 hover:border-yellow-400 transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs md:text-sm text-zinc-400">
                Current Topper
              </p>

              <h2 className="mt-2 text-lg md:text-2xl font-bold text-yellow-400 truncate">

                {rankedStudents.length
                  ? rankedStudents[0].name
                  : "-"}

              </h2>

            </div>

            <div className="text-3xl">
              🏆
            </div>

          </div>

        </div>

      </div>

      {/* Podium */}

      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-4 md:p-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold">
              🥇 Top Performers
            </h2>

            <p className="text-sm md:text-base text-zinc-400 mt-2">
              The top three students based on overall performance.
            </p>

          </div>

        </div>
                {rankedStudents.length >= 3 ? (

          <Podium
            students={rankedStudents.slice(0, 3)}
          />

        ) : (

          <div className="rounded-2xl border border-dashed border-zinc-700 py-12 text-center">

            <div className="text-5xl mb-4">
              🏆
            </div>

            <h3 className="text-2xl font-bold text-yellow-400">
              Not Enough Students
            </h3>

            <p className="text-zinc-400 mt-3">
              At least three students are required to display the podium.
            </p>

          </div>

        )}

      </div>

      {/* Leaderboard Rankings */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 md:p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold">
              📊 Complete Rankings
            </h2>

            <p className="text-sm md:text-base text-zinc-400 mt-2">
              Students ranked according to study hours and questions solved.
            </p>

          </div>

          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 px-5 py-3">

            <p className="text-xs uppercase tracking-wider text-yellow-400">
              Total Rankings
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {rankedStudents.length}
            </h3>

          </div>

        </div>

        <div className="space-y-4">
                    {rankedStudents.length > 3 ? (

            rankedStudents
              .slice(3)
              .map((student, index) => (

                <div
                  key={student.gmail}
                  className="group transition-all duration-300 hover:scale-[1.01]"
                >

                  <LeaderboardCard
                    student={student}
                    rank={index + 4}
                  />

                </div>

              ))

          ) : (

            <div className="rounded-3xl border border-dashed border-zinc-700 bg-black/30 py-16 px-6 text-center">

              <div className="text-6xl mb-5">
                🎖️
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">

                No More Rankings

              </h3>

              <p className="text-zinc-400 mt-4 max-w-xl mx-auto">

                Only the podium winners are available right now.
                As more students begin recording study hours and
                solving questions, the complete leaderboard will
                automatically expand.

              </p>

            </div>

          )}

        </div>

      </div>
          </div>

  );

}