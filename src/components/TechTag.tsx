import { motion } from "motion/react";
import { ReactNode, useState } from "react";

type TechTagProps = {
  name: string;
  icon?: ReactNode; // pass an <img/>/<Image/>/<svg/> here
};

export const TechTag = ({ name, icon }: TechTagProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // IMPORTANT: do NOT scale the element that has the border
    <motion.div
      className="
        relative z-0 p-1
        -mx-1
        flex items-center justify-center
        rounded-full
        border border-black dark:border-neutral-700
        bg-white dark:bg-neutral-800
        overflow-hidden    /* ensures perfect circular clipping */
        cursor-pointer antialiased
        shadow-sm hover:shadow-md
        focus:outline-none
      "
      tabIndex={0}
      whileHover={{
        zIndex: 10,
        // no scale here; scaling a rounded border = jaggies
        boxShadow:
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      }}
      // keep tap scale super tiny or remove it; border + scale = shimmer
      whileTap={{ scale: 0.995 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        // make rasterization crisper for rounded borders
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* ICON BUBBLE — fully transparent, no inner shadow, no bg */}
      <div
        className="
          inline-flex items-center justify-center
          h-6 w-6 rounded-full shrink-0
          overflow-hidden
          bg-transparent
        "
      >
        {icon ? (
          // If you pass an <img> / next <Image>, ensure object-cover + round if needed
          <span className="inline-flex items-center justify-center w-[18px] h-[18px]">
            {icon}
          </span>
        ) : (
          <span className="text-lg leading-none font-bold">
            {name.charAt(0)}
          </span>
        )}
      </div>

      {/* LABEL — we can animate this without touching the bordered container */}
      <motion.span
        className="overflow-hidden whitespace-nowrap text-neutral-700 dark:text-neutral-200 font-semibold"
        initial={{ width: 0, opacity: 0, marginLeft: 0 }}
        animate={{
          width: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0,
          marginLeft: isHovered ? 8 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

export default TechTag;
