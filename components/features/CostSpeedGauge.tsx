"use client";

import { useState, useEffect } from "react";
import { CyberCard } from "../ui/CyberCard";

interface QueryStats {
  totalQueries: number;
  localQueries: number;
  cloudQueries: number;
  totalSavings: number;
  avgLocalLatency: number;
  avgCloudLatency: number;
}

export function CostSpeedGauge() {
  const [stats, setStats] = useState<QueryStats>({
    totalQueries: 1247,
    localQueries: 892,
    cloudQueries: 355,
    totalSavings: 42.68,
    avgLocalLatency: 245,
    avgCloudLatency: 1850,
  });

  const [realtimeSavings, setRealtimeSavings] = useState(stats.totalSavings);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate real-time savings counter
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeSavings((prev) => {
        const increment = Math.random() * 0.05;
        return Math.round((prev + increment) * 100) / 100;
      });
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const localPercentage = (stats.localQueries / stats.totalQueries) * 100;
  const cloudPercentage = (stats.cloudQueries / stats.totalQueries) * 100;

  // Cost per query estimates
  const GPT4_COST = 0.06; // per query average
  const CLAUDE_COST = 0.05;
  const LOCAL_COST = 0;

  return (
    <CyberCard className="p-6" glowColor="yellow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-['Orbitron'] text-xl font-bold text-[#FCE300]">
            Cost vs Speed
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Real-time savings & performance metrics
          </p>
        </div>
      </div>

      {/* Savings Counter */}
      <div className="bg-gradient-to-br from-[#FCE300]/10 to-[#05FFA1]/10 border border-[#FCE300]/30 rounded-xl p-6 mb-6 text-center">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          Total Savings This Month
        </div>
        <div
          className={`font-['Orbitron'] text-5xl font-bold text-[#05FFA1] transition-transform ${
            isAnimating ? "scale-105" : "scale-100"
          }`}
        >
          ${realtimeSavings.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          vs. using GPT-4 for all queries
        </div>
      </div>

      {/* Query Distribution */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Query Distribution</span>
          <span>{stats.totalQueries} total</span>
        </div>
        <div className="h-4 bg-[#1A1A2E] rounded-full overflow-hidden flex">
          <div
            className="bg-gradient-to-r from-[#05FFA1] to-[#00D4FF] transition-all duration-500"
            style={{ width: `${localPercentage}%` }}
          />
          <div
            className="bg-gradient-to-r from-[#FCE300] to-[#FF2A6D] transition-all duration-500"
            style={{ width: `${cloudPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-[#05FFA1] to-[#00D4FF]" />
            <span className="text-gray-400">Local (Ollama)</span>
            <span className="text-[#05FFA1] font-semibold">{localPercentage.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-[#FCE300] to-[#FF2A6D]" />
            <span className="text-gray-400">Cloud (OpenRouter)</span>
            <span className="text-[#FCE300] font-semibold">{cloudPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Local Stats */}
        <div className="bg-[#0A0A0F] border border-[#05FFA1]/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#05FFA1]" />
            <span className="text-xs text-gray-400 uppercase">Local (Ollama)</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">Queries</div>
              <div className="font-['Orbitron'] text-xl text-[#05FFA1]">{stats.localQueries}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Avg Latency</div>
              <div className="font-['Orbitron'] text-lg text-white">{stats.avgLocalLatency}ms</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Cost</div>
              <div className="font-['Orbitron'] text-lg text-[#05FFA1]">$0.00</div>
            </div>
          </div>
        </div>

        {/* Cloud Stats */}
        <div className="bg-[#0A0A0F] border border-[#FCE300]/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#FCE300]" />
            <span className="text-xs text-gray-400 uppercase">Cloud (OpenRouter)</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">Queries</div>
              <div className="font-['Orbitron'] text-xl text-[#FCE300]">{stats.cloudQueries}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Avg Latency</div>
              <div className="font-['Orbitron'] text-lg text-white">{stats.avgCloudLatency}ms</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Cost</div>
              <div className="font-['Orbitron'] text-lg text-[#FCE300]">
                ${(stats.cloudQueries * GPT4_COST).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speed Comparison Bar */}
      <div className="bg-[#0A0A0F] border border-[#2D2D44] rounded-lg p-4">
        <div className="text-xs text-gray-400 mb-3">Speed Comparison</div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#05FFA1]">Local</span>
              <span className="text-gray-400">{stats.avgLocalLatency}ms</span>
            </div>
            <div className="h-2 bg-[#1A1A2E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#05FFA1] rounded-full"
                style={{ width: `${(stats.avgLocalLatency / stats.avgCloudLatency) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#FCE300]">Cloud</span>
              <span className="text-gray-400">{stats.avgCloudLatency}ms</span>
            </div>
            <div className="h-2 bg-[#1A1A2E] rounded-full overflow-hidden">
              <div className="h-full bg-[#FCE300] rounded-full w-full" />
            </div>
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Local is <span className="text-[#05FFA1] font-semibold">
            {(stats.avgCloudLatency / stats.avgLocalLatency).toFixed(1)}x faster
          </span> than cloud
        </div>
      </div>
    </CyberCard>
  );
}
