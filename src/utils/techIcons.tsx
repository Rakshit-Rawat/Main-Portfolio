// utils/techIcons.ts
import { ReactNode } from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiRedux,
  SiSass,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiPostman,
  SiNotion,
  SiGit,
  SiShadcnui,
  SiAxios ,
  SiDotenv  
} from "react-icons/si";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiLogoVisualStudio } from "react-icons/bi";

import {
  TbBrandFramerMotion,
  TbBrandSocketIo,
  TbBrandSupabase,
} from "react-icons/tb";
import { RiSvelteLine } from "react-icons/ri";
import { FaReact, FaAmazon } from "react-icons/fa";

// Create a mapping of tech names to their icons
const techIconMap: Record<string, ReactNode> = {
  Dotenv:<SiDotenv className="text-xl text-black"/>,
  Axios:<SiAxios className="text-xl text-gray-950"/>,
  React: <FaReact className="text-xl text-blue-500" />,
  "Next.js": <SiNextdotjs className="text-xl" />,
  TypeScript: <SiTypescript className="text-xl text-blue-600" />,
  JavaScript: <SiJavascript className="text-xl text-yellow-400" />,
  HTML5: <SiHtml5 className="text-xl text-orange-500" />,
  CSS3: <SiCss3 className="text-xl text-blue-500" />,
  "Tailwind CSS": <SiTailwindcss className="text-xl text-cyan-400" />,
  Redux: <SiRedux className="text-xl text-purple-600" />,
  SASS: <SiSass className="text-xl text-pink-500" />,
  Bootstrap: <SiBootstrap className="text-xl text-purple-600" />,
  "Framer Motion": <TbBrandFramerMotion className="text-xl" />,
  Svelte: <RiSvelteLine className="text-xl text-orange-500" />,
  Zustand: <div className="text-xl">🦊</div>,
  "shadcn/ui": <SiShadcnui className="text-xl" />,
  "Node.js": <SiNodedotjs className="text-xl text-green-600" />,
  Express: <SiExpress className="text-xl font-bold text-gray-900" />,
  MongoDB: <SiMongodb className="text-xl text-green-500" />,
  PostgreSQL: <SiPostgresql className="text-xl text-blue-600" />,
  MySQL: <SiMysql className="text-xl text-blue-500" />,
  "REST APIs": <AiOutlineGlobal className="text-xl" />,
  Supabase: <TbBrandSupabase className="text-xl text-green-500" />,
  "Socket.IO": <TbBrandSocketIo className="text-xl text-indigo-500" />,
  Git: <SiGit className="text-xl text-orange-500" />,
  Docker: <SiDocker className="text-xl text-blue-500" />,
  AWS: <FaAmazon className="text-xl text-orange-500" />,
  Vercel: <SiVercel className="text-xl" />,
  Netlify: <SiNetlify className="text-xl text-cyan-400" />,
  "GitHub Actions": <div className="text-xl">🔄</div>,
  "VS Code": <BiLogoVisualStudio className="text-xl text-blue-500" />,
  Figma: <SiFigma className="text-xl text-purple-500" />,
  Postman: <SiPostman className="text-xl text-orange-500" />,
  Notion: <SiNotion className="text-xl text-black" />,
  // Additional techs from your projects
  "Chart.js": <div className="text-xl">📊</div>,
  Vite: <div className="text-xl">⚡</div>,
  "MERN Stack": <div className="text-xl">🌿</div>,
  HTML: <SiHtml5 className="text-xl text-orange-500" />,
  CSS: <SiCss3 className="text-xl text-blue-500" />,
};

// Utility function to get icon by tech name
export const getTechIcon = (techName: string): ReactNode => {
  return techIconMap[techName] || <div className="text-xl">⚙️</div>;
};
