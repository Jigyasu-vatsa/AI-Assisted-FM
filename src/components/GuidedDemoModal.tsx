import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Utensils,
  Building2,
  Bike,
  ShieldCheck,
  CheckCircle2,
  Play,
  ArrowRight,
  Layers,
} from 'lucide-react';

export const GuidedDemoModal: React.FC = () => {
  const { demoModalOpen, setDemoModalOpen, setRole, simulateFullLifecycle, isSimulating } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!demoModalOpen) return null;

  const steps = [
    {
      step: 1,
      role: 'provider' as const,
      title: 'Provider Generates Surplus Listing',
      icon: <Utensils className="w-5 h-5 text-amber-400" />,
      description:
        'A university hostel mess or banquet hall (e.g. Sandip University SOCSE Mess) uploads details of edible surplus food: 40 kg hot lunch meals with safe consumption window of 4 hours.',
      actionText: 'Switch to Food Provider View',
      badge: 'Step 1: Surplus Inflow',
    },
    {
      step: 2,
      role: 'receiver' as const,
      title: 'Geo-Radius Matching & Receiver Claim',
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      description:
        'Nearby receiver NGOs (e.g. Asha Orphanage & Child Care at Ganga Sagar Chowk) browse available listings within safe radius and claim the batch for 90 beneficiaries.',
      actionText: 'Switch to Food Receiver View',
      badge: 'Step 2: Real-Time Allocation',
    },
    {
      step: 3,
      role: 'volunteer' as const,
      title: 'Decentralized Volunteer Dispatch',
      icon: <Bike className="w-5 h-5 text-emerald-400" />,
      description:
        'A local community volunteer (Rajesh Kumar on an electric two-wheeler) receives the dispatch notification and accepts the pickup mission.',
      actionText: 'Switch to Volunteer View',
      badge: 'Step 3: Logistics Backbone',
    },
    {
      step: 4,
      role: 'volunteer' as const,
      title: 'Mandatory Food Safety Quality Inspection',
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      description:
        'Volunteer conducts the 5-point inspection at provider premises: Visual check, olfactory aroma test, thermal check (>60°C for hot food), and packaging integrity.',
      actionText: 'Inspect Volunteer Safety Protocol',
      badge: 'Step 4: Quality Verification',
    },
    {
      step: 5,
      role: 'admin' as const,
      title: 'Delivery Handover & Circular Impact Ledger',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      description:
        'Recipient representative signs digital receipt. The closed-loop is achieved: food waste avoided, CO₂e emissions averted, and full audit trail recorded.',
      actionText: 'Switch to Circular Governance Ledger',
      badge: 'Step 5: Impact Realization',
    },
  ];

  const current = steps[activeStep - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                Research Demonstration Guide
              </span>
              <h2 className="text-base font-bold text-white mt-0.5">
                5-Step Circular Economy Workflow Walkthrough
              </h2>
            </div>
          </div>
          <button
            onClick={() => setDemoModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator Navigation */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
          {steps.map(s => {
            const isSelected = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className="font-mono">{s.step}</span>
                <span className="hidden sm:inline">{s.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Step Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
              {current.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Step {activeStep} of {steps.length}
            </span>
          </div>

          <div className="flex items-start gap-4 bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
              {current.icon}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{current.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{current.description}</p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-400">
            <strong className="text-slate-200">How to Demonstrate:</strong> You can click the button below to switch directly to the corresponding role dashboard, or run the 1-Click Automated Simulation to see every stage trigger sequentially with real-time visual progress and mathematical counters.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            disabled={isSimulating}
            onClick={() => {
              setDemoModalOpen(false);
              simulateFullLifecycle();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Run 1-Click Automated Simulation</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setRole(current.role);
                setDemoModalOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white text-xs cursor-pointer"
            >
              <span>{current.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
