"use client";

import { motion } from "framer-motion";
import { TrendingUp, Trophy, Target } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Monitor daily study hours, solved questions and your overall consistency.",
  },
  {
    icon: Trophy,
    title: "Compete Daily",
    description:
      "Climb the leaderboard and stay motivated through healthy competition.",
  },
  {
    icon: Target,
    title: "Stay Exam Ready",
    description:
      "Prepare smarter for JEE, NEET and MHT-CET with daily tracking.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .6 }}
        className="text-center text-5xl font-bold"
      >
        Why Students Choose
        <span className="text-yellow-400"> Curious Minds</span>
      </motion.h2>

      <div className="mt-20 grid gap-8 md:grid-cols-3">

        {features.map((feature, index) => {

          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * .2,
                duration: .6,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-10
              transition-all
              hover:border-yellow-400
              hover:shadow-[0_0_45px_rgba(255,213,74,.15)]
            "
            >

              <div className="mb-8 inline-flex rounded-2xl bg-yellow-400/20 p-5">

                <Icon
                  className="text-yellow-400"
                  size={38}
                />

              </div>

              <h3 className="text-3xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-5 leading-8 text-gray-400">
                {feature.description}
              </p>

            </motion.div>
          );

        })}

      </div>

    </section>
  );
}