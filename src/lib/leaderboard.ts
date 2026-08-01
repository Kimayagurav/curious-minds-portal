import { getStudents } from "./googleSheet";

export async function getLeaderboardStudents() {
  const submissions = await getStudents();

  const leaderboardMap = new Map<string, any>();

  submissions.forEach((student) => {
    const gmail = student.gmail.trim().toLowerCase();

    if (!gmail) return;

    if (!leaderboardMap.has(gmail)) {
      leaderboardMap.set(gmail, {
        ...student,
        studyHours: student.studyHours,
        questions: student.questions,
        physics: student.physics,
        chemistry: student.chemistry,
        maths: student.maths,
        biology: student.biology,
        points: 0,
      });
    } else {
      const existing = leaderboardMap.get(gmail);

      // Add weekly totals
      existing.studyHours += student.studyHours;
      existing.questions += student.questions;
      existing.physics += student.physics;
      existing.chemistry += student.chemistry;
      existing.maths += student.maths;
      existing.biology += student.biology;

      // Keep latest information
      existing.timestamp = student.timestamp;
      existing.date = student.date;
      existing.name = student.name;
      existing.batch = student.batch;
      existing.std = student.std;
      existing.stream = student.stream;
      existing.photoUrl = student.photoUrl;
      existing.testScore = student.testScore;
    }
  });

  const leaderboard = Array.from(leaderboardMap.values()).map((student) => {
    student.points =
      student.studyHours * 20 +
      student.questions * 2;

    // Weekly test marks will be added here later
    // student.points += student.testScore;

    return student;
  });

  leaderboard.sort((a, b) => b.points - a.points);
console.table(leaderboard);
  return leaderboard;
}