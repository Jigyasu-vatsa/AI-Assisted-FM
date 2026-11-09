import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { GeoMapVisualizer } from './GeoMapVisualizer';
import { IntroductoryFeatureShowcase } from './IntroductoryFeatureShowcase';
import {
  Utensils,
  Building2,
  Bike,
  ShieldCheck,
  Leaf,
  Droplet,
  HeartHandshake,
  TrendingUp,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award,
  CheckCircle2,
  Globe2,
  Cpu,
  Layers,
  Scale,
  Play,
  RotateCcw,
  BookOpen,
  AlertTriangle,
  Zap,
  Clock,
  Compass,
  BarChart3,
  Flame,
  CheckCircle,
} from 'lucide-react';

export const HomePageView: React.FC = () => {
  const {
    navigateToRole,
    setPaperModalOpen,
    setPaperModalTab,
    setProofModalOpen,
    setDemoModalOpen,
    setSimulationModalOpen,
    setLifecycleModalOpen,
    metrics,
    simulateFullLifecycle,
    isSimulating,
    t,
  } = useApp();

  const roleCards: {
    id: UserRole;
    title: string;
    targetAudience: string;
    description: string;
    badge: string;
    features: string[];
    btnText: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    bgHover: string;
    accentBtn: string;
  }[] = [
    {
      id: 'provider',
      title: 'Food Provider',
      targetAudience: 'Hostel Messes, Banquets, Restaurants & Caterers',
      description:
        'Register fresh surplus food immediately after meal services before it turns into waste. Set safe expiry windows, thermal thresholds, and dietary classifications.',
      badge: 'Surplus Originator',
      features: [
        'Instant surplus meal batch logging',
        'Storage temperature & packaging verification',
        'Automated real-time volunteer dispatch request',
      ],
      btnText: 'Enter Provider Workspace',
      icon: <Utensils className="w-5 h-5" />,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30 hover:border-amber-500/70',
      bgHover: 'group-hover:bg-amber-500/10',
      accentBtn: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    {
      id: 'receiver',
      title: 'Food Receiver',
      targetAudience: 'NGOs, Orphanages, Shelters & Community Kitchens',
      description:
        'Claim nutritious, hot meals within your immediate district radius. Post active meal requirements and track incoming volunteer delivery vectors.',
      badge: 'Nutrition Beneficiary',
      features: [
        'Live surplus food availability feed',
        '1-Click reservation & intake matching',
        'Digital receipt & feedback sign-off',
      ],
      btnText: 'Enter Receiver Workspace',
      icon: <Building2 className="w-5 h-5" />,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30 hover:border-blue-500/70',
      bgHover: 'group-hover:bg-blue-500/10',
      accentBtn: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    {
      id: 'volunteer',
      title: 'Community Volunteer',
      targetAudience: 'Two-Wheeler, Bicycle & E-Rickshaw Dispatchers',
      description:
        'Bridge the last-mile delivery gap. Perform on-site 5-point FSSAI food quality and thermal checks before transporting hot food safely to shelters.',
      badge: 'Decentralized Logistics',
      features: [
        'Geo-matched dispatch assignments',
        'Mandatory 5-point food safety checklist',
        'GPS-guided route execution & verified handover',
      ],
      btnText: 'Enter Volunteer Workspace',
      icon: <Bike className="w-5 h-5" />,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/70',
      bgHover: 'group-hover:bg-emerald-500/10',
      accentBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    {
      id: 'admin',
      title: 'Administrator',
      targetAudience: 'Campus Supervisors, Regulatory & Sustainability Audits',
      description:
        'Inspect immutable circular audit logs, verify chain of custody, monitor environmental carbon metrics, and export institutional proof dossiers.',
      badge: 'Governance & Audit',
      features: [
        'Total CO₂e and water impact aggregation',
        'Immutable timestamped audit logs',
        'Exportable institutional verification dossiers',
      ],
      btnText: 'Enter Administrator Workspace',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30 hover:border-purple-500/70',
      bgHover: 'group-hover:bg-purple-500/10',
      accentBtn: 'bg-purple-600 hover:bg-purple-500 text-white',
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {t.heroBadge1}
            </span>
            <span className="text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3 py-1 rounded-full font-bold">
              {t.heroBadge2}
            </span>
            <span className="text-[11px] font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              {t.heroBadgeAffiliation}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
            {t.heroDesc}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl max-w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              Architected & Engineered by <strong className="text-white">Jigyasu Vatsa</strong> • Sandip University SOCSE & JIGSY INDIA R&D
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* 1. Interactive Concept Flow Demonstrator */}
            <button
              onClick={() => setLifecycleModalOpen(true)}
              className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/50 border border-emerald-400/40 transition-all cursor-pointer"
              title="Launch the 5-stage interactive demonstration showing real-time priority scoring and workflow"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.btnInteractiveDemo}</span>
            </button>

            {/* 1b. Live Workspace Simulation (3s per Tab) */}
            <button
              disabled={isSimulating}
              onClick={() => simulateFullLifecycle()}
              className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-xl transition-all cursor-pointer border ${
                isSimulating
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300 shadow-amber-950/40'
              }`}
              title="Runs live end-to-end simulation switching to each role dashboard for 3 seconds"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isSimulating ? 'Simulating in Workspaces...' : '1-Click Live Workspace Sim'}</span>
            </button>

            {/* 2. Explore Role Workspaces */}
            <button
              onClick={() => navigateToRole('provider')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer border border-slate-700"
            >
              <span>{t.btnExploreWorkspaces}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 3. 100-Sample AI Simulation */}
            <button
              onClick={() => setSimulationModalOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer border border-purple-500/50"
            >
              <Cpu className="w-4 h-4 text-purple-300" />
              <span>{t.btnAiSimulation}</span>
            </button>

            {/* 4. Research Paper */}
            <button
              onClick={() => {
                setPaperModalTab('paper2');
                setPaperModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs sm:text-sm transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>{t.btnReadPaper}</span>
            </button>
          </div>
        </div>

        {/* Impact Bar Card */}
        <div className="mt-8 pt-6 border-t border-slate-800/90 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>{t.mealsServed}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
              {metrics.totalMealsServed.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{t.mealsServedSub}</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>{t.co2Avoided}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
              {metrics.co2EmissionsSavedKg.toLocaleString()} kg
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{t.co2AvoidedSub}</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Droplet className="w-4 h-4 text-blue-400" />
              <span>{t.waterSaved}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-400 font-mono mt-1">
              {(metrics.waterSavedLiters / 1000).toFixed(1)}k L
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{t.waterSavedSub}</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>{t.diversionRate}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-1">
              {metrics.landfillDiversionRatePercent}%
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{t.diversionRateSub}</div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SHOWCASE: WHAT "AI-ASSISTED" MEANS, WHY TITLED "AI-ASSISTED" & WHY THE NEED IN ZERO WASTE FOOD MANAGEMENT */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Ambient lighting glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="space-y-3 relative z-10 border-b border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {t.aiMeaningBadge}
            </span>
            <span className="text-[11px] font-mono text-purple-300 bg-purple-500/20 border border-purple-500/40 px-3 py-1 rounded-full font-bold">
              ICIPAI 2026 Core Rationale
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.aiMeaningTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            {t.aiMeaningSubtitle}
          </p>
        </div>

        {/* PART 1: THE THREE PILLARS OF WHAT "AI-ASSISTED" MEANS */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Part 1: The Three Computational Pillars of "AI-Assisted"</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1 */}
            <div className="bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-all rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-lg">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-bold">
                    O(n log n) Algorithm
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {t.aiPillar1Title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.aiPillar1Desc}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>Zero Hallucinations</span>
                <span className="text-emerald-400 font-semibold">100% Deterministic</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-950/80 border border-purple-500/30 hover:border-purple-500/60 transition-all rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-lg">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800 font-bold">
                    Eq. (1): Q / (Te + ε)
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {t.aiPillar2Title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.aiPillar2Desc}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>Dynamic Re-ranking</span>
                <span className="text-purple-300 font-semibold">Exponential Priority Spike</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-950/80 border border-blue-500/30 hover:border-blue-500/60 transition-all rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-lg">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800 font-bold">
                    Eq. (2): × 1 / (1 + D)
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {t.aiPillar3Title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.aiPillar3Desc}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>Semi-Urban Mobility</span>
                <span className="text-blue-300 font-semibold">&lt;15 Min Transit Corridor</span>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: WHY THE NEED FOR INTRODUCING AI-ASSISTED REDISTRIBUTION */}
        <div className="space-y-4 relative z-10 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Part 2: Why the Urgent Need in Zero Waste Food Management?</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t.aiNeedSectionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {t.aiNeedSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            {/* Need Point 1: FCFS Spoilage Trap */}
            <div className="bg-slate-950/90 border border-rose-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
                  Critical Failure of FCFS
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                {t.aiNeedPoint1Title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.aiNeedPoint1Desc}
              </p>
              <div className="text-[11px] text-rose-300/80 bg-rose-950/40 p-2.5 rounded-xl border border-rose-900/40">
                ⚠️ <strong>Simulated Consequence:</strong> Under traditional FCFS, 32 out of 100 perishable batches spoiled before volunteer arrival.
              </div>
            </div>

            {/* Need Point 2: Thermal Decay Race */}
            <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-amber-400">
                <Flame className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                  Food Danger Zone (5°C–60°C)
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                {t.aiNeedPoint2Title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.aiNeedPoint2Desc}
              </p>
              <div className="text-[11px] text-amber-300/80 bg-amber-950/40 p-2.5 rounded-xl border border-amber-900/40">
                ⏳ <strong>Microbial Reality:</strong> Cooked dal, sabzi, and rice spoil exponentially. Manual phone calls waste 15–20 vital minutes.
              </div>
            </div>

            {/* Need Point 3: Empirical Waste Elimination */}
            <div className="bg-slate-950/90 border border-emerald-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  Verified Empirical Proof
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                {t.aiNeedPoint3Title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.aiNeedPoint3Desc}
              </p>
              <div className="text-[11px] text-emerald-300/80 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-900/40">
                ✅ <strong>Paper II Results:</strong> +28% to 37% WRR improvement, 15% to 25% transit cut, 0% avoidable food spoilage.
              </div>
            </div>
          </div>
        </div>

        {/* PART 3: TABLE 1 DIRECT COMPARISON MATRIX (FCFS vs. AI MODEL) */}
        <div className="space-y-4 relative z-10 pt-4 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span>Part 3: Comparative Proof (Paper II Table 1)</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                {t.aiCompareTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.aiCompareSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSimulationModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-500/50 text-xs font-bold transition-all cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Run Live Simulation</span>
              </button>
              <button
                onClick={() => setLifecycleModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>See 1-Click Concept Flow</span>
              </button>
            </div>
          </div>

          {/* Table 1 Data Matrix */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4 font-bold text-slate-200">System Dimension</th>
                  <th className="py-3 px-4 font-bold text-rose-300">Traditional FCFS Baseline</th>
                  <th className="py-3 px-4 font-bold text-emerald-300">Proposed AI-Assisted Model</th>
                  <th className="py-3 px-4 font-bold text-blue-300">Scientific & Practical Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-sans">
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Queue Allocation Logic</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">First-Come, First-Served (FIFO)</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono font-bold">Dynamic Priority Queue (Eq. 2)</td>
                  <td className="py-3 px-4 text-slate-300">Prioritizes high-mass, urgent batches</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Time & Expiry Sensitivity</td>
                  <td className="py-3 px-4 text-rose-400">Zero (Treated as static goods)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Asymptotic decay: 1 / (Te + ε)</td>
                  <td className="py-3 px-4 text-slate-300">Critical items dynamically jump ahead</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Spatial Distance Penalty</td>
                  <td className="py-3 px-4 text-slate-400">None (Arbitrary geographical assignment)</td>
                  <td className="py-3 px-4 text-blue-400 font-bold">Inverse distance friction: 1 / (1 + D)</td>
                  <td className="py-3 px-4 text-blue-300 font-semibold">15% – 25% lower transit mileage</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Algorithmic Complexity</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">O(n) unranked list</td>
                  <td className="py-3 px-4 text-purple-300 font-mono font-bold">O(n log n) greedy priority sort</td>
                  <td className="py-3 px-4 text-slate-300">Instant mobile edge computation</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Food Spoilage (n=100)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold font-mono">32 batches lost (32%)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold font-mono">0 batches lost (0%)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">100% avoidable spoilage eliminated</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition-colors bg-emerald-950/20">
                  <td className="py-3 px-4 font-semibold text-white">Wastage Reduction Rate (WRR)</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">62.4% baseline</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold font-mono">90.8% (+28.4% absolute)</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">+28% to 37% overall WRR improvement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. PAPER II CORE: AI-ASSISTED PRIORITY OPTIMIZATION & LOCATION-AWARE MATCHING */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient highlights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-300" />
                Paper II Core • ICIPAI 2026 Innovation
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Advances in Intelligent Systems Research (Vol. 211)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI-Assisted Priority-Based Optimization & Algorithmic Allocation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike traditional manual coordination or computationally heavy neural models that require massive servers, Paper II introduces a <strong>computationally efficient O(n log n) dynamic decision function</strong>. It scores food by mass (Q_i), remaining expiry window (T_{'{e,i}'}), and spatial distance (D_i), prioritizing perishable, high-volume batches for immediate decentralized dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => setSimulationModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-white font-bold text-xs shadow-md border border-purple-500/40 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-purple-300" />
              <span>Launch 100-Sample Simulation</span>
            </button>
            <button
              onClick={() => {
                setPaperModalTab('paper2');
                setPaperModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect Equations 1 & 2</span>
            </button>
          </div>
        </div>

        {/* 3 Columns: Equations, Layered Architecture, Empirical Gains */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Priority Mathematical Formulation */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5 font-mono">
              <div className="flex items-center justify-between font-sans">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Equations 1 & 2
                </span>
                <span className="text-[11px] text-slate-400">Section 3.2 – 3.3</span>
              </div>
              <h3 className="font-sans font-bold text-white text-sm">
                Dynamic Urgency Scoring Function
              </h3>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs text-emerald-400 space-y-1">
                <div className="text-[10px] text-slate-400">Basic Model (Eq. 1):</div>
                <div className="font-bold">Priority_i = Q_i / (T_{'{e,i}'} + ε)</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs text-blue-400 space-y-1">
                <div className="text-[10px] text-slate-400">Location-Aware Extension (Eq. 2):</div>
                <div className="font-bold">Priority_i = [Q_i / (T_{'{e,i}'} + ε)] × [1 / (1 + D_i)]</div>
              </div>
              <p className="font-sans text-slate-300 text-xs leading-relaxed">
                Where <strong>Q_i</strong> is quantity (kg), <strong>T_{'{e,i}'}</strong> is remaining shelf life (hours), <strong>ε &gt; 0</strong> ensures numerical stability, and <strong>D_i</strong> is travel distance (km).
              </p>
            </div>
            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Complexity: O(n log n) • Real-time sorting
            </div>
          </div>

          {/* Column 2: Layered System Architecture */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Fig. 1 Architecture
                </span>
                <span className="text-[11px] text-slate-400">Section 3.1</span>
              </div>
              <h3 className="font-bold text-white text-sm">
                3-Layer AI-Assisted Architecture
              </h3>
              <div className="space-y-2 text-xs">
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-500/20 text-center text-[10px] flex items-center justify-center">1</span>
                    <span>Data Acquisition Layer</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Captures food mass, preparation time, expiry, and receiver demand specifications.</div>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-center text-[10px] flex items-center justify-center">2</span>
                    <span>AI Optimization Layer</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Computes priority vectors, executes Algorithm 1, ranks batches and matches nearest volunteers.</div>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-blue-300 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-blue-500/20 text-center text-[10px] flex items-center justify-center">3</span>
                    <span>Application & Feedback Layer</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Volunteer dispatch, 5-point quality check, recipient handover, and closed-loop feedback.</div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Ref: Paper II Section 3.1 & Figure 1
            </div>
          </div>

          {/* Column 3: Section 5 Empirical Gains */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  Section 5 Results
                </span>
                <span className="text-[11px] text-slate-400">n = 100 simulation</span>
              </div>
              <h3 className="font-bold text-white text-sm">
                Empirical Evaluation Highlights
              </h3>
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">• Wastage Reduction (WRR):</span>
                  <span className="text-emerald-400 font-bold">+28% – 37% gain</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">• Travel Optimization (TDO):</span>
                  <span className="text-blue-400 font-bold">15% – 25% cut</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">• Avg Allocation Time (AAT):</span>
                  <span className="text-purple-400 font-bold">Significantly reduced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">• Delivery Efficiency (DE):</span>
                  <span className="text-amber-400 font-bold">Near-zero spoilage</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Demonstrates that even lightweight AI-assisted frameworks achieve dramatic optimization in decentralized, semi-urban resource management systems.
              </p>
            </div>
            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Ref: Paper II Table 1 & Section 5.3
            </div>
          </div>
        </div>
      </section>

      {/* 3. LITERATURE REVIEW & SCIENTIFIC CALCULATION BASELINE */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header with academic literature review badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" />
                M.Tech Dissertation Literature Review & Scientific Formulation
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Peer-Reviewed Standard Multipliers
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Scientific Base: How Water Conserved & CO₂e Avoided Are Calculated
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              These environmental figures are not arbitrary estimates. As part of the literature review conducted for this M.Tech dissertation, our computational formulas adopt globally standardized life-cycle assessment (LCA) benchmarks from <strong>Prof. Arjen Hoekstra (Water Footprint Network)</strong>, the <strong>United Nations Environment Programme (UNEP)</strong>, the <strong>Food and Agriculture Organization (FAO)</strong>, and <strong>IPCC greenhouse gas guidelines</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setProofModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/80 font-bold text-xs shadow transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Audit Proof Dossier</span>
            </button>
          </div>
        </div>

        {/* Detailed 3-Column Literature Review Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Water Footprint Formulation */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Droplet className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60">
                  Hoekstra & WFN Standard
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">
                  1. Virtual Water Footprint (224.7k L)
                </h3>
                <div className="text-[11px] text-blue-400 font-mono mt-0.5">
                  214 kg × 1,050 L/kg = 224,700 Liters Conserved
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Pioneered by <strong>Prof. Arjen Hoekstra</strong> (creator of the Water Footprint concept and founder of the Water Footprint Network) and mapped by the FAO. Producing agricultural staples consumes vast embedded water:
              </p>

              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>• Raw Rice Irrigation:</span>
                  <span className="text-slate-200">~2,500 L / kg</span>
                </div>
                <div className="flex justify-between">
                  <span>• Wheat / Atta Grain:</span>
                  <span className="text-slate-200">~1,500 L / kg</span>
                </div>
                <div className="flex justify-between">
                  <span>• Pulses / Dal Crop:</span>
                  <span className="text-slate-200">~3,800 L / kg</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 text-emerald-400 font-semibold">
                  <span>Cooked Indian Thali Avg:</span>
                  <span>1,050 L / kg</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Rescuing 214 kg directly offsets the need for recipient shelters to cook 500 equivalent replacement meals, conserving 224,700 Liters of fresh agricultural water.
              </p>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Ref: Hoekstra & Mekonnen (WFN / UNESCO-IHE)
            </div>
          </div>

          {/* Card 2: CO2e & Methane Avoidance Formulation */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                  UNEP & FAO LCA Factor
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">
                  2. Methane & Carbon Mitigation (535 kg)
                </h3>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                  214 kg × 2.50 kg CO₂e/kg = 535 kg CO₂e Avoided
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                When cooked food is discarded in unmanaged municipal dump yards, it decomposes in an <strong>anaerobic (oxygen-deprived)</strong> environment, releasing potent <strong>Methane (CH₄)</strong>:
              </p>

              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>• Landfill Methane GWP₁₀₀:</span>
                  <span className="text-amber-400 font-bold">28× higher than CO₂</span>
                </div>
                <div className="flex justify-between">
                  <span>• Short-Term GWP₂₀:</span>
                  <span className="text-amber-400 font-bold">84× higher than CO₂</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 text-emerald-400 font-semibold">
                  <span>UNEP Diversion Factor:</span>
                  <span>2.50 kg CO₂e / kg</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Source: <em>UNEP Food Waste Index Report</em> & <em>FAO Food Wastage Footprint LCA</em>. Diverting 214 kg from landfill prevents 535 kg of greenhouse emissions from reaching the atmosphere.
              </p>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Ref: UNEP Food Waste Index & IPCC WG1 Assessment
            </div>
          </div>

          {/* Card 3: Mass & Portion Equivalency Formulation */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60">
                  Empirical Testbed Weighment
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">
                  3. Portion Equivalency (500 Meals)
                </h3>
                <div className="text-[11px] text-purple-400 font-mono mt-0.5">
                  214 kg ÷ 0.428 kg/meal = 500 Portions (100% Diverted)
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Derived from calibrated digital platform scale weighments across the <strong>Sandip University SOCSE campus testbed</strong> and partner dining kitchens:
              </p>

              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>• Measured Cooked Mass:</span>
                  <span className="text-slate-200">214.0 kg net</span>
                </div>
                <div className="flex justify-between">
                  <span>• Standard Thali Portion:</span>
                  <span className="text-slate-200">~428g (0.428 kg)</span>
                </div>
                <div className="flex justify-between">
                  <span>• Nutritious Portions:</span>
                  <span className="text-slate-200 font-bold">500 complete meals</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 text-emerald-400 font-semibold">
                  <span>Landfill Diversion Rate:</span>
                  <span>100% (Zero Dumps)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Every logged batch was physically inspected via 5-point FSSAI safety checks and verified received by registered community shelters prior to food expiration.
              </p>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Ref: Sandip University Campus Testbed & FSSAI Standards
            </div>
          </div>
        </div>

        {/* Bottom Scientific Consensus Banner */}
        <div className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Academic Literature Synthesis:</strong> The calculation methodology synthesizes established peer-reviewed frameworks from <em>Hoekstra et al. (WFN)</em>, <em>UNEP LCA Index</em>, and <em>FAO Natural Resource Footprint Guidelines</em>.
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 shrink-0 self-start sm:self-auto bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            M.Tech Dissertation • Mr. Jigyasu Vatsa
          </span>
        </div>
      </section>

      {/* 3. ADVANTAGES OF ZERO WASTE FOOD MANAGEMENT */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
            Systemic Impact & Rationale
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.advantagesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t.advantagesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Advantage 1 */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                1. Methane & Carbon Mitigation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When organic food is dumped into open municipal landfills, it decomposes anaerobically and produces methane (<strong className="text-emerald-300">CH₄</strong>)—a greenhouse gas 28x more potent than CO₂. Our platform diverts food at source, directly avoiding 2.5 kg CO₂e for every kilogram redistributed.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-emerald-400">
              Empirical Baseline: 535 kg CO₂e Saved
            </div>
          </div>

          {/* Advantage 2 */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                2. Embedded Water Footprint
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Discarding food also squanders the immense virtual water consumed in irrigation, fertilizer production, transport, and culinary preparation. In India, 1 kg of cooked meal embeds ~1,050 Liters of water. Saving 214 kg preserves 224,700 Liters of fresh water.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-blue-400">
              Empirical Baseline: 224.7k L Conserved
            </div>
          </div>

          {/* Advantage 3 */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                3. Social Nutrition Dignity
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Despite agricultural output, India faces persistent malnutrition in vulnerable demographics. This framework channels rich, freshly cooked meals directly to registered orphanages, old age care homes, and unhoused night shelters with dignity and zero delay.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-amber-400">
              Empirical Baseline: 500 Meals Served
            </div>
          </div>

          {/* Advantage 4 */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-purple-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                4. Verified FSSAI Food Safety
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlike informal donations that risk food poisoning, our workflow mandates a physical 5-point volunteer inspection: sensory aroma, thermal probe verification (&gt;60°C hot holding or &lt;5°C cold chain), safe container seals, and delivery within safe consumption windows.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-purple-400">
              5-Point Quality Safety Protocol
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESEARCH ARTICLE OVERVIEW */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
              Academic Publication Overview
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
              {t.methodologyTitle}
            </h2>
            <div className="text-xs text-slate-400 mt-0.5">
              {t.methodologySubtitle}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setPaperModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full Dossier & Cite</span>
            </button>
            <a
              href="https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all cursor-pointer"
            >
              <span>Google Drive Manuscript</span>
              <ExternalLink className="w-3 h-3 text-blue-400" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-300">
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-mono text-[10px]">1</span>
              <span>The Indian Food Waste Paradox</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              India wastes nearly 74 million tonnes of food annually across households and commercial caterers, while millions suffer nutritional deficiencies. The paper establishes why traditional centralized recycling fails in tier-2/3 regions and how agile web redistribution fills this void.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[10px]">2</span>
              <span>Decentralized Geo-Enabled Architecture</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Details the semi-urban spatial matching algorithm using coordinates in the Madhubani zone. By constraining matching to a 2–6 km volunteer travel radius, warm cooked food is delivered within safe microbial decay limits without cold storage vehicle overhead.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono text-[10px]">3</span>
              <span>Auditable Chain of Custody</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Every transaction from donor upload, volunteer thermal probe sign-off, to receiver digital signature is logged to an immutable ledger. This provides verifiable data for university sustainability certifications, corporate CSR audits, and regulatory inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BRIEF INTRO OF ROLES & INTERACTIVE WORKSPACE GATEWAY */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase bg-blue-500/10 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-bold">
            Interactive Operational Roles
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.operationalRolesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t.operationalRolesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {roleCards.map(c => (
            <div
              key={c.id}
              onClick={() => navigateToRole(c.id)}
              className={`group bg-slate-900 border ${c.borderColor} rounded-2xl p-5 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:scale-[1.02]`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-slate-950 ${c.color} border border-slate-800`}>
                    {c.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {c.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    {c.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {c.targetAudience}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {c.description}
                </p>

                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Core Capabilities:
                  </div>
                  {c.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all ${c.accentBtn}`}
                >
                  <span>{c.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. REGIONAL INFRASTRUCTURE (RADAR & FEATURE SHOWCASE) */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Regional Coordination Radar & Architecture Showcase
          </h2>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Madhubani Semi-Urban Grid Model
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Half: Geo-Enabled Coordination Radar */}
          <div className="w-full h-full min-h-[460px] flex flex-col">
            <GeoMapVisualizer />
          </div>

          {/* Right Half: Custom Introductory Feature Showcase */}
          <div className="w-full h-full min-h-[460px] flex flex-col">
            <IntroductoryFeatureShowcase />
          </div>
        </div>
      </section>

      {/* 7. EMPIRICAL BASELINE & INSTITUTIONAL EVIDENCE BANNER */}
      <section className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">
              Audit & Official Inquiries
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Sandip University Campus Testbed
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Need Institutional Records or Proof for the Baseline?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            All 500 meals, 535 kg CO₂e saved, and 224.7k L water conserved reflect the empirical baseline measured across the academic dining pilot and community shelter network. In strict compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act), all personal stakeholder names, phone numbers, and external facility references are pseudonymized in this public client. Inspect the verification protocol for inquiry procedures.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setProofModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Institutional Proof Dossier</span>
          </button>
        </div>
      </section>
    </div>
  );
};
