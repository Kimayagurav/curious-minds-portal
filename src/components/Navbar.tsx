"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#08101F]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/images/logo.png"
            alt="Curious Minds"
            width={48}
            height={48}
            priority
          />

          <div className="leading-tight">
            <p className="text-[11px] text-gray-400">
              Success Finds.
            </p>

            <h1 className="text-lg sm:text-xl font-bold text-[#FFD54A]">
              Curious Minds
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">

          <Link
            href="/"
            className="text-gray-300 hover:text-[#FFD54A] transition"
          >
            Home
          </Link>

          <a
            href="https://385kartik.github.io/all-qr-at-one-place/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#FFD54A] transition"
          >
            Resources
          </a>

          <a
            href="https://iitianscuriousminds.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#FFD54A] transition"
          >
            Website
          </a>

        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">

          <Link
            href="/login"
            className="rounded-xl border border-[#FFD54A] px-5 py-2 font-medium text-[#FFD54A] transition hover:bg-[#FFD54A] hover:text-black"
          >
            Student Login
          </Link>

          <Link
            href="/signup"
            className="rounded-xl border border-white px-5 py-2 font-medium text-white transition hover:bg-white hover:text-black"
          >
            Student Sign Up
          </Link>

          <Link
            href="/faculty-login"
            className="rounded-xl bg-[#FFD54A] px-5 py-2 font-semibold text-black transition hover:scale-105"
          >
            Faculty Login
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white"
        >
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#08101F]/95 backdrop-blur-xl px-5 py-6 space-y-5">

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-200 hover:text-[#FFD54A]"
          >
            🏠 Home
          </Link>

          <a
            href="https://385kartik.github.io/all-qr-at-one-place/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-200 hover:text-[#FFD54A]"
          >
            📚 Resources
          </a>

          <a
            href="https://iitianscuriousminds.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-200 hover:text-[#FFD54A]"
          >
            🌐 Website
          </a>

          <hr className="border-white/10" />

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl border border-[#FFD54A] px-4 py-3 text-center font-medium text-[#FFD54A] hover:bg-[#FFD54A] hover:text-black transition"
          >
            Student Login
          </Link>

          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl border border-white px-4 py-3 text-center font-medium text-white hover:bg-white hover:text-black transition"
          >
            Student Sign Up
          </Link>

          <Link
            href="/faculty-login"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl bg-[#FFD54A] px-4 py-3 text-center font-semibold text-black hover:scale-[1.02] transition"
          >
            Faculty Login
          </Link>

        </div>
      </div>
    </nav>
  );
}