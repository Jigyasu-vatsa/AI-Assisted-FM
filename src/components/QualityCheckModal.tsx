import React, { useState } from 'react';
import { FoodDonation, QualityVerification } from '../types';
import { ShieldCheck, AlertTriangle, Thermometer, CheckCircle2, XCircle, FileCheck } from 'lucide-react';

interface Props {
  donation: FoodDonation;
  volunteerName: string;
  onClose: () => void;
  onSubmit: (verification: QualityVerification) => void;
}

export const QualityCheckModal: React.FC<Props> = ({
  donation,
  volunteerName,
  onClose,
  onSubmit,
}) => {
  const [visualCheck, setVisualCheck] = useState(true);
  const [smellCheck, setSmellCheck] = useState(true);
  const [temperatureCheck, setTemperatureCheck] = useState(true);
  const [packagingIntegrity, setPackagingIntegrity] = useState(true);
  const [timeWindowValid, setTimeWindowValid] = useState(true);
  const [tempCelsius, setTempCelsius] = useState<number>(
    donation.condition === 'Hot & Fresh' ? 62 : donation.condition === 'Chilled / Refrigerated' ? 4 : 24
  );
  const [notes, setNotes] = useState(
    'Food verified fresh, hygienically stored, within standard safe threshold.'
  );

  const passedAll =
    visualCheck && smellCheck && temperatureCheck && packagingIntegrity && timeWindowValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result: QualityVerification = {
      inspectedAt: new Date().toISOString(),
      inspectedByVolunteerName: volunteerName,
      passedAll,
      visualCheck,
      smellCheck,
      temperatureCheck,
      packagingIntegrity,
      timeWindowValid,
      measuredTempCelsius: tempCelsius,
      notes: notes.trim() || (passedAll ? 'All food safety parameters verified.' : 'Failed safety compliance.'),
    };
    onSubmit(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Food Safety Quality Verification</h3>
              <p className="text-xs text-slate-400">
                Standard 5-Point Protocol • In-Person Inspection at Provider
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
            <div className="text-slate-400">Batch ID: <span className="font-mono text-emerald-400">{donation.id}</span></div>
            <div className="font-semibold text-white">{donation.title}</div>
            <div className="text-slate-400">
              Provider: <span className="text-slate-200">{donation.providerName}</span> • Qty: <span className="text-emerald-400 font-semibold">{donation.quantityKg} kg ({donation.servings} meals)</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Mandatory 5-Point Safety Checklist:
            </div>

            {/* Check 1: Visual */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={visualCheck}
                onChange={e => setVisualCheck(e.target.checked)}
                className="mt-1 w-4 h-4 accent-emerald-500 rounded"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">1. Visual & Sensory Inspection</div>
                <div className="text-slate-400">
                  No signs of spoilage, mold, curdling, foreign particles, or insect contamination.
                </div>
              </div>
            </label>

            {/* Check 2: Smell */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={smellCheck}
                onChange={e => setSmellCheck(e.target.checked)}
                className="mt-1 w-4 h-4 accent-emerald-500 rounded"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">2. Olfactory Aroma Check</div>
                <div className="text-slate-400">
                  Smell is fresh, typical for recipe; zero acidic sourness, fermentation, or rancid notes.
                </div>
              </div>
            </label>

            {/* Check 3: Temperature */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={temperatureCheck}
                onChange={e => setTemperatureCheck(e.target.checked)}
                className="mt-1 w-4 h-4 accent-emerald-500 rounded"
              />
              <div className="text-xs flex-1">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>3. Thermal Safety Threshold</span>
                  <span className="font-mono text-emerald-400">{tempCelsius}°C</span>
                </div>
                <div className="text-slate-400 mb-2">
                  Hot food maintained above 60°C or chilled food below 5°C.
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={tempCelsius}
                    onChange={e => setTempCelsius(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                  />
                </div>
              </div>
            </label>

            {/* Check 4: Packaging */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={packagingIntegrity}
                onChange={e => setPackagingIntegrity(e.target.checked)}
                className="mt-1 w-4 h-4 accent-emerald-500 rounded"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">4. Packaging & Hygiene Integrity</div>
                <div className="text-slate-400">
                  Clean, food-grade containers (sealed foil, food tubs, or stainless carriers) ready for safe transit.
                </div>
              </div>
            </label>

            {/* Check 5: Timeliness */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={timeWindowValid}
                onChange={e => setTimeWindowValid(e.target.checked)}
                className="mt-1 w-4 h-4 accent-emerald-500 rounded"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">5. Safe Consumption Window Active</div>
                <div className="text-slate-400">
                  Food will reach the recipient shelter with ample time before expiry window closes.
                </div>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Volunteer Verification Notes:
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Cleanly handled, food is steaming hot, confirmed with head chef."
            />
          </div>

          {/* Outcome Status Banner */}
          <div
            className={`p-3 rounded-xl border flex items-center gap-3 text-xs ${
              passedAll
                ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-300'
                : 'bg-rose-950/60 border-rose-600/60 text-rose-300'
            }`}
          >
            {passedAll ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
            )}
            <div>
              <div className="font-bold">
                {passedAll ? 'Status: SAFETY VERIFIED (PASSED)' : 'Status: SAFETY HAZARD DETECTED'}
              </div>
              <div className="text-[11px] opacity-90">
                {passedAll
                  ? 'Batch meets circular safety guidelines. Approved for immediate transit.'
                  : 'Fails quality check. Will be recorded in audit log and rejected to protect recipient health.'}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                passedAll
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40'
                  : 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/40'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{passedAll ? 'Approve & Start Transit' : 'Reject Food Batch'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
