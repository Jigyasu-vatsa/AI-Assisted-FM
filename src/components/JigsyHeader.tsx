import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, SupportedLanguage } from '../types';
import {
  Utensils,
  Building2,
  Bike,
  ShieldCheck,
  FileText,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Leaf,
  Droplet,
  HeartHandshake,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Megaphone,
  Home,
  Cpu,
  Globe2,
} from 'lucide-react';

export const JigsyHeader: React.FC = () => {
  const {
    role,
    setRole,
    currentView,
    setCurrentView,
    navigateToRole,
    metrics,
    soundEnabled,
    toggleSound,
    setPaperModalOpen,
    setPaperModalTab,
    setProofModalOpen,
    setDemoModalOpen,
    setSimulationModalOpen,
    lifecycleModalOpen,
    setLifecycleModalOpen,
    language,
    setLanguage,
    resetAllData,
    simulateFullLifecycle,
    isSimulating,
    simulationStep,
    t,
  } = useApp();

  // Alternates subtitle between Sanskrit motto and English tagline every 3 seconds
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIndex(prev => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const roleConfigs: {
    id: UserRole;
    label: string;
    shortLabel: string;
    sublabel: string;
    icon: React.ReactNode;
    color: string;
    activeBorder: string;
    activeBg: string;
  }[] = [
    {
      id: 'provider',
      label: t.roleProvider,
      shortLabel: 'Provider',
      sublabel: 'Hostels, Banquets, Restaurants',
      icon: <Utensils className="w-3.5 h-3.5" />,
      color: 'text-amber-400',
      activeBorder: 'border-amber-500',
      activeBg: 'bg-amber-500/10 text-amber-300',
    },
    {
      id: 'receiver',
      label: t.roleReceiver,
      shortLabel: 'Receiver',
      sublabel: 'NGOs, Shelters & Kitchens',
      icon: <Building2 className="w-3.5 h-3.5" />,
      color: 'text-blue-400',
      activeBorder: 'border-blue-500',
      activeBg: 'bg-blue-500/10 text-blue-300',
    },
    {
      id: 'volunteer',
      label: t.roleVolunteer,
      shortLabel: 'Volunteer',
      sublabel: 'Decentralized Last-Mile Logistics',
      icon: <Bike className="w-3.5 h-3.5" />,
      color: 'text-emerald-400',
      activeBorder: 'border-emerald-500',
      activeBg: 'bg-emerald-500/10 text-emerald-300',
    },
    {
      id: 'admin',
      label: t.roleAdmin,
      shortLabel: 'Admin',
      sublabel: 'Circular Ledger & Transparency',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'text-purple-400',
      activeBorder: 'border-purple-500',
      activeBg: 'bg-purple-500/10 text-purple-300',
    },
  ];

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="w-full">
      {/* 1. Single Right-to-Left Moving Marquee Ticker (Both notices in ONE row) - Moves up with scroll */}
      <div className="w-full bg-[#1b72c9] text-white overflow-hidden py-1.5 border-b border-blue-400/40 text-xs shadow-sm">
        <div className="animate-marquee flex items-center gap-12 font-medium tracking-wide">
          {/* Notice 1: Academic & Dissertation (Paper II) */}
          <div className="flex items-center gap-2 text-amber-200 shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>Academic & Research Prototype (Paper II):</strong> <em>"AI-assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for Sustainable Resource Management"</em> by <strong>Jigyasu Vatsa</strong> (Sandip University), <strong>Dr. Diwakar Kumar Chaudhary</strong> (Supervisor, Assistant Professor & Dean SOCSE), <strong>Dr. Brajesh Kumar</strong> (Former Dean SOCSE), and <strong>Dr. Gyanvati Jha</strong> (JIGSY R&D Member). Published in <strong>ICIPAI 2026</strong>, <em>Advances in Intelligent Systems Research 211</em> (DOI: 10.2991/978-94-6239-789-7_18). Partially supported by <strong>JIGSY's R&D cell</strong>.
            </span>
          </div>

          <span className="text-blue-300 font-bold shrink-0">✦✦✦</span>

          {/* Notice 2: Corporate Services */}
          <div className="flex items-center gap-2 text-white shrink-0">
            <Megaphone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>JIGSY INDIA:</strong> Software-as-a-Service, IT services, enterprise digital outreach, web development... (Email: <a href="mailto:jigsy25@gmail.com" className="underline font-bold text-amber-200">jigsy25@gmail.com</a> | Helpline: <span className="font-mono text-amber-200">+91 94314 00022</span>)
            </span>
          </div>

          <span className="text-blue-300 font-bold shrink-0">✦✦✦</span>

          {/* Repeat for seamless loop */}
          <div className="flex items-center gap-2 text-amber-200 shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>Academic & Research Prototype (Paper II):</strong> <em>"AI-assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for Sustainable Resource Management"</em> (ICIPAI 2026, Springer/Atlantis Press 211). M.Tech Dissertation of <strong>Mr. Jigyasu Vatsa</strong>, supervised by <strong>Dr. Diwakar Kumar Chaudhary</strong> (Assistant Professor & Dean SOCSE) & <strong>Dr. Brajesh Kumar</strong> (Former Dean SOCSE). Partially supported by <strong>JIGSY's R&D cell</strong>.
            </span>
          </div>

          <span className="text-blue-300 font-bold shrink-0">✦✦✦</span>

          <div className="flex items-center gap-2 text-white shrink-0">
            <Megaphone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>JIGSY INDIA:</strong> Digital sustainability engineering & AI-assisted resource redistribution frameworks. Contact: <span className="font-mono text-amber-200">+91 94314 00022</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. JIGSY Corporate Header Banner - Moves up with scroll naturally */}
      <div className="w-full bg-gradient-to-r from-[#074737] via-[#0d342c] via-[#3a133a] to-[#0e273b] px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: JIGSY Emblem Logo */}
          <a
            href="https://jigsy.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 group"
            title="Jigyasu Integrated Global Services Private Limited"
          >
            <img
              src="/assets/aistudio/image_28536762.png"
              alt="JIGSY Logo"
              className="h-11 sm:h-16 w-auto object-contain drop-shadow-md transition-transform group-hover:scale-105"
            />
          </a>

          {/* Center: Corporate Title & 3-Second Alternating Subtitles */}
          <div className="text-center flex-1 px-1 sm:px-3">
            <h1 className="text-[13px] xs:text-sm sm:text-xl md:text-2xl font-serif font-black tracking-wider uppercase text-[#f5a623] leading-tight drop-shadow-md font-['Times_New_Roman',serif]">
              JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED
            </h1>

            {/* Alternating Subtitle: 3-Second Transition */}
            <div className="h-5 sm:h-6 mt-0.5 sm:mt-1 flex items-center justify-center overflow-hidden">
              <div
                key={subtitleIndex}
                className="text-[11px] sm:text-sm font-semibold tracking-wide transition-all duration-500 animate-in fade-in slide-in-from-bottom-1 font-sans text-white/90 drop-shadow"
              >
                {subtitleIndex === 0 ? (
                  <span className="text-emerald-300 font-medium">जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति</span>
                ) : (
                  <span className="text-amber-200 uppercase tracking-widest font-mono text-[10px] sm:text-xs">
                    JIGYASU INTEGRATED GLOBAL SERVICES with YOU
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Make In India Emblem Logo */}
          <div className="flex-shrink-0">
            <img
              src="/assets/aistudio/image_7e48c122.png"
              alt="Make In India"
              className="h-11 sm:h-16 w-auto object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* 3. STICKY TOP-0 COMMAND BAR: Navigation + Metrics + Role Switcher (Condensed into fewer rows!) */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        {/* Row 1: Brand Navigation & Verified Live Metrics */}
        <div className="w-full bg-white text-slate-900 border-b border-slate-200 px-3 sm:px-6 py-1.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            {/* Brand Title & Project Tag */}
            <div className="flex items-center gap-2.5">
              <a
                href="#top"
                onClick={handleHomeClick}
                className="font-serif font-black text-base sm:text-lg tracking-wider text-slate-950 hover:text-rose-700 transition-colors"
              >
                JIGSY INDIA
              </a>
              <span className="hidden sm:inline-block h-3.5 w-px bg-slate-300" />
              <span className="hidden md:inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Zero Waste Food Management
              </span>
            </div>

            {/* Nav Links: Home, Workspaces, Services, Contact, About Developer */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-700 flex-wrap">
              <a
                href="#top"
                onClick={handleHomeClick}
                className={`transition-colors cursor-pointer font-bold ${
                  currentView === 'home'
                    ? 'text-rose-700 underline decoration-2 underline-offset-4'
                    : 'text-slate-950 hover:text-rose-700'
                }`}
                title="Home Overview: Advantages, Article Contents & Role Gateway"
              >
                {t.navHome}
              </a>
              <button
                onClick={() => navigateToRole('provider')}
                className={`transition-colors cursor-pointer font-bold ${
                  currentView === 'operations'
                    ? 'text-rose-700 underline decoration-2 underline-offset-4'
                    : 'text-slate-950 hover:text-rose-700'
                }`}
              >
                Workspaces
              </button>
              <a
                href="https://jigsy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-700 transition-colors hidden sm:inline"
              >
                {t.navServices}
              </a>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="hover:text-rose-700 transition-colors cursor-pointer hidden sm:inline"
              >
                {t.navContact}
              </a>
              <a
                href="https://jigyasu.jigsy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-rose-700 hover:text-rose-800 bg-rose-50 border border-rose-200 px-2 sm:px-2.5 py-1 rounded-md font-bold transition-all text-xs"
                title="About Lead Developer Mr. Jigyasu Vatsa"
              >
                <span>{t.navAboutDev}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Right: Language Selector + Audio FX + Reset */}
            <div className="flex items-center gap-2">
              {/* Multilingual Selector (EN | हिंदी | मैथिली) */}
              <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-0.5 text-xs font-medium shadow-xs">
                <Globe2 className="w-3.5 h-3.5 text-slate-500 mx-1.5 hidden sm:inline" />
                {(['en', 'hi', 'mai'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-2 py-0.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      language === l
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                    }`}
                    title={l === 'en' ? 'English' : l === 'hi' ? 'Hindi (हिंदी)' : 'Maithili (मैथिली)'}
                  >
                    {l === 'en' ? 'EN' : l === 'hi' ? 'हिंदी' : 'मैथिली'}
                  </button>
                ))}
              </div>

              {/* Audio Toggle */}
              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
                className="p-1.5 rounded-md text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Reset Data */}
              <button
                onClick={() => {
                  if (window.confirm('Reset all demonstration data back to fresh Madhubani seed data?')) {
                    resetAllData();
                  }
                }}
                title="Reset Sample Data"
                className="p-1.5 rounded-md text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Streamlined Single-Row Operations Bar (Role Switcher + How Concept Works + Action Controls) */}
        <div className="w-full bg-slate-900/95 px-3 sm:px-6 py-2 border-b border-slate-800 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs flex-nowrap overflow-x-auto no-scrollbar">
            {/* Role Switcher Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 flex-nowrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                {t.rolesHeading}
              </span>
              {roleConfigs.map(item => {
                const isActive = currentView === 'operations' && role === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateToRole(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap border shrink-0 ${
                      isActive
                        ? `${item.activeBg} ${item.activeBorder} shadow font-semibold ring-1 ring-emerald-500/30`
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span className={item.color}>{item.icon}</span>
                    <span className="hidden md:inline">{item.label}</span>
                    <span className="md:hidden">{item.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons & Concept Demonstrator (Single Row - Proof Dossier Removed) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap">
              {/* How Concept Works (Interactive 1-Click Lifecycle Demonstrator) */}
              <button
                onClick={() => setLifecycleModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-md shadow-emerald-950/40 border border-emerald-400/40 transition-all cursor-pointer whitespace-nowrap shrink-0"
                title="Launch 5-Stage Interactive Closed-Loop Demonstration with live mathematical calculations"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.interactiveDemoBtn}</span>
              </button>

              <button
                onClick={() => setSimulationModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/50 shadow transition-all font-semibold text-xs cursor-pointer whitespace-nowrap shrink-0"
                title="Open Paper II AI Priority Optimization & Controlled Simulation Engine (n=100)"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden lg:inline">{t.aiSimTitle}</span>
                <span className="lg:hidden">AI Sim</span>
              </button>

              <button
                onClick={() => {
                  setPaperModalTab('paper2');
                  setPaperModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500 transition-all font-medium text-xs cursor-pointer whitespace-nowrap shrink-0"
                title="View Research Paper Overview & Citations (ICIPAI 2026)"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline">{t.paper2Title}</span>
                <span className="lg:hidden">Paper II</span>
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs cursor-pointer whitespace-nowrap shrink-0"
                title="Guided Step-by-Step System Tour"
              >
                <span className="hidden xl:inline">{t.walkthroughGuide}</span>
                <span className="xl:hidden">Guide</span>
              </button>

              <button
                disabled={isSimulating}
                onClick={() => simulateFullLifecycle()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSimulating
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Runs an automated live 5-step end-to-end test"
              >
                <Play className="w-3 h-3 text-amber-400" />
                <span>{isSimulating ? 'Simulating...' : '1-Click Test'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Simulation Live Status Banner (if active) */}
        {isSimulating && (
          <div className="bg-amber-950/95 border-b border-amber-600/50 px-4 py-1.5 text-center text-xs text-amber-200 font-medium animate-pulse flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{simulationStep}</span>
          </div>
        )}
      </header>
    </div>
  );
};
