export type ProjectType = {
  name: string;
  description: string;
  tech: string[]; // changed to array of strings
  github: string;
  live: string | null;
  image: string | null;
};

export type TemplateType = {
  name: string;
  description: string;
  tech: string[]; // changed to array of strings
  live: string | null;
  image: string | null;
};

export const personalProjects: ProjectType[] = [
  {
    name: "VChat",
    description:
      "A real-time chat and admin dashboard app built with the MERN stack and Socket.IO — ideal for modern collaboration platforms.",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Zustand",
      "Axios",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Dotenv",
    ],
    github: "https://github.com/Rakshit-Rawat/ChatApp",
    live: "https://buzz-link-azure.vercel.app/",
    image: "/VChat.png",
  },
  {
    name: "Youtube Video Downloader",
    description:
      "A simple full-stack tool to download YouTube videos via direct URL. Built with React and Express.",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Axios",
    ],
    github: "https://github.com/Rakshit-Rawat/YoutubeVideoDownloader",
    live: null,
    image: null,
  },
];


export const templates: TemplateType[] = [
  {
    name: "Reform",
    description:
      "A clean, high-converting template for contractors and renovation businesses to showcase services, projects, and testimonials with ease.",
    tech: ["Svelte", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://the-one-nu.vercel.app/",
    image: "/TheOne.png",
  },
  {
    name: "TheOne",
    description:
      "A bold, modern template for outdoor brands and sports gear companies. Perfect for product showcases and landing pages.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Keen-slider",
      "Vite",
    ],
    live: "https://the-one-nu.vercel.app/",
    image: "/TheOne.png",
  },
  {
    name: "Simple Developer Portfolio",
    description:
      "A minimal and responsive portfolio template for developers to showcase skills and projects with clarity.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    live: "https://web-portfolio-ecru-two.vercel.app/",
    image: "/Portfolio1.png",
  },
  {
    name: "Structured Portfolio Showcase",
    description:
      "A professional portfolio template with dedicated sections for About, Projects, and Contact — great for personal branding.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    live: "https://web-portfolio-data.vercel.app/",
    image: "/Portfolio2.png",
  },
];

