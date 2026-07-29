export const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTs70nLLTlMyINkERvg_rbm6NM-2NKHHClAmC9sgizKslbbpXNIS-3jmrY8EK1S_YJhZ4TpokxEX--M/pub?gid=949057179&single=true&output=csv";

function parseCSVLine(line: string) {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);

  return result.map((item) =>
    item.replace(/^"|"$/g, "").trim()
  );
}

export async function getStudents() {
  const res = await fetch(SHEET_URL, {
    cache: "no-store",
  });

  const text = await res.text();

  const rows = text
    .trim()
    .split(/\r?\n/)
    .slice(1);

  const studentMap = new Map<
    string,
    {
      timestamp: string;
      name: string;
      batch: string;
      date: string;
      studyHours: number;
      questions: number;
      physics: number;
      chemistry: number;
      maths: number;
      biology: number;
      testScore: number;
      std: string;
      gmail: string;
      stream: string;
      points: number;
    }
  >();

  rows.forEach((row) => {
    const cols = parseCSVLine(row);

    const student = {
      timestamp: cols[0] || "",
      name: cols[1] || "",
      batch: cols[2] || "",
      date: cols[3] || "",
      studyHours: Number(cols[4]) || 0,
      questions: Number(cols[5]) || 0,
      physics: Number(cols[6]) || 0,
      chemistry: Number(cols[7]) || 0,
      maths: Number(cols[8]) || 0,
      biology: Number(cols[9]) || 0,
      testScore: Number(cols[10]) || 0,
      std: cols[11] || "",
      gmail: (cols[12] || "").trim().toLowerCase(),
      stream: cols[13] || "",
      points: 0,
    };

    if (!student.gmail) return;

    if (!studentMap.has(student.gmail)) {
      studentMap.set(student.gmail, {
        ...student,
      });
    } else {
      const existing = studentMap.get(student.gmail)!;

      existing.studyHours += student.studyHours;
      existing.questions += student.questions;
      existing.physics += student.physics;
      existing.chemistry += student.chemistry;
      existing.maths += student.maths;
      existing.biology += student.biology;

      // Keep latest information
      existing.timestamp = student.timestamp;
      existing.date = student.date;
      existing.batch = student.batch;
      existing.std = student.std;
      existing.stream = student.stream;
      existing.name = student.name;
      existing.testScore = student.testScore;
    }
  });

  const students = Array.from(studentMap.values()).map((student) => {
    student.points =
      student.studyHours * 20 +
      student.questions * 2;
      // Weekly Test Marks will be added later

    return student;
  });

  students.sort((a, b) => b.points - a.points);

  return students;
}