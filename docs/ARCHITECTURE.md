# System Architecture - Web Edition

## 🏗️ **High-Level Architecture**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Next.js Frontend (Vercel)                        │
│  Dashboard | Agent Builder | Tunnel UI | Firewall | RAG Interface       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Static Demo  │         │ Browser Storage │         │ WebSocket       │
│  Components   │         │ (localStorage)  │         │ Connections     │
│               │         │                 │         │                 │
│ • Mock data   │         │ • User prefs    │         │ • Ollama Tunnel │
│ • Simulations │         │ • Demo state    │         │ • Real-time     │
│ • Interactions│         │ • Workflows     │         │ • E2E Encrypted │
└───────────────┘         └─────────────────┘         └─────────────────┘
```

## 🔐 **Ollama Tunnel Architecture**

### Client-Side Tunnel (Future Implementation)
```
┌─────────────────┐    WebSocket     ┌─────────────────┐    HTTP    ┌─────────────────┐
│   Web Browser   │ ←──────────────→ │  Tunnel Client  │ ←────────→ │ Local Ollama    │
│                 │   E2E Encrypted  │  (Node.js CLI)  │            │ (localhost:11434)│
│ • Web UI        │                  │                 │            │                 │
│ • Prompt input  │                  │ • Encryption    │            │ • Models        │
│ • Response      │                  │ • Proxy         │            │ • Generation    │
└─────────────────┘                  └─────────────────┘            └─────────────────┘
```

### Security Features
- **End-to-End Encryption**: AES-256-GCM
- **Key Exchange**: ECDH (Elliptic Curve Diffie-Hellman)
- **Authentication**: JWT tokens with short expiry
- **Zero-Knowledge**: Server cannot decrypt prompts

## 🕸️ **Agent Flow Builder**

### Component Architecture
```
┌─────────────────────────────────────────────────────────────────────────┐
│                         React Flow Canvas                                │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                  │
│  │ Research    │───→│ Code        │───→│ Synthesis   │                  │
│  │ Agent       │    │ Agent       │    │ Agent       │                  │
│  │             │    │             │    │             │                  │
│  │ deepseek-r1 │    │ deepseek-   │    │ gemma-2-9b  │                  │
│  └─────────────┘    │ coder       │    └─────────────┘                  │
│                     └─────────────┘                                     │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                        ┌─────────────────────┐
                        │ Workflow JSON       │
                        │ {                   │
                        │   nodes: [...],     │
                        │   edges: [...],     │
                        │   mode: "parallel"  │
                        │ }                   │
                        └─────────────────────┘
```

### Node Types
- **Research Agent**: Information gathering and analysis
- **Code Agent**: Programming and debugging tasks
- **Synthesis Agent**: Content creation and summarization
- **Embedding Agent**: Vector generation for RAG
- **RAG Agent**: Document-based question answering

### Execution Modes
- **Sequential**: Linear workflow execution
- **Parallel**: Concurrent agent execution
- **Hierarchical**: Manager-worker delegation

## 🛡️ **AI Firewall Architecture**

### Processing Pipeline
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Raw Prompt  │───→│ PII Scanner │───→│ Injection   │───→│ Sanitized   │
│             │    │             │    │ Detector    │    │ Output      │
│ "Contact me │    │ • Email     │    │             │    │ "Contact me │
│ at john@... │    │ • Phone     │    │ • Override  │    │ at [EMAIL]  │
│ Ignore all  │    │ • SSN       │    │ • Hijack    │    │ [BLOCKED]"  │
│ previous..."│    │ • API Keys  │    │ • Jailbreak │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Detection Patterns
```typescript
// PII Patterns
const PII_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /\b(\+?1?[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  ssn: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g,
  apiKey: /\b(sk-|pk-|api[_-]?key[_-]?)[a-zA-Z0-9]{20,}\b/gi,
};

// Injection Patterns
const INJECTION_PATTERNS = [
  { pattern: /ignore\s+(all\s+)?previous\s+instructions/gi, severity: "critical" },
  { pattern: /you\s+are\s+now\s+(a|an)\s+/gi, severity: "high" },
  { pattern: /system\s*:\s*/gi, severity: "critical" },
];
```

## 🤝 **Collaborative RAG System**

### Document Processing Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Upload      │───→│ Text        │───→│ Embedding   │───→│ Vector      │
│ Document    │    │ Extraction  │    │ Generation  │    │ Storage     │
│             │    │             │    │             │    │             │
│ • PDF       │    │ • Chunking  │    │ • nomic-    │    │ • PostgreSQL│
│ • TXT       │    │ • Overlap   │    │   embed     │    │ • pgvector  │
│ • MD        │    │ • Metadata  │    │ • 768 dims  │    │ • Similarity│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                  │
                                                                  ▼
                                                      ┌─────────────────┐
                                                      │ Shareable Link  │
                                                      │ UUID: abc123    │
                                                      │ Public Access   │
                                                      └─────────────────┘
```

### Sharing Mechanism
- **UUID Generation**: Unique document identifiers
- **Public Links**: No authentication required
- **Access Tracking**: View count and analytics
- **Expiration**: Optional time-based expiry

## 💰 **Cost vs Speed Monitoring**

### Metrics Collection
```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Query Router                                     │
│  ┌─────────────┐                              ┌─────────────┐            │
│  │ Local       │                              │ Cloud       │            │
│  │ (Ollama)    │                              │ (OpenRouter)│            │
│  │             │                              │             │            │
│  │ Cost: $0    │                              │ Cost: $0.06 │            │
│  │ Speed: 245ms│                              │ Speed: 1850ms│           │
│  │ Quality: ⭐⭐⭐│                              │ Quality: ⭐⭐⭐⭐⭐│           │
│  └─────────────┘                              └─────────────┘            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                        ┌─────────────────────┐
                        │ Real-time Dashboard │
                        │ • Savings counter   │
                        │ • Query distribution│
                        │ • Performance metrics│
                        └─────────────────────┘
```

### Cost Calculation
- **GPT-4**: ~$0.06 per query (estimated)
- **Claude**: ~$0.05 per query (estimated)
- **Local**: $0.00 per query
- **Savings**: Real-time calculation based on routing decisions

## 📊 **Data Flow**

### Static Website Data Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ User        │───→│ React       │───→│ Local       │───→│ UI          │
│ Interaction │    │ Component   │    │ Storage     │    │ Update      │
│             │    │             │    │             │    │             │
│ • Click     │    │ • State     │    │ • Demo data │    │ • Animation │
│ • Input     │    │ • Logic     │    │ • Settings  │    │ • Feedback  │
│ • Upload    │    │ • Validation│    │ • History   │    │ • Results   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Future Backend Integration
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Frontend    │───→│ Next.js     │───→│ Database    │───→│ External    │
│ (Browser)   │    │ API Routes  │    │ (Supabase)  │    │ APIs        │
│             │    │             │    │             │    │             │
│ • UI        │    │ • Auth      │    │ • Users     │    │ • Ollama    │
│ • State     │    │ • Validation│    │ • Documents │    │ • OpenRouter│
│ • Events    │    │ • Business  │    │ • Vectors   │    │ • ChromaDB  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## 🔄 **State Management**

### Component State
- **React useState**: Local component state
- **useEffect**: Side effects and lifecycle
- **useCallback**: Memoized functions
- **useMemo**: Expensive calculations

### Global State (Future)
- **Zustand**: Lightweight state management
- **Stores**: User, Settings, Demo Data
- **Persistence**: localStorage integration
- **Subscriptions**: Component updates