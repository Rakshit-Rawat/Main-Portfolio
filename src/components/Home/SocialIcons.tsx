"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import {
  GithubIcon,
  LinkedInIcon,
  GoogleIcon, // Removed TwitterIcon as it's not used
} from "@/constants/icons";

interface SocialIconsProps {
  isMounted: boolean;
  variants: Variants;
}

export default function SocialIcons({ isMounted, variants }: SocialIconsProps) {
  const items = [
    {
      id: "github",
      Icon: GithubIcon,
      href: "https://github.com/Rakshit-Rawat",
      label: "GitHub",
    },
    {
      id: "linkedin",
      Icon: LinkedInIcon,
      href: "https://linkedin.com/in/rakshit-2002-rawat",
      label: "LinkedIn",
    },
    // TwitterIcon removed since it's commented out and unused
    {
      id: "google",
      Icon: GoogleIcon,
      href: "mailto:sayamr086@gmail.com",
      label: "Email",
    },
  ];

  const ICON_CLASS = "w-7 h-7 text-neutral-900 dark:text-neutral-200";

  return (
    <motion.div
      className="mt-8 flex items-center gap-4"
      variants={variants}
      initial={isMounted ? "visible" : "hidden"}
      animate="visible"
      transition={{ delay: 0.2 }}
    >
      {items.map(({ id, Icon, href, label }) => (
        <motion.a
          key={id}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className={ICON_CLASS} />
        </motion.a>
      ))}
    </motion.div>
  );
}
