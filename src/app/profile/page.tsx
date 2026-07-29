"use client";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import StudentNavbar from "@/components/ui/StudentNavbar";
import getCroppedImg from "@/lib/cropImage";
import {
  uploadProfilePhoto,
  saveProfilePhoto,
  getProfilePhoto,
  deleteProfilePhoto,
} from "@/lib/storage";

export default function ProfilePage() {
  const [student, setStudent] = useState<any>(null);
  const [rank, setRank] = useState("-");
  const [profilePhoto, setProfilePhoto] = useState("");

  // Crop states
  const [imageToCrop, setImageToCrop] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<any>(null);
  const [savingPhoto, setSavingPhoto] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
  async function loadStudent() {
    const data = sessionStorage.getItem("student");

    if (!data) {
      window.location.href = "/login";
      return;
    }

    const parsedStudent = JSON.parse(data);

    setStudent(parsedStudent);

    const savedRank = sessionStorage.getItem("rank");

    if (savedRank) {
      setRank(savedRank);
    }

    // Load profile photo from Supabase
    if (parsedStudent.gmail) {
      try {
        const photoUrl = await getProfilePhoto(
          parsedStudent.gmail
        );

        if (photoUrl) {
          setProfilePhoto(photoUrl);
        } else if (parsedStudent.photoURL) {
          setProfilePhoto(parsedStudent.photoURL);
        }
      } catch (err) {
        console.error(
          "Error loading profile photo:",
          err
        );

        if (parsedStudent.photoURL) {
          setProfilePhoto(parsedStudent.photoURL);
        }
      }
    } else if (parsedStudent.photoURL) {
      setProfilePhoto(parsedStudent.photoURL);
    }
  }

  loadStudent();
}, []);
const onCropComplete = useCallback(
  (
    croppedArea: any,
    croppedAreaPixelsValue: any
  ) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  },
  []
);

  function handlePhotoUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file || !student) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5 MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result as string;

      setImageToCrop(imageData);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    };

    reader.onerror = () => {
      alert("Could not read the selected image.");
    };

    reader.readAsDataURL(file);
  }

  async function saveCroppedPhoto() {
  if (!student || !imageToCrop || !croppedAreaPixels) {
    return;
  }

  try {
    setSavingPhoto(true);

    // Crop image
    const croppedImage = await getCroppedImg(
      imageToCrop,
      croppedAreaPixels
    );

    // Convert Base64 to Blob
    const response = await fetch(croppedImage);
    const blob = await response.blob();

    // Upload image to Supabase Storage
    const {
  data: { session },
} = await supabase.auth.getSession();

console.log("Supabase Session:", session);
    const photoUrl = await uploadProfilePhoto(
      blob,
      student.gmail
    );

    // Save photo URL in Supabase database
   // Save photo URL in Supabase database
await saveProfilePhoto(
  student.gmail,
  student.name,
  photoUrl
);

    // Update UI
    setProfilePhoto(photoUrl);

    // Close crop editor
    closeCropEditor();

  } catch (error) {
    console.error(
      "Could not save profile photo:",
      error
    );

    alert(
      "Failed to upload profile photo. Please try again."
    );
  } finally {
    setSavingPhoto(false);
  }
}

  function closeCropEditor() {
    setImageToCrop("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function removeProfilePhoto() {
  if (!student) return;

  try {
    await saveProfilePhoto(
      student.gmail,
      student.name,
      ""
    );

    setProfilePhoto("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  } catch (error) {
    console.error(
      "Failed to remove profile photo:",
      error
    );

    alert(
      "Could not remove profile photo."
    );
  }
}

  if (!student) {
    return (
      <>
        <StudentNavbar />

        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading...
        </div>
      </>
    );
  }

  const performance =
    (student.studyHours || 0) * 20 +
    (student.questions || 0);

  const fallbackAvatar =
    "https://ui-avatars.com/api/?background=FFD54A&color=000&name=" +
    encodeURIComponent(student.name);

  /*
    CAREER TYPE LOGIC

    PCB / NEET -> Doctor
    PCM / JEE  -> Engineer

    For MHT-CET:
    PCB -> Doctor
    PCM -> Engineer
  */

  const studentStream =
    student.stream?.trim().toUpperCase() || "";

  const studentBatch =
    student.batch?.trim().toUpperCase() || "";

  const isDoctor =
    studentStream === "PCB" ||
    (studentBatch === "NEET" &&
      studentStream !== "PCM");

  const isEngineer =
    studentStream === "PCM" ||
    (studentBatch === "JEE" &&
      studentStream !== "PCB");

  return (
    <>
      <StudentNavbar />

      <div className="min-h-screen bg-black text-white flex justify-center py-14 px-6">

        <div className="w-full max-w-4xl bg-zinc-900 rounded-3xl border border-zinc-800 p-10">

          {/* Student Profile */}

          <div className="flex flex-col items-center">

            {/* =========================
                DOCTOR FRAME
            ========================= */}

            {isDoctor ? (
              <div className="relative w-[320px] h-[430px] max-w-full">

                {/* Student Photo */}

                <img
                  src={profilePhoto || fallbackAvatar}
                  alt={`${student.name} profile`}
                  className="
                    absolute
                    left-1/2
                    top-[72px]
                    z-0
                    h-[245px]
                    w-[190px]
                    -translate-x-1/2
                    object-cover
                    object-top
                  "
                />

                {/* Doctor Frame Overlay */}

                <img
                  src="/images/frames/doctor-frame.png"
                  alt="Future Doctor Frame"
                  className="
                    absolute
                    inset-0
                    z-10
                    h-full
                    w-full
                    object-contain
                    pointer-events-none
                  "
                />

                {/* Camera Button */}

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="
                    absolute
                    bottom-3
                    right-3
                    z-20
                    w-12
                    h-12
                    rounded-full
                    bg-yellow-400
                    text-black
                    flex
                    items-center
                    justify-center
                    text-xl
                    border-4
                    border-zinc-900
                    hover:scale-110
                    transition
                  "
                  title="Change profile photo"
                >
                  📷
                </button>

              </div>

            ) : isEngineer ? (

              /* =========================
                  ENGINEER FRAME
              ========================= */

              <div className="relative w-[320px] h-[430px] max-w-full">

                {/* Student Photo */}

                <img
                  src={profilePhoto || fallbackAvatar}
                  alt={`${student.name} profile`}
                  className="
                    absolute
                    left-1/2
                    top-[82px]
                    z-0
                    h-[230px]
                    w-[185px]
                    -translate-x-1/2
                    object-cover
                    object-top
                  "
                />

                {/* Engineer Frame Overlay */}

                <img
                  src="/images/frames/engineer-frame.png"
                  alt="Future Engineer Frame"
                  className="
                    absolute
                    inset-0
                    z-10
                    h-full
                    w-full
                    object-contain
                    pointer-events-none
                  "
                />

                {/* Camera Button */}

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="
                    absolute
                    bottom-3
                    right-3
                    z-20
                    w-12
                    h-12
                    rounded-full
                    bg-yellow-400
                    text-black
                    flex
                    items-center
                    justify-center
                    text-xl
                    border-4
                    border-zinc-900
                    hover:scale-110
                    transition
                  "
                  title="Change profile photo"
                >
                  📷
                </button>

              </div>

            ) : (

              /* =========================
                  NORMAL PROFILE PHOTO
              ========================= */

              <div className="relative">

                <img
                  src={profilePhoto || fallbackAvatar}
                  alt={`${student.name} profile`}
                  className="w-36 h-36 rounded-full border-4 border-yellow-400 object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="absolute bottom-1 right-1 w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xl border-4 border-zinc-900 hover:scale-110 transition"
                  title="Change profile photo"
                >
                  📷
                </button>

              </div>
            )}

            {/* Hidden File Input */}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="mt-5 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-105 hover:bg-yellow-300"
            >
              📷 Change Profile Photo
            </button>

            {profilePhoto && (
              <button
                type="button"
                onClick={removeProfilePhoto}
                className="mt-3 text-sm text-gray-400 transition hover:text-red-400"
              >
                Remove uploaded photo
              </button>
            )}

            {/* Career Badge */}

            {isDoctor && (
              <div className="mt-5 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2 text-sm font-bold text-yellow-400">
                🩺 Future Doctor •{" "}
                {studentStream || "NEET"}
              </div>
            )}

            {isEngineer && (
              <div className="mt-5 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2 text-sm font-bold text-yellow-400">
                🎓 Future Engineer •{" "}
                {studentStream || "JEE"}
              </div>
            )}

            <h1 className="text-4xl font-bold text-yellow-400 mt-6 text-center">
              {student.name}
            </h1>

            <p className="text-gray-400 mt-2 text-center">
              {student.gmail}
            </p>

          </div>

          {/* Student Stats */}

          <div className="grid md:grid-cols-2 gap-6 mt-12">

            <div className="bg-black rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-yellow-400 font-bold">
                Batch
              </h3>

              <p className="text-3xl mt-3">
                {student.batch}
              </p>
            </div>

            <div className="bg-black rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-yellow-400 font-bold">
                Standard
              </h3>

              <p className="text-3xl mt-3">
                {student.std}
              </p>
            </div>

            {studentStream && (
              <div className="bg-black rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-yellow-400 font-bold">
                  Stream
                </h3>

                <p className="text-3xl mt-3">
                  {studentStream}
                </p>
              </div>
            )}

            <div className="bg-black rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-yellow-400 font-bold">
                Study Hours
              </h3>

              <p className="text-3xl mt-3">
                {student.studyHours}
              </p>
            </div>

            <div className="bg-black rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-yellow-400 font-bold">
                Questions
              </h3>

              <p className="text-3xl mt-3">
                {student.questions}
              </p>
            </div>

            <div className="bg-black rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-yellow-400 font-bold">
                Performance Score
              </h3>

              <p className="text-3xl mt-3">
                {performance}
              </p>
            </div>

            <div className="bg-black rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-yellow-400 font-bold">
                Leaderboard Rank
              </h3>

              <p className="text-3xl mt-3">
                #{rank}
              </p>
            </div>

          </div>

          {/* Achievements */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              Achievements
            </h2>

            <div className="flex flex-wrap gap-4">

              {performance >= 100 && (
                <div className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
                  ⭐ 100+ Score
                </div>
              )}

              {student.studyHours >= 5 && (
                <div className="bg-green-600 px-5 py-3 rounded-xl">
                  📚 Consistent Learner
                </div>
              )}

              {Number(rank) <= 10 &&
                rank !== "-" && (
                  <div className="bg-blue-600 px-5 py-3 rounded-xl">
                    🏆 Top 10
                  </div>
                )}

              {isDoctor && (
                <div className="bg-white text-black px-5 py-3 rounded-xl font-bold">
                  🩺 Future Doctor
                </div>
              )}

              {isEngineer && (
                <div className="bg-yellow-500 text-black px-5 py-3 rounded-xl font-bold">
                  🎓 Future Engineer
                </div>
              )}

              {performance < 100 &&
                student.studyHours < 5 &&
                (rank === "-" ||
                  Number(rank) > 10) &&
                !isDoctor &&
                !isEngineer && (
                  <p className="text-gray-500">
                    Keep submitting your daily progress to unlock achievements.
                  </p>
                )}

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          PHOTO CROP MODAL
      ========================================= */}

      {imageToCrop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4">

          <div className="w-full max-w-2xl rounded-3xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">

            <h2 className="text-center text-3xl font-bold text-yellow-400">
              Adjust Your Profile Photo
            </h2>

            <p className="mt-2 text-center text-gray-400">
              Drag and zoom your photo so your face fits clearly inside the frame.
            </p>

            {/* Crop Area */}

            <div className="relative mt-6 h-[500px] w-full overflow-hidden rounded-2xl bg-black">

              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={4 / 5}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={true}
              />

              {/* Face Position Guide */}

              <div className="pointer-events-none absolute left-1/2 top-[18%] z-20 h-[45%] w-[48%] -translate-x-1/2 rounded-[50%] border-2 border-dashed border-yellow-400/80">

                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-yellow-400">
                  Position your face here
                </span>

              </div>

            </div>

            {/* Zoom Control */}

            <div className="mt-6">

              <div className="mb-2 flex items-center justify-between">

                <span className="font-semibold text-white">
                  Zoom
                </span>

                <span className="text-sm text-yellow-400">
                  {zoom.toFixed(1)}x
                </span>

              </div>

              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) =>
                  setZoom(Number(e.target.value))
                }
                className="w-full accent-yellow-400"
              />

            </div>

            {/* Buttons */}

            <div className="mt-7 flex gap-4">

              <button
                type="button"
                onClick={closeCropEditor}
                disabled={savingPhoto}
                className="flex-1 rounded-xl border border-zinc-600 px-6 py-4 font-bold text-white transition hover:border-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveCroppedPhoto}
                disabled={
                  savingPhoto ||
                  !croppedAreaPixels
                }
                className="flex-1 rounded-xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingPhoto
                  ? "Saving..."
                  : "Save Photo"}
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}