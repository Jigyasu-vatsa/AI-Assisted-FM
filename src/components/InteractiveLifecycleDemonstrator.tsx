import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Utensils,
  Cpu,
  ShieldCheck,
  Bike,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  X,
  Thermometer,
  Eye,
  Clock,
  Package,
  Layers,
  MapPin,
  Leaf,
  Droplet,
  ExternalLink,
} from 'lucide-react';
import { calculateBasicPriority, calculateLocationAwarePriority, getPriorityTier } from '../utils/calculations';
import { soundFx } from '../utils/audio';

export const InteractiveLifecycleDemonstrator: React.FC = () => {
  const {
    lifecycleModalOpen,
    setLifecycleModalOpen,
    createDonation,
    claimDonation,
    acceptVolunteerTask,
    submitQualityCheck,
    markInTransit,
    completeDelivery,
    simulateFullLifecycle,
    t,
    language,
    soundEnabled,
  } = useApp();

  const [activeStage, setActiveStage] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [customKg, setCustomKg] = useState<number>(45);
  const [customHours, setCustomHours] = useState<number>(3.5);
  const [customDistanceKm, setCustomDistanceKm] = useState<number>(1.6);
  const [hasInjectedLive, setHasInjectedLive] = useState<boolean>(false);


  // Auto-play timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStage(prev => {
          if (prev >= 5) {
            setIsPlaying(false);
            return 5;
          }
          return prev + 1;
        });
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleClose = () => {
    soundFx.stopSpeech();
    setIsPlaying(false);
    setLifecycleModalOpen(false);
  };

  if (!lifecycleModalOpen) return null;

  // Real-time calculation based on sliders
  const basicScore = calculateBasicPriority(customKg, customHours, 0.1);
  const locationAwareScore = calculateLocationAwarePriority(customKg, customHours, customDistanceKm, 0.1);
  const tier = getPriorityTier(locationAwareScore);
  const estimatedMeals = Math.round(customKg / 0.42);
  const co2AvoidedKg = Math.round(customKg * 2.5);
  const waterSavedLiters = Math.round(customKg * 1050);

  const stages = [
    {
      num: 1,
      title: t.stage1Title,
      shortTitle: '1. Surplus Logging',
      icon: <Utensils className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500 text-amber-300 bg-amber-500/10',
    },
    {
      num: 2,
      title: t.stage2Title,
      shortTitle: '2. AI Optimization',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500 text-purple-300 bg-purple-500/10',
    },
    {
      num: 3,
      title: t.stage3Title,
      shortTitle: '3. FSSAI Safety',
      icon: <ShieldCheck className="w-4 h-4 text-blue-400" />,
      color: 'border-blue-500 text-blue-300 bg-blue-500/10',
    },
    {
      num: 4,
      title: t.stage4Title,
      shortTitle: '4. Geo-Dispatch',
      icon: <Bike className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500 text-emerald-300 bg-emerald-500/10',
    },
    {
      num: 5,
      title: t.stage5Title,
      shortTitle: '5. Impact Handover',
      icon: <HeartHandshake className="w-4 h-4 text-rose-400" />,
      color: 'border-rose-500 text-rose-300 bg-rose-500/10',
    },
  ];

  const handleInjectLiveApp = () => {
    const id = createDonation({
      title: `Demonstrated Batch: Paneer Masala & Jeera Rice (${customKg} kg)`,
      category: 'Cooked Meals',
      dietary: 'Vegetarian',
      condition: 'Hot & Fresh',
      quantityKg: customKg,
      servings: estimatedMeals,
      packaging: 'Insulated Stainless Steel Carriers',
      prepTimestamp: new Date().toISOString(),
      expiryTimestamp: new Date(Date.now() + customHours * 60 * 60 * 1000).toISOString(),
      storageTempCelsius: 64,
      specialInstructions: 'Demonstration batch: Sandip University Campus Dining testbed.',
      providerId: 'prov-sandip-mess-demo',
      providerName: 'Sandip University Campus Dining Mess',
      providerType: 'Hostel Mess',
      location: {
        lat: 26.3645,
        lng: 86.0592,
        address: 'Sandip University, Sijoul, Madhubani',
        zone: 'Campus Testbed Zone',
      },
      contactPhone: '+91 94314 00022',
    });

    claimDonation(id, 'rec-asha', 'Asha Orphanage & Child Care Center');
    acceptVolunteerTask(id, 'vol-1');
    submitQualityCheck(id, {
      inspectedAt: new Date().toISOString(),
      inspectedByVolunteerName: 'Volunteer Dispatcher (EV Fleet)',
      passedAll: true,
      visualCheck: true,
      smellCheck: true,
      temperatureCheck: true,
      packagingIntegrity: true,
      timeWindowValid: true,
      measuredTempCelsius: 64,
      notes: 'Demonstrated via Interactive 5-Stage Concept Walkthrough.',
    });
    markInTransit(id);
    completeDelivery(id, 'Delivered fresh nutritious dinner to 100+ children at shelter.', 'Shelter Director');

    setHasInjectedLive(true);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-purple-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  Interactive Concept Tour
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  5-Stage Circular Economy Demonstration
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {t.howItWorksTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleClose();
                simulateFullLifecycle();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-950/40 border border-amber-300 transition-all cursor-pointer"
              title="Switch automatically through Provider, Receiver, Volunteer, and Admin workspaces pausing 3 seconds on each step"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">⚡ Live Workspace Sim (3s / Tab)</span>
              <span className="sm:hidden">⚡ Live Sim</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? t.pause : t.autoPlay}</span>
            </button>

            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5-Stage Step Navigation Pills */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between gap-2 min-w-[500px]">
            {stages.map(s => {
              const isActive = activeStage === s.num;
              const isPast = activeStage > s.num;

              return (
                <button
                  key={s.num}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStage(s.num);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? `${s.color} shadow-md`
                      : isPast
                      ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:border-slate-700'
                      : 'bg-slate-900/60 border-slate-800/60 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {isPast ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : s.icon}
                  <span className="whitespace-nowrap">{s.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body / Active Stage View */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-300 flex-1">
          {/* STAGE 1: SURPLUS GENERATED */}
          {activeStage === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-amber-950/30 border border-amber-500/40 p-4 rounded-2xl flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                    Stage 1 / 5: Surplus Originator
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Surplus Generated at Sandip University Dining Facility
                  </h3>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    Following student lunch service, pristine cooked surplus ({customKg} kg) is packed in thermal containers. The dining supervisor broadcasts the batch to prevent food waste.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                  <Utensils className="w-8 h-8" />
                </div>
              </div>

              {/* Interactive Simulation Sliders to test how AI Reacts */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Interactive Inputs (Test How Urgency Score Reacts):</span>
                  <span className="text-emerald-400 font-mono">Equation 1 Formula</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Food Mass Q (kg):</span>
                      <strong className="text-amber-400 font-mono">{customKg} kg (~{estimatedMeals} meals)</strong>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="150"
                      step="5"
                      value={customKg}
                      onChange={e => setCustomKg(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Remaining Expiry Window Te:</span>
                      <strong className="text-rose-400 font-mono">{customHours} Hours Safe</strong>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={customHours}
                      onChange={e => setCustomHours(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Equation (1) Live Evaluation */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-2 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400">Paper II Eq. 1: </span>
                    <span className="text-slate-200">Priority = Q / (Te + 0.1)</span>
                  </div>
                  <div className="text-amber-300 font-bold text-sm">
                    Basic Priority: {basicScore.toFixed(2)} pts
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 2: AI OPTIMIZATION & ALGORITHM 1 */}
          {activeStage === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-purple-950/30 border border-purple-500/40 p-4 rounded-2xl flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                    Stage 2 / 5: AI Optimization Core (ICIPAI 2026)
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Algorithm 1 Evaluates Urgency & Matches Nearest Volunteer
                  </h3>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    Instead of a naive First-Come-First-Served (FCFS) queue, Algorithm 1 sorts candidates in O(n log n) time and penalizes travel distance using Equation (2).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                  <Cpu className="w-8 h-8" />
                </div>
              </div>

              {/* Spatial distance adjustment */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Distance to Nearest Shelter D (km):</span>
                  <strong className="text-blue-400 font-mono">{customDistanceKm} km (Asha Orphanage)</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={customDistanceKm}
                  onChange={e => setCustomDistanceKm(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 font-mono">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                    <span className="text-slate-500 block text-[10px]">Mass (Q)</span>
                    <strong className="text-white text-sm">{customKg} kg</strong>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                    <span className="text-slate-500 block text-[10px]">Window (Te)</span>
                    <strong className="text-rose-400 text-sm">{customHours}h</strong>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                    <span className="text-slate-500 block text-[10px]">Distance (D)</span>
                    <strong className="text-blue-400 text-sm">{customDistanceKm} km</strong>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-purple-500/50 text-center bg-purple-950/20">
                    <span className="text-purple-300 block text-[10px]">Eq 2 Score</span>
                    <strong className="text-purple-300 text-sm">{locationAwareScore.toFixed(2)} ({tier})</strong>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-300 flex items-center justify-between text-xs">
                  <span>Match Assigned: Volunteer V-8802 (Electric Two-Wheeler, 0.8 km away)</span>
                  <span className="font-mono text-[10px] bg-emerald-900/60 px-2 py-0.5 rounded">O(n log n) Match</span>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: VOLUNTEER FSSAI SAFETY VERIFICATION */}
          {activeStage === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-blue-950/30 border border-blue-500/40 p-4 rounded-2xl flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold">
                    Stage 3 / 5: Food Safety Protocol
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Mandatory 5-Point Volunteer Physical Quality Inspection
                  </h3>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    Prior to dispatch, the community volunteer performs an on-site thermal probe and sensory checklist to ensure zero risk of food contamination.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-300 shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>

              {/* 5-Point Quality Checklist Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-xs">1. Thermal Probe Temperature Test</div>
                    <div className="text-[11px] text-slate-400">Measured 64.2°C (PASS: Safe &gt; 60°C hot holding)</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-xs">2. Sensory & Olfactory Aroma Check</div>
                    <div className="text-[11px] text-slate-400">Fresh aroma, zero sourness or microbial fermentation</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-xs">3. Visual Cleanliness & Oil Integrity</div>
                    <div className="text-[11px] text-slate-400">Standard consistency, clean culinary prep area</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-xs">4. Packaging & Seal Integrity</div>
                    <div className="text-[11px] text-slate-400">Airtight stainless steel thermal carriers sealed</div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] flex items-center justify-between text-slate-400">
                <span>5. Safe Window Validity: 3.5 Hours remaining (Sufficient for 15-minute transit)</span>
                <span className="text-emerald-400 font-bold">FSSAI Protocol VERIFIED ✓</span>
              </div>
            </div>
          )}

          {/* STAGE 4: GEO-DISPATCH & TRANSIT */}
          {activeStage === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-emerald-950/30 border border-emerald-500/40 p-4 rounded-2xl flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    Stage 4 / 5: Last-Mile Delivery
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Electric Two-Wheeler Transit Across Madhubani Semi-Urban Grid
                  </h3>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    By restricting dispatch to the 2–6 km semi-urban safe transit radius, hot food reaches recipients in 14 minutes with zero microbial risk and minimal carbon footprint.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 shrink-0">
                  <Bike className="w-8 h-8" />
                </div>
              </div>

              {/* Transit Map / Visual Vector */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-amber-400">Origin: Sandip University Campus Mess</span>
                  <span className="text-slate-500">─── 1.6 km (14 min) ───▶</span>
                  <span className="text-blue-400">Dest: Asha Orphanage Shelter</span>
                </div>

                <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-500 to-blue-500 w-3/4 animate-pulse rounded-full" />
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] pt-1">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Volunteer Vehicle</span>
                    <strong className="text-white">Electric 2-Wheeler</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Transit Duration</span>
                    <strong className="text-emerald-400">14 Minutes</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Internal Temp Drop</span>
                    <strong className="text-amber-400">&lt; 1.5°C</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 5: SHELTER HANDOVER & CIRCULAR IMPACT */}
          {activeStage === 5 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-rose-950/30 border border-rose-500/40 p-4 rounded-2xl flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                    Stage 5 / 5: Circular Loop Complete
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Verified Intake at Shelter & Immutable Impact Generated
                  </h3>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    Shelter supervisor verifies food temperature, confirms 100+ children served dinner, and issues digital QR sign-off. The circular loop is complete!
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 shrink-0">
                  <HeartHandshake className="w-8 h-8" />
                </div>
              </div>

              {/* Real-time Environmental & Nutritional Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-emerald-500/30 text-center">
                  <Utensils className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-white font-mono">{estimatedMeals} Meals</div>
                  <div className="text-[10px] text-slate-400">Nutritious Portions Served</div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-emerald-500/30 text-center">
                  <Leaf className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-emerald-400 font-mono">+{co2AvoidedKg} kg</div>
                  <div className="text-[10px] text-slate-400">Methane CO₂e Avoided</div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-blue-500/30 text-center">
                  <Droplet className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-blue-400 font-mono">+{waterSavedLiters.toLocaleString()} L</div>
                  <div className="text-[10px] text-slate-400">Virtual Water Conserved</div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-purple-500/30 text-center">
                  <ShieldCheck className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-purple-300 font-mono">100%</div>
                  <div className="text-[10px] text-slate-400">Landfill Diversion</div>
                </div>
              </div>

              {/* Action: Inject into live app */}
              <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-white text-xs">Want to see this reflected in the live app?</div>
                  <div className="text-[11px] text-slate-400">
                    Click to add this demonstration run into the live operational dashboards, audit ledger, and header counters.
                  </div>
                </div>

                <button
                  disabled={hasInjectedLive}
                  onClick={handleInjectLiveApp}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    hasInjectedLive
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{hasInjectedLive ? 'Added to Live App ✓' : 'Add to Live System & Counters'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            disabled={activeStage === 1}
            onClick={() => {
              setIsPlaying(false);
              setActiveStage(prev => Math.max(1, prev - 1));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.back}</span>
          </button>

          <div className="text-[11px] text-slate-500 font-mono">
            Stage {activeStage} of 5 • {stages[activeStage - 1].shortTitle}
          </div>

          <button
            disabled={activeStage === 5}
            onClick={() => {
              setIsPlaying(false);
              setActiveStage(prev => Math.min(5, prev + 1));
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <span>{t.next}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
