import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adeeb Shah · Founder & CEO, Pronttera",
    short_name: "Adeeb Shah",
    description: "Builds software that lets small businesses own their customers. Tijarah, Frostique, FitStack, and AI agents in production.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f10",
    theme_color: "#0f0f10",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
