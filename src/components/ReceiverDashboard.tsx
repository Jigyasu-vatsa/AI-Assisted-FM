import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  HeartHandshake,
  AlertCircle,
  Filter,
  PlusCircle,
  Thermometer,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { formatTimeRemaining, calculateDistanceKm, evaluateDonationPriority } from '../utils/calculations';
import { FoodDonation, FoodDietary } from '../types';

export const ReceiverDashboard: React.FC = () => {
  const {
    donations,
    claimDonation,
    completeDelivery,
    demandRequests,
    createDemandRequest,
    setSelectedDonation,
    simulationStage,
    activeSimulationBatchId,
  } = useApp();

  const [dietaryFilter, setDietaryFilter] = useState<string>('All');
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(8);
  const [activeTab, setActiveTab] = useState<'available' | 'incoming' | 'demand'>('available');

  // Auto-switch to incoming tab when Step 2 of simulation is active
  React.useEffect(() => {
    if (simulationStage === 2) {
      setActiveTab('incoming');
    }
  }, [simulationStage]);

  // Claim Modal
  const [claimingDonation, setClaimingDonation] = useState<FoodDonation | null>(null);
  const [receiverName, setReceiverName] = useState('Asha Orphanage & Child Care');
  const [receiverId, setReceiverId] = useState('rec-asha');
  const [beneficiaryCount, setBeneficiaryCount] = useState<number>(60);

  // Delivery Handover Modal
  const [deliveringDonation, setDeliveringDonation] = useState<FoodDonation | null>(null);
  const [handoverFeedback, setHandoverFeedback] = useState(
    'Food received in hot, excellent, hygienic condition. Served to 60 children.'
  );
  const [signatureName, setSignatureName] = useState('Sister Monica (Administrator)');

  // Post Demand Form
  const [showDemandForm, setShowDemandForm] = useState(false);
  const [demandMeals, setDemandMeals] = useState<number>(50);
  const [demandUrgency, setDemandUrgency] = useState<
    'Immediate (within 2h)' | 'Today Evening' | 'Scheduled Tomorrow'
  >('Today Evening');
  const [demandDietary, setDemandDietary] = useState<FoodDietary | 'Any'>('Vegetarian');
  const [demandShelterName, setDemandShelterName] = useState('District Community Night Shelter (Ref: R-2)');

  // Filter available donations
  const [sortBy, setSortBy] = useState<'priority' | 'distance' | 'urgency'>('priority');

  const availableDonations = donations.filter(d => {
    if (d.status !== 'AVAILABLE') return false;
    if (dietaryFilter !== 'All' && d.dietary !== dietaryFilter) return false;
    return true;
  });

  // Sort by Paper II Algorithm 1 priority score or distance
  const sortedAvailableDonations = [...availableDonations].sort((a, b) => {
    if (sortBy === 'priority') {
      const pA = evaluateDonationPriority(a).locationAwareScore;
      const pB = evaluateDonationPriority(b).locationAwareScore;
      return pB - pA;
    }
    if (sortBy === 'distance') {
      const distA = calculateDistanceKm(26.3555, 86.0680, a.location.lat, a.location.lng);
      const distB = calculateDistanceKm(26.3555, 86.0680, b.location.lat, b.location.lng);
      return distA - distB;
    }
    return new Date(a.expiryTimestamp).getTime() - new Date(b.expiryTimestamp).getTime();
  });

  // Incoming / Active deliveries for receivers
  const incomingDonations = donations.filter(
    d =>
      d.status === 'CLAIMED' ||
      d.status === 'VOLUNTEER_ASSIGNED' ||
      d.status === 'QUALITY_VERIFIED' ||
      d.status === 'IN_TRANSIT'
  );

  const deliveredDonations = donations.filter(d => d.status === 'DELIVERED');

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimingDonation) return;
    claimDonation(claimingDonation.id, receiverId, receiverName);
    setClaimingDonation(null);
    setActiveTab('incoming');
  };

  const handleDeliveryConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveringDonation) return;
    completeDelivery(deliveringDonation.id, handoverFeedback, signatureName);
    setDeliveringDonation(null);
  };

  const handleDemandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDemandRequest({
      receiverId: 'rec-custom',
      receiverName: demandShelterName,
      receiverType: 'Shelter',
      requiredMeals: Number(demandMeals),
      urgency: demandUrgency,
      dietaryPreference: demandDietary,
      location: {
        lat: 26.3555,
        lng: 86.0680,
        address: 'Station Colony, Madhubani',
        zone: 'Madhubani Central',
      },
      contactPhone: '+91 94314 00022 (Shelter Desk)',
    });
    setShowDemandForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">
                Receiver & NGO Portal • Demand Allocation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Surplus Food Allocation & Demand Marketplace
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Connect orphanages, old age homes, and community night shelters directly with surplus food providers through volunteer last-mile transit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDemandForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Broadcast Meal Demand</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'available'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Available Surplus Marketplace ({availableDonations.length})
          </button>
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'incoming'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active & Incoming Deliveries ({incomingDonations.length})
          </button>
          <button
            onClick={() => setActiveTab('demand')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'demand'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Open Demand Requests ({demandRequests.length})
          </button>
        </div>
      </div>

      {/* Broadcast Demand Modal */}
      {showDemandForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-400" />
                Broadcast Meal Requirement
              </h3>
              <button
                onClick={() => setShowDemandForm(false)}
                className="text-slate-400 hover:text-white p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDemandSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Shelter / NGO Organization Name
                </label>
                <select
                  value={demandShelterName}
                  onChange={e => setDemandShelterName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Asha Orphanage & Child Care">Asha Orphanage & Child Care (Ganga Sagar)</option>
                  <option value="Sneha Old Age Care Home">Sneha Old Age Care Home (Suratganj)</option>
                  <option value="Madhubani Community Night Shelter">Madhubani Community Night Shelter (Railway Colony)</option>
                  <option value="Jan Kalyan Free Kitchen">Jan Kalyan Free Kitchen (Station Road)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Required Meals: <span className="text-blue-400 font-mono font-bold">{demandMeals} portions</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="10"
                  value={demandMeals}
                  onChange={e => setDemandMeals(Number(e.target.value))}
                  className="w-full accent-blue-500 h-2 bg-slate-800 rounded cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Urgency</label>
                  <select
                    value={demandUrgency}
                    onChange={e => setDemandUrgency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Immediate (within 2h)">Immediate (within 2h)</option>
                    <option value="Today Evening">Today Evening</option>
                    <option value="Scheduled Tomorrow">Scheduled Tomorrow</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Dietary Requirement</label>
                  <select
                    value={demandDietary}
                    onChange={e => setDemandDietary(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Vegetarian">Vegetarian Only</option>
                    <option value="Any">Any Safe Food</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDemandForm(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 1: Available Surplus Marketplace */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-blue-400" /> Filter:
              </span>
              <div className="flex items-center gap-1.5">
                {['All', 'Vegetarian', 'Vegan'].map(item => (
                  <button
                    key={item}
                    onClick={() => setDietaryFilter(item)}
                    className={`px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition-all ${
                      dietaryFilter === item
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper II Priority Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
              >
                <option value="priority">Paper II AI Priority Score (Algorithm 1 Rank)</option>
                <option value="distance">Proximity (Closest First)</option>
                <option value="urgency">Safe Window (Urgent First)</option>
              </select>
            </div>

            <div className="text-slate-400 font-mono text-[11px]">
              Showing {sortedAvailableDonations.length} surplus batches available now in Madhubani
            </div>
          </div>

          {sortedAvailableDonations.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">No active surplus batches right now</div>
              <p className="text-xs mt-1">
                You can switch to the Food Provider tab to register a new surplus food batch or run the 1-Click Simulation.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedAvailableDonations.map(donation => {
                const timeInfo = formatTimeRemaining(donation.expiryTimestamp);
                const priority = evaluateDonationPriority(donation);
                const distFromShelter = calculateDistanceKm(26.3555, 86.0680, donation.location.lat, donation.location.lng);

                return (
                  <div
                    key={donation.id}
                    className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono text-slate-400">{donation.id}</span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              priority.tier === 'CRITICAL'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                                : priority.tier === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                                : priority.tier === 'MEDIUM'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            AI: {priority.locationAwareScore} pts
                          </span>
                          <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                            Available
                          </span>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-white line-clamp-2">{donation.title}</h4>

                      <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs">
                        <span className="bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded">
                          {donation.quantityKg} kg
                        </span>
                        <span className="bg-slate-950 border border-slate-800 text-white font-bold px-2 py-0.5 rounded">
                          ~{donation.servings} meals
                        </span>
                        <span className="bg-slate-950 border border-slate-800 text-blue-300 px-2 py-0.5 rounded">
                          {donation.dietary}
                        </span>
                        <span className="bg-slate-950 border border-slate-800 text-amber-300 px-2 py-0.5 rounded">
                          {donation.condition}
                        </span>
                      </div>

                      <div className="mt-3.5 space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-200">{donation.providerName}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <div className="flex items-center gap-2 truncate">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{donation.location.address}</span>
                          </div>
                          <span className="font-mono text-blue-400 shrink-0 font-semibold">{distFromShelter} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock
                            className={`w-3.5 h-3.5 ${
                              timeInfo.isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-400'
                            }`}
                          />
                          <span
                            className={`font-mono font-medium ${
                              timeInfo.isUrgent ? 'text-rose-400 font-bold' : 'text-slate-300'
                            }`}
                          >
                            Safe window: {timeInfo.text}
                          </span>
                        </div>
                      </div>

                      {/* Paper II Dynamic Urgency Breakdown */}
                      <div className="mt-3 p-2 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[10px] font-mono flex items-center justify-between text-slate-400">
                        <span>Urgency: <strong className="text-amber-300">{priority.urgencyLabel}</strong></span>
                        <span>Tier: <strong className="text-emerald-400">{priority.tier}</strong></span>
                      </div>

                      {donation.specialInstructions && (
                        <div className="mt-3 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-slate-400 italic">
                          "{donation.specialInstructions}"
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Inspect Details
                      </button>

                      <button
                        onClick={() => setClaimingDonation(donation)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <HeartHandshake className="w-4 h-4" />
                        <span>Claim for Shelter</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Incoming & Active Deliveries */}
      {activeTab === 'incoming' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incomingDonations.map(donation => {
              const isSimBatch = donation.id === activeSimulationBatchId;

              return (
                <div
                  key={donation.id}
                  className={`rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all ${
                    isSimBatch
                      ? 'bg-blue-950/40 border-2 border-blue-400 ring-4 ring-blue-400/20 shadow-blue-950/60 scale-[1.01]'
                      : 'bg-slate-900 border border-slate-800'
                  }`}
                >
                  <div>
                    {isSimBatch && (
                      <div className="mb-3 px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-400/60 text-blue-300 text-[11px] font-mono font-bold flex items-center justify-between animate-pulse">
                        <span className="flex items-center gap-1.5">
                          <span>⚡ LIVE SIMULATION BATCH (STEP 2: CLAIMED BY SHELTER)</span>
                        </span>
                        <span className="text-[10px] bg-blue-400 text-slate-950 px-1.5 py-0.2 rounded font-extrabold uppercase">
                          Eq. (2) Score: 7.7 pts
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400">{donation.id}</span>
                      <span className="text-xs font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                        {donation.status.replace('_', ' ')}
                      </span>
                    </div>

                  <h4 className="text-base font-bold text-white">{donation.title}</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Claimed for: <span className="font-semibold text-white">{donation.claimedByReceiverName}</span>
                  </p>

                  {/* Flow Stages */}
                  <div className="mt-4 p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>1. Surplus Food Claimed</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {donation.assignedVolunteerName ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-700 animate-spin" />
                      )}
                      <span className={donation.assignedVolunteerName ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                        2. Volunteer Logistics: {donation.assignedVolunteerName || 'Awaiting acceptance...'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {donation.qualityCheck?.passedAll ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-slate-500" />
                      )}
                      <span className={donation.qualityCheck?.passedAll ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                        3. Food Safety Inspection: {donation.qualityCheck ? `Passed (${donation.qualityCheck.measuredTempCelsius}°C)` : 'Pending inspection at provider'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {donation.status === 'IN_TRANSIT' ? (
                        <Truck className="w-4 h-4 text-amber-400 animate-bounce" />
                      ) : (
                        <Truck className="w-4 h-4 text-slate-500" />
                      )}
                      <span className={donation.status === 'IN_TRANSIT' ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                        4. Final Delivery: {donation.status === 'IN_TRANSIT' ? 'Driver approaching shelter!' : 'Ready for dispatch'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedDonation(donation)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    View Timeline
                  </button>

                  <button
                    onClick={() => setDeliveringDonation(donation)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Receipt & Sign Handover</span>
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* Tab 3: Demand Requests */}
      {activeTab === 'demand' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demandRequests.map(req => (
              <div
                key={req.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400">{req.id}</span>
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">
                    {req.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{req.receiverName}</h4>
                <div className="flex items-center gap-2">
                  <span className="bg-slate-950 px-2 py-1 rounded text-blue-400 font-bold font-mono">
                    {req.requiredMeals} Meals Required
                  </span>
                  <span className="bg-slate-950 px-2 py-1 rounded text-amber-300 font-medium">
                    {req.urgency}
                  </span>
                  <span className="bg-slate-950 px-2 py-1 rounded text-slate-300">
                    {req.dietaryPreference}
                  </span>
                </div>
                <div className="text-slate-400">
                  Location: {req.location.address} • Contact: {req.contactPhone}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {claimingDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Claim Surplus Food for Your Beneficiaries</h3>
            <p className="text-xs text-slate-400 mt-1">
              Batch: <span className="text-white font-semibold">{claimingDonation.title}</span> ({claimingDonation.quantityKg} kg)
            </p>

            <form onSubmit={handleClaimSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Claiming Shelter / NGO</label>
                <select
                  value={receiverName}
                  onChange={e => {
                    setReceiverName(e.target.value);
                    if (e.target.value.includes('Asha')) setReceiverId('rec-asha');
                    else if (e.target.value.includes('Sneha')) setReceiverId('rec-sneha');
                    else setReceiverId('rec-shelter');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Asha Orphanage & Child Care">Asha Orphanage & Child Care (Ganga Sagar)</option>
                  <option value="Sneha Old Age Care Home">Sneha Old Age Care Home (Suratganj)</option>
                  <option value="Madhubani Community Night Shelter">Madhubani Community Night Shelter (Railway Colony)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Beneficiaries to be Served: <span className="text-emerald-400 font-mono font-bold">{beneficiaryCount} individuals</span>
                </label>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={beneficiaryCount}
                  onChange={e => setBeneficiaryCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setClaimingDonation(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  Confirm Claim & Dispatch Volunteer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Handover & Digital Signature Modal */}
      {deliveringDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Digital Receipt & Delivery Handover
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Finalize receipt of {deliveringDonation.quantityKg} kg ({deliveringDonation.servings} meals)
            </p>

            <form onSubmit={handleDeliveryConfirm} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Recipient Feedback on Food Freshness & Quality
                </label>
                <textarea
                  rows={2}
                  value={handoverFeedback}
                  onChange={e => setHandoverFeedback(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Authorized Signatory Name
                </label>
                <input
                  type="text"
                  value={signatureName}
                  onChange={e => setSignatureName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="bg-emerald-950/40 border border-emerald-600/40 rounded-xl p-3 text-[11px] text-emerald-300">
                Completing this handover records the avoided landfill emission in the Madhubani Circular Ledger.
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveringDonation(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  Sign & Complete Closed Loop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
