"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitStudyPage() {
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);

  const today = new Date();

  const [studyHours, setStudyHours] = useState("");
  const [questions, setQuestions] = useState("");
  const [physics, setPhysics] = useState("");
  const [chemistry, setChemistry] = useState("");
  const [maths, setMaths] = useState("");
  const [biology, setBiology] = useState("");
  const [testScore, setTestScore] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("student");

    if (!data) {
      router.push("/login");
      return;
    }

    setStudent(JSON.parse(data));
  }, [router]);

  if (!student) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);

    const date = new Date();

    const formData = new URLSearchParams();

    // Auto-filled values
    formData.append("entry.1743201183", student.name);
    formData.append("entry.1103264609", student.gmail);

    // Radio Questions
    formData.append("entry.1937009241", student.std);
    formData.append("entry.126990015", student.batch);

    // Date
    formData.append("entry.1206437529_day", String(date.getDate()));
    formData.append("entry.1206437529_month", String(date.getMonth() + 1));
    formData.append("entry.1206437529_year", String(date.getFullYear()));

    // Study Data
    formData.append("entry.1993306099", studyHours);
    formData.append("entry.407639092", questions);
    formData.append("entry.400853884", physics);
    formData.append("entry.1864689216", chemistry);
    formData.append("entry.212977843", maths);
    formData.append("entry.292220254", biology);
    formData.append("entry.1459902737", testScore);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLScpYwmU_yeCoKGrHiyFGqMQr8tDNTcktGwD3YV6_UwInUQbIw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      alert("Progress submitted successfully! 🎉");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold text-yellow-400">
          Submit Today's Progress
        </h1>

        <p className="text-gray-400 mt-3">
          Welcome back, {student.name}
        </p>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 mt-10 p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Date</label>

              <input
                value={today.toLocaleDateString()}
                disabled
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-2">Study Hours</label>

              <input
                type="number"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">Total Questions</label>

              <input
                type="number"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">Physics Questions</label>

              <input
                type="number"
                value={physics}
                onChange={(e) => setPhysics(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">Chemistry Questions</label>

              <input
                type="number"
                value={chemistry}
                onChange={(e) => setChemistry(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">Mathematics Questions</label>

              <input
                type="number"
                value={maths}
                onChange={(e) => setMaths(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">Biology Questions</label>

              <input
                type="number"
                value={biology}
                onChange={(e) => setBiology(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">Test Score</label>

              <input
                type="text"
                placeholder="e.g. 148/180"
                value={testScore}
                onChange={(e) => setTestScore(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-10 bg-yellow-400 text-black font-bold px-10 py-4 rounded-xl hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Progress"}
          </button>
        </div>
      </div>
    </div>
  );
}