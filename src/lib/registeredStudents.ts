export const REGISTERED_STUDENTS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEeVQwT2u2WtQ6katgV9yonuMZXSXFTLqaQVyEyPkuDV0JS3ujhF-vhr3hoGjhi14kcBhuXEjhvFJL/pub?output=csv";

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

export async function getRegisteredStudents() {
  const res = await fetch(REGISTERED_STUDENTS_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch registered students.");
  }

  const text = await res.text();

  const rows = text
    .trim()
    .split(/\r?\n/)
    .slice(1);

  return rows.map((row) => {
    const cols = parseCSVLine(row);

    return {
      timestamp: cols[0] || "",
      name: cols[1] || "",
      gmail: cols[2] || "",
      phone: cols[3] || "",
      std: cols[4] || "",
      batch: cols[5] || "",
      stream: cols[6] || "",
    };
  });
}