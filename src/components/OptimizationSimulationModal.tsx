import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  Sparkles,
  Play,
  RotateCcw,
  Sliders,
  TrendingUp,
  Table as TableIcon,
  CheckCircle2,
  X,
  FileText,
  Clock,
  Compass,
  Zap,
  Activity,
  ArrowRight,
  Info,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';
import {
  calculateBasicPriority,
  calculateLocationAwarePriority,
  getPriorityTier,
  DEFAULT_EPSILON,
} from '../utils/calculations';
import { soundFx } from '../utils/audio';

export const OptimizationSimulationModal: React.FC = () => {
  const {
    simulationModalOpen,
    setSimulationModalOpen,
    latestSimulationResult,
    runSimulation,
    latestAlgorithm1Result,
    executeAlgorithm1,
    dispatchBatchWithAlgorithm1,
    setPaperModalOpen,
    setPaperModalTab,
    t,
    language,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'simulation' | 'algorithm' | 'sandbox' | 'table1'>('simulation');

  // Sandbox state
  const [sandboxQ, setSandboxQ] = useState<number>(45);
  const [sandboxTe, setSandboxTe] = useState<number>(2.5);
  const [sandboxD, setSandboxD] = useState<number>(3.2);
  const [sandboxEps, setSandboxEps] = useState<number>(0.1);

  // Simulation controls
  const [simSampleSize, setSimSampleSize] = useState<number>(100);
  const [expirySensitivity, setExpirySensitivity] = useState<number>(1.0);
  const [distanceDispersion, setDistanceDispersion] = useState<number>(1.0);
  const [isRerunning, setIsRerunning] = useState(false);
  const [datasetFilter, setDatasetFilter] = useState<'all' | 'saved_by_priority' | 'spoiled_both'>('all');

  if (!simulationModalOpen) return null;

  // Sandbox computations
  const sandboxBasic = calculateBasicPriority(sandboxQ, sandboxTe, sandboxEps);
  const sandboxScore = calculateLocationAwarePriority(sandboxQ, sandboxTe, sandboxD, sandboxEps);
  const sandboxTier = getPriorityTier(sandboxScore);

  const handleRerunSimulation = () => {
    setIsRerunning(true);
    setTimeout(() => {
      runSimulation(simSampleSize, expirySensitivity, distanceDispersion);
      setIsRerunning(false);
      soundFx.playSuccess();
    }, 300);
  };

  const filteredDataset = latestSimulationResult.dataset.filter(item => {
    if (datasetFilter === 'saved_by_priority') {
      return item.allocatedUnderPriority && item.spoiledUnderFcfs;
    }
    if (datasetFilter === 'spoiled_both') {
      return item.spoiledUnderPriority && item.spoiledUnderFcfs;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {t.simModalSubtitle}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">Section 3 & Section 5</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {t.simModalTitle}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setSimulationModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'simulation'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{t.simTab100}</span>
            </button>
            <button
              onClick={() => setActiveTab('algorithm')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'algorithm'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Algorithm 1 Live Runner (Sec 3.5)</span>
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.simTabSandbox}</span>
            </button>
            <button
              onClick={() => setActiveTab('table1')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'table1'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{t.simTabTable1}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSimulationModalOpen(false);
                setPaperModalTab('paper2');
                setPaperModalOpen(true);
              }}
              className="text-[11px] font-mono text-emerald-300 hover:text-white bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer hover:bg-emerald-900"
              title="Open full Paper II text and academic citations"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.readPaperBtn}</span>
            </button>
            <a
              href="/assets/aistudio/AI-assisted_Smart_Food_Redistribution_System_with_Priority-Based_Optimization_A_Circular_Economy_Framework_for_Sustainable_Resource_Management_d3a3a383.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-blue-300 hover:text-white bg-blue-950/80 border border-blue-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer hover:bg-blue-900"
              title="Open the official attached conference paper PDF"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.viewPaperPdfBtn}</span>
            </a>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* TAB 1: SECTION 5 SIMULATION */}
          {activeTab === 'simulation' && (
            <div className="space-y-6">
              {/* Paper Reference Introduction */}
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Controlled Simulation Results: Proposed Model vs Traditional FCFS (Section 5)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Synthetic n = {latestSimulationResult.sampleSize} Entries
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Evaluates the performance of the proposed priority-based optimization model against a baseline traditional system (where allocations occur on a First-Come-First-Served basis without prioritization). The synthetic dataset emulates semi-urban distributions of varying quantities (Q_i), remaining expiry times (T_{'{e,i}'}), and distances (D_i).
                </p>
              </div>

              {/* 4 Key Evaluation Metrics Cards (Section 5.2 & 5.3) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Metric 1: Wastage Reduction Rate (WRR) */}
                <div className="bg-slate-950/90 border border-emerald-500/30 p-4 rounded-2xl relative overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Wastage Reduction (WRR)
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-emerald-400 font-mono">
                      +{latestSimulationResult.wrrImprovementPercent}%
                    </span>
                    <span className="text-[11px] text-slate-400">gain</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 space-y-0.5 border-t border-slate-800/80 pt-1.5 font-mono">
                    <div className="flex justify-between">
                      <span>• Proposed AI:</span>
                      <span className="text-emerald-300 font-bold">{latestSimulationResult.priorityWastageReductionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Baseline FCFS:</span>
                      <span className="text-slate-400">{latestSimulationResult.fcfsWastageReductionRate}%</span>
                    </div>
                  </div>
                  <div className="mt-1 text-[9px] text-emerald-400/90 font-medium">
                    Paper II reported: 28–37% improvement
                  </div>
                </div>

                {/* Metric 2: Travel Distance Optimization (TDO) */}
                <div className="bg-slate-950/90 border border-blue-500/30 p-4 rounded-2xl relative overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Travel Distance (TDO)
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-blue-400 font-mono">
                      -{latestSimulationResult.travelDistanceOptimizationPercent}%
                    </span>
                    <span className="text-[11px] text-slate-400">travel cut</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 space-y-0.5 border-t border-slate-800/80 pt-1.5 font-mono">
                    <div className="flex justify-between">
                      <span>• Proposed Avg:</span>
                      <span className="text-blue-300 font-bold">{latestSimulationResult.priorityAvgDistanceKm} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Baseline Avg:</span>
                      <span className="text-slate-400">{latestSimulationResult.fcfsAvgDistanceKm} km</span>
                    </div>
                  </div>
                  <div className="mt-1 text-[9px] text-blue-400/90 font-medium">
                    Paper II reported: 15–25% reduction
                  </div>
                </div>

                {/* Metric 3: Average Allocation Time (AAT) */}
                <div className="bg-slate-950/90 border border-purple-500/30 p-4 rounded-2xl relative overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Avg Allocation Time (AAT)
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-purple-400 font-mono">
                      -{latestSimulationResult.aatReductionPercent}%
                    </span>
                    <span className="text-[11px] text-slate-400">faster</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 space-y-0.5 border-t border-slate-800/80 pt-1.5 font-mono">
                    <div className="flex justify-between">
                      <span>• Proposed AI:</span>
                      <span className="text-purple-300 font-bold">{latestSimulationResult.priorityAvgAllocationTimeMin} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Baseline FCFS:</span>
                      <span className="text-slate-400">{latestSimulationResult.fcfsAvgAllocationTimeMin} min</span>
                    </div>
                  </div>
                  <div className="mt-1 text-[9px] text-purple-400/90 font-medium">
                    Automated priority dispatch
                  </div>
                </div>

                {/* Metric 4: Delivery Efficiency (DE) */}
                <div className="bg-slate-950/90 border border-amber-500/30 p-4 rounded-2xl relative overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Delivery Efficiency (DE)
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {latestSimulationResult.priorityDeliveryEfficiency}%
                    </span>
                    <span className="text-[11px] text-slate-400">success</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 space-y-0.5 border-t border-slate-800/80 pt-1.5 font-mono">
                    <div className="flex justify-between">
                      <span>• Proposed AI:</span>
                      <span className="text-amber-300 font-bold">{latestSimulationResult.priorityDeliveryEfficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Baseline FCFS:</span>
                      <span className="text-slate-400">{latestSimulationResult.fcfsDeliveryEfficiency}%</span>
                    </div>
                  </div>
                  <div className="mt-1 text-[9px] text-amber-400/90 font-medium">
                    Assigned to closer volunteers
                  </div>
                </div>
              </div>

              {/* Sensitivity Analysis Controls (Section 5.6) */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      Section 5.6 Sensitivity Analysis & Simulation Controls
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Adjust environmental variations to test how the model behaves under high perishability or sparse geography.
                    </p>
                  </div>
                  <button
                    onClick={handleRerunSimulation}
                    disabled={isRerunning}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isRerunning ? 'animate-spin' : ''}`} />
                    <span>{isRerunning ? t.simRunning : t.simRunBtn}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-300">Expiry Urgency Factor (Perishability):</span>
                      <span className="text-emerald-400 font-bold">{expirySensitivity.toFixed(1)}×</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={expirySensitivity}
                      onChange={e => setExpirySensitivity(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0.5× (Extended Shelf Life)</span>
                      <span>2.5× (Fast Spoilage Risk)</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-300">Spatial Dispersion Factor (Distance):</span>
                      <span className="text-blue-400 font-bold">{distanceDispersion.toFixed(1)}×</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={distanceDispersion}
                      onChange={e => setDistanceDispersion(parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0.5× (Dense Town Cluster)</span>
                      <span>2.0× (Sparse Rural Grid)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Synthetic Dataset Inspector Table */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <TableIcon className="w-4 h-4 text-slate-400" />
                    Synthetic Dataset Inspector (Sample of {filteredDataset.length} entries)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Filter:</span>
                    <select
                      value={datasetFilter}
                      onChange={e => setDatasetFilter(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                    >
                      <option value="all">All 100 Entries</option>
                      <option value="saved_by_priority">Rescued by Priority (Spoiled in FCFS)</option>
                      <option value="spoiled_both">Unsalvageable in Both</option>
                    </select>
                  </div>
                </div>

                <div className="border border-slate-800 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-950 text-[10px] font-mono uppercase text-slate-400 sticky top-0 border-b border-slate-800">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Item Type</th>
                        <th className="p-2">Q_i (kg)</th>
                        <th className="p-2">T_{'{e,i}'} (h)</th>
                        <th className="p-2">D_i (km)</th>
                        <th className="p-2 text-emerald-400">Priority Score</th>
                        <th className="p-2">FCFS Outcome</th>
                        <th className="p-2 text-emerald-300">Proposed Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {filteredDataset.slice(0, 20).map(item => (
                        <tr key={item.id} className="hover:bg-slate-800/40">
                          <td className="p-2 text-slate-400">{item.id}</td>
                          <td className="p-2 font-sans text-slate-200">{item.itemType}</td>
                          <td className="p-2 text-white font-bold">{item.quantityKg}</td>
                          <td className="p-2 text-amber-300">{item.remainingExpiryHours}</td>
                          <td className="p-2 text-blue-300">{item.distanceKm}</td>
                          <td className="p-2 text-emerald-400 font-bold">{item.priorityScore}</td>
                          <td className="p-2">
                            {item.spoiledUnderFcfs ? (
                              <span className="text-red-400 bg-red-950/60 border border-red-800/60 px-1.5 py-0.5 rounded text-[10px]">
                                Spoiled (Delayed)
                              </span>
                            ) : (
                              <span className="text-emerald-400 text-[10px]">Delivered</span>
                            )}
                          </td>
                          <td className="p-2">
                            {item.allocatedUnderPriority ? (
                              <span className="text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded text-[10px]">
                                Rescued (#{item.priorityRank})
                              </span>
                            ) : (
                              <span className="text-red-400 text-[10px]">Spoiled</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-[10px] text-slate-500 font-mono text-right">
                  Showing first 20 records of synthetic distribution (Paper II, Section 5.1)
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ALGORITHM 1 LIVE RUNNER */}
          {activeTab === 'algorithm' && (
            <div className="space-y-6">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    Algorithm 1: Priority-Based Food Allocation (Section 3.5)
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                    Complexity: O(n log n)
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Evaluates active surplus candidates in real-time, computes urgency and spatial weights, sorts candidates in $O(n \log n)$ time, and assigns the highest priority batches to nearest available volunteers.
                </p>
              </div>

              {/* Execution Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                <div>
                  <div className="font-bold text-white text-xs">
                    Candidates Evaluated: {latestAlgorithm1Result?.totalCandidates || 0} batches
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Compute Latency: {latestAlgorithm1Result?.executionTimeMs || 0} ms • Stable Sort O(n log n)
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => executeAlgorithm1(DEFAULT_EPSILON)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-all border border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-evaluate Ranking</span>
                  </button>

                  <button
                    onClick={() => {
                      const count = dispatchBatchWithAlgorithm1();
                      alert(`Algorithm 1 executed: Successfully dispatched ${count} prioritized batches to nearest community volunteers.`);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-all shadow-md"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Auto-Dispatch Top Allocations</span>
                  </button>
                </div>
              </div>

              {/* Algorithm Step-by-Step Breakdown */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">
                  Algorithm 1 Execution Trace (Paper II, Section 3.5)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {latestAlgorithm1Result?.rankedAllocations.map(alloc => (
                    <div
                      key={alloc.donationId}
                      className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
                            #{alloc.rank}
                          </span>
                          <span className="text-xs font-mono text-white font-bold">{alloc.donationId}</span>
                        </div>
                        <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                          Priority: {alloc.priorityScore}
                        </span>
                      </div>

                      <div className="font-medium text-white text-xs">{alloc.donationTitle}</div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-2 rounded-xl font-mono text-[10px]">
                        <div>
                          <div className="text-slate-500">Quantity Q_i</div>
                          <div className="text-white font-bold">{alloc.quantityKg} kg</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Expiry T_{'{e,i}'}</div>
                          <div className="text-amber-400 font-bold">{alloc.remainingExpiryHours}h left</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Distance D_i</div>
                          <div className="text-blue-400 font-bold">{alloc.distanceKm} km</div>
                        </div>
                      </div>

                      <div className="border-t border-slate-800/80 pt-2 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Assigned Volunteer:</span>
                          <span className="text-emerald-300 font-semibold">{alloc.assignedVolunteerName}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Matched Receiver:</span>
                          <span className="text-blue-300 font-semibold">{alloc.targetReceiverName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FORMULA SANDBOX */}
          {activeTab === 'sandbox' && (
            <div className="space-y-6">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  Interactive Priority Formulation Sandbox (Equations 1 & 2)
                </h3>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Test how food quantity (Q_i), remaining expiry time (T_{'{e,i}'}), and spatial distance (D_i) influence the calculated priority score. Notice how shorter shelf life sharply increases urgency, while larger distances penalize logistical feasibility.
                </p>
              </div>

              {/* Equations Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 font-mono">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">
                    Equation (1): Basic Priority Score
                  </div>
                  <div className="text-sm font-bold text-emerald-400">
                    Priority_i = Q_i / (T_{'{e,i}'} + ε)
                  </div>
                  <div className="text-[11px] text-slate-300 pt-1">
                    = {sandboxQ} / ({sandboxTe} + {sandboxEps}) = <strong className="text-white">{sandboxBasic}</strong>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 font-mono">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">
                    Equation (2): Location-Aware Priority Extension
                  </div>
                  <div className="text-sm font-bold text-blue-400">
                    Priority_i = [Q_i / (T_{'{e,i}'} + ε)] × [1 / (1 + D_i)]
                  </div>
                  <div className="text-[11px] text-slate-300 pt-1">
                    = {sandboxBasic} × (1 / (1 + {sandboxD})) = <strong className="text-emerald-300 text-base">{sandboxScore}</strong>
                  </div>
                </div>
              </div>

              {/* Reactive Live Sliders */}
              <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
                {/* Slider 1: Quantity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Food Quantity Q_i (Mass in kg):</span>
                    <span className="text-emerald-400 font-bold">{sandboxQ} kg ({Math.round(sandboxQ * 2.2)} meals)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="1"
                    value={sandboxQ}
                    onChange={e => setSandboxQ(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>5 kg (Small batch)</span>
                    <span>75 kg</span>
                    <span>150 kg (Large banquet feast)</span>
                  </div>
                </div>

                {/* Slider 2: Remaining Expiry Time */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Remaining Expiry Time T_{'{e,i}'} (Hours):</span>
                    <span className={`font-bold ${sandboxTe < 2 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
                      {sandboxTe.toFixed(1)} Hours {sandboxTe < 2 ? '(URGENT SPOILAGE RISK)' : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="12"
                    step="0.1"
                    value={sandboxTe}
                    onChange={e => setSandboxTe(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0.1 h (Imminent Spoilage)</span>
                    <span>4.0 h (Cooked Meal Baseline)</span>
                    <span>12.0 h (Dry/Bakery)</span>
                  </div>
                </div>

                {/* Slider 3: Distance */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Distance D_i (km to Volunteer / Shelter):</span>
                    <span className="text-blue-400 font-bold">{sandboxD.toFixed(1)} km</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="15"
                    step="0.1"
                    value={sandboxD}
                    onChange={e => setSandboxD(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0.2 km (Same Neighborhood)</span>
                    <span>5.0 km (Town Perimeter)</span>
                    <span>15.0 km (Outlying Semi-Urban Grid)</span>
                  </div>
                </div>

                {/* Numerical Constant Epsilon */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Numerical Stability Constant ε:</span>
                  <span className="text-purple-400 font-bold">ε = {sandboxEps}</span>
                </div>
              </div>

              {/* Resulting Tier Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Calculated Operational Tier</div>
                  <div className="text-xl font-black text-white mt-0.5 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-mono uppercase font-bold ${
                        sandboxTier === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                          : sandboxTier === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          : sandboxTier === 'MEDIUM'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {sandboxTier} PRIORITY
                    </span>
                    <span className="font-mono text-emerald-400">{sandboxScore} pts</span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400">
                  {sandboxTier === 'CRITICAL' && 'Immediate Volunteer Dispatch Required! High Volume & Short Window.'}
                  {sandboxTier === 'HIGH' && 'Priority Queue: Assign to next available two-wheeler.'}
                  {sandboxTier === 'MEDIUM' && 'Normal Route Allocation within 2-4 hours.'}
                  {sandboxTier === 'LOW' && 'Scheduled Delivery Window / Ambient Shelf Life.'}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TABLE 1 COMPARISON */}
          {activeTab === 'table1' && (
            <div className="space-y-6">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <TableIcon className="w-4 h-4 text-emerald-400" />
                  Table 1: Comparative Analysis (Paper II, Section 5.4)
                </h3>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Direct reproduction of Table 1 from <em>"AI-assisted Smart Food Redistribution System with Priority-Based Optimization"</em> (Vatsa et al., ICIPAI 2026), contrasting the traditional manual redistribution baseline against the proposed AI-assisted framework.
                </p>
              </div>

              {/* Table 1 Content */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-950 text-xs font-mono uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 text-slate-400">Feature</th>
                      <th className="p-3.5 text-red-400 bg-red-950/20">Traditional System</th>
                      <th className="p-3.5 text-emerald-400 bg-emerald-950/20">Proposed AI-Assisted System</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs">
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3.5 font-bold text-white font-mono">Decision Making</td>
                      <td className="p-3.5 text-slate-400">Manual coordination & calls</td>
                      <td className="p-3.5 text-emerald-300 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>AI-assisted (Context-aware decision logic)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3.5 font-bold text-white font-mono">Prioritization</td>
                      <td className="p-3.5 text-slate-400">Absent (FCFS or ad-hoc)</td>
                      <td className="p-3.5 text-emerald-300 font-semibold font-mono">
                        Priority-based: Q / (T_{'{e}'} + ε) × 1/(1+D)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3.5 font-bold text-white font-mono">Response Time</td>
                      <td className="p-3.5 text-slate-400">Relatively Slow (queue delays)</td>
                      <td className="p-3.5 text-emerald-300 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Faster (Instant automated dispatch)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3.5 font-bold text-white font-mono">Food Waste Reduction</td>
                      <td className="p-3.5 text-slate-400">Unstructured & inefficient (high spoilage)</td>
                      <td className="p-3.5 text-emerald-300 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Optimized via Priority Allocation (+28–37% WRR)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3.5 font-bold text-white font-mono">Scalability</td>
                      <td className="p-3.5 text-slate-400">Limited (human coordinator bottleneck)</td>
                      <td className="p-3.5 text-emerald-300 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>High (Deterministic O(n log n) compute)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Research Discussion Note */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl text-[11px] text-slate-400 leading-relaxed space-y-1.5">
                <div className="font-bold text-white">Section 5.5 Research Discussion:</div>
                <p>
                  "The deterministic nature of the prioritization model ensures stable and predictable behavior under varying input conditions, which is essential for real-time deployment scenarios. Unlike complex machine learning models, the proposed approach achieves substantial performance gains using a computationally efficient and interpretable prioritization function."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400 font-mono text-[11px]">
            Partially supported by JIGSY's R&D cell & Sandip University SOCSE • ICIPAI 2026
          </div>
          <button
            onClick={() => setSimulationModalOpen(false)}
            className="px-5 py-2 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
