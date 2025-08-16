import { motion, Variants } from "motion/react";
import { skillsData } from "@/constants/skillsData";

interface SkillsSectionProps {
  isFirstLoad: boolean;
}

const skillCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.05,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function SkillsSection({ isFirstLoad }: SkillsSectionProps) {
  return (
    <div className="space-y-12 cursor-pointer">
      {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: isFirstLoad ? 1 : 0, y: isFirstLoad ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: isFirstLoad ? 0 : 0.4,
            delay: isFirstLoad ? 0 : categoryIndex * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-1 h-6 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {category}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
            {skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                custom={skillIndex}
                variants={skillCardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="flex flex-col items-center p-4 rounded-xl border border-gray-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 h-32"
              >
                <div className="text-3xl mb-2 flex items-center justify-center h-12">
                  {skill.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
