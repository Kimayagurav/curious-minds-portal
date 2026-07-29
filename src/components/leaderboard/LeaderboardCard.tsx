"use client";

interface Student {
  name: string;
  batch: string;
  questions: number;
  studyHours: number;
  photoUrl?: string;
}

interface LeaderboardCardProps {
  student: Student;
  rank: number;
}

export default function LeaderboardCard({
  student,
  rank,
}: LeaderboardCardProps) {

  const score =
    (student.questions || 0) +
    (student.studyHours || 0) * 20;

  return (

    <div className="group rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-black p-5 md:p-6 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_35px_rgba(250,204,21,0.12)]">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left Section */}

        <div className="flex items-center gap-4 flex-1">

          <div className="relative h-16 w-16 md:h-20 md:w-20">

  {student.photoUrl ? (
    <img
      src={student.photoUrl}
      alt={student.name}
      className="h-full w-full rounded-full object-cover border-2 border-yellow-400 shadow-lg"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-2xl md:text-3xl font-bold text-black shadow-lg">
      {student.name?.charAt(0)?.toUpperCase() || "S"}
    </div>
  )}

  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-black text-sm font-bold text-yellow-400">
    #{rank}
  </div>

</div>

          <div className="min-w-0">

            <h2 className="truncate text-xl md:text-3xl font-bold text-white">

              {student.name}

            </h2>

            <p className="mt-2 text-sm md:text-base text-zinc-400">

              {student.batch}

            </p>

            <div className="mt-3 inline-flex items-center rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">

              Rank #{rank}

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                    <div className="rounded-2xl border border-zinc-800 bg-black p-4 text-center transition-all duration-300 group-hover:border-yellow-500/20">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Questions
            </p>

            <h3 className="mt-2 text-2xl md:text-3xl font-bold text-yellow-400">
              {student.questions}
            </h3>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black p-4 text-center transition-all duration-300 group-hover:border-yellow-500/20">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Hours
            </p>

            <h3 className="mt-2 text-2xl md:text-3xl font-bold text-yellow-400">
              {student.studyHours}
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              hrs
            </p>

          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-center">

            <p className="text-xs uppercase tracking-wide text-yellow-400">
              Score
            </p>

            <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white">
              {score}
            </h3>

          </div>

        </div>

      </div>
          </div>

  );

}