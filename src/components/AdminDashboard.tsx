import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  TrendingUp,
  Download,
  Filter,
  Users,
  Award,
  Leaf,
  Droplet,
  HeartHandshake,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  FileCode,
  Layers,
  ArrowRight,
  Cpu,
  Zap,
  Sparkles,
  Play,
  RotateCcw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    metrics,
    auditLogs,
    volunteers,
    donations,
    demandRequests,
    latestAlgorithm1Result,
    executeAlgorithm1,
    dispatchBatchWithAlgorithm1,
    latestSimulationResult,
    setSimulationModalOpen,
    setPaperModalOpen,
    setPaperModalTab,
    activeSimulationBatchId,
    simulationStage,
  } = useApp();
  const [filterRole, setFilterRole] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered audit logs
  const filteredLogs = auditLogs.filter(log => {
    if (filterRole !== 'All' && log.actorRole !== filterRole) return false;
    if (
      searchQuery &&
      !log.details.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Export CSV
  const exportCSV = () => {
    const headers = ['Timestamp', 'Actor Role', 'Actor Name', 'Action', 'Details', 'Donation ID'];
    const rows = auditLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.actorRole}"`,
      `"${l.actorName.replace(/"/g, '""')}"`,
      `"${l.action}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      `"${l.relatedDonationId || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zwfm_audit_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON
  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `zwfm_system_audit_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-bold">
                Platform Administration & Circular Ledger
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Circular Economy Governance & Audit Center
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              End-to-end transparency, decentralized chain of custody, and environmental verification aligned with UN Sustainable Development Goals (SDG 2 Zero Hunger, SDG 12 Responsible Consumption, SDG 13 Climate Action).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimulationModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-500/40 text-xs font-semibold cursor-pointer transition-all shadow-md"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-300" />
              <span>AI Simulator</span>
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={exportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-all"
            >
              <FileCode className="w-3.5 h-3.5 text-blue-400" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* PAPER II AI OPTIMIZATION CORE & ALGORITHM 1 AUDIT */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Cpu className="w-3 h-3 text-amber-300" />
                Paper II Optimization Layer (Section 3 & 5)
              </span>
              <span className="text-xs text-slate-400 font-mono">ICIPAI 2026 Engine</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              AI-Assisted Decision Engine & Algorithm 1 Execution Status
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                const count = dispatchBatchWithAlgorithm1();
                alert(`Algorithm 1 executed: Assigned ${count} prioritized batches to nearest volunteers.`);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Auto-Dispatch with Algorithm 1</span>
            </button>

            <button
              onClick={() => setSimulationModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-white font-bold text-xs shadow-md border border-purple-500/40 transition-all cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-300" />
              <span>Open Simulation Engine (n=100)</span>
            </button>
          </div>
        </div>

        {/* 4 Cards: Algorithm 1 stats, Simulation WRR, Distance Optimization, Complexity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Algorithm 1 Candidates</div>
            <div className="text-xl font-bold text-white font-mono mt-0.5">
              {latestAlgorithm1Result?.totalCandidates || 0} batches
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              Ranked in {latestAlgorithm1Result?.executionTimeMs || 0} ms
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Wastage Reduction (WRR)</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
              +{latestSimulationResult.wrrImprovementPercent}% gain
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              vs FCFS Traditional baseline
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Travel Distance (TDO)</div>
            <div className="text-xl font-bold text-blue-400 font-mono mt-0.5">
              -{latestSimulationResult.travelDistanceOptimizationPercent}% reduction
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              Location-aware distance weight (D_i)
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Computational Class</div>
            <div className="text-xl font-bold text-purple-400 font-mono mt-0.5">
              O(n log n)
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              Resource-constrained deployable
            </div>
          </div>
        </div>
      </div>

      {/* Circular Economy Material Closed-Loop Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Circular Closed-Loop Redistribution Pipeline</span>
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Transforming linear waste streams into societal nutrition via semi-urban decentralized logistics
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Step 1 */}
          <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-4 relative">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">1. Surplus Inflow</div>
            <div className="font-bold text-white text-sm mt-1">Provider Generation</div>
            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
              Messes, Banquets & Caterers upload safe surplus with temperature & expiry window.
            </div>
            <div className="mt-3 text-xs font-mono font-bold text-amber-400">
              {metrics.totalSurplusKg} kg recorded
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950/70 border border-blue-500/30 rounded-xl p-4 relative">
            <div className="text-[10px] font-mono text-blue-400 font-bold uppercase">2. Geo-Radius Matching</div>
            <div className="font-bold text-white text-sm mt-1">Receiver Claim & Dispatch</div>
            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
              Nearby NGOs & shelters claim food within practical radius; broadcast alerts to local volunteers.
            </div>
            <div className="mt-3 text-xs font-mono font-bold text-blue-400">
              {metrics.activeDonationsCount} active batches
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-4 relative">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">3. Safety Verification</div>
            <div className="font-bold text-white text-sm mt-1">Volunteer 5-Point Check</div>
            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
              In-person inspection: Visual mold check, aroma freshness, and thermal validation (&gt;60°C or &lt;5°C).
            </div>
            <div className="mt-3 text-xs font-mono font-bold text-emerald-400">
              100% Safety Verified
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-950/70 border border-teal-500/30 rounded-xl p-4 relative">
            <div className="text-[10px] font-mono text-teal-400 font-bold uppercase">4. Impact Realization</div>
            <div className="font-bold text-white text-sm mt-1">Zero Waste Consumption</div>
            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
              Digital handover signed at shelter. Landfill avoided; CO₂e emissions prevented.
            </div>
            <div className="mt-3 text-xs font-mono font-bold text-teal-300">
              {metrics.totalMealsServed} meals served
            </div>
          </div>
        </div>
      </div>

      {/* Environmental & Economic KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">GHG Emissions Prevented</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white">
            {metrics.co2EmissionsSavedKg.toLocaleString()}{' '}
            <span className="text-xs text-emerald-400 font-normal">kg CO₂e</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Based on UNEP & FAO emission factor of 2.5 kg CO₂e avoided per kg food waste diverted from landfill.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Freshwater Conserved</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Droplet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white">
            {(metrics.waterSavedLiters / 1000).toLocaleString()}{' '}
            <span className="text-xs text-blue-400 font-normal">thousand Liters</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Preserving embedded virtual water used during agricultural crop production and food processing.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Economic Value Retained</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white">
            ₹{metrics.economicValueInr.toLocaleString()}{' '}
            <span className="text-xs text-amber-400 font-normal">INR Value</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Societal value calculated at local semi-urban dietary baseline of ₹55 per nutritious cooked meal.
          </p>
        </div>
      </div>

      {/* Volunteer Leaderboard & Logistics Network */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Decentralized Community Logistics Leaderboard</span>
            </h3>
            <p className="text-xs text-slate-400">
              Empowering local volunteers with electric vehicles and bicycles for semi-urban last-mile delivery
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {volunteers.map((vol, index) => (
            <div
              key={vol.id}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    index === 0
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  #{index + 1}
                </div>
                <div>
                  <div className="font-semibold text-white text-xs">{vol.name}</div>
                  <div className="text-[11px] text-slate-400">{vol.vehicleType}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-mono font-bold text-xs">
                  {vol.totalKgSaved} kg
                </div>
                <div className="text-[10px] text-slate-400">{vol.totalDeliveries} runs • ⭐{vol.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immutable Audit & Transparency Trail */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span>Immutable Transparency & Chain of Custody Audit Log</span>
            </h3>
            <p className="text-xs text-slate-400">
              Every surplus upload, claim, inspection, and delivery is recorded with timestamped verification
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 w-40"
            />
            <select
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="provider">Provider</option>
              <option value="receiver">Receiver</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="border border-slate-800 rounded-xl overflow-hidden">
          <div className="max-h-96 overflow-y-auto divide-y divide-slate-800/80">
            {filteredLogs.map(log => {
              let roleBadge = 'bg-slate-800 text-slate-300';
              if (log.actorRole === 'provider') roleBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
              else if (log.actorRole === 'receiver') roleBadge = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
              else if (log.actorRole === 'volunteer') roleBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

              const isSimLog =
                Boolean(activeSimulationBatchId) &&
                (log.relatedDonationId === activeSimulationBatchId ||
                  (simulationStage >= 5 && log.action.includes('DELIVERY_CONFIRMED')));

              return (
                <div
                  key={log.id}
                  className={`p-3.5 transition-colors text-xs space-y-1 ${
                    isSimLog
                      ? 'bg-purple-950/40 border-l-4 border-l-purple-400 ring-1 ring-purple-500/30'
                      : 'hover:bg-slate-950/40'
                  }`}
                >
                  {isSimLog && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-300 mb-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>⚡ LIVE SIMULATION AUDIT EVENT (IMMUTABLY LOGGED)</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500 text-[10px]">{log.id}</span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${roleBadge}`}
                      >
                        {log.actorRole}
                      </span>
                      <span className="font-semibold text-white">{log.actorName}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="font-mono font-bold text-purple-400 text-[11px]">
                      {log.action}
                    </span>
                    {log.relatedDonationId && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                        {log.relatedDonationId}
                      </span>
                    )}
                  </div>

                  <div className="text-slate-300 text-xs leading-relaxed">{log.details}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
