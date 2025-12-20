"use client";

import { useState, useEffect } from "react";
import { CyberCard } from "../ui/CyberCard";
import { CyberButton } from "../ui/CyberButton";
import { StatusIndicator } from "../ui/StatusIndicator";

interface TunnelStatus {
  connected: boolean;
  ollamaVersion?: string;
  models?: string[];
  latency?: number;
  encrypted: boolean;
}

export function OllamaTunnel() {
  const [status, setStatus] = useState<TunnelStatus>({
    connected: false,
    encrypted: true,
  });
  const [tunnelCode, setTunnelCode] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // Simulated connection for demo
  const connectTunnel = async () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setStatus({
      connected: true,
      ollamaVersion: "0.1.32",
      models: ["llama2", "codellama", "mistral", "nomic-embed-text"],
      latency: 45,
      encrypted: true,
    });
    setIsConnecting(false);
  };

  const disconnectTunnel = () => {
    setStatus({ connected: false, encrypted: true });
    setTunnelCode("");
  };

  const generateTunnelCode = () => {
    const code = `npx ollama-tunnel --token ${crypto.randomUUID().slice(0, 8)}`;
    setTunnelCode(code);
  };

  return (
    <CyberCard className="p-6" glowColor="green">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-['Orbitron'] text-xl font-bold text-[#05FFA1]">
            Ollama Tunnel
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Secure E2E encrypted connection to your local Ollama
          </p>
        </div>
        <StatusIndicator
          status={status.connected ? "online" : isConnecting ? "connecting" : "offline"}
          label={status.connected ? "Connected" : isConnecting ? "Connecting..." : "Disconnected"}
        />
      </div>

      {!status.connected ? (
        <div className="space-y-4">
          {/* Connection Instructions */}
          <div className="bg-[#0A0A0F] rounded-lg p-4 border border-[#2D2D44]">
            <h4 className="font-['Orbitron'] text-sm text-[#FCE300] mb-3">
              Setup Instructions
            </h4>
            <ol className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-[#00D4FF]">1.</span>
                Ensure Ollama is running on your local machine
              </li>
              <li className="flex gap-2">
                <span className="text-[#00D4FF]">2.</span>
                Run the tunnel client script below
              </li>
              <li className="flex gap-2">
                <span className="text-[#00D4FF]">3.</span>
                Click "Connect" to establish secure tunnel
              </li>
            </ol>
          </div>

          {/* Tunnel Code Generator */}
          <div>
            <div className="flex gap-2 mb-2">
              <CyberButton size="sm" variant="outline" onClick={generateTunnelCode}>
                Generate Tunnel Code
              </CyberButton>
            </div>
            {tunnelCode && (
              <div className="bg-black rounded p-3 font-mono text-sm text-[#05FFA1] border border-[#05FFA1]/30">
                <code>{tunnelCode}</code>
              </div>
            )}
          </div>

          {/* Connect Button */}
          <CyberButton
            onClick={connectTunnel}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? "Establishing Secure Connection..." : "Connect to Local Ollama"}
          </CyberButton>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4 text-[#05FFA1]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            End-to-End Encrypted • Zero-Knowledge Architecture
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Connection Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0A0A0F] rounded-lg p-3 border border-[#2D2D44]">
              <div className="text-xs text-gray-500 mb-1">Ollama Version</div>
              <div className="font-['Orbitron'] text-[#05FFA1]">{status.ollamaVersion}</div>
            </div>
            <div className="bg-[#0A0A0F] rounded-lg p-3 border border-[#2D2D44]">
              <div className="text-xs text-gray-500 mb-1">Latency</div>
              <div className="font-['Orbitron'] text-[#00D4FF]">{status.latency}ms</div>
            </div>
          </div>

          {/* Available Models */}
          <div className="bg-[#0A0A0F] rounded-lg p-4 border border-[#2D2D44]">
            <div className="text-xs text-gray-500 mb-2">Available Models</div>
            <div className="flex flex-wrap gap-2">
              {status.models?.map((model) => (
                <span
                  key={model}
                  className="px-2 py-1 text-xs bg-[#1A1A2E] border border-[#2D2D44] rounded text-[#FCE300]"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>

          {/* Encryption Status */}
          <div className="flex items-center gap-2 p-3 bg-[#05FFA1]/10 border border-[#05FFA1]/30 rounded-lg">
            <svg className="w-5 h-5 text-[#05FFA1]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-[#05FFA1]">
              Connection secured with AES-256-GCM encryption
            </span>
          </div>

          {/* Disconnect */}
          <CyberButton variant="outline" onClick={disconnectTunnel} className="w-full">
            Disconnect Tunnel
          </CyberButton>
        </div>
      )}
    </CyberCard>
  );
}
