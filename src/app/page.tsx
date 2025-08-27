"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { motion, AnimatePresence, Variants } from "motion/react";
import { personalProjects as projects, templates } from "@/constants";
import Card from "@/components/Home/Card";
import SkillsSection from "@/components/Home/SkillsSection";
import SocialIcons from "@/components/Home/SocialIcons";
import RotatingText from "@/components/RotatingText";
import Footer from "@/components/Home/Footer";

export type Tab = "projects" | "uiTemplates" | "skills";
const tabs: Tab[] = ["projects", "uiTemplates", "skills"];

const tabTaglines: Partial<Record<Tab, string>> = {
  uiTemplates: "Client-Ready UIs",
  projects: "My Work & Experiments",
  skills: "Capabilities ",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [isMounted, setIsMounted] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [footerReady, setFooterReady] = useState(false); // gate footer visibility
  const [isScrollable, setIsScrollable] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const prevTabRef = useRef<Tab>(activeTab);
  const contentRef = useRef<HTMLElement>(null);

  const tabLabels: Record<Tab, string> = {
    uiTemplates: "UI Templates",
    projects: "Projects",
    skills: "Expertise",
  };

  const getIndex = (t: Tab) => tabs.indexOf(t);

  useEffect(() => {
    setIsMounted(true);
    const t1 = setTimeout(() => setIsFirstLoad(false), 400);
    const t2 = setTimeout(() => setFooterReady(true), 550); // fallback in case onAnimationComplete doesn't fire
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // update direction based on tab order (prev -> current)
  useEffect(() => {
    const prev = prevTabRef.current;
    const curr = activeTab;
    const dir = getIndex(curr) > getIndex(prev) ? "right" : "left";
    setDirection(dir);
    prevTabRef.current = curr;
  }, [activeTab]);

  const checkScrollable = () => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const winHeight = window.innerHeight;
      setIsScrollable(contentHeight > winHeight - 80); // -80 to account for footer height
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [activeTab]);

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section className="min-h-screen flex flex-col pt-10 transition-colors duration-200 max-w-4xl mx-auto px-4">
      {/* Header */}
      <motion.div
        className="flex justify-between w-full items-center"
        variants={headerVariants}
        initial={isMounted ? "visible" : "hidden"}
        animate="visible"
      >
        <h1 className="text-2xl font-semibold text-main-text dark:text-main-text">
          Hey, I&apos;m Rakshit
        </h1>
        <div className="w-10 h-10 flex items-center justify-center">
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Bio */}
      <RotatingText />

      {/* Social */}
      <SocialIcons isMounted={isMounted} variants={headerVariants} />

      {/* Tabs */}
      <motion.div
        className="relative mt-8"
        variants={headerVariants}
        initial={isMounted ? "visible" : "hidden"}
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <div className="relative flex justify-between">
          {/* animated pill background */}
          <motion.div
            layoutId="tab-active-bg"
            className="absolute top-1 h-8 rounded-md bg-neutral-50 dark:bg-neutral-900/40 ring-1 ring-inset ring-neutral-200/60 dark:ring-neutral-700/40"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(100 / tabs.length) * getIndex(activeTab)}%`,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 flex-1 py-2 text-center 
          text-[13px] md:text-sm tracking-[0.02em] transition-colors
          ${
            activeTab === tab
              ? "text-neutral-900 dark:text-neutral-100 font-medium"
              : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* hairline underline under tabs */}
        <motion.div
          layout
          className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-200 dark:bg-neutral-700"
        />
      </motion.div>

      {/* Content */}
      <div className="mt-8 mb-6 flex-1">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            initial={{
              opacity: isFirstLoad ? 1 : 0,
              // enter from the direction you're moving TOWARD
              x: isFirstLoad ? 0 : direction === "right" ? -30 : 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: isFirstLoad ? 0 : 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
            exit={{
              opacity: 0,
              // leave opposite direction
              x: direction === "right" ? 30 : -30,
              transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
            }}
            className="w-full will-change-transform"
            style={{ transform: "translateZ(0)" }}
            onAnimationComplete={() => setFooterReady(true)} // signal footer can show
          >
            {tabTaglines[activeTab] && (
              <motion.div
                key={`${activeTab}-tagline`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="mt-3 mb-5 flex justify-center"
              >
                <p
                  className="
        tagline-pill slow
        bg-neutral-100/70 dark:text-white dark:bg-neutral-900/40
        text-[13px] md:text-sm text-neutral-700   
        
      "
                >
                  {tabTaglines[activeTab]}
                </p>
              </motion.div>
            )}

            {activeTab === "skills" ? (
              <SkillsSection isFirstLoad={isFirstLoad} />
            ) : (
              <div className="space-y-8 mb-10">
                {(activeTab === "projects" ? projects : templates).map(
                  (item, index) => (
                    <Card
                      key={item.name}
                      item={item}
                      index={index}
                      isFirstLoad={isFirstLoad}
                      tab={activeTab}
                    />
                  )
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer (hidden until footerReady) */}
      <Footer
        footerRef={footerRef}
        visible={footerReady}
        isScrollable={isScrollable}
      />
    </section>
  );
}
