import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bike,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  Navigation,
  Thermometer,
  Truck,
  Sparkles,
  Phone,
  ChevronRight,
} from 'lucide-react';
import { QualityCheckModal } from './QualityCheckModal';
import { FoodDonation, QualityVerification } from '../types';
import { formatTimeRemaining, calculateDistanceKm, evaluateDonationPriority } from '../utils/calculations';

export const VolunteerDashboard: React.FC = () => {
  const {
    donations,
    volunteers,
    acceptVolunteerTask,
    submitQualityCheck,
    markInTransit,
    completeDelivery,
    setSelectedDonation,
    activeSimulationBatchId,
    simulationStage,
  } = useApp();

  // Active simulated volunteer
  const [activeVolunteerId, setActiveVolunteerId] = useState<string>('vol-1');
  const activeVolunteer = volunteers.find(v => v.id === activeVolunteerId) || volunteers[0];

  // Inspection modal
  const [inspectingDonation, setInspectingDonation] = useState<FoodDonation | null>(null);

  // Available pickup tasks: donations that have been claimed by an NGO but no volunteer assigned yet
  const availableTasks = donations.filter(
    d => d.status === 'CLAIMED' && (!d.assignedVolunteerId || d.assignedVolunteerId === '')
  );

  // Paper II Algorithm 1: Sort by location-aware priority score descending
  const prioritizedTasks = [...availableTasks].sort((a, b) => {
    const distA = calculateDistanceKm(
      activeVolunteer.currentLocation.lat,
      activeVolunteer.currentLocation.lng,
      a.location.lat,
      a.location.lng
    );
    const distB = calculateDistanceKm(
      activeVolunteer.currentLocation.lat,
      activeVolunteer.currentLocation.lng,
      b.location.lat,
      b.location.lng
    );
    const pA = evaluateDonationPriority(a, distA).locationAwareScore;
    const pB = evaluateDonationPriority(b, distB).locationAwareScore;
    return pB - pA;
  });

  // Active missions assigned to THIS volunteer
  const myActiveMissions = donations.filter(
    d =>
      d.assignedVolunteerId === activeVolunteer.id &&
      (d.status === 'VOLUNTEER_ASSIGNED' ||
        d.status === 'QUALITY_VERIFIED' ||
        d.status === 'IN_TRANSIT')
  );

  // Completed missions
  const myCompletedMissions = donations.filter(
    d => d.assignedVolunteerId === activeVolunteer.id && d.status === 'DELIVERED'
  );

  const handleInspectionSubmit = (check: QualityVerification) => {
    if (!inspectingDonation) return;
    submitQualityCheck(inspectingDonation.id, check);
    setInspectingDonation(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                Community Volunteer Logistics • Section 5 Framework
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Decentralized Last-Mile Logistics Backbone
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Volunteers bridge the semi-urban infrastructure gap by rapidly picking up surplus food, conducting in-person safety verification, and delivering directly to shelters.
            </p>
          </div>

          {/* Volunteer Profile Switcher */}
          <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Active Volunteer Identity:</div>
              <select
                value={activeVolunteerId}
                onChange={e => setActiveVolunteerId(e.target.value)}
                className="bg-transparent font-bold text-white text-xs focus:outline-none cursor-pointer"
              >
                {volunteers.map(v => (
                  <option key={v.id} value={v.id} className="bg-slate-900 text-white">
                    {v.name} ({v.vehicleType})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Volunteer Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400">Total Deliveries</div>
            <div className="text-base font-bold text-white font-mono mt-0.5">
              {activeVolunteer.totalDeliveries} runs
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400">Surplus Food Rescued</div>
            <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
              {activeVolunteer.totalKgSaved} kg
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400">Logistics Vehicle</div>
            <div className="text-base font-bold text-slate-200 mt-0.5 truncate">
              {activeVolunteer.vehicleType}
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400">Community Trust Rating</div>
            <div className="text-base font-bold text-amber-300 font-mono mt-0.5">
              ⭐ {activeVolunteer.rating} / 5.0
            </div>
          </div>
        </div>
      </div>

      {/* Active Missions (Assigned & In Progress) */}
      {myActiveMissions.length > 0 && (
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              <h3 className="text-base font-bold text-white">
                Active Mission in Progress ({myActiveMissions.length})
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              Live Logistics Dispatch
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myActiveMissions.map(donation => {
              const timeInfo = formatTimeRemaining(donation.expiryTimestamp);

              const isSimMission = donation.id === activeSimulationBatchId;

              return (
                <div
                  key={donation.id}
                  className={`rounded-2xl p-5 space-y-4 transition-all ${
                    isSimMission
                      ? 'bg-emerald-950/40 border-2 border-emerald-400 ring-4 ring-emerald-400/20 shadow-emerald-950/60 scale-[1.01]'
                      : 'bg-slate-950 border border-slate-800'
                  }`}
                >
                  {isSimMission && (
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-[11px] font-mono font-bold flex items-center justify-between animate-pulse">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>⚡ LIVE SIMULATION MISSION (STEP {simulationStage === 4 ? '4: FSSAI CHECK' : '3: DISPATCH'})</span>
                      </span>
                      <span className="text-[10px] bg-emerald-400 text-slate-950 px-1.5 py-0.2 rounded font-extrabold uppercase">
                        Matched Volunteer
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">{donation.id}</span>
                    <span className="text-xs font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                      {donation.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{donation.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="text-emerald-400 font-mono font-bold">
                        {donation.quantityKg} kg ({donation.servings} meals)
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-amber-300">{donation.condition}</span>
                    </div>
                  </div>

                  {/* Route details */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-slate-400">Pickup Origin:</div>
                        <div className="font-semibold text-white">{donation.providerName}</div>
                        <div className="text-slate-400 text-[11px]">{donation.location.address}</div>
                      </div>
                    </div>
                    <div className="border-t border-slate-800/80 pt-2 flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-slate-400">Destination Shelter:</div>
                        <div className="font-semibold text-white">
                          {donation.claimedByReceiverName || 'Community Shelter'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quality Check Status & Action */}
                  <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                    {!donation.qualityCheck ? (
                      <button
                        onClick={() => setInspectingDonation(donation)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Perform 5-Point Food Safety Inspection</span>
                      </button>
                    ) : donation.status === 'QUALITY_VERIFIED' ? (
                      <div className="space-y-2">
                        <div className="bg-emerald-950/60 border border-emerald-600/60 rounded-xl p-2.5 text-xs text-emerald-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>
                            Safety Verified ({donation.qualityCheck.measuredTempCelsius}°C). Ready to start transit.
                          </span>
                        </div>
                        <button
                          onClick={() => markInTransit(donation.id)}
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Start GPS Transit to Receiver</span>
                        </button>
                      </div>
                    ) : donation.status === 'IN_TRANSIT' ? (
                      <div className="space-y-2">
                        <div className="bg-amber-950/60 border border-amber-600/60 rounded-xl p-2.5 text-xs text-amber-300 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-amber-400 animate-bounce shrink-0" />
                          <span>In transit with electric vehicle. Approaching destination shelter.</span>
                        </div>
                        <button
                          onClick={() =>
                            completeDelivery(
                              donation.id,
                              'Handed over securely to shelter manager with thermal audit verification.',
                              'Sister Monica (Admin)'
                            )
                          }
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirm Handover at Shelter</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Pickup Tasks Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Available Community Pickup Missions</span>
              <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                {availableTasks.length} queued
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Claimed by local shelters; awaiting nearby volunteer acceptance within practical radius
            </p>
          </div>
        </div>

        {availableTasks.length === 0 ? (
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 text-center text-slate-400 text-xs">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
            <div>All current surplus requests are being actively handled!</div>
            <div className="mt-1 text-slate-500">
              New pickup alerts appear automatically when providers register food and receivers claim it.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prioritizedTasks.map((task, rankIndex) => {
              const timeInfo = formatTimeRemaining(task.expiryTimestamp);
              const dist = calculateDistanceKm(
                activeVolunteer.currentLocation.lat,
                activeVolunteer.currentLocation.lng,
                task.location.lat,
                task.location.lng
              );
              const priority = evaluateDonationPriority(task, dist);

              return (
                <div
                  key={task.id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 shadow-lg flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-[10px]">
                          #{rankIndex + 1}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{task.id}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          priority.tier === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                            : priority.tier === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        }`}
                      >
                        Priority: {priority.locationAwareScore}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-2">{task.title}</h4>

                    <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
                      <span className="bg-slate-900 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded">
                        {task.quantityKg} kg
                      </span>
                      <span className="bg-slate-900 text-white font-bold px-2 py-0.5 rounded">
                        ~{task.servings} meals
                      </span>
                      <span className="bg-slate-900 text-blue-400 font-mono px-2 py-0.5 rounded">
                        {dist} km away
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-slate-300">
                      <div>
                        From: <span className="text-white font-semibold">{task.providerName}</span>
                      </div>
                      <div>
                        To: <span className="text-blue-400 font-semibold">{task.claimedByReceiverName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Expiry window: {timeInfo.text}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedDonation(task)}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      View Specs
                    </button>

                    <button
                      onClick={() => acceptVolunteerTask(task.id, activeVolunteer.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Bike className="w-4 h-4" />
                      <span>Accept Mission</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Missions History */}
      {myCompletedMissions.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Volunteer Impact Log ({activeVolunteer.name})</span>
          </h3>

          <div className="space-y-2">
            {myCompletedMissions.map(m => (
              <div
                key={m.id}
                className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{m.title}</div>
                  <div className="text-slate-400 text-[11px]">
                    Delivered {m.quantityKg} kg ({m.servings} meals) to {m.claimedByReceiverName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-mono font-bold">
                    +{(m.quantityKg * 2.5).toFixed(1)} kg CO₂e saved
                  </div>
                  <div className="text-[10px] text-slate-500">Delivered & verified</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quality Check Inspection Modal */}
      {inspectingDonation && (
        <QualityCheckModal
          donation={inspectingDonation}
          volunteerName={activeVolunteer.name}
          onClose={() => setInspectingDonation(null)}
          onSubmit={handleInspectionSubmit}
        />
      )}
    </div>
  );
};
