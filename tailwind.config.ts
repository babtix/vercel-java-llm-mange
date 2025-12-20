import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#EDEDED",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "#EDEDED",
            "--tw-prose-headings": "#FFFFFF",
            "--tw-prose-links": "#60A5FA",
            "--tw-prose-bold": "#FFFFFF",
            "--tw-prose-code": "#F472B6",
            "--tw-prose-pre-bg": "#1A1A1A",
            "--tw-prose-pre-code": "#EDEDED",
            "--tw-prose-quotes": "#A1A1AA",
            "--tw-prose-quote-borders": "#3F3F46",
            "--tw-prose-hr": "#27272A",
            "--tw-prose-th-borders": "#3F3F46",
            "--tw-prose-td-borders": "#27272A",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
