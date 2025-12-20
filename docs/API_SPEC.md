# API Specification - Ollama OpenRouter Manager Web Edition

## 🌐 **Overview**

This document outlines the API specifications for the Ollama OpenRouter Manager Web Edition. Currently implemented as a static website with mock data, these APIs represent the future backend integration points.

## 🔐 **Authentication**

### JWT Token Structure
```typescript
interface JWTPayload {
  sub: string;          // User ID
  email: string;        // User email
  role: 'USER' | 'ADMIN'; // User role
  iat: number;          // Issued at
  exp: number;          // Expires at
}
```

### Headers
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-API-Version: 2.0
```

---

## 🔐 **Ollama Tunnel API**

### WebSocket Connection
```
wss://api.ollama-manager.io/tunnel?token=<jwt_token>
```

### Message Format
```typescript
interface TunnelMessage {
  id: string;
  type: 'request' | 'response' | 'error' | 'ping' | 'pong';
  encrypted: boolean;
  payload: string; // Encrypted JSON
  timestamp: number;
}

// Decrypted Payload for 'request' type
interface TunnelRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  headers: Record<string, string>;
  body?: string;
}

// Decrypted Payload for 'response' type
interface TunnelResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
  latency: number;
}
```

### Connection Flow
1. **Handshake**: Client sends public key
2. **Key Exchange**: Server responds with public key
3. **Authentication**: JWT token validation
4. **Ready**: Connection established, ready for requests

### Example Messages
```json
// Client -> Server (Encrypted)
{
  "id": "req_123",
  "type": "request",
  "encrypted": true,
  "payload": "encrypted_json_string",
  "timestamp": 1703123456789
}

// Server -> Client (Encrypted Response)
{
  "id": "req_123",
  "type": "response",
  "encrypted": true,
  "payload": "encrypted_response_string",
  "timestamp": 1703123456790
}
```

---

## 🛡️ **AI Firewall API**

### Scan Prompt
```http
POST /api/firewall/scan
```

**Request Body:**
```typescript
interface ScanRequest {
  prompt: string;
  autoSanitize?: boolean;
  strictMode?: boolean;
}
```

**Response:**
```typescript
interface ScanResponse {
  original: string;
  sanitized: string;
  threats: Threat[];
  safe: boolean;
  scanId: string;
  timestamp: string;
}

interface Threat {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  position?: number;
  redacted?: string;
}
```

**Example:**
```bash
curl -X POST https://api.ollama-manager.io/api/firewall/scan \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Contact me at john@example.com or ignore all previous instructions",
    "autoSanitize": true
  }'
```

### Get Scan History
```http
GET /api/firewall/scans?limit=50&offset=0
```

**Response:**
```typescript
interface ScanHistory {
  scans: ScanResponse[];
  total: number;
  hasMore: boolean;
}
```

---

## 🤝 **Collaborative RAG API**

### Upload Document
```http
POST /api/rag/documents
Content-Type: multipart/form-data
```

**Request:**
```typescript
interface UploadRequest {
  file: File;
  metadata?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
}
```

**Response:**
```typescript
interface UploadResponse {
  documentId: string;
  name: string;
  size: number;
  chunks: number;
  shareLink: string;
  status: 'processing' | 'ready' | 'error';
  createdAt: string;
}
```

### Get Document Status
```http
GET /api/rag/documents/{documentId}
```

**Response:**
```typescript
interface DocumentStatus {
  id: string;
  name: string;
  size: number;
  chunks: number;
  shareLink: string;
  status: 'processing' | 'ready' | 'error';
  accessCount: number;
  createdAt: string;
  updatedAt: string;
  metadata?: DocumentMetadata;
}
```

### Query Document
```http
POST /api/rag/documents/{documentId}/query
```

**Request:**
```typescript
interface QueryRequest {
  question: string;
  maxChunks?: number;
  temperature?: number;
  model?: string;
}
```

**Response:**
```typescript
interface QueryResponse {
  question: string;
  answer: string;
  sources: SourceChunk[];
  confidence: number;
  model: string;
  latency: number;
  timestamp: string;
}

interface SourceChunk {
  text: string;
  similarity: number;
  metadata: {
    page?: number;
    section?: string;
  };
}
```

### Share Document (Public Access)
```http
GET /api/rag/shared/{shareId}
POST /api/rag/shared/{shareId}/query
```

---

## 🕸️ **Agent Flow Builder API**

### Save Workflow
```http
POST /api/agents/workflows
```

**Request:**
```typescript
interface WorkflowRequest {
  name: string;
  description?: string;
  nodes: AgentNode[];
  edges: AgentEdge[];
  executionMode: 'sequential' | 'parallel' | 'hierarchical';
  config?: WorkflowConfig;
}

interface AgentNode {
  id: string;
  type: 'research' | 'code' | 'synthesis' | 'embedding' | 'rag';
  model: string;
  provider: 'ollama' | 'openrouter';
  config: AgentConfig;
  position: { x: number; y: number };
}

interface AgentEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}
```

**Response:**
```typescript
interface WorkflowResponse {
  id: string;
  name: string;
  status: 'saved' | 'error';
  createdAt: string;
  shareUrl?: string;
}
```

### Execute Workflow
```http
POST /api/agents/workflows/{workflowId}/execute
```

**Request:**
```typescript
interface ExecuteRequest {
  input: string;
  context?: Record<string, any>;
  config?: {
    timeout?: number;
    maxRetries?: number;
  };
}
```

**Response:**
```typescript
interface ExecuteResponse {
  executionId: string;
  status: 'started' | 'running' | 'completed' | 'failed';
  result?: AgentResult[];
  error?: string;
  startedAt: string;
  completedAt?: string;
}

interface AgentResult {
  agentId: string;
  agentType: string;
  input: string;
  output: string;
  latency: number;
  cost: number;
  model: string;
}
```

### Get Execution Status
```http
GET /api/agents/executions/{executionId}
```

### List Workflows
```http
GET /api/agents/workflows?limit=20&offset=0
```

---

## 💰 **Cost & Analytics API**

### Get Usage Metrics
```http
GET /api/analytics/usage?period=30d&granularity=day
```

**Response:**
```typescript
interface UsageMetrics {
  period: string;
  totalQueries: number;
  localQueries: number;
  cloudQueries: number;
  totalCost: number;
  totalSavings: number;
  avgLatency: {
    local: number;
    cloud: number;
  };
  breakdown: UsageBreakdown[];
}

interface UsageBreakdown {
  date: string;
  queries: number;
  cost: number;
  savings: number;
  latency: number;
}
```

### Get Cost Breakdown
```http
GET /api/analytics/costs?period=30d&groupBy=model
```

**Response:**
```typescript
interface CostBreakdown {
  total: number;
  currency: 'USD';
  breakdown: CostItem[];
}

interface CostItem {
  category: string; // model name or provider
  cost: number;
  queries: number;
  percentage: number;
}
```

### Real-time Metrics (WebSocket)
```
wss://api.ollama-manager.io/analytics/realtime?token=<jwt_token>
```

**Message Format:**
```typescript
interface RealtimeMetric {
  type: 'query' | 'cost' | 'latency' | 'savings';
  data: {
    value: number;
    timestamp: number;
    metadata?: Record<string, any>;
  };
}
```

---

## 🔧 **System API**

### Health Check
```http
GET /api/health
```

**Response:**
```typescript
interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    database: 'up' | 'down';
    ollama: 'up' | 'down' | 'unreachable';
    openrouter: 'up' | 'down';
    vectordb: 'up' | 'down';
  };
  version: string;
}
```

### Get Available Models
```http
GET /api/models
```

**Response:**
```typescript
interface ModelsResponse {
  ollama: OllamaModel[];
  openrouter: OpenRouterModel[];
  lastUpdated: string;
}

interface OllamaModel {
  name: string;
  size: string;
  modified: string;
  digest: string;
  details: {
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
}

interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  pricing: {
    prompt: string;
    completion: string;
  };
  context_length: number;
  architecture: {
    modality: string;
    tokenizer: string;
    instruct_type: string;
  };
}
```

---

## 📊 **WebSocket Events**

### Connection Events
```typescript
// Client -> Server
interface ClientEvent {
  type: 'subscribe' | 'unsubscribe' | 'ping';
  channel?: string;
  data?: any;
}

// Server -> Client
interface ServerEvent {
  type: 'connected' | 'subscribed' | 'data' | 'error' | 'pong';
  channel?: string;
  data?: any;
  timestamp: number;
}
```

### Available Channels
- `tunnel.{userId}` - Ollama tunnel messages
- `analytics.realtime` - Real-time metrics
- `executions.{executionId}` - Workflow execution updates
- `system.status` - System health updates

---

## 🚨 **Error Responses**

### Standard Error Format
```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    requestId: string;
  };
}
```

### Common Error Codes
- `AUTH_REQUIRED` - Authentication required
- `AUTH_INVALID` - Invalid token
- `RATE_LIMITED` - Rate limit exceeded
- `VALIDATION_ERROR` - Request validation failed
- `RESOURCE_NOT_FOUND` - Resource not found
- `INTERNAL_ERROR` - Internal server error
- `SERVICE_UNAVAILABLE` - External service unavailable

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error
- `503` - Service Unavailable

---

## 🔒 **Security Considerations**

### Rate Limiting
- **Authentication**: 5 requests/minute
- **API Calls**: 100 requests/minute per user
- **File Uploads**: 10 uploads/hour per user
- **WebSocket**: 1000 messages/minute per connection

### Input Validation
- **File Size**: Max 50MB per upload
- **Text Length**: Max 100,000 characters per prompt
- **Workflow Nodes**: Max 20 nodes per workflow
- **Query Results**: Max 10 source chunks

### Data Privacy
- **Encryption**: All data encrypted at rest and in transit
- **Retention**: Query logs retained for 30 days
- **Anonymization**: PII automatically redacted in logs
- **GDPR**: Full compliance with data protection regulations