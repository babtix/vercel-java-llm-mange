"use client";

interface StatusIndicatorProps {
  status: "online" | "offline" | "connecting" | "error";
  label?: string;
  showPulse?: boolean;
}

export function StatusIndicator({ status, label, showPulse = true }: StatusIndicatorProps) {
  const statusColors = {
    online: "bg-[#05FFA1]",
    offline: "bg-gray-500",
    connecting: "bg-[#FCE300]",
    error: "bg-[#FF2A6D]",
  };

  const statusGlow = {
    online: "shadow-[0_0_10px_#05FFA1]",
    offline: "",
    connecting: "shadow-[0_0_10px_#FCE300]",
    error: "shadow-[0_0_10px_#FF2A6D]",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`w-3 h-3 rounded-full ${statusColors[status]} ${statusGlow[status]}`} />
        {showPulse && status === "online" && (
          <div className={`absolute inset-0 w-3 h-3 rounded-full ${statusColors[status]} animate-ping opacity-75`} />
        )}
      </div>
      {label && <span className="text-sm text-gray-400 font-['Rajdhani']">{label}</span>}
    </div>
  );
}
