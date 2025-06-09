/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
        },
        accent: '#06B6D4',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        // Background and surface colors
        'bg-base': '#F9FAFB',
        'bg-surface': '#FFFFFF',
        // Text colors
        'text-main': '#111827',
        'text-muted': '#6B7280',
        // Border color
        border: '#E5E7EB',
      },
    },
  },
  plugins: [],
}
