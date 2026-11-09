import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  PlusCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  Sparkles,
  AlertCircle,
  Phone,
  Flame,
  Truck,
  ExternalLink,
} from 'lucide-react';
import { FoodCategory, FoodDietary, FoodCondition, FoodDonation } from '../types';
import { formatTimeRemaining, evaluateDonationPriority, calculateBasicPriority } from '../utils/calculations';

export const ProviderDashboard: React.FC = () => {
  const { donations, createDonation, setSelectedDonation, activeSimulationBatchId } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateDonation, setCertificateDonation] = useState<FoodDonation | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Cooked Meals');
  const [dietary, setDietary] = useState<FoodDietary>('Vegetarian');
  const [condition, setCondition] = useState<FoodCondition>('Hot & Fresh');
  const [quantityKg, setQuantityKg] = useState<number>(30);
  const [servings, setServings] = useState<number>(65);
  const [expiryHours, setExpiryHours] = useState<number>(4);
  const [packaging, setPackaging] = useState('Stainless steel sealed thermal containers');
  const [tempCelsius, setTempCelsius] = useState<number>(62);
  const [providerName, setProviderName] = useState('Sandip University SOCSE Hostel Mess');
  const [providerType, setProviderType] = useState<FoodDonation['providerType']>('Hostel Mess');
  const [address, setAddress] = useState('Sandip University Campus, Sijoul, Madhubani');
  const [phone, setPhone] = useState('+91 94314 00022 (Pilot Desk)');
  const [specialInstructions, setSpecialInstructions] = useState(
    'Freshly cooked student lunch batch; hygienically packed in insulated drums.'
  );

  const handleKgChange = (val: number) => {
    setQuantityKg(val);
    setServings(Math.round(val / 0.45)); // ~450g per meal
  };

  const loadPreset = (preset: 'hostel' | 'banquet' | 'bakery') => {
    if (preset === 'hostel') {
      setTitle('Student Mess Surplus: Dal Tadka, Seasonal Sabzi, Steamed Rice & Chapatis');
      setCategory('Hostel Mess Batch');
      setDietary('Vegetarian');
      setCondition('Hot & Fresh');
      setQuantityKg(40);
      setServings(90);
      setExpiryHours(4);
      setPackaging('Insulated stainless steel drums');
      setTempCelsius(64);
      setProviderName('Sandip University SOCSE Hostel Mess');
      setProviderType('Hostel Mess');
      setAddress('Sandip University Campus, Sijoul, Madhubani');
      setSpecialInstructions('Cooked for 1:00 PM lunch; surplus untouched in hot containers.');
    } else if (preset === 'banquet') {
      setTitle('Grand Wedding Feast: Shahi Paneer, Jeera Pulao, Dal Makhani & Naan');
      setCategory('Cooked Meals');
      setDietary('Vegetarian');
      setCondition('Hot & Fresh');
      setQuantityKg(70);
      setServings(150);
      setExpiryHours(5);
      setPackaging('Food-grade sealed aluminum catering containers');
      setTempCelsius(65);
      setProviderName('Commercial Banquet Facility (Pilot B-1)');
      setProviderType('Marriage Hall / Banquet');
      setAddress('Babubarhi Road Commercial Zone, Madhubani');
      setSpecialInstructions('Post-afternoon wedding buffet; preserved in commercial hot warmers.');
    } else {
      setTitle('Fresh Baked Sandwich Bread, Veg Patties & Sweet Buns');
      setCategory('Bakery & Bread');
      setDietary('Vegetarian');
      setCondition('Ambient / Room Temp');
      setQuantityKg(22);
      setServings(55);
      setExpiryHours(12);
      setPackaging('Cardboard bakery boxes with moisture-lock parchment');
      setTempCelsius(24);
      setProviderName('Bakery & Confectionery Unit (Pilot C-1)');
      setProviderType('Bakery');
      setAddress('Station Road Commercial Sector, Madhubani');
      setSpecialInstructions('Morning bake surplus; perfect for tea-time distribution at elder care.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createDonation({
      title,
      category,
      dietary,
      condition,
      quantityKg: Number(quantityKg),
      servings: Number(servings),
      packaging,
      prepTimestamp: new Date().toISOString(),
      expiryTimestamp: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString(),
      storageTempCelsius: tempCelsius,
      specialInstructions,
      providerId: `prov-${Date.now()}`,
      providerName,
      providerType,
      location: {
        lat: 26.3685,
        lng: 86.0590,
        address,
        zone: 'Madhubani Semi-Urban Zone',
      },
      contactPhone: phone,
    });

    setShowForm(false);
    setTitle('');
  };

  // Provider's donations
  const providerDonations = donations;

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                Food Provider Portal • Circular Economy Node
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Surplus Food Redirection Hub
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Turn unavoidable edible surplus from university messes, catering, and restaurants into vital community nutrition instead of methane-producing landfill waste.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showForm ? 'Close Form' : 'Register Surplus Food'}</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        {showForm && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">Quick-Fill Presets:</span>
            <button
              type="button"
              onClick={() => loadPreset('hostel')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500 cursor-pointer"
            >
              🍲 Sandip University Hostel (40 kg)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('banquet')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500 cursor-pointer"
            >
              🎉 Wedding Buffet Feast (70 kg)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('bakery')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500 cursor-pointer"
            >
              🍞 Bakery Evening Breads (22 kg)
            </button>
          </div>
        )}
      </div>

      {/* Registration Form (Collapsible / Modal-like) */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-400" />
              Surplus Food Batch Specification
            </h3>
            <span className="text-xs text-slate-400">
              Compliant with Section 5 Verification Requirements
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Food Title & Item Description *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Steamed Basmati Rice, Arhar Dal Tadka, Paneer Butter Masala & Rotis"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as FoodCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Cooked Meals">Cooked Meals (Warm Curries, Rice, Breads)</option>
                <option value="Hostel Mess Batch">Hostel Mess Batch</option>
                <option value="Bakery & Bread">Bakery & Bread</option>
                <option value="Dairy & Sweets">Dairy & Sweets</option>
                <option value="Packaged Food">Packaged / Canned Food</option>
                <option value="Fresh Produce">Fresh Produce / Fruits</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Dietary Type</label>
              <select
                value={dietary}
                onChange={e => setDietary(e.target.value as FoodDietary)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Vegetarian">Pure Vegetarian (Most Common)</option>
                <option value="Vegan">Vegan (Plant Based)</option>
                <option value="Jain Friendly">Jain Friendly (No Root Veg)</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Quantity (Kilograms): <span className="text-amber-400 font-mono font-bold">{quantityKg} kg</span>
              </label>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={quantityKg}
                onChange={e => handleKgChange(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-slate-800 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5 kg</span>
                <span>Calculated: ~{servings} portions</span>
                <span>150 kg</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Safe Consumption Window: <span className="text-emerald-400 font-mono font-bold">{expiryHours} hours</span>
              </label>
              <input
                type="range"
                min="2"
                max="18"
                step="1"
                value={expiryHours}
                onChange={e => setExpiryHours(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>2 hrs (Immediate)</span>
                <span>Must be delivered before expiry</span>
                <span>18 hrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Storage Condition & Temp</label>
              <div className="flex gap-2">
                <select
                  value={condition}
                  onChange={e => {
                    const c = e.target.value as FoodCondition;
                    setCondition(c);
                    if (c === 'Hot & Fresh') setTempCelsius(62);
                    else if (c === 'Chilled / Refrigerated') setTempCelsius(4);
                    else setTempCelsius(24);
                  }}
                  className="w-2/3 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Hot & Fresh">Hot & Fresh (&gt;60°C)</option>
                  <option value="Chilled / Refrigerated">Chilled / Refrigerated (&lt;5°C)</option>
                  <option value="Ambient / Room Temp">Ambient / Room Temp</option>
                  <option value="Dry Packaged">Dry Packaged</option>
                </select>
                <div className="w-1/3 flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2">
                  <span className="text-xs text-slate-400">Temp:</span>
                  <input
                    type="number"
                    value={tempCelsius}
                    onChange={e => setTempCelsius(Number(e.target.value))}
                    className="w-full bg-transparent text-xs font-mono text-white text-right focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">°C</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Packaging Type</label>
              <input
                type="text"
                value={packaging}
                onChange={e => setPackaging(e.target.value)}
                placeholder="e.g. Stainless steel drums, foil trays"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Provider Organization & Type</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={providerName}
                  onChange={e => setProviderName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <select
                  value={providerType}
                  onChange={e => setProviderType(e.target.value as FoodDonation['providerType'])}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Hostel Mess">Hostel Mess</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Marriage Hall / Banquet">Marriage Hall / Banquet</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Catering">Catering</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Pickup Address & Phone</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Special Handling & Volunteer Instructions
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={e => setSpecialInstructions(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Paper II Dynamic Urgency Score Forecast */}
            {(() => {
              const forecastScore = calculateBasicPriority(quantityKg, expiryHours, 0.1);
              return (
                <div className="bg-slate-900 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Paper II Priority Score Forecast (Equation 1)</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5 font-mono">
                      Priority_i = {quantityKg} kg / ({expiryHours}h + 0.1) = <strong className="text-white font-mono text-sm">{forecastScore} pts</strong>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      forecastScore >= 15
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {forecastScore >= 15 ? 'CRITICAL DISPATCH PRIORITY' : 'STANDARD DISPATCH'}
                  </span>
                </div>
              );
            })()}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Broadcast Surplus to Network</span>
            </button>
          </div>
        </form>
      )}

      {/* Active Surplus Listings Management */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Your Registered Surplus Batches</span>
              <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                {providerDonations.length} records
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Track real-time progress from listing to receiver consumption
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providerDonations.map(donation => {
            const timeInfo = formatTimeRemaining(donation.expiryTimestamp);

            let statusBadge = (
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                Available for Claim
              </span>
            );

            if (donation.status === 'CLAIMED') {
              statusBadge = (
                <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">
                  Claimed by NGO
                </span>
              );
            } else if (donation.status === 'VOLUNTEER_ASSIGNED') {
              statusBadge = (
                <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-bold">
                  Volunteer Dispatched
                </span>
              );
            } else if (donation.status === 'QUALITY_VERIFIED' || donation.status === 'IN_TRANSIT') {
              statusBadge = (
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Truck className="w-3 h-3 animate-bounce" /> In Transit
                </span>
              );
            } else if (donation.status === 'DELIVERED') {
              statusBadge = (
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Delivered & Served
                </span>
              );
            }

            const isSimBatch = donation.id === activeSimulationBatchId;

            return (
              <div
                key={donation.id}
                className={`rounded-2xl p-4 shadow-md flex flex-col justify-between transition-all ${
                  isSimBatch
                    ? 'bg-amber-950/40 border-2 border-amber-400 ring-4 ring-amber-400/20 shadow-xl shadow-amber-950/60 scale-[1.01]'
                    : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {isSimBatch && (
                    <div className="mb-2.5 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/60 text-amber-300 text-[11px] font-mono font-bold flex items-center justify-between animate-pulse">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>⚡ LIVE SIMULATION BATCH (STEP 1: LOGGED)</span>
                      </span>
                      <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-extrabold uppercase">Active</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-slate-400">{donation.id}</span>
                    {statusBadge}
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-2">{donation.title}</h4>

                  <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs">
                    <span className="bg-slate-900 border border-slate-800 text-amber-300 font-mono font-bold px-2 py-0.5 rounded">
                      {donation.quantityKg} kg
                    </span>
                    <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      ~{donation.servings} meals
                    </span>
                    <span className="bg-slate-900 border border-slate-800 text-emerald-400 px-2 py-0.5 rounded">
                      {donation.dietary}
                    </span>
                  </div>

                  {/* Expiry safe window */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs">
                    <Clock
                      className={`w-3.5 h-3.5 ${
                        timeInfo.isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-400'
                      }`}
                    />
                    <span
                      className={`font-mono ${
                        timeInfo.isUrgent ? 'text-rose-400 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {timeInfo.text}
                    </span>
                  </div>

                  {/* Paper II Priority Badge */}
                  {(() => {
                    const priority = evaluateDonationPriority(donation);
                    return (
                      <div className="mt-2.5 p-2 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-[10px]">
                        <span className="text-slate-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>AI Priority (Eq. 2):</span>
                        </span>
                        <span
                          className={`font-bold px-1.5 py-0.5 rounded ${
                            priority.tier === 'CRITICAL'
                              ? 'bg-red-950 text-red-300 border border-red-800'
                              : priority.tier === 'HIGH'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : priority.tier === 'MEDIUM'
                              ? 'bg-blue-950 text-blue-300 border border-blue-800'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {priority.locationAwareScore} pts ({priority.tier})
                        </span>
                      </div>
                    );
                  })()}

                  {/* Flow Details */}
                  {donation.claimedByReceiverName && (
                    <div className="mt-2 text-xs bg-slate-900/60 p-2 rounded-lg border border-slate-800 text-slate-300">
                      <div className="text-[10px] text-slate-400">Receiver:</div>
                      <div className="font-semibold text-white">{donation.claimedByReceiverName}</div>
                    </div>
                  )}

                  {donation.assignedVolunteerName && (
                    <div className="mt-1.5 text-xs bg-slate-900/60 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400">Volunteer:</div>
                        <div className="font-semibold text-emerald-400">
                          {donation.assignedVolunteerName}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {donation.assignedVolunteerPhone}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedDonation(donation)}
                    className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Audit Trail</span>
                  </button>

                  {donation.status === 'DELIVERED' && (
                    <button
                      onClick={() => {
                        setCertificateDonation(donation);
                        setShowCertificate(true);
                      }}
                      className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 bg-amber-950/60 border border-amber-800/60 px-2 py-1 rounded-lg cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Green Donor Certificate Modal */}
      {showCertificate && certificateDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden p-6 relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowCertificate(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b border-amber-500/20 pb-4">
              <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-300 tracking-wide uppercase">
                Certificate of Sustainable Redistribution
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Under the Zero Waste Circular Economy Framework • JIGSY INDIA
              </p>
            </div>

            {/* Certificate Body */}
            <div className="py-6 space-y-4 text-center">
              <p className="text-xs text-slate-300">
                This certifies that the surplus food provider:
              </p>
              <div className="text-lg font-bold text-white uppercase tracking-wider">
                {certificateDonation.providerName}
              </div>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Successfully prevented <span className="font-bold text-emerald-400">{certificateDonation.quantityKg} kg</span> of edible surplus from landfill disposal, nourishing <span className="font-bold text-white">{certificateDonation.servings} individuals</span> via {certificateDonation.claimedByReceiverName || 'authorized community receiver'}.
              </p>

              {/* Environmental Impact Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">GHG Avoided</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">
                    {(certificateDonation.quantityKg * 2.5).toFixed(1)} kg CO₂e
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Water Conserved</div>
                  <div className="text-sm font-bold text-blue-400 font-mono">
                    {(certificateDonation.quantityKg * 1050).toLocaleString()} L
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Economic Value</div>
                  <div className="text-sm font-bold text-amber-400 font-mono">
                    ₹{(certificateDonation.servings * 55).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Signatures */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="text-left">
                <div className="font-mono text-[10px] text-emerald-400">VERIFIED SAFE</div>
                <div>JIGSY Circular Governance</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] text-slate-300">Sandip University, Madhubani</div>
                <div>Circular Economy Node</div>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer"
              >
                Print / Save PDF Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
