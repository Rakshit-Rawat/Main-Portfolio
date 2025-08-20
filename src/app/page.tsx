"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ThemeToggle from "@/components/theme-toggle";
import {
  motion,
  AnimatePresence,
  Variants,
} from "motion/react";
import { personalProjects as projects, templates } from "@/constants";
import Card from "@/components/Home/Card";
import SkillsSection from "@/components/Home/SkillsSection";
import SocialIcons from "@/components/Home/SocialIcons";
import RotatingText from "@/components/RotatingText";
import Footer from "@/components/Home/Footer";

type Tab = "projects" | "templates" | "skills";
  const tabs: Tab[] = ["templates", "projects", "skills"];


export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("templates");
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const prevTabRef = useRef<Tab>(activeTab);
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);


  const tabLabels = {
    templates: "Templates",
    projects: "Projects",
    skills: "Expertise",
  };

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsFirstLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const getActiveTabIndex = () => tabs.indexOf(activeTab);

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

      {/* Social Icons */}
      <SocialIcons isMounted={isMounted} variants={headerVariants} />

      {/* Tabs */}
      <motion.div
        className="relative mt-8"
        variants={headerVariants}
        initial={isMounted ? "visible" : "hidden"}
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between relative">
          <motion.div
            className="absolute bottom-0 h-0.5 bg-black dark:bg-white rounded-full"
            layout
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(100 / tabs.length) * getActiveTabIndex()}%`,
            }}
          />
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 py-3 text-center text-sm font-medium z-10 ${
                activeTab === tab
                  ? "text-black dark:text-white font-semibold"
                  : "text-neutral-600 dark:text-neutral-500"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {tabLabels[tab]}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div ref={contentRef} className="mt-8 mb-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{
              opacity: isFirstLoad ? 1 : 0,
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
              x: direction === "right" ? 30 : -30,
              transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
            className="w-full"
            style={{ transform: "translateZ(0)" }}
            // onAnimationComplete={() => {
            //   setTimeout(() => checkFooterPosition(), 50);
            // }}
          >
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

      {/* Footer */}
      <Footer  footerRef={footerRef} />
    </section>
  );
}
