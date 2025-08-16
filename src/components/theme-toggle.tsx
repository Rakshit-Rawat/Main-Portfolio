"use client";
import { IconSunFilled, IconMoonFilled } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && resolvedTheme) {
      setCurrentTheme(resolvedTheme as "light" | "dark");
    }
  }, [mounted, resolvedTheme]);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-4xl hover:bg-accent transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </button>
    );
  }

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <IconSunFilled className="h-5 w-5 text-foreground" />
      ) : (
        <IconMoonFilled className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
}