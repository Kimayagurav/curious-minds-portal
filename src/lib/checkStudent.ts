import { getStudents } from "./googleSheet";
import { getRegisteredStudents } from "./registeredStudents";

export async function checkStudent(gmail: string) {
  const email = gmail.trim().toLowerCase();

  // Get both progress data and registration data
  const [students, registeredStudents] = await Promise.all([
    getStudents(),
    getRegisteredStudents(),
  ]);

  // Find student's latest progress data
  const matches = students.filter(
    (student) =>
      student.gmail.trim().toLowerCase() === email
  );

  if (matches.length === 0) {
    return null;
  }

  const latestStudent = matches[matches.length - 1];

  // Find student's registration data
  const registeredStudent = registeredStudents.find(
    (student) =>
      student.gmail.trim().toLowerCase() === email
  );

  // Combine progress data with registration data
  return {
    ...latestStudent,

    name:
      registeredStudent?.name ||
      latestStudent.name,

    std:
      registeredStudent?.std ||
      latestStudent.std,

    batch:
      registeredStudent?.batch ||
      latestStudent.batch,

    stream:
      registeredStudent?.stream ||
      latestStudent.stream ||
      "",

    phone:
      registeredStudent?.phone || "",
  };
}