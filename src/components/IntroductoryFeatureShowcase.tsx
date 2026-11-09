import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  GitPullRequest,
  HeartHandshake,
  ShieldCheck,
  Utensils,
  Bike,
  Building2,
  Code2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Layers,
  ChevronRight,
  Share2,
  Cpu,
  Zap,
} from 'lucide-react';

export const IntroductoryFeatureShowcase: React.FC = () => {
  const { setRole, setDemoModalOpen, setPaperModalOpen, setSimulationModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'contribute' | 'developers'>('overview');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between h-full space-y-4">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
              Paper II Architecture
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
              ICIPAI 2026 • AISR 211
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3-Layer Arch
            </button>
            <button
              onClick={() => setActiveTab('contribute')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'contribute'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Role Workflow
            </button>
            <button
              onClick={() => setActiveTab('developers')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'developers'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Engine & Stack
            </button>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>AI-Assisted Smart Food Redistribution</span>
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Operationalizing Paper II: Priority-Based Optimization (<code className="text-emerald-400 font-mono">O(n log n)</code>) to maximize Wastage Reduction Rate (+28–37%) and minimize travel distance (15–25%).
        </p>
      </div>

      {/* Tab 1: Overview - 3-Layer Architecture (Fig 1) */}
      {activeTab === 'overview' && (
        <div className="space-y-3.5 my-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Layers className="w-3.5 h-3.5" />
                <span>1. Data Acquisition Layer</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Captures batch quantity (Q<sub>i</sub>), safe consumption window (T<sub>e,i</sub>), GPS coordinates, and FSSAI 5-point sensory checklist.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl hover:border-rose-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <Cpu className="w-3.5 h-3.5" />
                <span>2. AI Optimization Core</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Computes Equation 1 & 2 priority scoring and runs Algorithm 1 deterministic matching to pair critical batches with nearest active volunteers.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl hover:border-blue-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                <Bike className="w-3.5 h-3.5" />
                <span>3. Last-Mile Delivery Fleet</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Dispatches two-wheelers and EVs across semi-urban clusters with cold/insulated bags and QR verification handoffs.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>4. Audit & Impact Ledger</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Cryptographically hashes deliveries, tracks methane/CO₂e abatement (2.5 kg CO₂e/kg food), and verifies recipient intake.
              </p>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-emerald-950/40 via-slate-950/60 to-slate-950 border border-emerald-900/40 rounded-xl text-xs flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white">Paper II Published in AISR Vol 211</div>
              <div className="text-[11px] text-slate-400">
                By J. Vatsa, Dr. B. Kumar, Dr. G. Jha, D. Chaudhary • ICIPAI 2026
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimulationModalOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-amber-300" />
                <span>Run Sim</span>
              </button>
              <button
                onClick={() => setPaperModalOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold shrink-0 cursor-pointer"
              >
                View Paper
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: How Someone Can Contribute */}
      {activeTab === 'contribute' && (
        <div className="space-y-2.5 my-auto text-xs">
          <div className="text-[11px] text-slate-400">
            Select your role to participate in the local circular economy:
          </div>

          <div className="space-y-2">
            {/* Action 1 */}
            <div
              onClick={() => setRole('provider')}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">1. As a Food Provider</div>
                  <div className="text-[11px] text-slate-400">
                    Register edible kitchen surplus before it becomes landfill waste.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            {/* Action 2 */}
            <div
              onClick={() => setRole('volunteer')}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <Bike className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">2. As a Community Volunteer</div>
                  <div className="text-[11px] text-slate-400">
                    Use your two-wheeler or bicycle to bridge last-mile delivery and safety inspect food.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            {/* Action 3 */}
            <div
              onClick={() => setRole('receiver')}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">3. As an NGO or Shelter</div>
                  <div className="text-[11px] text-slate-400">
                    Claim nutritious meals for children and senior residents.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Developers & Technical Architecture */}
      {activeTab === 'developers' && (
        <div className="space-y-3 my-auto text-xs">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Optimization Complexity:</span>
              <span className="text-emerald-400 font-bold">O(n log n) Deterministic Sorting</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Core Equation 2:</span>
              <span className="text-rose-400 font-bold">[Q / (T_e + ε)] × [1 / (1 + D)]</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Simulation Engine:</span>
              <span className="text-blue-400 font-bold">Section 5 Monte Carlo (n=100)</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Front-End Stack:</span>
              <span className="text-amber-400 font-bold">React 19 + TypeScript + Tailwind CSS</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Academic Citation:</span>
              <span className="text-purple-400 font-bold">DOI: 10.2991/978-94-6239-789-7_18</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed">
            The lightweight deterministic priority algorithm requires no heavy GPU infrastructure, allowing direct edge execution in rural and semi-urban panchayat clusters.
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSimulationModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-900/30 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-200" />
            <span>Open Paper II Sim (n=100)</span>
          </button>

          <button
            onClick={() => setDemoModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Demo Flow</span>
          </button>
        </div>

        <a
          href="https://jigyasu.jigsy.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          title="About Lead Developer Mr. Jigyasu Vatsa"
        >
          <span>About Developer</span>
          <ExternalLink className="w-3 h-3 text-rose-400" />
        </a>
      </div>
    </div>
  );
};
