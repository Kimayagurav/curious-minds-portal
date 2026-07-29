import { getRegisteredStudents } from "./registeredStudents";

export async function checkRegisteredStudent(email: string) {
  const students = await getRegisteredStudents();

  return (
    students.find(
      (student) =>
        student.gmail.trim().toLowerCase() ===
        email.trim().toLowerCase()
    ) || null
  );
}