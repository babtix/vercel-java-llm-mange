"use client";

import { useState } from "react";
import { StatusIndicator } from "../ui/StatusIndicator";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "agents", label: "Agent Builder", icon: "🕸️" },
    { id: "tunnel", label: "Ollama Tunnel", icon: "🔐" },
    { id: "firewall", label: "AI Firewall", icon: "🛡️" },
    { id: "rag", label: "Collaborative RAG", icon: "🤝" },
  ];

  return (
    <nav className="bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#2D2D44] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FCE300] to-[#00D4FF] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">O</span>
            </div>
            <div>
              <div className="font-['Orbitron'] text-sm font-bold text-white">
                OLLAMA MANAGER
              </div>
              <div className="text-xs text-gray-500">Web Edition v2.0</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-['Rajdhani'] font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#FCE300]/10 text-[#FCE300] border border-[#FCE300]/30"
                    : "text-gray-400 hover:text-white hover:bg-[#1A1A2E]"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status & User */}
          <div className="flex items-center gap-4">
            <StatusIndicator status="online" label="System Online" />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1A1A2E] rounded-lg border border-[#2D2D44]">
              <div className="w-6 h-6 bg-gradient-to-br from-[#A855F7] to-[#FF2A6D] rounded-full" />
              <span className="text-sm text-gray-300">Admin</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2D2D44]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm font-['Rajdhani'] font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#FCE300]/10 text-[#FCE300]"
                    : "text-gray-400 hover:text-white hover:bg-[#1A1A2E]"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
