"use client";

import React, { useState } from "react";
import { Resume, ContactMe } from "@/constants/icons";
import { SiNextdotjs } from "react-icons/si";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

interface FooterProps {
  footerRef: React.RefObject<HTMLDivElement | null>;
  visible?: boolean;
  isScrollable: boolean;
}

export default function Footer({
  footerRef,
  visible = false,
  isScrollable,
}: FooterProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // mimic your navbar: small motion as the user scrolls
  // lift the footer a touch and tighten its width + corners
  const yRaw = useTransform(scrollYProgress, [0.7, 1], [-10, 0]);
  const widthRaw = useTransform(scrollYProgress, [0.7, 1], ["60%", "80%"]);
  const radiusRaw = useTransform(scrollY, [0, 100], [16, 10]);
  const scrolledMV = useTransform(() => {
    const px = scrollY.get();
    const prog = scrollYProgress.get();
    return px > 10 && prog > 0.95;
  });

  // smooth springs
  const y = useSpring(yRaw, { stiffness: 300, damping: 30, restDelta: 0.001 });
  const width = useSpring(widthRaw, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  const radius = useSpring(radiusRaw, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  // shadow/rounded toggle (same pattern as navbar)
  useMotionValueEvent(scrolledMV, "change", (latest) => {
    setScrolled(latest);
  });

  return (
    <motion.footer
      ref={footerRef as React.RefObject<HTMLDivElement>}
      className="fixed bottom-0 inset-x-0 z-50 mx-auto flex w-full max-w-3xl justify-center px-0 "
      style={{
        y,
        visibility: visible ? "visible" : "hidden", // no flash before parent is ready
      }}
      transition={{
        // only transition box shadow changes for a nicer snap
        boxShadow: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <motion.div
        className={[
          "flex w-full items-center justify-between gap-3 px-4 sm:px-6 py-2",
          "bg-white/80 dark:bg-gray-900/80 ",
          scrolled && isScrollable
            ? "rounded-full shadow-md border border-transparent"
            : "rounded-2xl border border-gray-300 dark:border-gray-700",
          "backdrop-blur-md backdrop-saturate-150",
          "text-gray-800 dark:text-gray-200",
        ].join(" ")}
        style={{
          width,
          borderRadius: radius as unknown as number, // keep corners synced with width
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          <span>Built with</span>
          <SiNextdotjs className="text-xl" aria-hidden />
        </div>

        {/* Right */}
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
            <span className="ml-2 whitespace-nowrap">View Resume</span>
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
            <span className="ml-2 whitespace-nowrap">Get In Touch</span>
          </a>
        </div>
      </motion.div>
    </motion.footer>
  );
}
