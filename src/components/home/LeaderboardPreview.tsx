"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LeaderboardPreview() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTs70nLLTlMyINkERvg_rbm6NM-2NKHHClAmC9sgizKslbbpXNIS-3jmrY8EK1S_YJhZ4TpokxEX--M/pub?gid=949057179&single=true&output=csv"
);

      const text = await res.text();

      const rows = text.trim().split("\n").slice(1);

      const data = rows.map((row) => {
        const cols = row.split(",");

        return {
          name: cols[1]?.replaceAll('"', ""),
          batch: cols[2]?.replaceAll('"', ""),
          questions: Number(cols[5]) || 0,
        };
      });

      data.sort((a, b) => b.questions - a.questions);

      setStudents(data.slice(0, 3));
    }

    loadData();
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-5xl font-bold"
      >
        Hall of <span className="text-yellow-400">Excellence</span>
      </motion.h2>

      <div className="mt-20 grid gap-8 md:grid-cols-3">

        {students.map((student, index) => (

          <motion.div
            key={student.name}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * .25 }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center hover:border-yellow-400"
          >

            <div className="text-6xl">
              {medals[index]}
            </div>

            <h3 className="mt-6 text-3xl font-bold text-yellow-400">
              {student.name}
            </h3>

            <p className="mt-3 text-gray-400">
              {student.batch}
            </p>

            <div className="mt-8 text-4xl font-bold">
              {student.questions}
            </div>

            <p className="text-gray-400">
              Questions Solved
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}