# trendyAI 🛸

Your AI-powered Content Strategist. Turn global trends into personal growth.

The AI-powered content engine that automates the lifecycle of social media posts. It uses **Gemini 2.5 Flash-Lite** for reasoning and a multi-agent orchestration pattern to turn global trends into platform-native content.


## ✨ Key Features

* **Trend Discovery:** Real-time analysis of "hot topics" across platforms like Reddit and X.
* **Engagement Optimization:** Suggests the best platform and specific posting times based on target demographics and audiences (e.g., US, Youth).
* **Content Brainstorming:** Generates content ideas based on the intersection of your niche and current viral trends.
* **Personalized Analytics:** Analyzes your previous posts to identify what works for *your* specific audience.

## 📈 Use Cases

### 1. The "Amplifier" (I have content)
The user uploads a draft or description. The tool analyzes the metadata and recommends:
- The best subreddit or platform.
- High-performing hashtags/keywords.
- Optimized posting schedule.

### 2. The "Inspirer" (I need ideas)
The tool scans the Vector DB for trending "hooks" and suggests content pillars that align with the creator's brand and current viral sentiment.

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


## 🗺️ Roadmap
- [ ] Phase 1: Agentic AI setup for Reddit/X (preferably Reddit) trend ingestion.
- [ ] Phase 2: Integration with user-specific historical metrics.
- [ ] Phase 3: Goal-based suggestions (Brand Awareness vs. Interaction).
- [ ] Phase 4: Multi-platform scheduling automation.
- [ ] Phase 5: Extending to sort-of reverse engineer social media platform algorithms. (Note: This should be iterative and should be stable enough) 

## Notes
- This is a living document. Will be adding more details on-the-fly.
- Any feedback is highly appreciated. Feel free to drop comments/ideas.