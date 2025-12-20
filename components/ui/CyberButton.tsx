"use client";

import { ReactNode } from "react";

interface CyberButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function CyberButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
}: CyberButtonProps) {
  const baseClasses = "font-['Orbitron'] font-semibold uppercase tracking-wider transition-all duration-300 rounded";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#FCE300] to-[#D4C000] text-black hover:shadow-[0_0_30px_#FCE300] hover:-translate-y-0.5",
    outline: "bg-transparent border-2 border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-black hover:shadow-[0_0_30px_#00D4FF]",
    ghost: "bg-transparent text-[#FCE300] hover:bg-[#FCE300]/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
