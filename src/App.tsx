import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { JigsyHeader } from './components/JigsyHeader';
import { JigsyFooter } from './components/JigsyFooter';
import { HomePageView } from './components/HomePageView';
import { GeoMapVisualizer } from './components/GeoMapVisualizer';
import { IntroductoryFeatureShowcase } from './components/IntroductoryFeatureShowcase';
import { ProviderDashboard } from './components/ProviderDashboard';
import { ReceiverDashboard } from './components/ReceiverDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ResearchPaperModal } from './components/ResearchPaperModal';
import { GuidedDemoModal } from './components/GuidedDemoModal';
import { DonationDetailModal } from './components/DonationDetailModal';
import { EmpiricalProofModal } from './components/EmpiricalProofModal';
import { OptimizationSimulationModal } from './components/OptimizationSimulationModal';
import { InteractiveLifecycleDemonstrator } from './components/InteractiveLifecycleDemonstrator';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { LiveSimulationBar } from './components/LiveSimulationBar';
import { Home, ArrowLeft } from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, currentView, setCurrentView } = useApp();
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. Official JIGSY Header (Marquee Notice + Corporate Banner scroll with page; only Nav sticks) */}
      <JigsyHeader />

      {/* 2. Real-Time Full-Lifecycle Simulation Command Bar (Sticky during simulation with live countdown) */}
      <LiveSimulationBar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-10">
        {/* VIEW 1: HOME PAGE (Introducing Advantages, Article Contents, and Brief Intro of Roles) */}
        {currentView === 'home' ? (
          <HomePageView />
        ) : (
          /* VIEW 2: OPERATIONS WORKSPACE (Specific Role Dashboards) */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Navigation Breadcrumb to return to Home Overview */}
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl">
              <button
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home Overview & Introduction</span>
              </button>

              <div className="text-xs text-slate-400 font-mono hidden sm:inline">
                Active Workspace: <strong className="text-white capitalize">{role}</strong>
              </div>
            </div>

            {/* Role Operations Dashboard */}
            <section className="space-y-4">
              {role === 'provider' && <ProviderDashboard />}
              {role === 'receiver' && <ReceiverDashboard />}
              {role === 'volunteer' && <VolunteerDashboard />}
              {role === 'admin' && <AdminDashboard />}
            </section>

            {/* Regional Infrastructure & Architectural Showcase */}
            <section className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Regional Infrastructure & Architectural Showcase
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
          </div>
        )}
      </main>

      {/* Modals */}
      <InteractiveLifecycleDemonstrator />
      <ResearchPaperModal />
      <GuidedDemoModal />
      <DonationDetailModal />
      <EmpiricalProofModal />
      <OptimizationSimulationModal />
      <LegalModals activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />

      {/* Official JIGSY Footer with Credentials, Registration & Links */}
      <JigsyFooter onOpenLegal={type => setActiveLegalModal(type)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
