"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const words = ["plan", "build", "ship"];

export default function RotatingText() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.p
      className="mt-4 leading-relaxed"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      Full Stack Developer building full-featured websites and web apps with
      MERN &amp; Next.js — scalable, fast, and production-ready. I don&apos;t just
      prototype — I{" "}
      <span className="inline-block align-baseline">
        <span
          className="inline-flex items-center justify-center rounded bg-black text-white 
                     dark:bg-white dark:text-black shadow-sm 
                     w-10 h-6 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
              transition={{ duration: 0.28 }}
              className="font-medium leading-none text-[14px]"
            >
              {words[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
      .
    </motion.p>
  );
}
