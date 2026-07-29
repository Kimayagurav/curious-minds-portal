"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
};

export default function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
  });

  const y = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
  });

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", move);

    // Generate particles ONLY on the client
    setParticles(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 8 + 8,
      }))
    );

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#08101F]">

      <motion.div
        style={{ x, y }}
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[170px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-400/15 blur-[180px]"
      />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0.2,
            y: 0,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
          }}
          className="absolute rounded-full bg-yellow-300"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 10px rgba(255,213,74,.8)",
          }}
        />
      ))}

    </div>
  );
}