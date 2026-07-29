"use client";

interface DashboardProps {
  students: any[];
  filteredStudents: any[];
  batchFilter: string;
  setBatchFilter: (value: string) => void;
  stdFilter: string;
  setStdFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

export default function Dashboard({
  students,
  filteredStudents,
  batchFilter,
  setBatchFilter,
  stdFilter,
  setStdFilter,
  search,
  setSearch,
}: DashboardProps) {

  const totalStudents = filteredStudents.length;

  const totalHours = filteredStudents.reduce(
    (sum, s) => sum + Number(s.studyHours || 0),
    0
  );

  const totalQuestions = filteredStudents.reduce(
    (sum, s) => sum + Number(s.questions || 0),
    0
  );

  const topper =
    filteredStudents.length > 0
      ? [...filteredStudents].sort(
          (a, b) =>
            (b.questions + b.studyHours * 20) -
            (a.questions + a.studyHours * 20)
        )[0]
      : null;

  return (

    <div className="space-y-6 md:space-y-8">

      {/* HERO */}

      <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-zinc-900 to-black p-5 md:p-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex-1">

            <p className="uppercase tracking-[0.45em] text-[11px] md:text-sm text-yellow-400">
              Curious Minds
            </p>

            <h1 className="mt-2 text-3xl md:text-6xl font-bold leading-tight">
              Faculty
              <br />
              Dashboard
            </h1>

            <p className="mt-4 text-sm md:text-lg text-zinc-400 max-w-xl">
              Monitor student activity,
              analyse progress,
              track performance and
              identify toppers in real time.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto md:min-w-[280px]">

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

              <p className="text-xs md:text-sm text-yellow-400">
                Students
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-2">
                {totalStudents}
              </h2>

            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

              <p className="text-xs md:text-sm text-yellow-400">
                Topper
              </p>

              <h2 className="text-lg md:text-2xl font-bold mt-2 truncate">
                {topper?.name || "-"}
              </h2>

            </div>

          </div>

        </div>

      </div>
            {/* KPI Cards */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6 hover:border-yellow-400 transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs md:text-sm text-zinc-400">
                Total Students
              </p>

              <h2 className="text-2xl md:text-4xl font-bold mt-2 text-yellow-400">
                {totalStudents}
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
                Study Hours
              </p>

              <h2 className="text-2xl md:text-4xl font-bold mt-2 text-yellow-400">
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
                Questions
              </p>

              <h2 className="text-2xl md:text-4xl font-bold mt-2 text-yellow-400">
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
                Average Hours
              </p>

              <h2 className="text-2xl md:text-4xl font-bold mt-2 text-yellow-400">

                {totalStudents > 0
                  ? (totalHours / totalStudents).toFixed(1)
                  : "0"}

              </h2>

            </div>

            <div className="text-3xl">
              📈
            </div>

          </div>

        </div>

      </div>

      {/* Search & Filters */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 md:p-6">

        <div className="grid gap-4 md:grid-cols-3">
                    <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="🔍 Search student..."
            className="w-full rounded-2xl bg-black border border-zinc-700 px-5 py-4 text-sm md:text-base outline-none focus:border-yellow-400 transition"
          />

          <select
            value={batchFilter}
            onChange={(e) =>
              setBatchFilter(e.target.value)
            }
            className="w-full rounded-2xl bg-black border border-zinc-700 px-5 py-4 text-sm md:text-base focus:border-yellow-400 transition"
          >
            <option>All</option>
            <option>JEE</option>
            <option>NEET</option>
            <option>MHTCET</option>
          </select>

          <select
            value={stdFilter}
            onChange={(e) =>
              setStdFilter(e.target.value)
            }
            className="w-full rounded-2xl bg-black border border-zinc-700 px-5 py-4 text-sm md:text-base focus:border-yellow-400 transition"
          >
            <option>All</option>
            <option>11th</option>
            <option>12th</option>
          </select>

        </div>

      </div>

      {/* Students */}

      <div className="grid gap-5">

        {filteredStudents.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-zinc-700 p-10 text-center">

            <div className="text-5xl mb-4">
              📚
            </div>

            <h2 className="text-2xl font-bold text-yellow-400">
              No Students Found
            </h2>

            <p className="text-zinc-400 mt-3">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          filteredStudents.map((student) => {

            const totalSolved =
              (student.physics || 0) +
              (student.chemistry || 0) +
              (student.maths || 0) +
              (student.biology || 0);

            const progress = Math.min(
              100,
              Math.round(
                (
                  (student.studyHours || 0) +
                  totalSolved
                ) / 10
              )
            );

            return (

              <div
                key={student.gmail}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6 hover:border-yellow-400 transition"
              >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  {/* Left Section */}

                  <div className="flex items-center gap-4 flex-1">

                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center text-xl shadow-lg">

                      {student.name?.charAt(0)?.toUpperCase() || "S"}

                    </div>

                    <div className="min-w-0">

                      <h2 className="text-lg md:text-2xl font-bold truncate">

                        {student.name}

                      </h2>

                      <p className="text-sm text-zinc-400 truncate">

                        {student.gmail}

                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">

                        <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs">

                          {student.batch}

                        </span>

                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs">

                          Std {student.std}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Right Section */}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

                    <div className="rounded-2xl bg-black border border-zinc-800 px-4 py-3 text-center">

                      <p className="text-xs text-zinc-400">

                        Hours

                      </p>

                      <h3 className="text-xl font-bold text-yellow-400 mt-1">

                        {student.studyHours}

                      </h3>

                    </div>

                    <div className="rounded-2xl bg-black border border-zinc-800 px-4 py-3 text-center">

                      <p className="text-xs text-zinc-400">

                        Questions

                      </p>

                      <h3 className="text-xl font-bold text-yellow-400 mt-1">

                        {totalSolved}

                      </h3>

                    </div>

                    <div className="rounded-2xl bg-black border border-zinc-800 px-4 py-3 text-center col-span-2 md:col-span-1">

                      <p className="text-xs text-zinc-400">

                        Progress

                      </p>

                      <h3 className="text-xl font-bold text-green-400 mt-1">

                        {progress}%

                      </h3>

                    </div>

                  </div>

                </div>

                {/* Progress Bar */}

                <div className="mt-6">

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-zinc-400">

                      Overall Progress

                    </span>

                    <span className="font-semibold text-yellow-400">

                      {progress}%

                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Subject Performance */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                                    <div className="rounded-2xl bg-black border border-zinc-800 p-4">

                    <p className="text-xs text-zinc-400 mb-2">
                      Physics
                    </p>

                    <h4 className="text-2xl font-bold text-yellow-400">
                      {student.physics || 0}
                    </h4>

                  </div>

                  <div className="rounded-2xl bg-black border border-zinc-800 p-4">

                    <p className="text-xs text-zinc-400 mb-2">
                      Chemistry
                    </p>

                    <h4 className="text-2xl font-bold text-yellow-400">
                      {student.chemistry || 0}
                    </h4>

                  </div>

                  <div className="rounded-2xl bg-black border border-zinc-800 p-4">

                    <p className="text-xs text-zinc-400 mb-2">
                      Maths
                    </p>

                    <h4 className="text-2xl font-bold text-yellow-400">
                      {student.maths || 0}
                    </h4>

                  </div>

                  <div className="rounded-2xl bg-black border border-zinc-800 p-4">

                    <p className="text-xs text-zinc-400 mb-2">
                      Biology
                    </p>

                    <h4 className="text-2xl font-bold text-yellow-400">
                      {student.biology || 0}
                    </h4>

                  </div>

                </div>

              </div>

            );

          })

        )}

      </div>

    </div>

  );

}