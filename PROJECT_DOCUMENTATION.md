# Ollama OpenRouter Manager

> A comprehensive desktop application for managing AI models with hybrid local/cloud architecture, RAG pipelines, and multi-agent orchestration.

---

## 🎯 Overview

**Ollama OpenRouter Manager** is a feature-rich JavaFX desktop application that provides a unified interface for managing both local (Ollama) and cloud-based (OpenRouter) AI models. It combines modern UI design with advanced AI capabilities including RAG (Retrieval-Augmented Generation), multi-agent systems, and real-time hardware monitoring.

---

## ✨ Key Features

### 🤖 Hybrid AI Architecture
- **Dual Provider Support**: Seamlessly switch between Ollama (local) and OpenRouter (cloud) models
- **Intelligent Routing**: Auto-route queries based on complexity, cost, or performance preferences
- **Unified API**: Single interface for all AI interactions regardless of provider

### 🔐 Authentication & User Management
- **Role-Based Access Control**: USER and ADMIN roles with different capabilities
- **Secure Session Management**: Persistent sessions with API key storage
- **Admin Dashboard**: User management, API key configuration, and system settings

### 🎨 Dynamic Theme System
- **20+ Professional Themes**: Material, Brand (Google, Apple, Microsoft), Nature, Gaming themes
- **Real-time Switching**: Instant theme application without restart
- **JSON-Based Configuration**: Easy customization and theme creation

### 📚 RAG Pipeline
- **Document Ingestion**: Support for text, markdown, and code files
- **Vector Storage**: Multiple backends (In-memory, ChromaDB, File-based)
- **Semantic Search**: Cosine similarity-based retrieval
- **Context-Aware Generation**: Responses grounded in your documents

### 🤝 Multi-Agent System
- **5 Specialized Agents**: Embedding, Research, Synthesis, Code, and RAG agents
- **Execution Modes**: Sequential, Parallel, and Hierarchical coordination
- **CrewAI-Style Tasks**: Complex multi-step workflows with agent handoffs

### 📊 Hardware Monitoring
- **Real-time Metrics**: CPU, Memory, GPU/VRAM usage
- **Ollama Process Tracking**: Monitor local AI server status
- **Cross-Platform**: Windows, macOS, and Linux support

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         JavaFX Application Layer                         │
│  AuthApp | MainController | EnhancedChatController | AdminController    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  RAGPipeline  │         │ UnifiedModel    │         │ MultiAgent      │
│               │         │ Service         │         │ Orchestrator    │
│ • Ingest docs │         │ • Ollama/OR     │         │ • 5 agents      │
│ • Retrieve    │         │ • Routing       │         │ • 3 exec modes  │
│ • Generate    │         │ • Context       │         │ • Task coord    │
└───────────────┘         └─────────────────┘         └─────────────────┘
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐         ┌─────────────────┐         ┌─────────────────┐
│ VectorStore   │         │   OllamaAPI     │         │ HardwareMonitor │
│ • ChromaDB    │         │   (Local)       │         │ • CPU/Memory    │
│ • In-memory   │         │                 │         │ • GPU/VRAM      │
│ • File-based  │         │   OpenRouterAPI │         │ • Ollama proc   │
└───────────────┘         │   (Cloud)       │         └─────────────────┘
        │                 └─────────────────┘
        ▼
┌───────────────┐
│ Embedding     │
│ Service       │
│ (Ollama)      │
│ nomic-embed   │
└───────────────┘
```

---

## 📦 Core Components

### Services
| Service | Description |
|---------|-------------|
| `UnifiedModelService` | Provider abstraction for Ollama/OpenRouter |
| `EmbeddingService` | Local embedding generation via Ollama |
| `VectorStore` | Vector storage with multiple backends |
| `RAGPipeline` | Complete retrieval-augmented generation |
| `MultiAgentOrchestrator` | CrewAI-style multi-agent coordination |
| `AgentService` | Tool registration and execution |
| `QueryRouter` | Intelligent query routing |
| `ConversationMemory` | Context management with multiple strategies |
| `HardwareMonitorService` | Real-time system monitoring |

### Controllers
| Controller | Description |
|------------|-------------|
| `LoginController` | Authentication and login flow |
| `AdminController` | Admin dashboard and user management |
| `UserController` | User chat interface |
| `MainController` | Main application controller |
| `EnhancedChatController` | Advanced chat with agentic features |
| `HardwareMonitorController` | System monitoring UI |
| `AppSelectionController` | JavaFX/Swing app selection |

### Models
| Model | Description |
|-------|-------------|
| `User` | User entity with Role enum (USER/ADMIN) |
| `SessionContext` | Singleton session management |
| `ChatSession` | Chat conversation data |
| `ChatMessage` | Individual message data |
| `ModelInfo` | AI model metadata |

---

## 🎨 Theme Gallery

### Material Themes
- Material Light
- Material Dark

### Brand Themes
- Google
- Apple
- Samsung
- Xiaomi
- Microsoft
- Mistral AI
- Gemini

### Nature Themes
- Forest Green
- Ocean Blue
- Deep Ocean
- Sunrise
- Moon
- Night
- Mars

### Style Themes
- Lavender Dreams
- Slate Minimalist

### Gaming Themes
- Cyberpunk 2077
- GTA Vice City

---

## 🤖 Multi-Agent System

### Available Agents

| Agent | Provider | Model | Capabilities |
|-------|----------|-------|--------------|
| `embedding_agent` | Ollama | llama2 | Embedding, Analysis |
| `research_agent` | OpenRouter | deepseek-r1 | Research, Analysis, Reasoning |
| `synthesis_agent` | OpenRouter | gemma-2-9b | Synthesis, Writing |
| `code_agent` | OpenRouter | deepseek-coder | Coding, Debugging, Review |
| `rag_agent` | OpenRouter | gemma-2-9b | RAG, Research |

### Execution Modes
- **Sequential**: Tasks run one after another
- **Parallel**: Tasks run concurrently
- **Hierarchical**: Manager agent delegates to workers

---

## 📚 RAG Pipeline Features

### Document Processing
- Smart text chunking with configurable overlap
- Support for `.txt`, `.md`, `.java`, and more
- Batch document ingestion

### Vector Storage Backends
- **In-Memory**: Fast, no persistence (development)
- **ChromaDB**: Persistent, scalable (production)
- **File-Based**: Simple file persistence

### Embedding Models
- `nomic-embed-text` (768 dimensions, recommended)
- `all-minilm` (384 dimensions, faster)
- `mxbai-embed-large` (1024 dimensions, highest quality)

---

## 🔧 Technical Stack

### Core Technologies
- **Java 17+** with modern features
- **JavaFX 21** for rich desktop UI
- **Maven** for build management

### Dependencies
- ControlsFX - Enhanced JavaFX controls
- FormsFX - Form handling
- ValidatorFX - Input validation
- Ikonli - Icon fonts
- BootstrapFX - Bootstrap-style CSS
- TilesFX - Dashboard tiles
- FXGL - Game library components

### APIs
- **Ollama API**: Local model management (localhost:11434)
- **OpenRouter API**: Cloud model access
- **ChromaDB API**: Vector database (optional)

---

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Ollama (for local models)
- OpenRouter API key (for cloud models)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Ollama-OpenRouter-javafx-manager

# Build the project
./mvnw clean compile

# Run the application
./mvnw javafx:run
```

### Default Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| user | user123 | USER |
| testuser | test123 | USER |

---

## 📊 Demo Applications

### ComprehensiveDemo
Full-featured demonstration with 8 demo modes:
1. RAG: Ingest Documentation
2. RAG: Query Knowledge Base
3. Multi-Agent: Research Task
4. Multi-Agent: Code Generation
5. Multi-Agent: Complex Analysis
6. Hardware: System Status
7. Hybrid: Model Comparison
8. Full Pipeline: Document → Agents → Analysis

### QuickTest
System verification utility for testing all services.

---

## 🔒 Security Features

- Password validation and secure storage
- API key masking in UI
- Role-based access control
- Session management with cleanup
- User enable/disable functionality

---

## 📈 Performance Characteristics

### Ollama (Local)
- ✅ Fast - No network latency
- ✅ Private - Data stays local
- ✅ Free - No API costs
- ⚠️ Limited model capabilities

### OpenRouter (Cloud)
- ✅ Advanced models (GPT-4, Claude, DeepSeek)
- ✅ Scalable - No local resource constraints
- ⚠️ API usage fees
- ⚠️ Network dependent

### Hybrid Benefits
- Best of both worlds
- Cost optimization
- Graceful fallback
- Query-based routing

---

## 🗂️ Project Structure

```
src/main/java/com/ollama/ollamaopenrouterjavafxmanager/
├── controllers/          # JavaFX Controllers
├── models/              # Data Models
├── services/            # Business Logic & APIs
├── theme/               # Theme System
├── utils/               # Utilities
├── AuthApp.java         # Main entry point
├── ComprehensiveDemo.java
└── ...

src/main/resources/
├── com/ollama/.../      # FXML views & themes
├── css/                 # Stylesheets
├── fxml/                # Additional FXML
├── img/                 # Images
├── loadingscreen/       # Loading assets
└── svg/                 # Vector graphics
```

---

## 🌐 Web Version Roadmap

This desktop application can be ported to a web version with:

### Frontend (Vercel)
- Next.js or React for UI
- TailwindCSS for styling
- WebSocket for real-time chat

### Backend
- Spring Boot REST API
- PostgreSQL for user data
- Redis for session management

### AI Services
- Ollama via API proxy
- OpenRouter direct integration
- Vector DB (Pinecone/Weaviate)

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 🙏 Acknowledgments

- JavaFX Community
- Ollama Team
- OpenRouter
- Material Design

---

**Built with ❤️ using JavaFX and modern Java practices**
