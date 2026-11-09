import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  UserRole,
  AppView,
  FoodDonation,
  FoodDemandRequest,
  VolunteerProfile,
  AuditLogEntry,
  CircularMetrics,
  QualityVerification,
  Algorithm1ExecutionResult,
  SimulationRunResult,
  SupportedLanguage,
} from '../types';
import {
  INITIAL_DONATIONS,
  INITIAL_DEMAND_REQUESTS,
  INITIAL_VOLUNTEERS,
  INITIAL_AUDIT_LOGS,
} from '../data/initialData';
import {
  calculateCircularMetrics,
  runAlgorithm1Allocation,
  runSyntheticSimulation,
  DEFAULT_EPSILON,
} from '../utils/calculations';
import { soundFx } from '../utils/audio';
import { getTranslation, TranslationDictionary } from '../utils/translations';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  navigateToRole: (role: UserRole) => void;
  donations: FoodDonation[];
  demandRequests: FoodDemandRequest[];
  volunteers: VolunteerProfile[];
  auditLogs: AuditLogEntry[];
  metrics: CircularMetrics;
  soundEnabled: boolean;
  toggleSound: () => void;
  demoModalOpen: boolean;
  setDemoModalOpen: (open: boolean) => void;
  paperModalOpen: boolean;
  setPaperModalOpen: (open: boolean) => void;
  paperModalTab: 'paper2' | 'paper1';
  setPaperModalTab: (tab: 'paper2' | 'paper1') => void;
  proofModalOpen: boolean;
  setProofModalOpen: (open: boolean) => void;
  simulationModalOpen: boolean;
  setSimulationModalOpen: (open: boolean) => void;
  lifecycleModalOpen: boolean;
  setLifecycleModalOpen: (open: boolean) => void;
  selectedDonation: FoodDonation | null;
  setSelectedDonation: (donation: FoodDonation | null) => void;
  
  // Multilingual & Cultural Adoption (Paper II Section 6.1)
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;

  // Paper II AI Optimization & Algorithm 1
  latestAlgorithm1Result: Algorithm1ExecutionResult | null;
  executeAlgorithm1: (epsilon?: number) => Algorithm1ExecutionResult;
  dispatchBatchWithAlgorithm1: () => number;

  // Paper II Section 5 Simulation
  latestSimulationResult: SimulationRunResult;
  runSimulation: (
    sampleSize?: number,
    expirySensitivity?: number,
    distanceDispersion?: number
  ) => SimulationRunResult;

  // Core Actions
  createDonation: (donation: Omit<FoodDonation, 'id' | 'status' | 'createdTimestamp'>) => string;
  claimDonation: (donationId: string, receiverId: string, receiverName: string) => void;
  acceptVolunteerTask: (donationId: string, volunteerId: string) => void;
  submitQualityCheck: (donationId: string, check: QualityVerification) => void;
  markInTransit: (donationId: string) => void;
  completeDelivery: (donationId: string, feedback?: string, signature?: string) => void;
  createDemandRequest: (req: Omit<FoodDemandRequest, 'id' | 'status' | 'createdAt'>) => void;
  resetAllData: () => void;
  simulateFullLifecycle: () => Promise<void>;
  isSimulating: boolean;
  simulationStep: string;
  simulationStage: number;
  simulationStepTitle: string;
  simulationStepDesc: string;
  simulationCountdownSec: number;
  activeSimulationBatchId: string | null;
  stopSimulation: () => void;
  skipToNextSimulationStep: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DONATIONS: 'zwfm_donations_v2',
  DEMANDS: 'zwfm_demands_v2',
  VOLUNTEERS: 'zwfm_volunteers_v2',
  AUDIT: 'zwfm_audit_v2',
  ROLE: 'zwfm_role_v2',
  SOUND: 'zwfm_sound_v2',
  LANG: 'zwfm_lang_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'provider';
  });

  const [donations, setDonations] = useState<FoodDonation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  const [demandRequests, setDemandRequests] = useState<FoodDemandRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEMANDS);
    return saved ? JSON.parse(saved) : INITIAL_DEMAND_REQUESTS;
  });

  const [volunteers, setVolunteers] = useState<VolunteerProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
    return saved !== null ? saved === 'true' : true;
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as SupportedLanguage) || 'en';
  });

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [paperModalOpen, setPaperModalOpen] = useState(false);
  const [paperModalTab, setPaperModalTab] = useState<'paper2' | 'paper1'>('paper2');
  const [simulationModalOpen, setSimulationModalOpen] = useState(false);
  const [lifecycleModalOpen, setLifecycleModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState('');
  const [simulationStage, setSimulationStage] = useState(0);
  const [simulationStepTitle, setSimulationStepTitle] = useState('');
  const [simulationStepDesc, setSimulationStepDesc] = useState('');
  const [simulationCountdownSec, setSimulationCountdownSec] = useState(0);
  const [activeSimulationBatchId, setActiveSimulationBatchId] = useState<string | null>(null);

  const stopRequestedRef = useRef(false);
  const skipRequestedRef = useRef(false);

  const t = getTranslation(language);

  // Paper II: Algorithm 1 Execution State
  const [latestAlgorithm1Result, setLatestAlgorithm1Result] = useState<Algorithm1ExecutionResult | null>(() => {
    return runAlgorithm1Allocation(INITIAL_DONATIONS, INITIAL_VOLUNTEERS, INITIAL_DEMAND_REQUESTS, DEFAULT_EPSILON);
  });

  // Paper II: Section 5 Simulation State
  const [latestSimulationResult, setLatestSimulationResult] = useState<SimulationRunResult>(() => {
    return runSyntheticSimulation(100, 1.0, 1.0, 42);
  });

  // Periodic clock trigger to keep time remaining & priorities dynamic
  const [, setClockTick] = useState<number>(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setClockTick(Date.now());
    }, 15000); // Ticks every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const navigateToRole = (targetRole: UserRole) => {
    setRoleState(targetRole);
    setCurrentView('operations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEMANDS, JSON.stringify(demandRequests));
  }, [demandRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOUND, String(soundEnabled));
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  let auditCounter = 0;
  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    auditCounter += 1;
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `AUD-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${auditCounter}`,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Algorithm 1 Execution Helper
  const executeAlgorithm1 = (epsilon: number = DEFAULT_EPSILON): Algorithm1ExecutionResult => {
    const result = runAlgorithm1Allocation(donations, volunteers, demandRequests, epsilon);
    setLatestAlgorithm1Result(result);
    addAuditLog({
      actorRole: 'admin',
      actorName: 'AI Optimization Core (ICIPAI 2026 Engine)',
      action: 'ALGORITHM_1_EXECUTED',
      details: `Evaluated ${result.totalCandidates} surplus batches. Ranked ${result.rankedAllocations.length} allocations in ${result.executionTimeMs}ms with complexity ${result.complexity}.`,
    });
    return result;
  };

  // Dispatch Batch with Algorithm 1
  const dispatchBatchWithAlgorithm1 = (): number => {
    const result = runAlgorithm1Allocation(donations, volunteers, demandRequests, DEFAULT_EPSILON);
    setLatestAlgorithm1Result(result);

    let assignedCount = 0;
    const updatedDonations = donations.map(d => {
      const match = result.rankedAllocations.find(m => m.donationId === d.id);
      if (match && (d.status === 'AVAILABLE' || d.status === 'CLAIMED')) {
        assignedCount++;
        return {
          ...d,
          status: 'VOLUNTEER_ASSIGNED' as const,
          assignedVolunteerId: match.assignedVolunteerId,
          assignedVolunteerName: match.assignedVolunteerName,
          assignedVolunteerPhone: match.assignedVolunteerPhone,
          claimedByReceiverId: d.claimedByReceiverId || match.targetReceiverId,
          claimedByReceiverName: d.claimedByReceiverName || match.targetReceiverName,
          claimedTimestamp: d.claimedTimestamp || new Date().toISOString(),
        };
      }
      return d;
    });

    setDonations(updatedDonations);
    soundFx.playNotification();

    addAuditLog({
      actorRole: 'admin',
      actorName: 'AI Optimization Engine (Algorithm 1)',
      action: 'PRIORITY_BATCH_DISPATCH_CONFIRMED',
      details: `Successfully auto-dispatched ${assignedCount} prioritized batches to nearest community volunteers in accordance with Paper II Section 3.5.`,
    });

    return assignedCount;
  };

  // Simulation Runner
  const runSimulation = (
    sampleSize: number = 100,
    expirySensitivity: number = 1.0,
    distanceDispersion: number = 1.0
  ): SimulationRunResult => {
    const result = runSyntheticSimulation(sampleSize, expirySensitivity, distanceDispersion, Date.now());
    setLatestSimulationResult(result);
    addAuditLog({
      actorRole: 'admin',
      actorName: 'Simulation & Evaluation Harness (Paper II, Sec 5)',
      action: 'SYNTHETIC_EVALUATION_RUN',
      details: `Generated n=${sampleSize} synthetic entries. WRR: +${result.wrrImprovementPercent}%, TDO: +${result.travelDistanceOptimizationPercent}%, Runtime: ${result.runtimeMs}ms.`,
    });
    return result;
  };

  const createDonation = (donationData: Omit<FoodDonation, 'id' | 'status' | 'createdTimestamp'>): string => {
    const newId = `DON-2026-${String(Date.now()).slice(-4)}-${Math.floor(Math.random() * 900 + 100)}`;
    const newDonation: FoodDonation = {
      ...donationData,
      id: newId,
      status: 'AVAILABLE',
      createdTimestamp: new Date().toISOString(),
    };
    setDonations(prev => [newDonation, ...prev]);
    addAuditLog({
      actorRole: 'provider',
      actorName: donationData.providerName,
      action: 'SURPLUS_LISTING_PUBLISHED',
      details: `Registered ${donationData.quantityKg} kg (${donationData.servings} meals) of ${donationData.title}. AI Optimization Layer computing priority score.`,
      relatedDonationId: newId,
    });
    soundFx.playNotification();
    return newId;
  };

  const claimDonation = (donationId: string, receiverId: string, receiverName: string) => {
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'CLAIMED',
            claimedByReceiverId: receiverId,
            claimedByReceiverName: receiverName,
            claimedTimestamp: new Date().toISOString(),
          };
        }
        return d;
      })
    );
    addAuditLog({
      actorRole: 'receiver',
      actorName: receiverName,
      action: 'DONATION_CLAIMED',
      details: `Claimed donation ${donationId}. Immediate volunteer dispatch notification broadcasted via priority score weighting.`,
      relatedDonationId: donationId,
    });
    soundFx.playNotification();
  };

  const acceptVolunteerTask = (donationId: string, volunteerId: string) => {
    const volunteer = volunteers.find(v => v.id === volunteerId) || volunteers[0];
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'VOLUNTEER_ASSIGNED',
            assignedVolunteerId: volunteer.id,
            assignedVolunteerName: volunteer.name,
            assignedVolunteerPhone: volunteer.phone,
          };
        }
        return d;
      })
    );
    addAuditLog({
      actorRole: 'volunteer',
      actorName: volunteer.name,
      action: 'VOLUNTEER_TASK_ACCEPTED',
      details: `Accepted priority dispatch for ${donationId}. Navigating via ${volunteer.vehicleType} for quality inspection.`,
      relatedDonationId: donationId,
    });
    soundFx.playNotification();
  };

  const submitQualityCheck = (donationId: string, check: QualityVerification) => {
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          const newStatus = check.passedAll ? 'QUALITY_VERIFIED' : 'REJECTED_QUALITY';
          return {
            ...d,
            status: newStatus,
            qualityCheck: check,
          };
        }
        return d;
      })
    );
    if (check.passedAll) {
      soundFx.playQualityPass();
      addAuditLog({
        actorRole: 'volunteer',
        actorName: check.inspectedByVolunteerName,
        action: 'QUALITY_VERIFIED_PASSED',
        details: `Food safety checklist passed: Temp ${check.measuredTempCelsius}°C, fresh sensory aroma, hygienic containers. Ready for transit.`,
        relatedDonationId: donationId,
      });
    } else {
      addAuditLog({
        actorRole: 'volunteer',
        actorName: check.inspectedByVolunteerName,
        action: 'QUALITY_VERIFIED_FAILED',
        details: `Food safety check failed! Details: ${check.notes}. Batch rejected to protect public health.`,
        relatedDonationId: donationId,
      });
    }
  };

  const markInTransit = (donationId: string) => {
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'IN_TRANSIT',
          };
        }
        return d;
      })
    );
    addAuditLog({
      actorRole: 'volunteer',
      actorName: 'Assigned Volunteer',
      action: 'TRANSIT_DISPATCHED',
      details: `Surplus food collected from provider. Active GPS transit towards recipient shelter.`,
      relatedDonationId: donationId,
    });
  };

  const completeDelivery = (donationId: string, feedback?: string, signature?: string) => {
    let resolvedItem: FoodDonation | undefined;

    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          resolvedItem = d;
          return {
            ...d,
            status: 'DELIVERED',
            deliveredTimestamp: new Date().toISOString(),
            recipientFeedback: feedback || 'Delivered safely and served promptly to beneficiaries.',
            recipientSignature: signature || 'Verified Recipient Representative',
          };
        }
        return d;
      })
    );

    const target = resolvedItem || donations.find(d => d.id === donationId);

    // Update volunteer stats
    if (target?.assignedVolunteerId) {
      setVolunteers(prev =>
        prev.map(v => {
          if (v.id === target.assignedVolunteerId) {
            return {
              ...v,
              totalDeliveries: v.totalDeliveries + 1,
              totalKgSaved: v.totalKgSaved + (target.quantityKg || 0),
            };
          }
          return v;
        })
      );
    }

    addAuditLog({
      actorRole: 'receiver',
      actorName: target?.claimedByReceiverName || 'Receiver Organization',
      action: 'DELIVERY_CONFIRMED',
      details: `Delivery confirmed for ${target?.quantityKg || 50} kg (${target?.servings || 110} meals). Circular loop completed!`,
      relatedDonationId: donationId,
    });

    soundFx.playSuccess();
  };

  const createDemandRequest = (req: Omit<FoodDemandRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: FoodDemandRequest = {
      ...req,
      id: `DEM-2026-${String(demandRequests.length + 1).padStart(3, '0')}`,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };
    setDemandRequests(prev => [newReq, ...prev]);
    addAuditLog({
      actorRole: 'receiver',
      actorName: req.receiverName,
      action: 'DEMAND_REQUEST_POSTED',
      details: `Posted requirement for ${req.requiredMeals} meals. Urgency: ${req.urgency}. Fed into AI matching layer.`,
    });
    soundFx.playNotification();
  };

  const resetAllData = () => {
    setDonations(INITIAL_DONATIONS);
    setDemandRequests(INITIAL_DEMAND_REQUESTS);
    setVolunteers(INITIAL_VOLUNTEERS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setLatestAlgorithm1Result(runAlgorithm1Allocation(INITIAL_DONATIONS, INITIAL_VOLUNTEERS, INITIAL_DEMAND_REQUESTS, DEFAULT_EPSILON));
    setLatestSimulationResult(runSyntheticSimulation(100, 1.0, 1.0, 42));
    localStorage.removeItem(STORAGE_KEYS.DONATIONS);
    localStorage.removeItem(STORAGE_KEYS.DEMANDS);
    localStorage.removeItem(STORAGE_KEYS.VOLUNTEERS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT);
  };

  const stopSimulation = () => {
    stopRequestedRef.current = true;
    setIsSimulating(false);
    setSimulationStage(0);
    setSimulationStep('');
    setSimulationStepTitle('');
    setSimulationStepDesc('');
    setSimulationCountdownSec(0);
    setActiveSimulationBatchId(null);
  };

  const skipToNextSimulationStep = () => {
    skipRequestedRef.current = true;
  };

  const waitStep = async (seconds = 3): Promise<boolean> => {
    for (let s = seconds; s > 0; s--) {
      if (stopRequestedRef.current) return false;
      if (skipRequestedRef.current) {
        skipRequestedRef.current = false;
        return true;
      }
      setSimulationCountdownSec(s);
      await new Promise(r => setTimeout(r, 1000));
    }
    setSimulationCountdownSec(0);
    return !stopRequestedRef.current;
  };

  // Automated step-by-step lifecycle simulation
  const simulateFullLifecycle = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    stopRequestedRef.current = false;
    skipRequestedRef.current = false;

    // Immediately close background modals and switch view to operations workspace!
    setLifecycleModalOpen(false);
    setDemoModalOpen(false);
    setSimulationModalOpen(false);
    setCurrentView('operations');

    try {
      // STEP 1: Food Provider
      setRole('provider');
      setSimulationStage(1);
      setSimulationStepTitle('Step 1 of 5: Food Provider Workspace (Surplus Meal Logging)');
      setSimulationStepDesc('Commercial Dining Mess logs 50 kg freshly cooked Paneer Masala & Jeera Rice (Safe Window: 3.5h, 63°C). Real-time batch is registered into the system.');
      setSimulationStep('Step 1/5: Food Provider registers 50kg fresh surplus meals with safe expiry...');
      window.scrollTo({ top: 110, behavior: 'smooth' });
      soundFx.playNotification();

      const newId = createDonation({
        title: '⚡ Live Simulation Batch: Fresh Paneer Butter Masala, Jeera Rice & Rotis',
        category: 'Cooked Meals',
        dietary: 'Vegetarian',
        condition: 'Hot & Fresh',
        quantityKg: 50,
        servings: 110,
        packaging: 'Thermal Insulated Aluminum Food Carriers',
        prepTimestamp: new Date().toISOString(),
        expiryTimestamp: new Date(Date.now() + 3.5 * 60 * 60 * 1000).toISOString(),
        storageTempCelsius: 63,
        specialInstructions: 'Prepared by Sandip University Guest House Banquet; untouched surplus.',
        providerId: 'prov-sandip-guest',
        providerName: 'Sandip University Guest House Banquet',
        providerType: 'Hostel Mess',
        location: {
          lat: 26.3690,
          lng: 86.0580,
          address: 'Sandip University, Sijoul, Madhubani',
          zone: 'University Educational Zone',
        },
        contactPhone: '+91 94314 00022 (Central Helpline)',
      });
      setActiveSimulationBatchId(newId);

      // Wait 3 seconds on Provider Dashboard
      let ok = await waitStep(3);
      if (!ok) return;

      // STEP 2: Food Receiver & AI Priority Evaluation
      setRole('receiver');
      setSimulationStage(2);
      setSimulationStepTitle('Step 2 of 5: Food Receiver Workspace (AI Priority & Shelter Claim)');
      setSimulationStepDesc('Paper II Equation (2) computes Priority Score = 7.7. Asha Child Care Shelter claims the critical batch on the live incoming feed.');
      setSimulationStep('Step 2/5: AI Optimization Layer computes Priority score and alerts Receiver shelter...');
      window.scrollTo({ top: 110, behavior: 'smooth' });
      soundFx.playNotification();
      claimDonation(newId, 'rec-asha', 'Asha Child Care Shelter (Ref: R-1)');

      // Wait 3 seconds on Receiver Dashboard
      ok = await waitStep(3);
      if (!ok) return;

      // STEP 3: Community Volunteer (Algorithm 1 Matching)
      setRole('volunteer');
      setSimulationStage(3);
      setSimulationStepTitle('Step 3 of 5: Community Volunteer Workspace (Algorithm 1 Matching)');
      setSimulationStepDesc('Algorithm 1 sorts candidates in O(n log n) and matches nearest volunteer Dispatcher V-8802 (1.6 km away, Two-Wheeler EV) for immediate dispatch.');
      setSimulationStep('Step 3/5: Algorithm 1 pairs highest priority batch with nearest available Volunteer...');
      window.scrollTo({ top: 110, behavior: 'smooth' });
      soundFx.playNotification();
      acceptVolunteerTask(newId, 'vol-1');

      // Wait 3 seconds on Volunteer Dashboard
      ok = await waitStep(3);
      if (!ok) return;

      // STEP 4: Food Safety Inspection & Transit
      setSimulationStage(4);
      setSimulationStepTitle('Step 4 of 5: FSSAI 5-Point Quality Verification Protocol');
      setSimulationStepDesc('Volunteer performs on-site verification: Fresh aroma, thermal probe verifies 62°C (>60°C hot threshold), sealed container packaging. Status set to In Transit.');
      setSimulationStep('Step 4/5: Volunteer conducts in-person Food Safety Quality Verification Protocol...');
      window.scrollTo({ top: 110, behavior: 'smooth' });
      soundFx.playNotification();
      submitQualityCheck(newId, {
        inspectedAt: new Date().toISOString(),
        inspectedByVolunteerName: 'Volunteer Dispatcher V-8802',
        passedAll: true,
        visualCheck: true,
        smellCheck: true,
        temperatureCheck: true,
        packagingIntegrity: true,
        timeWindowValid: true,
        measuredTempCelsius: 62,
        notes: 'Freshly prepared, steam rising, temperature safely >60°C. Verified safe by volunteer protocol.',
      });
      markInTransit(newId);

      // Wait 3 seconds on In-Transit Volunteer Dashboard
      ok = await waitStep(3);
      if (!ok) return;

      // STEP 5: Delivery Complete & Admin Ledger
      completeDelivery(
        newId,
        'Successfully served 110 warm dinners to residents and staff at the shelter.',
        'Authorized Shelter Representative (Ref: CR-01)'
      );
      setRole('admin');
      setSimulationStage(5);
      setSimulationStepTitle('Step 5 of 5: Administrator Governance (Circular Ledger & Verification)');
      setSimulationStepDesc('QR handover confirmed at shelter! Cryptographic record logged in immutable circular audit ledger. Global metrics updated: +110 meals, +125 kg CO₂e saved, +52.5k L water conserved.');
      setSimulationStep('Step 5/5: In-transit delivery & Handover confirmed at shelter! Circular impact recorded.');
      window.scrollTo({ top: 110, behavior: 'smooth' });
      soundFx.playSuccess();

      // Wait 3.5 seconds on Admin Dashboard
      ok = await waitStep(3);
      if (!ok) return;

      // STEP 6: Complete
      setSimulationStage(6);
      setSimulationStepTitle('✅ Simulation Complete: Full 5-Step Closed-Loop Verified!');
      setSimulationStepDesc('The end-to-end circular pipeline has succeeded: Source Logging -> AI Optimization -> Volunteer Dispatch -> Safety Verification -> Confirmed Handover.');
      soundFx.playSuccess();
      await new Promise(r => setTimeout(r, 4000));
    } finally {
      if (!stopRequestedRef.current) {
        setIsSimulating(false);
        setSimulationStage(0);
        setSimulationStep('');
        setSimulationStepTitle('');
        setSimulationStepDesc('');
        setSimulationCountdownSec(0);
        setActiveSimulationBatchId(null);
      }
    }
  };

  const metrics = calculateCircularMetrics(donations);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentView,
        setCurrentView,
        navigateToRole,
        donations,
        demandRequests,
        volunteers,
        auditLogs,
        metrics,
        soundEnabled,
        toggleSound,
        demoModalOpen,
        setDemoModalOpen,
        paperModalOpen,
        setPaperModalOpen,
        paperModalTab,
        setPaperModalTab,
        proofModalOpen,
        setProofModalOpen,
        simulationModalOpen,
        setSimulationModalOpen,
        lifecycleModalOpen,
        setLifecycleModalOpen,
        selectedDonation,
        setSelectedDonation,
        language,
        setLanguage,
        t,
        latestAlgorithm1Result,
        executeAlgorithm1,
        dispatchBatchWithAlgorithm1,
        latestSimulationResult,
        runSimulation,
        createDonation,
        claimDonation,
        acceptVolunteerTask,
        submitQualityCheck,
        markInTransit,
        completeDelivery,
        createDemandRequest,
        resetAllData,
        simulateFullLifecycle,
        isSimulating,
        simulationStep,
        simulationStage,
        simulationStepTitle,
        simulationStepDesc,
        simulationCountdownSec,
        activeSimulationBatchId,
        stopSimulation,
        skipToNextSimulationStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
