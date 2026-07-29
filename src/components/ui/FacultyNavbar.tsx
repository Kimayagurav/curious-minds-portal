"use client";

import { useEffect, useState } from "react";

export default function FacultyNavbar() {
  const [faculty, setFaculty] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("faculty");

    if (!data) {
      window.location.href = "/faculty-login";
      return;
    }

    setFaculty(JSON.parse(data));
  }, []);

  function logout() {
    sessionStorage.removeItem("faculty");
    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#08101F]/95 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}

        <div>

          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
            Success Finds.
          </p>

          <h1 className="text-2xl font-extrabold text-yellow-400">
            Curious Minds
          </h1>

          <p className="text-sm text-gray-400">
            Faculty Portal
          </p>

        </div>

        {/* Desktop */}

        <div className="hidden md:flex items-center gap-6">

          <div className="text-right">

            <p className="text-xs uppercase tracking-wider text-gray-500">
              Welcome
            </p>

            <p className="font-semibold text-white">
              {faculty?.name || "Faculty"}
            </p>

          </div>

          <button
            onClick={logout}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

        {/* Mobile Hamburger */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 transition hover:bg-white/10 md:hidden"
        >

          <div className="space-y-1.5">

            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen
                  ? "translate-y-2 rotate-45"
                  : ""
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen
                  ? "opacity-0"
                  : ""
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen
                  ? "-translate-y-2 -rotate-45"
                  : ""
              }`}
            />

          </div>

        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-48"
            : "max-h-0"
        }`}
      >

        <div className="border-t border-zinc-800 bg-[#08101F] px-5 py-5">

          <p className="text-sm text-gray-400">
            Logged in as
          </p>

          <p className="mt-1 font-semibold text-yellow-400">
            {faculty?.name || "Faculty"}
          </p>

          <button
            onClick={logout}
            className="mt-5 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}