"use client";

import { BookOpen, Globe, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold text-yellow-400">
              Curious Minds
            </h2>

            <p className="mt-4 text-gray-400 leading-8">
              India's Smart Progress Portal for
              JEE • NEET • MHT-CET students.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-bold text-xl mb-6">
              Quick Links
            </h3>

            <div className="space-y-4">

              <a
                href="https://385kartik.github.io/all-qr-at-one-place/"
                target="_blank"
                className="flex items-center gap-3 hover:text-yellow-400"
              >
                <BookOpen size={18} />
                Resources
              </a>

              <a
                href="https://iitianscuriousminds.com/"
                target="_blank"
                className="flex items-center gap-3 hover:text-yellow-400"
              >
                <Globe size={18} />
                Official Website
              </a>

              <a
                href="https://www.instagram.com/iitians_curious_minds/"
                target="_blank"
                className="flex items-center gap-3 hover:text-yellow-400"
              >
                <Camera size={18} />
                Instagram
              </a>

            </div>

          </div>

          {/* Quote */}

          <div>

            <h3 className="font-bold text-xl mb-6">
              Our Vision
            </h3>

            <p className="text-gray-400 leading-8">
              Empowering every student through
              consistency, discipline and smart learning.
            </p>

          </div>

        </div>

        <div className="border-t border-white/10 mt-14 pt-8 text-center text-gray-500">

          © 2026 Curious Minds.
          <br />
          Success Finds.

        </div>

      </div>

    </footer>
  );
}