"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Resume, ContactMe } from "@/constants/icons";
import { SiNextdotjs } from "react-icons/si";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "motion/react";

interface FooterProps {
  footerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Footer({  footerRef }: FooterProps) {
  const { scrollYProgress } = useScroll();
  const ZONE_START = 0.9;

  // --- Short page detection: drive a target and smooth it with a single spring
  const forceOpenTarget = useMotionValue(0);
  const forceOpen = useSpring(forceOpenTarget, {
    stiffness: 300,
    damping: 32,
    restDelta: 0.0008,
  });

  const rafId = useRef<number | null>(null);
  const lastShort = useRef<boolean | null>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;

    const measure = () => {
      const short = root.scrollHeight <= window.innerHeight + 1;
      if (short !== lastShort.current) {
        lastShort.current = short;
        // set instantly; spring handles easing
        forceOpenTarget.set(short ? 1 : 0);
      }
    };

    const onObserved = () => {
      if (rafId.current != null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        measure();
      });
    };

    measure();
    const ro = new ResizeObserver(onObserved);
    ro.observe(root);
    window.addEventListener("resize", onObserved);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onObserved);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [forceOpenTarget]);

  // --- Blend scroll with forceOpen without multi-input overloads
  // prog = lerp(scrollYProgress, 1, forceOpen)
  const blended: MotionValue<number> = useTransform(() => {
    const p = scrollYProgress.get();
    const f = forceOpen.get();
    return p * (1 - f) + f;
  });

  // Single global smoothing so tab switches & short pages feel seamless
  const prog = useSpring(blended, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.0008,
  });

  // --- Map the ONE driver to all visuals (no extra springs)
  const y = useTransform(prog, [ZONE_START, 1], [-16, 0]);
  const widthPct = useTransform(prog, [ZONE_START, 1], [60, 80]);
  const widthCss = useTransform(widthPct, (v) => `${v}%`);
  const radius = useTransform(prog, [ZONE_START, 1], [16, 10]);

  return (
    <motion.footer
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { ease: [0.22, 1, 0.36, 1], duration: 0.3 },
      }}
      ref={footerRef as React.RefObject<HTMLDivElement>}
      className="fixed bottom-0 inset-x-0 z-50 mx-auto w-full max-w-3xl px-0 transform-gpu"
      style={{ y, transformOrigin: "bottom center" }}
    >
      <div className="relative h-12">
        {/* BACKGROUND PILL */}
        <motion.div
          aria-hidden
          className="absolute inset-y-0 left-1/2 -translate-x-1/2
                     rounded-2xl border shadow-md
                     bg-white/80 dark:bg-gray-900/80
                     border-gray-300 dark:border-gray-700
                     backdrop-blur-md backdrop-saturate-150
                     will-change-[width,transform,border-radius]"
          style={{ width: widthCss, borderRadius: radius }}
        />

        {/* CONTENT PILL */}
        <motion.div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2
                     flex items-center justify-between gap-3 px-4 sm:px-6 text-sm
                     rounded-2xl text-gray-800 dark:text-gray-200
                     will-change-[width,transform,border-radius]"
          style={{ width: widthCss, borderRadius: radius, overflow: "hidden" }}
        >
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <SiNextdotjs className="text-xl" aria-hidden />
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Rakshit_Rawat.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Resume"
              title="Resume"
            >
              <Resume className="h-4 w-4" />
              <span className="ml-2 whitespace-nowrap">View CV</span>
            </a>

            <a
              href="mailto:rakshit@example.com"
              className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Contact me"
              title="Contact me"
            >
              <ContactMe className="h-4 w-4" />
              <span className="ml-2 whitespace-nowrap">Contact me</span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
