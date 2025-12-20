# Feature Specifications - Web Edition

## 🔐 **Feature 1: Secure Ollama Tunnel**

### Overview
A WebSocket-based tunnel that allows the web application to securely communicate with a user's local Ollama instance running on their home PC.

### Technical Implementation
```typescript
// Tunnel Client (Node.js CLI tool)
class OllamaTunnelClient {
  private websocket: WebSocket;
  private encryption: E2EEncryption;
  private ollamaUrl: string = 'http://localhost:11434';

  async connect(serverUrl: string, token: string) {
    // Establish WebSocket connection
    this.websocket = new WebSocket(`${serverUrl}/tunnel?token=${token}`);
    
    // Initialize E2E encryption
    this.encryption = new E2EEncryption();
    await this.encryption.generateKeyPair();
    
    // Exchange public keys
    await this.exchangeKeys();
  }

  async handleMessage(encryptedMessage: string) {
    // Decrypt message from web client
    const decrypted = await this.encryption.decrypt(encryptedMessage);
    const request = JSON.parse(decrypted);
    
    // Forward to local Ollama
    const response = await fetch(`${this.ollamaUrl}${request.path}`, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    // Encrypt and send response back
    const encrypted = await this.encryption.encrypt(JSON.stringify(response));
    this.websocket.send(encrypted);
  }
}
```

### Security Features
- **End-to-End Encryption**: AES-256-GCM with ECDH key exchange
- **Zero-Knowledge Architecture**: Server cannot decrypt prompts
- **Token Authentication**: JWT-based session management
- **Connection Validation**: Verify Ollama availability before tunnel

### User Experience
1. User runs tunnel client: `npx ollama-tunnel --token abc123`
2. Client establishes secure WebSocket connection
3. Web UI shows "Connected" status with green indicator
4. All Ollama requests are transparently tunneled
5. Real-time latency and model information displayed

---

## 🕸️ **Feature 2: Visual Agent Flow Builder**

### Overview
A drag-and-drop interface using React Flow to design Sequential, Parallel, or Hierarchical multi-agent workflows.

### Component Architecture
```typescript
// Agent Node Component
interface AgentNodeData {
  label: string;
  type: 'research' | 'code' | 'synthesis' | 'embedding' | 'rag';
  model: string;
  provider: 'ollama' | 'openrouter';
  config: AgentConfig;
}

const AgentNode: React.FC<NodeProps<AgentNodeData>> = ({ data }) => {
  return (
    <div className="agent-node" style={{ borderColor: getTypeColor(data.type) }}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <span className="node-icon">{getTypeIcon(data.type)}</span>
        <span className="node-label">{data.label}</span>
      </div>
      <div className="node-details">
        <div>Model: {data.model}</div>
        <div>Provider: {data.provider}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

// Flow Builder Component
export const AgentFlowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [executionMode, setExecutionMode] = useState<ExecutionMode>('sequential');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const exportWorkflow = () => {
    const workflow: AgentWorkflow = {
      id: generateId(),
      name: 'Custom Workflow',
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.data.type,
        model: node.data.model,
        provider: node.data.provider,
        config: node.data.config
      })),
      edges: edges.map(edge => ({
        source: edge.source,
        target: edge.target
      })),
      executionMode,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage or send to backend
    saveWorkflow(workflow);
  };

  return (
    <div className="flow-builder">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ agentNode: AgentNode }}
      >
        <Background />
        <Controls />
        <Panel position="top-right">
          <ExecutionModeSelector 
            mode={executionMode} 
            onChange={setExecutionMode} 
          />
          <button onClick={exportWorkflow}>Export Workflow</button>
        </Panel>
      </ReactFlow>
    </div>
  );
};
```

### Workflow Execution Modes
- **Sequential**: Agents execute in linear order based on connections
- **Parallel**: Independent agents run concurrently
- **Hierarchical**: Manager agent delegates tasks to worker agents

### Export Format
```json
{
  "id": "workflow_123",
  "name": "Research & Code Generation",
  "nodes": [
    {
      "id": "research_1",
      "type": "research",
      "model": "deepseek-r1",
      "provider": "openrouter",
      "config": {
        "temperature": 0.7,
        "maxTokens": 2000
      }
    }
  ],
  "edges": [
    { "source": "research_1", "target": "code_1" }
  ],
  "executionMode": "sequential"
}
```

---

## 🛡️ **Feature 3: AI Firewall Middleware**

### Overview
A security layer that intercepts prompts before sending them to cloud APIs, providing PII scrubbing and prompt injection detection.

### Core Implementation
```typescript
// PII Detection Engine
class PIIDetector {
  private patterns: Record<string, RegExp> = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phone: /\b(\+?1?[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    ssn: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g,
    creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    ipv4: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    apiKey: /\b(sk-|pk-|api[_-]?key[_-]?)[a-zA-Z0-9]{20,}\b/gi,
  };

  detect(text: string): PIIMatch[] {
    const matches: PIIMatch[] = [];
    
    Object.entries(this.patterns).forEach(([type, pattern]) => {
      const found = text.match(pattern);
      if (found) {
        found.forEach(match => {
          matches.push({
            type,
            value: match,
            severity: this.getSeverity(type),
            position: text.indexOf(match)
          });
        });
      }
    });
    
    return matches;
  }

  sanitize(text: string, matches: PIIMatch[]): string {
    let sanitized = text;
    matches.forEach(match => {
      sanitized = sanitized.replace(match.value, `[REDACTED_${match.type.toUpperCase()}]`);
    });
    return sanitized;
  }
}

// Injection Detection Engine
class InjectionDetector {
  private patterns: InjectionPattern[] = [
    {
      name: "Instruction Override",
      pattern: /ignore\s+(all\s+)?previous\s+instructions/gi,
      severity: "critical"
    },
    {
      name: "Role Hijacking",
      pattern: /you\s+are\s+now\s+(a|an)\s+/gi,
      severity: "high"
    },
    {
      name: "System Prompt Injection",
      pattern: /system\s*:\s*/gi,
      severity: "critical"
    },
    {
      name: "Token Injection",
      pattern: /\[INST\]|\[\/INST\]|<\|im_start\|>|<\|im_end\|>/gi,
      severity: "medium"
    }
  ];

  detect(text: string): InjectionMatch[] {
    const matches: InjectionMatch[] = [];
    
    this.patterns.forEach(pattern => {
      if (pattern.pattern.test(text)) {
        matches.push({
          name: pattern.name,
          severity: pattern.severity,
          description: `Detected ${pattern.name.toLowerCase()}`
        });
      }
    });
    
    return matches;
  }
}

// Main Firewall Class
export class AIFirewall {
  private piiDetector = new PIIDetector();
  private injectionDetector = new InjectionDetector();

  async scan(prompt: string): Promise<FirewallResult> {
    const piiMatches = this.piiDetector.detect(prompt);
    const injectionMatches = this.injectionDetector.detect(prompt);
    
    const threats = [
      ...piiMatches.map(m => ({ type: `PII: ${m.type}`, severity: m.severity, description: `Detected ${m.type}` })),
      ...injectionMatches
    ];

    const sanitized = this.piiDetector.sanitize(prompt, piiMatches);
    const safe = threats.length === 0;

    return {
      original: prompt,
      sanitized,
      threats,
      safe,
      timestamp: new Date().toISOString()
    };
  }
}
```

### Detection Categories
- **PII Types**: Email, Phone, SSN, Credit Cards, IP Addresses, API Keys
- **Injection Types**: Instruction Override, Role Hijacking, System Injection, Token Manipulation
- **Severity Levels**: Low, Medium, High, Critical

### User Interface
- Real-time scanning as user types
- Color-coded threat indicators
- Auto-sanitization toggle
- Detailed threat explanations
- Example prompts for testing

---

## 🤝 **Feature 4: Collaborative RAG**

### Overview
Users can ingest documents into a vector store and generate shareable links for collaborative knowledge access.

### Implementation Flow
```typescript
// Document Processing Pipeline
class DocumentProcessor {
  async processDocument(file: File): Promise<ProcessedDocument> {
    // 1. Extract text content
    const text = await this.extractText(file);
    
    // 2. Chunk text with overlap
    const chunks = this.chunkText(text, {
      chunkSize: 1000,
      overlap: 200
    });
    
    // 3. Generate embeddings
    const embeddings = await this.generateEmbeddings(chunks);
    
    // 4. Store in vector database
    const documentId = await this.storeVectors(embeddings, chunks);
    
    // 5. Generate shareable link
    const shareLink = this.generateShareLink(documentId);
    
    return {
      id: documentId,
      name: file.name,
      size: file.size,
      chunks: chunks.length,
      shareLink,
      createdAt: new Date().toISOString(),
      accessCount: 0
    };
  }

  private chunkText(text: string, options: ChunkOptions): TextChunk[] {
    const sentences = text.split(/[.!?]+/);
    const chunks: TextChunk[] = [];
    let currentChunk = '';
    
    sentences.forEach(sentence => {
      if (currentChunk.length + sentence.length > options.chunkSize) {
        chunks.push({
          text: currentChunk.trim(),
          index: chunks.length,
          metadata: { source: 'document' }
        });
        
        // Add overlap from previous chunk
        const words = currentChunk.split(' ');
        currentChunk = words.slice(-options.overlap / 10).join(' ') + ' ' + sentence;
      } else {
        currentChunk += ' ' + sentence;
      }
    });
    
    if (currentChunk.trim()) {
      chunks.push({
        text: currentChunk.trim(),
        index: chunks.length,
        metadata: { source: 'document' }
      });
    }
    
    return chunks;
  }

  private async generateEmbeddings(chunks: TextChunk[]): Promise<EmbeddingVector[]> {
    // Use local embedding model (nomic-embed-text)
    const embeddings: EmbeddingVector[] = [];
    
    for (const chunk of chunks) {
      const response = await fetch('/api/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chunk.text })
      });
      
      const { embedding } = await response.json();
      embeddings.push({
        vector: embedding,
        text: chunk.text,
        metadata: chunk.metadata
      });
    }
    
    return embeddings;
  }
}

// RAG Query Engine
class RAGQueryEngine {
  async query(documentId: string, question: string): Promise<RAGResponse> {
    // 1. Generate question embedding
    const questionEmbedding = await this.generateEmbedding(question);
    
    // 2. Find similar chunks
    const similarChunks = await this.findSimilarChunks(documentId, questionEmbedding);
    
    // 3. Build context
    const context = similarChunks.map(chunk => chunk.text).join('\n\n');
    
    // 4. Generate response with LLM
    const response = await this.generateResponse(question, context);
    
    return {
      question,
      answer: response,
      sources: similarChunks,
      confidence: this.calculateConfidence(similarChunks)
    };
  }
}
```

### Sharing Mechanism
- **UUID Links**: `https://app.ollama-manager.io/rag/abc123def456`
- **Public Access**: No authentication required
- **Analytics**: Track access count and usage patterns
- **Expiration**: Optional time-based link expiry
- **Permissions**: Read-only access for shared links

### Supported Formats
- **PDF**: Text extraction with metadata
- **TXT**: Plain text processing
- **Markdown**: Structured content parsing
- **DOCX**: Microsoft Word documents
- **Code Files**: Syntax-aware chunking

---

## 💰 **Feature 5: Real-Time Cost vs Speed Gauge**

### Overview
A dashboard widget that compares Local (Free/Slow) vs Cloud (Paid/Fast) with live savings counter and performance metrics.

### Metrics Collection
```typescript
// Query Metrics Tracker
class QueryMetricsTracker {
  private metrics: QueryMetric[] = [];

  trackQuery(query: QueryMetric) {
    this.metrics.push({
      ...query,
      timestamp: Date.now()
    });
    
    // Update real-time dashboard
    this.updateDashboard();
  }

  calculateSavings(): SavingsReport {
    const localQueries = this.metrics.filter(m => m.provider === 'ollama');
    const cloudQueries = this.metrics.filter(m => m.provider === 'openrouter');
    
    const potentialCloudCost = localQueries.length * this.getAverageCloudCost();
    const actualCloudCost = cloudQueries.reduce((sum, q) => sum + q.cost, 0);
    
    return {
      totalQueries: this.metrics.length,
      localQueries: localQueries.length,
      cloudQueries: cloudQueries.length,
      totalSavings: potentialCloudCost,
      actualSpent: actualCloudCost,
      avgLocalLatency: this.calculateAverageLatency('ollama'),
      avgCloudLatency: this.calculateAverageLatency('openrouter')
    };
  }

  private getAverageCloudCost(): number {
    const costs = {
      'gpt-4': 0.06,
      'claude-3': 0.05,
      'deepseek-r1': 0.02,
      'gemma-2-9b': 0.01
    };
    
    return Object.values(costs).reduce((sum, cost) => sum + cost, 0) / Object.keys(costs).length;
  }
}

// Real-time Dashboard Component
export const CostSpeedGauge: React.FC = () => {
  const [metrics, setMetrics] = useState<SavingsReport>();
  const [realtimeSavings, setRealtimeSavings] = useState(0);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const tracker = new QueryMetricsTracker();
      const newMetrics = tracker.calculateSavings();
      setMetrics(newMetrics);
      
      // Animate savings counter
      setRealtimeSavings(prev => prev + Math.random() * 0.05);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cost-speed-gauge">
      {/* Savings Counter */}
      <div className="savings-counter">
        <div className="counter-value">${realtimeSavings.toFixed(2)}</div>
        <div className="counter-label">Total Savings This Month</div>
      </div>

      {/* Query Distribution */}
      <div className="query-distribution">
        <div className="distribution-bar">
          <div 
            className="local-portion" 
            style={{ width: `${(metrics?.localQueries / metrics?.totalQueries) * 100}%` }}
          />
          <div 
            className="cloud-portion"
            style={{ width: `${(metrics?.cloudQueries / metrics?.totalQueries) * 100}%` }}
          />
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="performance-comparison">
        <div className="metric-card local">
          <div className="metric-label">Local (Ollama)</div>
          <div className="metric-value">{metrics?.avgLocalLatency}ms</div>
          <div className="metric-cost">$0.00</div>
        </div>
        <div className="metric-card cloud">
          <div className="metric-label">Cloud (OpenRouter)</div>
          <div className="metric-value">{metrics?.avgCloudLatency}ms</div>
          <div className="metric-cost">${metrics?.actualSpent.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
```

### Visualization Components
- **Savings Counter**: Animated real-time counter with glow effects
- **Distribution Chart**: Horizontal bar showing local vs cloud usage
- **Speed Comparison**: Side-by-side latency metrics
- **Cost Breakdown**: Detailed cost analysis with projections
- **Efficiency Score**: Overall system efficiency rating

### Data Sources
- **Query Logs**: Track all AI model requests
- **Latency Metrics**: Measure response times
- **Cost Tracking**: Monitor API usage and costs
- **Router Decisions**: Log routing algorithm choices
- **Performance Trends**: Historical data analysis

---

## 🎨 **UI/UX Design Principles**

### Cyberpunk 2077 Theme
- **Color Palette**: Neon yellow, cyber blue, hot pink, neon green
- **Typography**: Orbitron (headers) + Rajdhani (body)
- **Effects**: Glow, scanlines, glitch animations
- **Layout**: Dark backgrounds with neon accents

### Responsive Design
- **Mobile First**: Optimized for touch interfaces
- **Progressive Enhancement**: Desktop features enhance mobile base
- **Adaptive Components**: Responsive grid layouts
- **Touch Targets**: Minimum 44px touch areas

### Accessibility
- **WCAG 2.1 AA**: Color contrast and keyboard navigation
- **Screen Readers**: Semantic HTML and ARIA labels
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respect user preferences