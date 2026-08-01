"use client";

import { useEffect, useMemo, useState } from "react";

import { getLeaderboardStudents } from "@/lib/leaderboard";
import StudentNavbar from "@/components/ui/StudentNavbar";
import FilterTabs from "@/components/leaderboard/FilterTabs";
import SearchBar from "@/components/leaderboard/SearchBar";
import Podium from "@/components/leaderboard/Podium";
import LeaderboardCard from "@/components/leaderboard/LeaderboardCard";

export default function LeaderboardPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [std, setStd] = useState("11th");
  const [batch, setBatch] = useState("JEE");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadStudents() {
      const data = await getLeaderboardStudents();

      console.log("Students Parsed:", data);

      setStudents(data);
      setLoading(false);
    }

    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students
      .filter(
        (student) =>
          student.std?.trim().toLowerCase() ===
          std.trim().toLowerCase()
      )
      .filter(
        (student) =>
          student.batch?.trim().toLowerCase() ===
          batch.trim().toLowerCase()
      )
      .filter((student) =>
        student.name
          ?.trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      )
      .sort((a, b) => {
        const scoreA =
          (a.questions || 0) +
          (a.studyHours || 0) * 20;

        const scoreB =
          (b.questions || 0) +
          (b.studyHours || 0) * 20;

        return scoreB - scoreA;
      });
  }, [students, std, batch, search]);

  if (loading) {
    return (
      <>
        <StudentNavbar />

        <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
          Loading Leaderboard...
        </div>
      </>
    );
  }

  return (
    <>
      <StudentNavbar />

      <div className="min-h-screen bg-black text-white px-6 py-10">

        <h1 className="text-5xl font-bold text-yellow-400 text-center mb-10">
          🏆 Leaderboard
        </h1>

        <div className="max-w-6xl mx-auto">

          <FilterTabs
            std={std}
            batch={batch}
            setStd={setStd}
            setBatch={setBatch}
          />

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          {filteredStudents.length === 0 ? (
            <div className="text-center text-zinc-400 text-xl mt-16">
              No students found.
            </div>
          ) : filteredStudents.length >= 3 ? (
            <>
              <Podium students={filteredStudents.slice(0, 3)} />

              <div className="space-y-4 mt-8">
                {filteredStudents.slice(3).map((student, index) => (
                  <LeaderboardCard
                    key={`${student.gmail}-${index}`}
                    student={student}
                    rank={index + 4}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4 mt-8">
              {filteredStudents.map((student, index) => (
                <LeaderboardCard
                  key={`${student.gmail}-${index}`}
                  student={student}
                  rank={index + 1}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </>
  );
}