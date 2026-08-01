import { getAllProfilePhotos } from "./storage";

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

  const students = rows.map((row) => {
    const cols = parseCSVLine(row);

    return {
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
    };
  });

  const photos = await getAllProfilePhotos();

  const photoMap = new Map(
    photos.map((photo) => [
      photo.gmail.toLowerCase(),
      photo.photo_url,
    ])
  );

  return students.map((student) => ({
    ...student,
    photoUrl:
      photoMap.get(student.gmail.toLowerCase()) || "",
  }));
}