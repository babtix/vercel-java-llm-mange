"use client";

import { ReactNode } from "react";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "yellow" | "blue" | "pink" | "green";
  hover?: boolean;
}

export function CyberCard({ children, className = "", glowColor = "yellow", hover = true }: CyberCardProps) {
  const glowClasses = {
    yellow: "hover:border-[#FCE300] hover:shadow-[0_0_20px_rgba(252,227,0,0.3)]",
    blue: "hover:border-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]",
    pink: "hover:border-[#FF2A6D] hover:shadow-[0_0_20px_rgba(255,42,109,0.3)]",
    green: "hover:border-[#05FFA1] hover:shadow-[0_0_20px_rgba(5,255,161,0.3)]",
  };

  return (
    <div
      className={`
        bg-gradient-to-br from-[#1A1A2E]/90 to-[#0A0A0F]/95
        border border-[#2D2D44] rounded-lg backdrop-blur-sm
        transition-all duration-300
        ${hover ? glowClasses[glowColor] : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
