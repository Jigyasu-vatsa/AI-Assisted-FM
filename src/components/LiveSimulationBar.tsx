import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  Building2,
  Bike,
  ShieldCheck,
  Award,
  Sparkles,
  FastForward,
  X,
  CheckCircle2,
  ArrowRight,
  Home,
  Clock,
  Layers,
} from 'lucide-react';

export const LiveSimulationBar: React.FC = () => {
  const {
    isSimulating,
    simulationStage,
    simulationStepTitle,
    simulationStepDesc,
    simulationCountdownSec,
    stopSimulation,
    skipToNextSimulationStep,
    setCurrentView,
    role,
    t,
  } = useApp();

  const [progressWidth, setProgressWidth] = useState(100);

  // Sync progress bar with countdown
  useEffect(() => {
    if (!isSimulating) {
      setProgressWidth(100);
      return;
    }
    // Set width according to remaining seconds out of 3
    const pct = Math.max(0, Math.min(100, (simulationCountdownSec / 3) * 100));
    setProgressWidth(pct);
  }, [simulationCountdownSec, isSimulating]);

  if (!isSimulating && simulationStage === 0) return null;

  const stages = [
    {
      num: 1,
      name: '1. Food Provider',
      shortName: '1. Provider',
      role: 'provider' as const,
      icon: <Utensils className="w-3.5 h-3.5" />,
      color: 'amber',
    },
    {
      num: 2,
      name: '2. Food Receiver & AI',
      shortName: '2. Receiver',
      role: 'receiver' as const,
      icon: <Building2 className="w-3.5 h-3.5" />,
      color: 'blue',
    },
    {
      num: 3,
      name: '3. Volunteer Dispatch',
      shortName: '3. Volunteer',
      role: 'volunteer' as const,
      icon: <Bike className="w-3.5 h-3.5" />,
      color: 'emerald',
    },
    {
      num: 4,
      name: '4. FSSAI Safety Check',
      shortName: '4. Safety',
      role: 'volunteer' as const,
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'teal',
    },
    {
      num: 5,
      name: '5. Admin Audit Ledger',
      shortName: '5. Admin',
      role: 'admin' as const,
      icon: <Award className="w-3.5 h-3.5" />,
      color: 'purple',
    },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-slate-950/95 border-b-2 border-emerald-500 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
      {/* Top Progress countdown line */}
      <div className="w-full h-1.5 bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-purple-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 space-y-2.5">
        {/* Row 1: Header + Step Indicator + Countdown + Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Simulation Brand Tag & Active Section Indicator */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Real-Time Simulation Active</span>
            </span>

            <span className="text-xs text-slate-300 font-medium hidden sm:inline">
              Screen switched to:{' '}
              <strong className="text-white capitalize px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                {role === 'provider'
                  ? 'Food Provider Workspace'
                  : role === 'receiver'
                  ? 'Food Receiver (Shelter) Workspace'
                  : role === 'volunteer'
                  ? 'Community Volunteer Workspace'
                  : 'Administrator Governance & Audit Ledger'}
              </strong>
            </span>
          </div>

          {/* Right: Step Timer & Control Actions */}
          <div className="flex items-center gap-2">
            {isSimulating && simulationStage <= 5 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-600/50 text-amber-200 text-xs font-mono font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Next Section in: {simulationCountdownSec || 1}s</span>
              </div>
            )}

            {isSimulating && (
              <button
                onClick={skipToNextSimulationStep}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500 text-xs font-bold transition-all cursor-pointer"
                title="Advance immediately to next step without waiting"
              >
                <FastForward className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xs:inline">Next Step</span>
              </button>
            )}

            <button
              onClick={stopSimulation}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800/60 text-xs font-semibold transition-all cursor-pointer"
              title="Stop simulation and keep currently displayed workspace"
            >
              <X className="w-3.5 h-3.5" />
              <span>{simulationStage >= 6 ? 'Dismiss' : 'Stop'}</span>
            </button>

            {simulationStage >= 6 && (
              <button
                onClick={() => {
                  stopSimulation();
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: 5 Connected Stage Pills */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {stages.map(st => {
            const isCurrent = simulationStage === st.num;
            const isCompleted = simulationStage > st.num || simulationStage >= 6;

            let pillStyle = 'bg-slate-900/80 border-slate-800 text-slate-400';
            if (isCurrent) {
              pillStyle = 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 border-emerald-400 text-white font-bold shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/50 scale-[1.02]';
            } else if (isCompleted) {
              pillStyle = 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 font-medium';
            }

            return (
              <div
                key={st.num}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-2 rounded-xl border text-[11px] sm:text-xs transition-all ${pillStyle}`}
              >
                <span className="shrink-0">{isCompleted && !isCurrent ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : st.icon}</span>
                <span className="hidden md:inline truncate">{st.name}</span>
                <span className="md:hidden truncate">{st.shortName}</span>
              </div>
            );
          })}
        </div>

        {/* Row 3: High-Visibility Step Explanation Banner */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <h3 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>{simulationStepTitle || 'Starting Real-Time Simulation...'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {simulationStepDesc || 'The system will automatically switch through Provider, Receiver, Volunteer, and Admin dashboards, pausing 3 seconds on each step.'}
            </p>
          </div>

          <div className="shrink-0 text-[11px] font-mono text-emerald-400/90 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl self-start sm:self-center">
            {simulationStage === 1 && 'Equation (1): Q / (Te + ε)'}
            {simulationStage === 2 && 'Equation (2): Spatial AI Priority'}
            {simulationStage === 3 && 'Algorithm 1: Nearest Dispatch'}
            {simulationStage === 4 && 'FSSAI: 5-Point Safety Verified'}
            {simulationStage === 5 && 'Immutable Circular Audit Hash'}
            {simulationStage >= 6 && '100% Zero Landfill Verified'}
          </div>
        </div>
      </div>
    </div>
  );
};
