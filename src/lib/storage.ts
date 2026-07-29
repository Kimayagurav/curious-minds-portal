import { supabase } from "./supabase";

export async function uploadProfilePhoto(
  file: Blob,
  gmail: string
) {
  const fileName =
    `${gmail
      .toLowerCase()
      .replace(/@/g, "_")
      .replace(/\./g, "_")}.jpg`;

  console.log("===== DEBUG START =====");

  const { data, error } = await supabase.storage
    .from("profile-photos")
    .upload(fileName, file, {
      upsert: true,
    });

  console.log("Storage upload data:", data);
  console.log("Storage upload error:", error);

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from("profile-photos")
    .getPublicUrl(fileName);

  console.log("Public URL:", publicData.publicUrl);

  console.log("===== DEBUG END =====");

  return `${publicData.publicUrl}?t=${Date.now()}`;
}

export async function saveProfilePhoto(
  gmail: string,
  studentName: string,
  photoUrl: string
) {
  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        gmail: gmail.toLowerCase(),
        student_name: studentName,
        photo_url: photoUrl,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "gmail",
      }
    );

  if (error) throw error;
}

export async function getProfilePhoto(
  gmail: string
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("photo_url")
    .eq("gmail", gmail.toLowerCase())
    .single();

  if (error || !data) return null;

  return `${data.photo_url}?t=${Date.now()}`;
}

export async function deleteProfilePhoto(
  gmail: string
) {
  const fileName =
  `${gmail
    .toLowerCase()
    .replace(/@/g, "_")
    .replace(/\./g, "_")}.jpg`;

  await supabase.storage
    .from("profile-photos")
    .remove([fileName]);

  const { error } = await supabase
    .from("profiles")
    .update({
      photo_url: "",
      updated_at: new Date().toISOString(),
    })
    .eq("gmail", gmail.toLowerCase());

  if (error) throw error;
}