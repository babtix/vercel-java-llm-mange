"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { CyberCard } from "../ui/CyberCard";
import { CyberButton } from "../ui/CyberButton";

// Custom Node Component
function AgentNode({ data }: { data: { label: string; type: string; model: string } }) {
  const typeColors: Record<string, string> = {
    research: "#00D4FF",
    code: "#05FFA1",
    synthesis: "#FCE300",
    embedding: "#FF2A6D",
    rag: "#A855F7",
  };

  return (
    <div
      className="px-4 py-3 rounded-lg border-2 min-w-[180px]"
      style={{
        background: "linear-gradient(135deg, #1A1A2E 0%, #0A0A0F 100%)",
        borderColor: typeColors[data.type] || "#FCE300",
        boxShadow: `0 0 15px ${typeColors[data.type]}40`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: typeColors[data.type] }}
        />
        <span className="font-['Orbitron'] text-sm font-bold text-white">
          {data.label}
        </span>
      </div>
      <div className="text-xs text-gray-400 font-['Rajdhani']">
        Model: {data.model}
      </div>
    </div>
  );
}

const nodeTypes = { agentNode: AgentNode };

const initialNodes: Node[] = [
  {
    id: "1",
    type: "agentNode",
    position: { x: 100, y: 100 },
    data: { label: "Research Agent", type: "research", model: "deepseek-r1" },
  },
  {
    id: "2",
    type: "agentNode",
    position: { x: 400, y: 100 },
    data: { label: "Code Agent", type: "code", model: "deepseek-coder" },
  },
  {
    id: "3",
    type: "agentNode",
    position: { x: 250, y: 250 },
    data: { label: "Synthesis Agent", type: "synthesis", model: "gemma-2-9b" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#00D4FF" } },
  { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#05FFA1" } },
];

const agentTemplates = [
  { label: "Research Agent", type: "research", model: "deepseek-r1" },
  { label: "Code Agent", type: "code", model: "deepseek-coder" },
  { label: "Synthesis Agent", type: "synthesis", model: "gemma-2-9b" },
  { label: "Embedding Agent", type: "embedding", model: "nomic-embed" },
  { label: "RAG Agent", type: "rag", model: "gemma-2-9b" },
];

export function AgentFlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [executionMode, setExecutionMode] = useState<"sequential" | "parallel" | "hierarchical">("sequential");

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#00D4FF" } }, eds)),
    [setEdges]
  );

  const addAgent = (template: typeof agentTemplates[0]) => {
    const newNode: Node = {
      id: `${Date.now()}`,
      type: "agentNode",
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      data: template,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const exportWorkflow = () => {
    const workflow = {
      nodes: nodes.map((n) => ({ id: n.id, ...n.data })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
      executionMode,
    };
    console.log("Workflow:", JSON.stringify(workflow, null, 2));
    alert("Workflow exported to console!");
  };

  return (
    <CyberCard className="p-6" glowColor="blue">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-['Orbitron'] text-xl font-bold text-[#00D4FF]">
          Agent Flow Builder
        </h3>
        <div className="flex gap-2">
          {(["sequential", "parallel", "hierarchical"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setExecutionMode(mode)}
              className={`px-3 py-1 text-xs font-['Orbitron'] uppercase rounded transition-all ${
                executionMode === mode
                  ? "bg-[#FCE300] text-black"
                  : "bg-[#1A1A2E] text-gray-400 hover:text-[#FCE300]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Palette */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {agentTemplates.map((template) => (
          <button
            key={template.type}
            onClick={() => addAgent(template)}
            className="px-3 py-2 text-xs bg-[#1A1A2E] border border-[#2D2D44] rounded hover:border-[#FCE300] transition-all font-['Rajdhani']"
          >
            + {template.label}
          </button>
        ))}
      </div>

      {/* Flow Canvas */}
      <div className="h-[400px] rounded-lg overflow-hidden border border-[#2D2D44]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#2D2D44" />
          <Controls className="bg-[#1A1A2E] border-[#2D2D44]" />
          <Panel position="bottom-right">
            <CyberButton size="sm" onClick={exportWorkflow}>
              Export Workflow
            </CyberButton>
          </Panel>
        </ReactFlow>
      </div>
    </CyberCard>
  );
}
