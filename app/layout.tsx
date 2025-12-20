import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ollama OpenRouter Manager | Web Edition",
  description: "Advanced AI Model Management with Hybrid Local/Cloud Architecture, RAG Pipelines, and Multi-Agent Orchestration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased cyber-grid min-h-screen">{children}</body>
    </html>
  );
}
