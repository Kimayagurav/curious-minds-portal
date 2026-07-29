"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StudentNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    sessionStorage.removeItem("student");
    window.location.href = "/";
  }

  const navLink = (
    title: string,
    href: string
  ) => (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className={`transition-all duration-300 ${
        pathname === href
          ? "text-[#FFD54A] font-semibold"
          : "text-gray-300 hover:text-[#FFD54A]"
      }`}
    >
      {title}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#08101F]/90 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}

        <Link
          href="/dashboard"
          className="flex flex-col leading-tight"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
            Success Finds.
          </span>

          <span className="text-xl sm:text-2xl font-bold text-[#FFD54A]">
            Curious Minds
          </span>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden lg:flex items-center gap-7">

          {navLink("Dashboard", "/dashboard")}

          {navLink("Leaderboard", "/leaderboard")}

          {navLink("Profile", "/profile")}

          <a
            href="https://385kartik.github.io/all-qr-at-one-place/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 transition hover:text-[#FFD54A]"
          >
            Resources
          </a>

          <button
            onClick={logout}
            className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden rounded-lg p-2 transition hover:bg-white/10"
          aria-label="Toggle menu"
        >

          <div className="space-y-1.5">

            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen
                  ? "translate-y-2 rotate-45"
                  : ""
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen
                  ? "opacity-0"
                  : ""
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#08101F]/95 backdrop-blur-xl px-5 py-5 space-y-3">

          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === "/dashboard"
                ? "bg-yellow-400 text-black font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            🏠 Dashboard
          </Link>

          <Link
            href="/leaderboard"
            onClick={() => setMenuOpen(false)}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === "/leaderboard"
                ? "bg-yellow-400 text-black font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            🏆 Leaderboard
          </Link>

          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === "/profile"
                ? "bg-yellow-400 text-black font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            👤 Profile
          </Link>

          <a
            href="https://385kartik.github.io/all-qr-at-one-place/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
          >
            📚 Resources
          </a>

          <button
            onClick={logout}
            className="mt-2 w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </div>

    </nav>
  );
}