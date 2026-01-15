"use client";

import { useState } from "react";
import { Copy, Sparkles, Send, Clock, Globe, Zap, CheckCircle2 } from "lucide-react";

interface Trend {
  name: string;
  sentiment: string;
  why_now: string;
}

interface StrategyBrief {
  trends: Trend[];
  region: string;
  golden_hour_local: string;
  golden_hour_ist: string;
  strategy: string;
}

interface Hook {
  id: number;
  text: string;
  type: string;
}

interface Assets {
  x: { content: string; visual_prompt: string };
  linkedin: { content: string; visual_prompt: string };
  reddit: { content: string; visual_prompt: string };
}

export default function Home() {
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Input, 2: Strategy + Hooks, 3: Assets

  const [strategy, setStrategy] = useState<StrategyBrief | null>(null);
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [assets, setAssets] = useState<Assets | null>(null);
  const [cringeReport, setCringeReport] = useState<{ score: number; critique: string } | null>(null);

  const fetchStrategy = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, audience }),
      });
      const data = await res.json();
      setStrategy(data.strategy_brief);
      setHooks(data.hooks);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch strategy. Is the backend running?");
    }
    setLoading(false);
  };

  const generateAssets = async (hook: string) => {
    setSelectedHook(hook);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/generate-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected_hook: hook, strategy_brief: strategy }),
      });
      const data = await res.json();
      setAssets(data.assets);
      setCringeReport(data.cringe_report);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Failed to generate assets.");
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6 text-accent text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Powered by Gemini 1.5 Flash
        </div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-4 gradient-text">
          The Viral Factory
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Turn global trends into scroll-stopping content using our multi-agent content strategist.
        </p>
      </header>

      {/* Step 1: Input */}
      {step === 1 && (
        <section className="glass-card p-10 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">My Niche</label>
              <input
                type="text"
                placeholder="e.g. Agentic AI, SaaS Marketing, Indiehacking"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg focus:ring-2 focus:ring-accent outline-none transition-all"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Target Audience</label>
              <input
                type="text"
                placeholder="e.g. Technical Founders, HR Managers, Gen-Z Gamers"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg focus:ring-2 focus:ring-accent outline-none transition-all"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <button
              onClick={fetchStrategy}
              disabled={loading || !niche || !audience}
              className="w-full h-16 accent-gradient rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Analyzing Trends..." : "Synthesize Strategy"}
              <Send className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}

      {/* Step 2: Strategy + Hooks */}
      {step === 2 && strategy && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Strategy Brief */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6 border-accent/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                Trends Identified
              </h3>
              <div className="space-y-4">
                {strategy.trends.map((t, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="font-bold text-sm mb-1">{t.name}</div>
                    <div className="text-xs text-slate-400 mb-2">{t.sentiment} sentiment</div>
                    <div className="text-xs italic text-slate-500">{t.why_now}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Golden Hour
              </h3>
              <div className="space-y-2">
                <div className="text-sm">Region: <span className="text-white font-bold">{strategy.region}</span></div>
                <div className="text-sm text-slate-300">Target Time: {strategy.golden_hour_local}</div>
                <div className="text-sm font-bold text-accent-secondary">Post at: {strategy.golden_hour_ist} IST</div>
              </div>
            </div>
          </div>

          {/* Hook Selection */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold mb-6">Pick Your Entry Point</h2>
            <div className="grid gap-4">
              {hooks.map((hook) => (
                <button
                  key={hook.id}
                  onClick={() => generateAssets(hook.text)}
                  disabled={loading}
                  className="glass-card p-6 text-left hover:border-accent group transition-all relative overflow-hidden"
                >
                  <div className="text-accent text-xs font-bold mb-2 uppercase tracking-widest">{hook.type}</div>
                  <p className="text-lg pr-12">{hook.text}</p>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                </button>
              ))}
            </div>
            {loading && (
              <div className="text-center py-10 shimmer rounded-2xl glass-card">
                <p className="text-slate-400">Agentic writers are drafting platform-native versions...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Assets */}
      {step === 3 && assets && (
        <div className="space-y-12">
          {/* Cringe Report Banner */}
          {cringeReport && (
            <div className={`p-6 rounded-2xl border flex items-start gap-4 ${cringeReport.score < 4 ? 'bg-green-500/10 border-green-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
              <CheckCircle2 className={`w-6 h-6 shrink-0 ${cringeReport.score < 4 ? 'text-green-400' : 'text-orange-400'}`} />
              <div>
                <h4 className="font-bold flex items-center gap-2">
                  Cringe-Detector Audit
                  <span className="text-xs font-normal opacity-60">Score: {cringeReport.score}/10</span>
                </h4>
                <p className="text-sm text-slate-300 italic">"{cringeReport.critique}"</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cards for X, LinkedIn, Reddit */}
            {[
              { id: 'x', name: 'X (Twitter)', data: assets.x },
              { id: 'linkedin', name: 'LinkedIn', data: assets.linkedin },
              { id: 'reddit', name: 'Reddit', data: assets.reddit }
            ].map((platform) => (
              <div key={platform.id} className="glass-card flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <span className="font-bold text-xl">{platform.name}</span>
                  <button onClick={() => copyToClipboard(platform.data.content)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 flex-1 bg-white/[0.02]">
                  <p className="text-sm whitespace-pre-wrap text-slate-300 leading-relaxed">
                    {platform.data.content}
                  </p>
                </div>
                <div className="p-6 bg-accent/5 border-t border-white/5">
                  <div className="text-xs font-bold text-accent mb-2 uppercase tracking-widest">Visual Direction</div>
                  <p className="text-xs text-slate-400 line-clamp-3 italic">"{platform.data.visual_prompt}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pb-24">
            <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-white transition-colors">
              ← Start New Campaign
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
