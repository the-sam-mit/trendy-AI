# trendyAI (v1.2) 🛸

An AI-powered content engine that automates the lifecycle of social media posts. It uses **Gemini 2.5 Flash-Lite** for reasoning and a multi-agent orchestration pattern to turn global trends into platform-native content.

## 🏗️ Architecture

The system consists of four specialized agents working in a stateful sequence:

1.  **The Chrono-Strategist (Scout)**: Analyzes niches and predicts "Golden Hours" for posting based on audience region.
2.  **The Hook Master (Ideator)**: Generates 5 high-engagement hooks (Contrarian, Data-Drop, Story, etc.).
3.  **The Platform Chameleon (Writer)**: Drafts native content for X (Threads), LinkedIn (Broetry), and Reddit (Raw/Skeptical).
4.  **The Cringe-Detector (Editor)**: Performs an automated audit to strip "AI-isms" and ensure a human-like vibe.

## 🚀 Getting Started

### 1. Backend Setup (FastAPI)
```bash
cd api
# Ensure you have a .env file with your GEMINI_API_KEY
pip install -r ../requirements.txt
PYTHONPATH=.. uvicorn index:app --reload
```

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## 🛠️ Tech Stack
- **LLM**: Gemini 2.5 Flash-Lite
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js (TypeScript) + Tailwind CSS
- **Tools**: Google Search Grounding (via Gemini), Pytz for timezone calculations.
