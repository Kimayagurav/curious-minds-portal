"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Glow */}
      <div className="absolute left-1/2 top-20 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-yellow-400/15 blur-[150px]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/logo.png"
            alt="Curious Minds"
            width={130}
            height={130}
            priority
            className="drop-shadow-[0_0_40px_rgba(255,213,74,0.4)]"
          />
        </motion.div>

        {/* Tagline First */}
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-3xl font-semibold text-[#FFD54A] md:text-4xl"
        >
          Success Finds.
        </motion.h2>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-6xl font-black tracking-tight text-white md:text-8xl"
        >
          Curious
          <span className="text-[#FFD54A]"> Minds</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl"
        >
          Where consistency meets excellence.
          <br />
          India's Smart Progress Portal for
          <span className="font-semibold text-white">
            {" "}
            JEE • NEET • MHT-CET
          </span>{" "}
          students.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-2xl bg-[#FFD54A] px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,213,74,0.35)]"
          >
            Student Login
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/faculty-login"
            className="rounded-2xl border border-white/20 px-8 py-4 text-white transition-all duration-300 hover:border-[#FFD54A] hover:text-[#FFD54A]"
          >
            Faculty Login
          </Link>
        </motion.div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="absolute bottom-10 text-sm tracking-widest text-gray-500"
        >
          SCROLL TO EXPLORE ↓
        </motion.div>

      </div>

    </section>
  );
}