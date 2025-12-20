"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CyberCard } from "@/components/ui/CyberCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { AgentFlowBuilder } from "@/components/features/AgentFlowBuilder";
import { OllamaTunnel } from "@/components/features/OllamaTunnel";
import { AIFirewall } from "@/components/features/AIFirewall";
import { CollaborativeRAG } from "@/components/features/CollaborativeRAG";
import { CostSpeedGauge } from "@/components/features/CostSpeedGauge";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "agents" && <AgentBuilderView />}
        {activeTab === "tunnel" && <TunnelView />}
        {activeTab === "firewall" && <FirewallView />}
        {activeTab === "rag" && <RAGView />}
      </main>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0F] border border-[#2D2D44] p-8 md:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FCE300]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00D4FF]/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <h1 className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">OLLAMA</span>{" "}
            <span className="text-[#FCE300]">OPENROUTER</span>{" "}
            <span className="text-[#00D4FF]">MANAGER</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-8">
            Advanced AI Model Management with Hybrid Local/Cloud Architecture, 
            RAG Pipelines, and Multi-Agent Orchestration.
          </p>
          <div className="flex flex-wrap gap-4">
            <CyberButton>Launch Chat</CyberButton>
            <CyberButton variant="outline">View Documentation</CyberButton>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Models", value: "12", color: "#FCE300" },
          { label: "Total Queries", value: "1,247", color: "#00D4FF" },
          { label: "Documents", value: "34", color: "#A855F7" },
          { label: "Savings", value: "$42.68", color: "#05FFA1" },
        ].map((stat) => (
          <CyberCard key={stat.label} className="p-4 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div
              className="font-['Orbitron'] text-2xl font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
          </CyberCard>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <CostSpeedGauge />
        
        <CyberCard className="p-6" glowColor="blue">
          <h3 className="font-['Orbitron'] text-xl font-bold text-[#00D4FF] mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            {[
              { name: "Ollama Local", status: "online" as const, latency: "45ms" },
              { name: "OpenRouter API", status: "online" as const, latency: "120ms" },
              { name: "Vector Database", status: "online" as const, latency: "12ms" },
              { name: "WebSocket Tunnel", status: "connecting" as const, latency: "--" },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-3 bg-[#0A0A0F] rounded-lg border border-[#2D2D44]"
              >
                <div className="flex items-center gap-3">
                  <StatusIndicator status={service.status} />
                  <span className="text-gray-300">{service.name}</span>
                </div>
                <span className="text-xs text-gray-500 font-mono">{service.latency}</span>
              </div>
            ))}
          </div>
        </CyberCard>
      </div>

      {/* Features Overview */}
      <div>
        <h2 className="font-['Orbitron'] text-2xl font-bold text-white mb-6">
          Web Edition Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔐",
              title: "Ollama Tunnel",
              description: "Secure E2E encrypted connection to your local Ollama instance",
              color: "#05FFA1",
            },
            {
              icon: "🕸️",
              title: "Agent Flow Builder",
              description: "Visual drag-and-drop interface for multi-agent workflows",
              color: "#00D4FF",
            },
            {
              icon: "🛡️",
              title: "AI Firewall",
              description: "PII scrubbing and prompt injection protection",
              color: "#FF2A6D",
            },
            {
              icon: "🤝",
              title: "Collaborative RAG",
              description: "Share knowledge bases with shareable links",
              color: "#A855F7",
            },
            {
              icon: "💰",
              title: "Cost Optimizer",
              description: "Real-time savings tracking and intelligent routing",
              color: "#FCE300",
            },
            {
              icon: "📊",
              title: "Analytics",
              description: "Comprehensive usage metrics and performance insights",
              color: "#00D4FF",
            },
          ].map((feature) => (
            <CyberCard key={feature.title} className="p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3
                className="font-['Orbitron'] text-lg font-bold mb-2"
                style={{ color: feature.color }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </CyberCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentBuilderView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Orbitron'] text-3xl font-bold text-white mb-2">
          Agent Flow Builder
        </h1>
        <p className="text-gray-400">
          Design multi-agent workflows with drag-and-drop simplicity
        </p>
      </div>
      <AgentFlowBuilder />
    </div>
  );
}

function TunnelView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Orbitron'] text-3xl font-bold text-white mb-2">
          Ollama Tunnel
        </h1>
        <p className="text-gray-400">
          Securely connect to your local Ollama instance from anywhere
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <OllamaTunnel />
        <CyberCard className="p-6" glowColor="blue">
          <h3 className="font-['Orbitron'] text-xl font-bold text-[#00D4FF] mb-4">
            How It Works
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#FCE300] rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Run Tunnel Client</h4>
                <p className="text-sm text-gray-400">
                  Execute the tunnel script on your local machine where Ollama is running
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#00D4FF] rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Establish Connection</h4>
                <p className="text-sm text-gray-400">
                  WebSocket connection with E2E encryption is established
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#05FFA1] rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Use Anywhere</h4>
                <p className="text-sm text-gray-400">
                  Access your local models from any device, anywhere in the world
                </p>
              </div>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
}

function FirewallView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Orbitron'] text-3xl font-bold text-white mb-2">
          AI Firewall
        </h1>
        <p className="text-gray-400">
          Protect your prompts with PII scrubbing and injection detection
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <AIFirewall />
        <CyberCard className="p-6" glowColor="yellow">
          <h3 className="font-['Orbitron'] text-xl font-bold text-[#FCE300] mb-4">
            Protection Features
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-[#0A0A0F] rounded-lg border border-[#2D2D44]">
              <h4 className="font-semibold text-[#FF2A6D] mb-2">PII Detection</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Email addresses</li>
                <li>• Phone numbers</li>
                <li>• Social Security Numbers</li>
                <li>• Credit card numbers</li>
                <li>• IP addresses</li>
                <li>• API keys & secrets</li>
              </ul>
            </div>
            <div className="p-4 bg-[#0A0A0F] rounded-lg border border-[#2D2D44]">
              <h4 className="font-semibold text-[#FCE300] mb-2">Injection Guard</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Instruction override attempts</li>
                <li>• Role hijacking patterns</li>
                <li>• System prompt injection</li>
                <li>• Token manipulation</li>
                <li>• Jailbreak attempts</li>
              </ul>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
}

function RAGView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Orbitron'] text-3xl font-bold text-white mb-2">
          Collaborative RAG
        </h1>
        <p className="text-gray-400">
          Upload documents and share knowledge bases with your team
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <CollaborativeRAG />
        <CyberCard className="p-6" glowColor="blue">
          <h3 className="font-['Orbitron'] text-xl font-bold text-[#A855F7] mb-4">
            RAG Pipeline
          </h3>
          <div className="space-y-4">
            {[
              { step: "Upload", desc: "PDF, TXT, MD, DOCX supported", icon: "📤" },
              { step: "Chunk", desc: "Smart text splitting with overlap", icon: "✂️" },
              { step: "Embed", desc: "Generate vectors with nomic-embed", icon: "🧮" },
              { step: "Store", desc: "PostgreSQL + pgvector storage", icon: "💾" },
              { step: "Share", desc: "Generate unique shareable links", icon: "🔗" },
              { step: "Query", desc: "Semantic search + LLM generation", icon: "🔍" },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{item.step}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
                {i < 5 && <div className="text-gray-600">→</div>}
              </div>
            ))}
          </div>
        </CyberCard>
      </div>
    </div>
  );
}
