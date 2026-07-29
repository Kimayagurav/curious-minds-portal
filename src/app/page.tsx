import Navbar from "@/components/Navbar";
import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <main className="text-white min-h-screen">

      <Background />

      <Navbar />

      <Hero />

      <Features />

      {/* Leaderboard removed from public homepage */}

      <CTA />

      <Footer />

    </main>
  );
}