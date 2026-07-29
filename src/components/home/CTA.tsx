"use client";

import { BookOpen, Globe, Camera } from "lucide-react";

export default function CTA() {
  const cards = [
    {
      icon: BookOpen,
      title: "Resources",
      link: "https://385kartik.github.io/all-qr-at-one-place/",
    },
    {
      icon: Globe,
      title: "Official Website",
      link: "https://iitianscuriousminds.com/",
    },
    {
      icon: Camera,
      title: "Instagram",
      link: "https://www.instagram.com/iitians_curious_minds/",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <h2 className="text-center text-5xl font-bold">
        Explore <span className="text-yellow-400">Curious Minds</span>
      </h2>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <a
              key={card.title}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-400"
            >
              <Icon className="text-yellow-400" size={42} />

              <h3 className="mt-6 text-3xl font-bold">
                {card.title}
              </h3>
            </a>
          );
        })}
      </div>
    </section>
  );
}