"use client";

interface Student {
  name: string;
  questions: number;
  studyHours: number;
}

interface PodiumProps {
  students: Student[];
}

export default function Podium({
  students,
}: PodiumProps) {

  if (students.length < 3) return null;

  const first = students[0];
  const second = students[1];
  const third = students[2];

  const getScore = (student: Student) =>
    (student.questions || 0) +
    (student.studyHours || 0) * 20;

  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">

      {/* Second */}
            <div className="order-2 lg:order-1">

        <div className="group rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 text-center transition-all duration-300 hover:border-gray-300 hover:-translate-y-1">

          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-400 text-3xl font-bold text-black shadow-lg">

            {second.name?.charAt(0)?.toUpperCase() || "S"}

          </div>

          <div className="text-5xl mb-2">
            🥈
          </div>

          <h2 className="truncate text-2xl font-bold text-white">

            {second.name}

          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-2xl border border-zinc-700 bg-black p-3">

              <p className="text-xs uppercase text-zinc-500">

                Questions

              </p>

              <h3 className="mt-2 text-xl font-bold text-white">

                {second.questions}

              </h3>

            </div>

            <div className="rounded-2xl border border-zinc-700 bg-black p-3">

              <p className="text-xs uppercase text-zinc-500">

                Hours

              </p>

              <h3 className="mt-2 text-xl font-bold text-white">

                {second.studyHours}

              </h3>

            </div>

          </div>

          <div className="mt-5 rounded-2xl border border-gray-400/20 bg-gray-400/10 py-3">

            <p className="text-xs uppercase tracking-wide text-gray-300">

              Score

            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">

              {getScore(second)}

            </h3>

          </div>

        </div>

      </div>

      {/* First */}
            <div className="order-1 lg:order-2">

        <div className="group relative rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-yellow-500/20 via-zinc-900 to-black p-8 text-center shadow-[0_0_40px_rgba(250,204,21,0.18)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(250,204,21,0.30)] lg:scale-110">

          <div className="absolute -top-5 left-1/2 -translate-x-1/2">

            <div className="rounded-full border border-yellow-400/30 bg-yellow-500 px-5 py-2 font-bold text-black shadow-lg">

              👑 Champion

            </div>

          </div>

          <div className="mx-auto mt-6 mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 text-4xl font-bold text-black shadow-2xl">

            {first.name?.charAt(0)?.toUpperCase() || "F"}

          </div>

          <div className="text-6xl mb-3">
            🥇
          </div>

          <h2 className="truncate text-3xl md:text-4xl font-bold text-white">

            {first.name}

          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-yellow-500/20 bg-black/60 p-4">

              <p className="text-xs uppercase tracking-wide text-yellow-400">

                Questions

              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">

                {first.questions}

              </h3>

            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-black/60 p-4">

              <p className="text-xs uppercase tracking-wide text-yellow-400">

                Hours

              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">

                {first.studyHours}

              </h3>

            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 py-4">

            <p className="text-xs uppercase tracking-widest text-yellow-400">

              Overall Score

            </p>

            <h3 className="mt-2 text-4xl font-extrabold text-yellow-300">

              {getScore(first)}

            </h3>

          </div>

        </div>

      </div>

      {/* Third */}
            <div className="order-3">

        <div className="group rounded-3xl border border-zinc-800 bg-gradient-to-b from-amber-700/30 to-black p-6 text-center transition-all duration-300 hover:border-amber-500 hover:-translate-y-1">

          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-3xl font-bold text-white shadow-lg">

            {third.name?.charAt(0)?.toUpperCase() || "T"}

          </div>

          <div className="text-5xl mb-2">
            🥉
          </div>

          <h2 className="truncate text-2xl font-bold text-white">

            {third.name}

          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-2xl border border-zinc-700 bg-black p-3">

              <p className="text-xs uppercase text-zinc-500">

                Questions

              </p>

              <h3 className="mt-2 text-xl font-bold text-white">

                {third.questions}

              </h3>

            </div>

            <div className="rounded-2xl border border-zinc-700 bg-black p-3">

              <p className="text-xs uppercase text-zinc-500">

                Hours

              </p>

              <h3 className="mt-2 text-xl font-bold text-white">

                {third.studyHours}

              </h3>

            </div>

          </div>

          <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 py-3">

            <p className="text-xs uppercase tracking-wide text-amber-300">

              Score

            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">

              {getScore(third)}

            </h3>

          </div>

        </div>

      </div>

    </div>

  );

}