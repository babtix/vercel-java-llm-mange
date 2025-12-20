# Ollama OpenRouter Manager - Web Edition
## Static Website Project Structure

```
ollama-openrouter-manager-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Cyberpunk theme
│   ├── page.tsx                 # Main dashboard page
│   ├── globals.css              # Cyberpunk 2077 styling
│   └── api/                     # API routes (for future backend)
│       ├── tunnel/              # Ollama Tunnel endpoints
│       ├── firewall/            # AI Firewall endpoints
│       └── rag/                 # RAG sharing endpoints
├── components/                   # React Components
│   ├── ui/                      # Base UI Components
│   │   ├── CyberCard.tsx        # Cyberpunk-themed card
│   │   ├── CyberButton.tsx      # Neon button component
│   │   └── StatusIndicator.tsx  # Connection status
│   ├── features/                # Feature Components
│   │   ├── AgentFlowBuilder.tsx # React Flow agent builder
│   │   ├── OllamaTunnel.tsx     # Tunnel connection UI
│   │   ├── AIFirewall.tsx       # PII/Injection scanner
│   │   ├── CollaborativeRAG.tsx # Document sharing
│   │   └── CostSpeedGauge.tsx   # Savings dashboard
│   └── layout/                  # Layout Components
│       └── Navbar.tsx           # Navigation bar
├── lib/                         # Utilities & Services
│   ├── firewall/                # AI Firewall Logic
│   │   ├── pii-detector.ts      # PII pattern matching
│   │   └── injection-guard.ts   # Prompt injection detection
│   ├── tunnel/                  # Ollama Tunnel Client
│   │   ├── websocket-client.ts  # WebSocket connection
│   │   └── encryption.ts        # E2E encryption
│   └── utils/                   # Helper functions
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md          # System architecture
│   ├── FEATURES.md              # Feature specifications
│   ├── API_SPEC.md              # API documentation
│   └── DEPLOYMENT.md            # Vercel deployment guide
├── public/                      # Static assets
│   ├── icons/                   # Feature icons
│   └── screenshots/             # UI screenshots
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── next.config.js               # Next.js configuration
└── README.md                    # Project overview
```

## 🚀 **Deployment Strategy**

### Static Website (Current)
- **Platform**: Vercel
- **Type**: Static site generation (SSG)
- **Features**: All 5 features as interactive demos
- **Data**: Mock data and localStorage

### Future Backend Integration
- **API Routes**: Next.js API routes for server functionality
- **Database**: Supabase PostgreSQL for user data
- **Real-time**: WebSocket connections for Ollama Tunnel
- **Authentication**: NextAuth.js with JWT

## 🎨 **Theme System**

### Cyberpunk 2077 Design Language
- **Primary**: Neon Yellow (#FCE300)
- **Secondary**: Cyber Blue (#00D4FF)
- **Accent**: Hot Pink (#FF2A6D)
- **Success**: Neon Green (#05FFA1)
- **Background**: Deep Dark (#0A0A0F)
- **Cards**: Translucent panels with neon borders
- **Typography**: Orbitron (headers) + Rajdhani (body)
- **Effects**: Glow, scanlines, glitch animations

## 📱 **Responsive Design**

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Collapsible mobile menu
- **Components**: Responsive grid layouts
- **Touch**: Touch-friendly interactive elements

## 🔧 **Technology Stack**

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Custom Cyberpunk theme
- **Components**: Custom React components
- **Icons**: Lucide React + Custom SVGs
- **Animations**: CSS transitions + Framer Motion (future)

### Interactive Features
- **Agent Builder**: React Flow for drag-and-drop
- **Charts**: Recharts for cost/speed visualization
- **Forms**: React Hook Form with validation
- **State**: Zustand for global state management
- **Storage**: localStorage for demo data persistence

### Development
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library (future)
- **CI/CD**: Vercel automatic deployments