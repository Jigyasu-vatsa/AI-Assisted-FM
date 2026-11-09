import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Building2,
  MapPin,
  Clock,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Truck,
  User,
  HeartHandshake,
} from 'lucide-react';
import { formatTimeRemaining, evaluateDonationPriority } from '../utils/calculations';

export const DonationDetailModal: React.FC = () => {
  const { selectedDonation, setSelectedDonation } = useApp();

  if (!selectedDonation) return null;

  const timeInfo = formatTimeRemaining(selectedDonation.expiryTimestamp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  {selectedDonation.id}
                </span>
                <span className="text-xs font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold">
                  {selectedDonation.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1 line-clamp-1">
                {selectedDonation.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedDonation(null)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
            <div>
              <div className="text-[10px] text-slate-400">Batch Mass (Q_i)</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                {selectedDonation.quantityKg} kg
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Meals Provided</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">
                {selectedDonation.servings} portions
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Dietary Category</div>
              <div className="text-sm font-semibold text-amber-300 mt-0.5 truncate">
                {selectedDonation.dietary}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Storage State</div>
              <div className="text-sm font-semibold text-blue-300 mt-0.5 truncate">
                {selectedDonation.condition}
              </div>
            </div>
          </div>

          {/* Paper II Priority Analysis Box */}
          {(() => {
            const priorityBreakdown = evaluateDonationPriority(selectedDonation);
            return (
              <div className="bg-slate-950/90 border border-emerald-500/30 p-4 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Paper II Priority Evaluation (ICIPAI 2026 Core)
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                      priorityBreakdown.tier === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                        : priorityBreakdown.tier === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : priorityBreakdown.tier === 'MEDIUM'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {priorityBreakdown.tier} PRIORITY • {priorityBreakdown.locationAwareScore} PTS
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-900/80 p-2.5 rounded-xl font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400">Remaining Expiry (T_{'{e,i}'}):</span>{' '}
                    <strong className="text-amber-400">{priorityBreakdown.remainingExpiryHours}h</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Basic Score (Eq 1):</span>{' '}
                    <strong className="text-white">{priorityBreakdown.basicScore}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400">Location-Aware (Eq 2):</span>{' '}
                    <strong className="text-emerald-400">{priorityBreakdown.locationAwareScore}</strong>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between font-mono">
                  <span>Urgency: {priorityBreakdown.urgencyLabel}</span>
                  <span>Formula: [Q_i / (T_{'{e,i}'} + 0.1)] × [1 / (1 + D_i)]</span>
                </div>
              </div>
            );
          })()}

          {/* Time & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950/50 border border-slate-800 p-3.5 rounded-xl space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                Origin Provider
              </div>
              <div className="text-slate-200 font-medium">{selectedDonation.providerName}</div>
              <div className="text-slate-400 text-[11px]">{selectedDonation.location.address}</div>
              <div className="text-slate-400 text-[11px]">Phone: {selectedDonation.contactPhone}</div>
            </div>

            <div className="bg-slate-950/50 border border-slate-800 p-3.5 rounded-xl space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Safe Consumption Window
              </div>
              <div className="text-slate-300">
                Prep: {new Date(selectedDonation.prepTimestamp).toLocaleTimeString()}
              </div>
              <div className="font-mono text-emerald-400 font-medium">
                Status: {timeInfo.text}
              </div>
              <div className="text-slate-400 text-[11px]">Packaging: {selectedDonation.packaging}</div>
            </div>
          </div>

          {/* Quality Inspection Report (Section 5 & 6) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Section 5: Food Safety Quality Audit Report
              </span>
              {selectedDonation.qualityCheck ? (
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  PASSED (100% Verified)
                </span>
              ) : (
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                  Inspection Pending at Pickup
                </span>
              )}
            </div>

            {selectedDonation.qualityCheck ? (
              <div className="pt-2 space-y-2 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Visual Check OK</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Aroma/Smell OK</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Temp: {selectedDonation.qualityCheck.measuredTempCelsius}°C</span>
                  </div>
                </div>
                <div className="text-slate-400 text-[11px] bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-semibold">Inspector Notes:</span>{' '}
                  {selectedDonation.qualityCheck.notes} (Inspected by {selectedDonation.qualityCheck.inspectedByVolunteerName} at{' '}
                  {new Date(selectedDonation.qualityCheck.inspectedAt).toLocaleTimeString()})
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-[11px]">
                Upon volunteer arrival at provider location, an in-person sensory, thermal, and packaging checklist must be verified before transit can commence.
              </p>
            )}
          </div>

          {/* Recipient & Volunteer Handover Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" /> Assigned Volunteer
              </div>
              <div className="text-slate-300 font-medium">
                {selectedDonation.assignedVolunteerName || 'Awaiting acceptance'}
              </div>
              {selectedDonation.assignedVolunteerPhone && (
                <div className="text-slate-400 text-[11px]">
                  Phone: {selectedDonation.assignedVolunteerPhone}
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-blue-400" /> Claiming Receiver
              </div>
              <div className="text-slate-300 font-medium">
                {selectedDonation.claimedByReceiverName || 'Open on marketplace'}
              </div>
              {selectedDonation.deliveredTimestamp && (
                <div className="text-emerald-400 text-[11px] font-mono">
                  Delivered at: {new Date(selectedDonation.deliveredTimestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setSelectedDonation(null)}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
