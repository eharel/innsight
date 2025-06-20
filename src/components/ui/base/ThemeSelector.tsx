import { useState, useEffect } from "react";

const THEMES = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  {
    label: "Sunset",
    value: "sunset",
  },
  { label: "Moonlight", value: "moonlight" },
];

export default function ThemeSelector() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load saved theme or fall back to system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = saved || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="mt-auto border-t border-border pt-4 px-4">
      <label
        htmlFor="theme"
        className="block mb-2 text-sm font-medium text-text-muted"
      >
        Theme
      </label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value)}
        className="w-full rounded-md border border-border bg-bg-surface px-3 py-2 text-sm text-text-main shadow-sm focus:outline-none focus:ring focus:ring-[var(--color-primary)]"
      >
        {THEMES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
