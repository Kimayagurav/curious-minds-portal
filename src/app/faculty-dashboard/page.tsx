"use client";

import { useEffect, useMemo, useState } from "react";

import FacultyNavbar from "@/components/ui/FacultyNavbar";
import Dashboard from "@/components/faculty/Dashboard";
import Leaderboard from "@/components/faculty/Leaderboard";
import Students from "@/components/faculty/Students";
import Analytics from "@/components/faculty/Analytics";

export default function FacultyDashboard() {
  const [students, setStudents] = useState<any[]>([]);

  const [batchFilter, setBatchFilter] =
    useState("All");

  const [stdFilter, setStdFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [tab, setTab] =
    useState("dashboard");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTs70nLLTlMyINkERvg_rbm6NM-2NKHHClAmC9sgizKslbbpXNIS-3jmrY8EK1S_YJhZ4TpokxEX--M/pub?gid=949057179&single=true&output=csv"
      );

      const text = await res.text();

      const rows = text
        .trim()
        .split("\n")
        .slice(1);

      const data = rows.map((row) => {
        const cols = row.split(",");

        return {
          name: cols[1]?.replaceAll('"', "") || "",
          batch: cols[2]?.replaceAll('"', "") || "",

          studyHours:
            Number(cols[4]) || 0,

          questions:
            Number(cols[5]) || 0,

          physics:
            Number(cols[6]) || 0,

          chemistry:
            Number(cols[7]) || 0,

          maths:
            Number(cols[8]) || 0,

          biology:
            Number(cols[9]) || 0,

          testScore:
            cols[10]?.replaceAll('"', "") || "-",

          std:
            cols[11]?.replaceAll('"', "") || "",

          gmail:
            cols[12]?.replaceAll('"', "") || "",

          contact:
            cols[13]?.replaceAll('"', "") || "",
        };
      });

      const latest = new Map();

      data.forEach((student) => {
        latest.set(
          student.gmail
            .trim()
            .toLowerCase(),
          student
        );
      });

      setStudents(
        Array.from(latest.values())
      );
    }

    fetchData();
  }, []);
    const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const batchMatch =
        batchFilter === "All" ||
        student.batch === batchFilter;

      const stdMatch =
        stdFilter === "All" ||
        student.std === stdFilter;

      const searchMatch =
        student.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        batchMatch &&
        stdMatch &&
        searchMatch
      );
    });
  }, [
    students,
    batchFilter,
    stdFilter,
    search,
  ]);

  const topper = useMemo(() => {
    if (!filteredStudents.length)
      return null;

    return [...filteredStudents].sort(
      (a, b) =>
        b.questions - a.questions
    )[0];
  }, [filteredStudents]);

  return (
    <>
      <FacultyNavbar />

      <div className="min-h-screen bg-black text-white p-8">

        <div className="flex flex-col items-center mb-10">

          <h1 className="text-5xl font-bold text-yellow-400">
            Faculty Dashboard
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mt-8">

            <button
              onClick={() =>
                setTab("dashboard")
              }
              className={`px-6 py-3 rounded-xl font-bold transition ${
                tab === "dashboard"
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-900 border border-zinc-700 hover:border-yellow-400"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                setTab("leaderboard")
              }
              className={`px-6 py-3 rounded-xl font-bold transition ${
                tab === "leaderboard"
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-900 border border-zinc-700 hover:border-yellow-400"
              }`}
            >
              Leaderboard
            </button>

            <button
              onClick={() =>
                setTab("students")
              }
              className={`px-6 py-3 rounded-xl font-bold transition ${
                tab === "students"
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-900 border border-zinc-700 hover:border-yellow-400"
              }`}
            >
              Students
            </button>

            <button
              onClick={() =>
                setTab("analytics")
              }
              className={`px-6 py-3 rounded-xl font-bold transition ${
                tab === "analytics"
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-900 border border-zinc-700 hover:border-yellow-400"
              }`}
            >
              Analytics
            </button>

          </div>

        </div>
                {tab === "dashboard" && (
          <Dashboard
            students={students}
            filteredStudents={filteredStudents}
            batchFilter={batchFilter}
            setBatchFilter={setBatchFilter}
            stdFilter={stdFilter}
            setStdFilter={setStdFilter}
            search={search}
            setSearch={setSearch}
          />
        )}

        {tab === "leaderboard" && (
  <Leaderboard
    students={filteredStudents}
  />
)}

        {tab === "students" && (
          <Students
            students={filteredStudents}
          />
        )}

        {tab === "analytics" && (
          <Analytics
            students={filteredStudents}
          />
        )}
              </div>

    </>
  );
}