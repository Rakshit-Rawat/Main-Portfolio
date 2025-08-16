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

export const skillsData = {
  Frontend: [
    { name: "React", icon: <FaReact className="text-3xl text-blue-500" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-3xl" /> },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-3xl text-blue-600" />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-3xl text-yellow-400" />,
    },
    { name: "HTML5", icon: <SiHtml5 className="text-3xl text-orange-500" /> },
    { name: "CSS3", icon: <SiCss3 className="text-3xl text-blue-500" /> },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-3xl text-cyan-400" />,
    },
    { name: "Redux", icon: <SiRedux className="text-3xl text-purple-600" /> },
    { name: "SASS", icon: <SiSass className="text-3xl text-pink-500" /> },
    {
      name: "Bootstrap",
      icon: <SiBootstrap className="text-3xl text-purple-600" />,
    },
    {
      name: "Framer Motion",
      icon: <TbBrandFramerMotion className="text-3xl" />,
    },
    {
      name: "Svelte",
      icon: <RiSvelteLine className="text-3xl text-orange-500" />,
    },
    {
      name: "Zustand",
      icon: <div className="text-3xl">🦊</div>,
    },
    {
      name: "shadcn/ui",
      icon: <SiShadcnui className="text-3xl" />,
    },
  ],
  Backend: [
    {
      name: "Node.js",
      icon: <SiNodedotjs className="text-3xl text-green-600" />,
    },
    {
      name: "Express",
      icon: <SiExpress className="text-3xl font-bold text-gray-400" />,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-3xl text-green-500" />,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="text-3xl text-blue-600" />,
    },
    { name: "MySQL", icon: <SiMysql className="text-3xl text-blue-500" /> },
    { name: "REST APIs", icon: <AiOutlineGlobal className="text-3xl" /> },
    {
      name: "Supabase",
      icon: <TbBrandSupabase className="text-3xl text-green-500" />,
    },
    {
      name: "Socket.IO",
      icon: <TbBrandSocketIo className="text-3xl text-indigo-500" />,
    },
  ],
  Tools: [
    { name: "Git", icon: <SiGit className="text-3xl text-orange-500" /> },
    { name: "Docker", icon: <SiDocker className="text-3xl text-blue-500" /> },
    { name: "AWS", icon: <FaAmazon className="text-3xl text-orange-500" /> },
    { name: "Vercel", icon: <SiVercel className="text-3xl" /> },
    { name: "Netlify", icon: <SiNetlify className="text-3xl text-cyan-400" /> },
    { name: "GitHub Actions", icon: <div className="text-3xl">🔄</div> },
    {
      name: "VS Code",
      icon: <BiLogoVisualStudio className="text-3xl text-blue-500" />,
    },
    { name: "Figma", icon: <SiFigma className="text-3xl text-purple-500" /> },
    {
      name: "Postman",
      icon: <SiPostman className="text-3xl text-orange-500" />,
    },
    { name: "Notion", icon: <SiNotion className="text-3xl text-gray-900" /> },
  ],
};
