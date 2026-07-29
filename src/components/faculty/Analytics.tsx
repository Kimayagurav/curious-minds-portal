"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics({
  students,
}: {
  students: any[];
}) {

  const totalStudents = students.length;

  const avgHours =
    totalStudents === 0
      ? 0
      : (
          students.reduce(
            (a, b) => a + b.studyHours,
            0
          ) / totalStudents
        ).toFixed(1);

  const avgQuestions =
    totalStudents === 0
      ? 0
      : (
          students.reduce(
            (a, b) => a + b.questions,
            0
          ) / totalStudents
        ).toFixed(1);

  const highestScore = Math.max(
    ...students.map(
      (s) =>
        (s.questions || 0) +
        (s.studyHours || 0) * 20
    ),
    0
  );

  const batchData = [
    {
      name: "JEE",
      value: students.filter(
        (s) => s.batch === "JEE"
      ).length,
    },
    {
      name: "NEET",
      value: students.filter(
        (s) => s.batch === "NEET"
      ).length,
    },
    {
      name: "MHTCET",
      value: students.filter(
        (s) => s.batch === "MHTCET"
      ).length,
    },
  ];

  const chartData = students.map((student) => ({
    name: student.name,
    Hours: student.studyHours,
    Questions: student.questions,
  }));

  const COLORS = [
    "#FFD54A",
    "#22C55E",
    "#3B82F6",
  ];

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

              Analytics
              <br />
              Dashboard

            </h1>

            <p className="mt-4 text-sm md:text-lg text-zinc-400 max-w-2xl">

              Get deep insights into student
              performance, study hours,
              question solving trends and
              batch distribution.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:min-w-[300px]">

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

              <p className="text-xs md:text-sm text-yellow-400">

                Students

              </p>

              <h2 className="mt-2 text-3xl md:text-5xl font-bold">

                {totalStudents}

              </h2>

            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

              <p className="text-xs md:text-sm text-yellow-400">

                Best Score

              </p>

              <h2 className="mt-2 text-3xl md:text-5xl font-bold">

                {highestScore}

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
                Total Students
              </p>

              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-yellow-400">
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
                Average Hours
              </p>

              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-yellow-400">
                {avgHours}
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
                Avg Questions
              </p>

              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-yellow-400">
                {avgQuestions}
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
                Highest Score
              </p>

              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-yellow-400">
                {highestScore}
              </h2>

            </div>

            <div className="text-3xl">
              🏆
            </div>

          </div>

        </div>

      </div>

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl md:text-3xl font-bold">

                📈 Study Hours Analysis

              </h2>

              <p className="mt-2 text-sm md:text-base text-zinc-400">

                Individual study hours recorded by each student.

              </p>

            </div>

          </div>

          <div className="h-[320px] md:h-[380px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 20,
                }}
              >

                <CartesianGrid
                  stroke="#3f3f46"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#a1a1aa",
                    fontSize: 12,
                  }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />

                <YAxis
                  tick={{
                    fill: "#a1a1aa",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #facc15",
                    borderRadius: "12px",
                    color: "#ffffff",
                  }}
                  cursor={{
                    fill: "rgba(250,204,21,0.08)",
                  }}
                />

                <Bar
                  dataKey="Hours"
                  fill="#FFD54A"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl md:text-3xl font-bold">

                🥧 Batch Distribution

              </h2>

              <p className="mt-2 text-sm md:text-base text-zinc-400">

                Student distribution across all batches.

              </p>

            </div>

          </div>

          <div className="h-[320px] md:h-[380px]">
                        <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={batchData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  label
                >

                  {batchData.map((_, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />

                  ))}

                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #facc15",
                    borderRadius: "12px",
                    color: "#ffffff",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

}