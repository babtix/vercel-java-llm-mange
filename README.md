# 🚀 Ollama OpenRouter Manager - Web Edition

> **Advanced AI Model Management with Hybrid Local/Cloud Architecture**  
> A comprehensive static website showcasing the next generation of AI model management with 5 cutting-edge web-specific features.

![Cyberpunk 2077 Theme](https://img.shields.io/badge/Theme-Cyberpunk%202077-yellow?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 🎯 **Overview**

This is a **static website** built with Next.js that demonstrates the future of AI model management. Originally a JavaFX desktop application, this web edition showcases 5 advanced features designed specifically for web deployment.

### 🌟 **Live Demo**
- **Website**: [https://ollama-manager-web.vercel.app](https://ollama-manager-web.vercel.app)
- **Status**: Static website with interactive demos
- **Theme**: Cyberpunk 2077 with neon accents and dark aesthetics

---

## ✨ **The 5 Revolutionary Features**

### 🔐 **1. Secure Ollama Tunnel**
**WebSocket-based E2E encrypted connection to local Ollama**
- Zero-knowledge architecture - server cannot read prompts
- AES-256-GCM encryption with ECDH key exchange
- Real-time latency monitoring and model detection
- One-command setup: `npx ollama-tunnel --token abc123`

### 🕸️ **2. Visual Agent Flow Builder**
**Drag-and-drop multi-agent workflow designer**
- React Flow powered interface with 5 specialized agents
- Sequential, Parallel, and Hierarchical execution modes
- Export workflows as JSON for reproducible AI pipelines
- Real-time visual feedback and connection validation

### 🛡️ **3. AI Firewall Middleware**
**PII scrubbing and prompt injection protection**
- Detects emails, phones, SSNs, API keys, IP addresses
- Guards against instruction override and role hijacking
- Real-time scanning with auto-sanitization
- Color-coded threat severity indicators

### 🤝 **4. Collaborative RAG**
**Share knowledge bases with UUID links**
- Upload PDFs, TXT, MD, DOCX files
- Smart chunking with configurable overlap
- Generate shareable links: `app.com/rag/abc123`
- Public access without authentication required

### 💰 **5. Real-Time Cost vs Speed Gauge**
**Live savings counter and performance metrics**
- Animated savings counter showing money saved vs GPT-4
- Query distribution visualization (Local vs Cloud)
- Real-time latency comparison charts
- Efficiency scoring and optimization suggestions

---

## 🎨 **Cyberpunk 2077 Design System**

### Color Palette
```css
--neon-yellow: #FCE300    /* Primary actions */
--cyber-blue: #00D4FF     /* Secondary elements */
--hot-pink: #FF2A6D       /* Alerts and warnings */
--neon-green: #05FFA1     /* Success states */
--deep-dark: #0A0A0F      /* Background */
--cyber-gray: #1A1A2E     /* Cards and panels */
```

### Typography
- **Headers**: Orbitron (futuristic, tech-focused)
- **Body**: Rajdhani (clean, readable)
- **Code**: JetBrains Mono (monospace)

### Visual Effects
- **Glow Effects**: CSS box-shadow with neon colors
- **Scanlines**: Subtle overlay for retro-futuristic feel
- **Glitch Animation**: Hover effects on interactive elements
- **Grid Background**: Subtle cyber grid pattern

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/ollama-manager-web.git
cd ollama-manager-web

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

### Build for Production
```bash
# Build static site
npm run build

# Start production server
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel dashboard
```

---

## 📁 **Project Structure**

```
ollama-manager-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with theme
│   ├── page.tsx                 # Main dashboard
│   └── globals.css              # Cyberpunk styling
├── components/                   # React Components
│   ├── ui/                      # Base components
│   │   ├── CyberCard.tsx        # Themed card component
│   │   ├── CyberButton.tsx      # Neon button styles
│   │   └── StatusIndicator.tsx  # Connection status
│   ├── features/                # Feature components
│   │   ├── AgentFlowBuilder.tsx # React Flow builder
│   │   ├── OllamaTunnel.tsx     # Tunnel interface
│   │   ├── AIFirewall.tsx       # Security scanner
│   │   ├── CollaborativeRAG.tsx # Document sharing
│   │   └── CostSpeedGauge.tsx   # Metrics dashboard
│   └── layout/
│       └── Navbar.tsx           # Navigation
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md          # System design
│   ├── FEATURES.md              # Feature specs
│   └── API_SPEC.md              # API documentation
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind setup
└── README.md                    # This file
```

---

## 🛠️ **Technology Stack**

### Frontend Framework
- **Next.js 14+**: App Router, SSG, TypeScript
- **React 18**: Hooks, Suspense, Concurrent features
- **TypeScript**: Full type safety

### Styling & UI
- **Tailwind CSS**: Utility-first styling
- **Custom Theme**: Cyberpunk 2077 design system
- **Responsive**: Mobile-first approach
- **Animations**: CSS transitions and transforms

### Interactive Features
- **React Flow**: Drag-and-drop agent builder
- **Recharts**: Cost/speed visualizations  
- **Lucide Icons**: Consistent iconography
- **WebSocket**: Real-time connections (future)

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Vercel**: Deployment and hosting

---

## 📊 **Features Comparison**

| Feature | Desktop (JavaFX) | Web Edition | Status |
|---------|------------------|-------------|---------|
| **Multi-Agent System** | ✅ 5 Agents | ✅ Visual Builder | Enhanced |
| **RAG Pipeline** | ✅ Local Only | ✅ + Sharing | Enhanced |
| **Theme System** | ✅ 20+ Themes | ✅ Cyberpunk | Focused |
| **Hardware Monitor** | ✅ Real-time | 🚧 Simulated | Adapted |
| **Ollama Integration** | ✅ Direct | 🚧 Tunnel | Enhanced |
| **OpenRouter API** | ✅ Direct | 🚧 Proxy | Same |
| **AI Firewall** | ❌ None | ✅ Advanced | **New** |
| **Collaborative RAG** | ❌ None | ✅ Sharing | **New** |
| **Cost Tracking** | ❌ Basic | ✅ Real-time | **New** |
| **Web Deployment** | ❌ Desktop | ✅ Vercel | **New** |

---

## 🔮 **Future Roadmap**

### Phase 1: Static Website ✅
- [x] Cyberpunk 2077 theme implementation
- [x] 5 interactive feature demos
- [x] Responsive design
- [x] Vercel deployment

### Phase 2: Backend Integration 🚧
- [ ] Next.js API routes
- [ ] Supabase PostgreSQL database
- [ ] Real WebSocket connections
- [ ] User authentication (NextAuth.js)

### Phase 3: Production Features 📋
- [ ] Actual Ollama tunnel implementation
- [ ] Real document processing pipeline
- [ ] Live cost tracking integration
- [ ] Multi-user collaboration

### Phase 4: Advanced Features 🔬
- [ ] AI model fine-tuning interface
- [ ] Advanced analytics dashboard
- [ ] Team management and permissions
- [ ] API marketplace integration

---

## 🤝 **Contributing**

We welcome contributions! Here's how to get started:

### Development Setup
```bash
# Fork the repository
git clone https://github.com/your-username/ollama-manager-web.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

### Contribution Guidelines
- Follow the existing code style
- Add TypeScript types for new features
- Update documentation for API changes
- Test on mobile and desktop
- Maintain Cyberpunk theme consistency

---

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Original Desktop App**: JavaFX-based Ollama OpenRouter Manager
- **Design Inspiration**: Cyberpunk 2077 UI/UX
- **Technology Stack**: Next.js, React, Tailwind CSS
- **Community**: Ollama, OpenRouter, and React communities

---

## 📞 **Support & Contact**

- **Issues**: 
- **Discussions**: [
- **Documentation**: 
- **Live Demo**: 

---

**Built with ❤️ and ⚡ using Next.js and Cyberpunk aesthetics**
