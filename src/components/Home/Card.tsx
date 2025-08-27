import { motion } from "framer-motion";
import TooltipPreview from "@/components/TooltipPreview";
import TechTag from "@/components/TechTag";
import { getTechIcon } from "@/utils/techIcons";
import { ExternalLink } from "@/constants/icons";
import { ProjectType, TemplateType } from "@/constants";

interface CardProps {
  item: ProjectType | TemplateType;
  index: number;
  isFirstLoad: boolean;
  tab: "projects" | "uiTemplates" | "skills";
}

function isProject(item: ProjectType | TemplateType): item is ProjectType {
  return (item as ProjectType).github !== undefined;
}

const Card: React.FC<CardProps> = ({ item, index, isFirstLoad, tab }) => {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: isFirstLoad ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      
      <div className="flex justify-between items-start">
        
        <h4 className="font-semibold group-hover:text-muted-foreground transition-colors cursor-pointer">
          {item.name}
        </h4>
        <div className="flex space-x-4">
          {tab === "projects" &&
            isProject(item) &&
            item.github.trim() !== "" && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-600 hover:text-black dark:hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>Github</span>
                <ExternalLink />
              </a>
            )}

          <TooltipPreview url={item.live || null} image={item.image || null}>
            <a
              href={item.live || "#"}
              target={item.live ? "_blank" : undefined}
              rel={item.live ? "noopener noreferrer" : undefined}
              className="text-xs text-neutral-600 hover:text-black dark:hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>View</span>
              <ExternalLink />
            </a>
          </TooltipPreview>
        </div>
      </div>

      <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed mb-2">
        {item.description}
      </p>

      <div className="flex flex-wrap">
        {item.tech?.map((tech) => (
          <TechTag key={tech} name={tech} icon={getTechIcon(tech)} />
        ))}
      </div>
    </motion.div>
  );
};

export default Card;
