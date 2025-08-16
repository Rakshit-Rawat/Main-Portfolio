"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useMemo } from "react";
import { Resume, ContactMe } from "@/constants/icons";
import { SiNextdotjs } from "react-icons/si";

interface FooterProps {
  isFooterFixed: boolean;
  footerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Footer({ isFooterFixed, footerRef }: FooterProps) {
  const { scrollY } = useScroll();

  // springs
  const springCfg = useMemo(
    () => ({ stiffness: 220, damping: 26, mass: 0.6 }),
    []
  );
  const progress = useSpring(0, springCfg);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (!isFooterFixed) return;
    const p = Math.min(1, Math.max(0, v / 300));
    progress.set(p);
  });

  useEffect(() => {
    if (!isFooterFixed) progress.set(0);
  }, [isFooterFixed, progress]);

  const y = useTransform(progress, [0, 1], [0, -10]);
  const widthPct = useTransform(progress, [0, 1], [92, 85]);
  const width = useTransform(widthPct, (v) => `${v}%`);
  const boxShadow = useTransform(
    progress,
    [0, 0.07, 1],
    ["none", "var(--shadow-ace)", "var(--shadow-ace)"]
  );

  const footerBottom = useSpring(isFooterFixed ? 16 : 0, springCfg);
  const footerMaxWidth = useSpring(isFooterFixed ? 320 : 672, springCfg);
  const footerBorderRadius = useSpring(isFooterFixed ? 24 : 0, springCfg);

  useEffect(() => {
    footerBottom.set(isFooterFixed ? 16 : 0);
    footerMaxWidth.set(isFooterFixed ? 320 : 672);
    footerBorderRadius.set(isFooterFixed ? 24 : 0);
  }, [isFooterFixed, footerBottom, footerMaxWidth, footerBorderRadius]);

  // label animation targets
  const labelAnimate = (show: boolean) => ({
    opacity: show ? 1 : 0,
    maxWidth: show ? 80 : 0, // px; tweak if your label is longer
    marginLeft: show ? 8 : 0,
  });

  return (
    <motion.footer
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      ref={footerRef}
      style={{
        y: isFooterFixed ? y : 0,
        width: isFooterFixed ? width : "100%",
        boxShadow: isFooterFixed ? boxShadow : "none",
        bottom: footerBottom,
        maxWidth: footerMaxWidth,
        borderRadius: footerBorderRadius,
        willChange: "transform, width, box-shadow",
        transformOrigin: "bottom",
      }}
      className="fixed z-50 h-12 left-1/2 -translate-x-1/2 transform-gpu bg-gray-900 dark:bg-gray-800 border border-gray-700 dark:border-gray-600"
    >
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6 text-sm">
        {/* Left: credit */}
        <div className="flex items-center gap-2 text-gray-300">
          <span>Built with</span>
          <SiNextdotjs className="text-xl text-white" aria-hidden />
        </div>

        {/* Right: same two buttons always mounted; labels animate in/out */}
        <div className="flex items-center gap-3">
          {/* Resume */}
          <a
            href="/Rakshit_Rawat_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-gray-600/70 bg-white px-3 py-1.5 text-gray-900 hover:bg-gray-100 hover:border-gray-500 transition-colors"
            aria-label="Resume"
            title="Resume"
          >
            <Resume className="h-4 w-4" />
            {/* label wrapper: overflow-hidden so width can collapse cleanly */}
            <motion.span
              className="overflow-hidden inline-block"
              initial={false}
              animate={labelAnimate(!isFooterFixed)} // show label when docked
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Real text goes inside so we don't shift layout when hidden */}
              <span className="whitespace-nowrap">Resume</span>
            </motion.span>
          </a>

          {/* Contact me */}
          <a
            href="mailto:rakshit@example.com"
            className="inline-flex items-center rounded-md bg-white text-gray-900 px-3 py-1.5 hover:bg-gray-100 transition-colors"
            aria-label="Contact me"
            title="Contact me"
          >
            <ContactMe className="h-4 w-4" />
            <motion.span
              className="overflow-hidden inline-block"
              initial={false}
              animate={labelAnimate(!isFooterFixed)}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="whitespace-nowrap">Contact me</span>
            </motion.span>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
