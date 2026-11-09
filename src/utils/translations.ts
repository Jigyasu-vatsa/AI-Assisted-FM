import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  // Navigation & Header
  brandName: string;
  brandTagline: string;
  navHome: string;
  navServices: string;
  navContact: string;
  navAboutDev: string;
  rolesHeading: string;
  roleProvider: string;
  roleReceiver: string;
  roleVolunteer: string;
  roleAdmin: string;
  proofDossier: string;
  paper2Title: string;
  aiSimTitle: string;
  walkthroughGuide: string;
  interactiveDemoBtn: string;
  resetBtn: string;
  audioToggle: string;

  // Impact Metrics
  mealsServed: string;
  mealsServedSub: string;
  co2Avoided: string;
  co2AvoidedSub: string;
  waterSaved: string;
  waterSavedSub: string;
  diversionRate: string;
  diversionRateSub: string;

  // Hero Section
  heroBadge1: string;
  heroBadge2: string;
  heroBadgeAffiliation: string;
  heroTitle: string;
  heroDesc: string;
  btnExploreWorkspaces: string;
  btnAiSimulation: string;
  btnReadPaper: string;
  btnInteractiveDemo: string;

  // Concept & Workings Section
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  stage1Title: string;
  stage1Desc: string;
  stage2Title: string;
  stage2Desc: string;
  stage3Title: string;
  stage3Desc: string;
  stage4Title: string;
  stage4Desc: string;
  stage5Title: string;
  stage5Desc: string;

  // Simulation Modal Translations
  simModalTitle: string;
  simModalSubtitle: string;
  simTab100: string;
  simTabTable1: string;
  simTabSandbox: string;
  simTabCore: string;
  simRunBtn: string;
  simRunning: string;
  simSampleSize: string;
  simSensitivity: string;
  simDistanceDispersion: string;
  simSpoilageReduction: string;
  simWrrImprovement: string;
  simDistanceReduction: string;
  simZeroSpoilageAchieved: string;
  simProposedModel: string;
  simFcfsBaseline: string;
  simMetricCol: string;
  simFcfsCol: string;
  simAiModelCol: string;
  simGainCol: string;
  simVoiceAnnounce: string;
  readPaperBtn: string;
  viewPaperPdfBtn: string;

  // Section Headers
  advantagesTitle: string;
  advantagesSubtitle: string;
  methodologyTitle: string;
  methodologySubtitle: string;
  operationalRolesTitle: string;
  operationalRolesSubtitle: string;
  radarTitle: string;
  radarSubtitle: string;

  // Spoken Steps (Female Voice Narration)
  speechStage1: string;
  speechStage2: string;
  speechStage3: string;
  speechStage4: string;
  speechStage5: string;
  speechSimDone: string;

  // Common UI
  close: string;
  back: string;
  next: string;
  simulate: string;
  autoPlay: string;
  pause: string;
  verified: string;
  priorityScore: string;

  // AI-Assisted Explainer Section
  aiMeaningBadge: string;
  aiMeaningTitle: string;
  aiMeaningSubtitle: string;
  aiPillar1Title: string;
  aiPillar1Desc: string;
  aiPillar2Title: string;
  aiPillar2Desc: string;
  aiPillar3Title: string;
  aiPillar3Desc: string;
  aiNeedSectionTitle: string;
  aiNeedSectionSubtitle: string;
  aiNeedPoint1Title: string;
  aiNeedPoint1Desc: string;
  aiNeedPoint2Title: string;
  aiNeedPoint2Desc: string;
  aiNeedPoint3Title: string;
  aiNeedPoint3Desc: string;
  aiCompareTitle: string;
  aiCompareSubtitle: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: 'JIGSY INDIA',
    brandTagline: 'Zero Waste Food Management',
    navHome: 'Home',
    navServices: 'Services',
    navContact: 'Contact',
    navAboutDev: 'About Developer',
    rolesHeading: 'ROLES:',
    roleProvider: 'Food Provider',
    roleReceiver: 'Food Receiver',
    roleVolunteer: 'Community Volunteer',
    roleAdmin: 'Administrator',
    proofDossier: 'Proof Dossier',
    paper2Title: 'Paper II (AI)',
    aiSimTitle: 'AI Optimizer & Sim',
    walkthroughGuide: 'Walkthrough Guide',
    interactiveDemoBtn: 'How Concept Works',
    resetBtn: 'Reset Data',
    audioToggle: 'Audio FX',

    mealsServed: 'Meals Served',
    mealsServedSub: 'Verified documented portions',
    co2Avoided: 'CO₂e Avoided',
    co2AvoidedSub: 'UNEP factor: 2.5 kg CO₂e / kg',
    waterSaved: 'Water Conserved',
    waterSavedSub: 'Virtual embedded agricultural water',
    diversionRate: 'Diversion Rate',
    diversionRateSub: 'Zero landfill disposal achieved',

    heroBadge1: 'Paper II: AI-Assisted Priority Optimization',
    heroBadge2: 'ICIPAI 2026 • Advances in Intelligent Systems',
    heroBadgeAffiliation: 'Sandip University SOCSE & JIGSY INDIA R&D',
    heroTitle: 'AI-Assisted Smart Food Redistribution System',
    heroDesc: 'A web-based circular economy framework engineered to eliminate edible food waste at the source and solve semi-urban last-mile logistics. Powered by real-time priority optimization (O(n log n)), the system dynamically balances food mass, remaining shelf life, and travel distance to ensure rapid, safe redistribution to community shelters.',
    btnExploreWorkspaces: 'Explore Role Workspaces',
    btnAiSimulation: '100-Sample AI Simulation (Sec 5)',
    btnReadPaper: 'Read Paper II (ICIPAI)',
    btnInteractiveDemo: 'Demonstrate Concept Flow',

    howItWorksTitle: 'How Our Concept Works in Practice',
    howItWorksSubtitle: 'A 5-Stage Closed-Loop Pipeline: From Kitchen Surplus to Verified Community Nutrition',
    stage1Title: '1. Surplus Generation & Dynamic Urgency',
    stage1Desc: 'Hostels, messes, and banquets log cooked surplus with quantity (Q), storage temperature, and expiry window (Te). Equation (1) calculates basic priority urgency.',
    stage2Title: '2. AI Matching & Algorithm 1 Optimization',
    stage2Desc: 'Deterministic greedy allocation algorithm evaluates candidates in O(n log n) time, penalizing spatial distance (D) via Equation (2) and dispatching the nearest volunteer.',
    stage3Title: '3. Volunteer Safety Verification (FSSAI 5-Point)',
    stage3Desc: 'On-site volunteer conducts physical inspection: aroma, container integrity, and temperature probe (>60°C hot holding or <5°C cold chain).',
    stage4Title: '4. Last-Mile Geo-Dispatch & Routing',
    stage4Desc: 'Real-time coordinated transport via two-wheelers and EVs across semi-urban clusters within safe microbial decay limits.',
    stage5Title: '5. Shelter Handover & Immutable Audit Record',
    stage5Desc: 'Digital QR delivery confirmation by recipient shelters. Instantly aggregates avoided methane CO₂e, water conserved, and generates cryptographic certificate.',

    simModalTitle: 'AI Priority Optimization & Controlled Simulation Engine',
    simModalSubtitle: 'Paper II Empirical Core (ICIPAI 2026) • Section 3 & Section 5',
    simTab100: '100-Sample Simulation (Sec 5)',
    simTabTable1: 'Table 1 Comparison',
    simTabSandbox: 'Equation 1 & 2 Live Sandbox',
    simTabCore: 'Paper 2 Empirical Core',
    simRunBtn: 'Re-Run Controlled Simulation (n=100)',
    simRunning: 'Simulating 100 Batches...',
    simSampleSize: 'Sample Size (n)',
    simSensitivity: 'Expiry Sensitivity (Beta)',
    simDistanceDispersion: 'Distance Dispersion (km)',
    simSpoilageReduction: 'Avoidable Spoilage Eliminated',
    simWrrImprovement: 'Waste Reduction Ratio (WRR)',
    simDistanceReduction: 'Logistics Travel Distance',
    simZeroSpoilageAchieved: 'Zero Spoilage Achieved',
    simProposedModel: 'Proposed Priority Optimization',
    simFcfsBaseline: 'Traditional FCFS Baseline',
    simMetricCol: 'Performance Metric',
    simFcfsCol: 'Baseline (FCFS)',
    simAiModelCol: 'Proposed Model (Priority)',
    simGainCol: 'Empirical Improvement',
    simVoiceAnnounce: 'Simulation complete. Proposed priority optimization achieved zero avoidable spoilage across all one hundred batches.',
    readPaperBtn: 'Read Paper II (ICIPAI)',
    viewPaperPdfBtn: 'Open Attached Paper PDF',

    advantagesTitle: 'Key Advantages of Zero Waste Food Management',
    advantagesSubtitle: 'Why transforming linear surplus into a regenerative circular flow creates compounded environmental, humanitarian, and institutional value.',
    methodologyTitle: 'Article Contents & Research Methodology',
    methodologySubtitle: 'Published in ICIPAI 2026 • Advances in Intelligent Systems Research (Vol. 211)',
    operationalRolesTitle: 'Role Workspaces & Operational Portals',
    operationalRolesSubtitle: 'Select any role below to enter that active workspace and test real-time operations.',
    radarTitle: 'Geo-Enabled Coordination Radar',
    radarSubtitle: 'Paper II Equation 2 Grid • Madhubani Semi-Urban Zone',

    speechStage1: 'Stage 1: Surplus food logged by provider with mass and safe shelf-life window. Calculating initial urgency score via Equation 1.',
    speechStage2: 'Stage 2: AI matching engine optimizes allocation using Equation 2, penalizing distance and sorting queues in O n log n time.',
    speechStage3: 'Stage 3: Volunteer arrives on site and verifies 5-point food safety standards including sensory and thermal checks.',
    speechStage4: 'Stage 4: Volunteer transports meals via two-wheeler along the optimized semi-urban corridor before thermal degradation.',
    speechStage5: 'Stage 5: Shelter confirms receipt via digital handover. Environmental impact ledger logs meals served, carbon avoided, and water saved.',
    speechSimDone: 'Controlled simulation completed. The proposed AI priority model eliminated all thirty-two spoiled batches observed under FCFS.',

    close: 'Close',
    back: 'Back',
    next: 'Next',
    simulate: 'Simulate',
    autoPlay: 'Auto-Play Flow',
    pause: 'Pause',
    verified: 'Verified',
    priorityScore: 'AI Priority Score',

    // AI-Assisted Explainer Section
    aiMeaningBadge: 'Paper II Theoretical & Empirical Foundation • ICIPAI 2026',
    aiMeaningTitle: 'What "AI-Assisted" Means Here & Why We Titled It "AI-Assisted"',
    aiMeaningSubtitle: 'Demystifying the context-aware decision intelligence engine: Why we titled it "AI-Assisted", the mathematical formulation behind it, and why conventional redistribution fails without it.',
    aiPillar1Title: 'Deterministic Decision Intelligence (Not Hallucinating Generative AI)',
    aiPillar1Desc: 'In critical food safety and emergency hunger relief, probabilistic LLMs that hallucinate or require server GPU farms are unviable. Our framework implements a deterministic multi-attribute scoring model operating in O(n log n) time on edge hardware.',
    aiPillar2Title: 'Context-Aware Dynamic Urgency (Decay Asymptote)',
    aiPillar2Desc: 'Traditional databases treat food like static commodities. Here, as remaining consumption time (Te) approaches zero, priority score spikes asymptotically—ensuring high-risk cooked meals dynamically leapfrog non-perishable rations.',
    aiPillar3Title: 'Spatial Friction & Safe Thermal Radius (1 / (1 + D))',
    aiPillar3Desc: 'Equation (2) penalizes physical travel distance (D), ensuring dispatch is constrained to the 2–6 km semi-urban safe corridor reachable in under 15 minutes by two-wheelers without cold-chain vehicles.',
    aiNeedSectionTitle: 'Why the Need of Introducing an AI-Assisted Smart Food Redistribution System in Zero Waste Food Management?',
    aiNeedSectionSubtitle: 'The fatal flaws of conventional redistribution and how algorithmic decision-making solves the perishability-distance crisis.',
    aiNeedPoint1Title: '1. The FCFS (First-Come-First-Served) Spoilage Trap',
    aiNeedPoint1Desc: 'Traditional NGOs and charities process requests strictly by arrival order. A 100 kg hot feast expiring in 2 hours gets delayed behind dry rations expiring next month, causing tragic preventable microbial decomposition.',
    aiNeedPoint2Title: '2. The Thermal Decay Race (Microbial Multiplication)',
    aiNeedPoint2Desc: 'Cooked Indian food enters the bacterial proliferation danger zone (5°C to 60°C) within 3 hours. Human coordinators cannot compute combinatorial tradeoffs across dozens of simultaneous batches, volunteers, and locations in real time.',
    aiNeedPoint3Title: '3. Empirically Proven Waste Elimination (Paper II Section 5)',
    aiNeedPoint3Desc: 'Simulation across 100 semi-urban batches proved that the proposed AI-assisted model delivers a +28% to 37% gain in Wastage Reduction Rate (WRR), cuts volunteer travel distance by 15% to 25%, and achieves near-zero food spoilage.',
    aiCompareTitle: 'Comparative Proof: Traditional Redistribution vs. Proposed AI-Assisted Model',
    aiCompareSubtitle: 'Direct reproduction of Table 1 from Paper II (ICIPAI 2026, Section 5.4)',
  },

  hi: {
    brandName: 'जिग्सी इंडिया (JIGSY INDIA)',
    brandTagline: 'शून्य अपशिष्ट भोजन प्रबंधन प्रणाली',
    navHome: 'होम',
    navServices: 'सेवाएं',
    navContact: 'संपर्क',
    navAboutDev: 'डेवलपर परिचय',
    rolesHeading: 'भूमिकाएं:',
    roleProvider: 'भोजन प्रदाता',
    roleReceiver: 'भोजन प्राप्तकर्ता',
    roleVolunteer: 'सामुदायिक स्वयंसेवक',
    roleAdmin: 'प्रशासक पोर्टल',
    proofDossier: 'प्रमाण दस्तावेज़',
    paper2Title: 'शोध पत्र II (AI)',
    aiSimTitle: 'AI ऑप्टिमाइज़र व सिमुलेशन',
    walkthroughGuide: 'मार्गदर्शन गाइड',
    interactiveDemoBtn: 'सिस्टम कैसे काम करता है',
    resetBtn: 'डेटा रीसेट',
    audioToggle: 'ध्वनि प्रभाव',

    mealsServed: 'परोसा गया भोजन',
    mealsServedSub: 'सत्यापित प्रलेखित भोजन भाग',
    co2Avoided: 'CO₂e उत्सर्जन बचाव',
    co2AvoidedSub: 'UNEP मानक: 2.5 किग्रा CO₂e / किग्रा',
    waterSaved: 'संरक्षित जल',
    waterSavedSub: 'कृषि उत्पादों में निहित आभासी जल',
    diversionRate: 'डायवर्जन दर',
    diversionRateSub: '100% लैंडफिल कचरा रोकथाम',

    heroBadge1: 'शोध पत्र II: एआई-संवर्धित प्राथमिकता अनुकूलन',
    heroBadge2: 'ICIPAI 2026 • एडवांसेज इन इंटेलिजेंट सिस्टम्स',
    heroBadgeAffiliation: 'संदीप यूनिवर्सिटी SOCSE व जिग्सी इंडिया R&D',
    heroTitle: 'एआई-संवर्धित स्मार्ट खाद्य पुनर्वितरण प्रणाली',
    heroDesc: 'एक वेब-आधारित सर्कुलर इकोनॉमी ढांचा जिसे स्रोत पर ही खाद्य बर्बादी रोकने और अर्ध-शहरी क्षेत्रों में अंतिम-मील डिलीवरी समस्या सुलझाने के लिए विकसित किया गया है। रीयल-टाइम प्राथमिकता अनुकूलन (O(n log n)) के साथ यह प्रणाली भोजन मात्रा, सुरक्षित समय सीमा और यात्रा दूरी का सटीक संतुलन कर समय पर आश्रयों तक भोजन पहुंचाती है।',
    btnExploreWorkspaces: 'भूमिका वर्कस्पेस देखें',
    btnAiSimulation: '100-सैंपल एआई सिमुलेशन (सेक्शन 5)',
    btnReadPaper: 'शोध पत्र पढ़ें (ICIPAI)',
    btnInteractiveDemo: 'सिस्टम कार्यप्रणाली डेमो देखें',

    howItWorksTitle: 'हमारी कार्यप्रणाली व्यवहार में कैसे काम करती है',
    howItWorksSubtitle: '5-चरणीय सर्कुलर लाइफसाइकिल: अतिरिक्त भोजन से सत्यापित पोषण तक',
    stage1Title: '1. अतिरिक्त भोजन की प्रविष्टि व तात्कालिकता गणना',
    stage1Desc: 'हॉस्टल मेस, बैंक्वेट व कैटरर्स भोजन की मात्रा (Q), तापमान और उपभोग समय (Te) दर्ज करते हैं। सूत्र (1) द्वारा प्राथमिकता तात्कालिकता की त्वरित गणना होती है।',
    stage2Title: '2. एआई मैचिंग व एल्गोरिद्म 1 प्राथमिकता निर्धारण',
    stage2Desc: 'O(n log n) गति वाला अनुकूलन एल्गोरिद्म सभी बैचों को क्रमित कर सूत्र (2) द्वारा दूरी (D) को ध्यान में रखते हुए निकटतम स्वयंसेवक व एनजीओ से जोड़ता है।',
    stage3Title: '3. स्वयंसेवक द्वारा FSSAI 5-बिंदु खाद्य सुरक्षा जांच',
    stage3Desc: 'मौके पर पहुंचकर स्वयंसेवक खुशबू, पैकिंग और तापमान जांच (>60°C गर्म या <5°C ठंडा) कर सुरक्षित होने की पुष्टि करता है।',
    stage4Title: '4. त्वरित परिवहन व अर्ध-शहरी रूटिंग',
    stage4Desc: 'दोपहिया और इलेक्ट्रिक वाहनों द्वारा अर्ध-शहरी गलियारों में भोजन खराब होने से पहले सुरक्षित समय सीमा में पहुंचाया जाता है।',
    stage5Title: '5. आश्रय गृह में सुपुर्दगी व डिजिटल ऑडिट रिकॉर्ड',
    stage5Desc: 'आश्रय गृह द्वारा डिजिटल क्यूआर पुष्टि। मिथेन व CO₂e बचत, जल संरक्षण का तत्काल आकलन और ब्लॉकचेन-तैयार डिजिटल प्रमाणपत्र जारी।',

    simModalTitle: 'एआई प्राथमिकता अनुकूलन एवं नियंत्रित सिमुलेशन इंजन',
    simModalSubtitle: 'शोध पत्र II अनुभवजन्य आधार (ICIPAI 2026) • अनुभाग 3 व 5',
    simTab100: '100-सैंपल सिमुलेशन (अनुभाग 5)',
    simTabTable1: 'तालिका 1 तुलनात्मक विश्लेषण',
    simTabSandbox: 'समीकरण 1 व 2 लाइव सैंडबॉक्स',
    simTabCore: 'शोध पत्र 2 मुख्य निष्कर्ष',
    simRunBtn: 'नियंत्रित सिमुलेशन पुनः चलाएं (n=100)',
    simRunning: '100 बैचों का अनुकरण हो रहा है...',
    simSampleSize: 'नमूना आकार (n)',
    simSensitivity: 'समय संवेदनशीलता (बीटा)',
    simDistanceDispersion: 'दूरी फैलाव (किमी)',
    simSpoilageReduction: 'रोकी गई भोजन बर्बादी',
    simWrrImprovement: 'कचरा कमी अनुपात (WRR)',
    simDistanceReduction: 'लॉजिस्टिक्स यात्रा दूरी',
    simZeroSpoilageAchieved: 'शून्य बर्बादी हासिल',
    simProposedModel: 'प्रस्तावित प्राथमिकता मॉडल',
    simFcfsBaseline: 'पारंपरिक FCFS आधार',
    simMetricCol: 'प्रदर्शन मानक',
    simFcfsCol: 'पारंपरिक (FCFS)',
    simAiModelCol: 'प्रस्तावित एआई मॉडल',
    simGainCol: 'वास्तविक सुधार',
    simVoiceAnnounce: 'सिमुलेशन पूरा हुआ। प्रस्तावित एआई प्राथमिकता मॉडल ने सभी सौ बैचों में भोजन की खराबी को शून्य कर दिया।',
    readPaperBtn: 'शोध पत्र पढ़ें (ICIPAI)',
    viewPaperPdfBtn: 'संलग्न शोध पत्र पीडीएफ खोलें',

    advantagesTitle: 'शून्य अपशिष्ट खाद्य प्रबंधन के प्रमुख लाभ',
    advantagesSubtitle: 'अतिरिक्त भोजन को चक्रीय रूप में पुनः प्रवाहित करने से पर्यावरणीय, मानवीय और संस्थागत मूल्य कई गुना बढ़ जाता है।',
    methodologyTitle: 'शोध पत्र की विषय-वस्तु व कार्यप्रणाली',
    methodologySubtitle: 'ICIPAI 2026 में प्रकाशित • एडवांसेज इन इंटेलिजेंट सिस्टम्स रिसर्च (खंड 211)',
    operationalRolesTitle: 'ऑपरेशनल वर्कस्पेस व भूमिका पोर्टल',
    operationalRolesSubtitle: 'सक्रिय वर्कस्पेस में जाने और वास्तविक संचालन का परीक्षण करने के लिए नीचे किसी भी भूमिका को चुनें।',
    radarTitle: 'जियो-सक्षम समन्वय रडार',
    radarSubtitle: 'पेपर II समीकरण 2 ग्रिड • मधुबनी अर्ध-शहरी क्षेत्र',

    speechStage1: 'चरण 1: प्रदाता द्वारा अतिरिक्त भोजन की मात्रा और सुरक्षित समय दर्ज किया गया। समीकरण 1 द्वारा तात्कालिकता अंक की गणना हो रही है।',
    speechStage2: 'चरण 2: एआई मैचिंग इंजन समीकरण 2 द्वारा दूरी और समय का विश्लेषण कर सबसे उपयुक्त स्वयंसेवक और आश्रम को जोड़ता है।',
    speechStage3: 'चरण 3: स्वयंसेवक मौके पर पहुंचकर 5-बिंदु खाद्य सुरक्षा और तापमान की भौतिक जांच कर भोजन को प्रमाणित करता है।',
    speechStage4: 'चरण 4: स्वयंसेवक दोपहिया वाहन द्वारा सुरक्षित अर्ध-शहरी गलियारे से तेजी से भोजन का परिवहन करता है।',
    speechStage5: 'चरण 5: आश्रय गृह द्वारा डिजिटल क्यूआर से भोजन प्राप्त किया गया। कार्बन बचत और जल संरक्षण का डिजिटल रिकॉर्ड दर्ज हुआ।',
    speechSimDone: 'नियंत्रित सिमुलेशन संपन्न हुआ। प्रस्तावित एआई प्राथमिकता मॉडल ने बत्तीस खराब होने वाले बैचों को सुरक्षित बचा लिया।',

    close: 'बंद करें',
    back: 'पीछे',
    next: 'आगे',
    simulate: 'सिम्युलेट करें',
    autoPlay: 'ऑटो-प्ले शुरू करें',
    pause: 'रोकें',
    verified: 'सत्यापित',
    priorityScore: 'एआई प्राथमिकता अंक',

    // AI-Assisted Explainer Section
    aiMeaningBadge: 'शोध पत्र II सैद्धांतिक एवं अनुभवजन्य आधार • ICIPAI 2026',
    aiMeaningTitle: 'यहाँ "AI-Assisted" का वास्तविक अर्थ क्या है और हमने इसे यह शीर्षक क्यों दिया?',
    aiMeaningSubtitle: 'यह कोई भ्रामक चैटबॉट या जटिल ब्लैक-बॉक्स नहीं है। यह एक संदर्भ-संवेदनशील निर्णय इंटेलिजेंस इंजन है जो भोजन की मात्रा, सुरक्षित समय और परिवहन दूरी का O(n log n) गति में सटीक संतुलन करता है।',
    aiPillar1Title: 'गणितीय निर्णय इंटेलिजेंस (भ्रामक जेनरेटिव एआई नहीं)',
    aiPillar1Desc: 'भोजन सुरक्षा और भुखमरी उन्मूलन जैसे संवेदनशील कार्यों में गलत अनुमान लगाने वाले या महंगे सर्वर मांगने वाले मॉडलों पर निर्भर नहीं रहा जा सकता। हमारा ढांचा O(n log n) समय में वास्तविक हार्डवेयर पर चलने वाला पारदर्शी गणितीय मॉडल लागू करता है।',
    aiPillar2Title: 'समय ह्रास पर आधारित गतिशील तात्कालिकता',
    aiPillar2Desc: 'पारंपरिक डेटाबेस भोजन को साधारण वस्तु समझते हैं। यहाँ जैसे-जैसे सुरक्षित समय (Te) घटता है, प्राथमिकता अंक अपने आप बढ़ता है—जिससे खराब होने की कगार पर पहुंचा ताजा भोजन तुरंत आगे आ जाता है।',
    aiPillar3Title: 'भौगोलिक दूरी का समायोजन (1 / (1 + D))',
    aiPillar3Desc: 'समीकरण (2) परिवहन दूरी (D) को ध्यान में रखते हुए 2–6 किमी के सुरक्षित अर्ध-शहरी दायरे में ही डिलीवरी तय करता है, जिससे बिना रेफ्रिजरेटर वाहन के भी भोजन 15 मिनट में पहुँच जाता है।',
    aiNeedSectionTitle: 'शून्य अपशिष्ट भोजन प्रबंधन में एआई-संवर्धित प्रणाली की आवश्यकता क्यों पड़ी?',
    aiNeedSectionSubtitle: 'पारंपरिक वितरण प्रणाली की विफलताएं और कैसे एल्गोरिद्म आधारित निर्णय प्रणाली भोजन खराबी का संकट हल करती है।',
    aiNeedPoint1Title: '1. FCFS (पहले आओ, पहले पाओ) की बर्बादी',
    aiNeedPoint1Desc: 'पारंपरिक संस्थाएं जो पहले संपर्क करता है उसे पहले भोजन भेजती हैं। ऐसे में 2 घंटे में खराब होने वाला 100 किग्रा ताजा भोजन इंतजार करता रह जाता है और अगले महीने तक चलने वाला सूखा राशन पहले चला जाता है।',
    aiNeedPoint2Title: '2. बैक्टीरिया वृद्धि व समय की दौड़',
    aiNeedPoint2Desc: 'पका हुआ भारतीय भोजन (दाल, चावल, सब्जी, रोटी) 3 घंटे में बैक्टीरिया के खतरे वाले क्षेत्र (5°C से 60°C) में पहुंच जाता है। मानव समन्वयक दर्जनों बैचों और दूरी का मानसिक हिसाब समय रहते नहीं लगा सकते।',
    aiNeedPoint3Title: '3. अनुभवजन्य परीक्षण में बर्बादी का उन्मूलन (अनुभाग 5)',
    aiNeedPoint3Desc: '100 अर्ध-शहरी भोजन बैचों के नियंत्रित सिमुलेशन ने सिद्ध किया कि यह एआई-संवर्धित मॉडल भोजन बर्बादी में +28% से 37% का सुधार करता है और परिवहन दूरी 15% से 25% घटाता है।',
    aiCompareTitle: 'तुलनात्मक प्रमाण: पारंपरिक वितरण बनाम प्रस्तावित एआई-संवर्धित प्रणाली',
    aiCompareSubtitle: 'शोध पत्र II (ICIPAI 2026, अनुभाग 5.4) की तालिका 1 का सीधा विवरण',
  },

  mai: {
    brandName: 'जिग्सी इंडिया (JIGSY INDIA)',
    brandTagline: 'शून्य अपशिष्ट भोजन प्रबंधन व्यवस्था',
    navHome: 'मुख्य पृष्ठ',
    navServices: 'सेवा सभ',
    navContact: 'संपर्क',
    navAboutDev: 'डेवलपर परिचय',
    rolesHeading: 'भूमिका सभ:',
    roleProvider: 'भोजन दाता',
    roleReceiver: 'भोजन ग्रहणकर्ता',
    roleVolunteer: 'सामुदायिक स्वयंसेवक',
    roleAdmin: 'प्रशासक पोर्टल',
    proofDossier: 'प्रमाण दस्तावेज',
    paper2Title: 'शोध पत्र २ (AI)',
    aiSimTitle: 'AI ऑप्टिमाइजर व सिमुलेशन',
    walkthroughGuide: 'मार्गदर्शन गाइड',
    interactiveDemoBtn: 'सिस्टम कोना काज करैत अछि',
    resetBtn: 'डेटा रीसेट',
    audioToggle: 'ध्वनि प्रभाव',

    mealsServed: 'परोसल गेल भोजन',
    mealsServedSub: 'सत्यापित प्रलेखित भोजन भाग',
    co2Avoided: 'CO₂e उत्सर्जन बचत',
    co2AvoidedSub: 'UNEP मानक: २.५ किग्रा CO₂e / किग्रा',
    waterSaved: 'जल संरक्षण',
    waterSavedSub: 'अनाज मे समाहित प्राकृतिक जल',
    diversionRate: 'डायवर्जन दर',
    diversionRateSub: '१००% कचरा रोकथाम',

    heroBadge1: 'शोध पत्र २: एआई-सहायक प्राथमिकता अनुकूलन',
    heroBadge2: 'ICIPAI 2026 • एडवांसेज इन इंटेलिजेंट सिस्टम्स',
    heroBadgeAffiliation: 'संदीप विश्वविद्यालय SOCSE आ जिग्सी इंडिया R&D',
    heroTitle: 'एआई-सहायक स्मार्ट भोजन पुनर्परिसंचरण प्रणाली',
    heroDesc: 'एकटा आधुनिक वेब-आधारित सर्कुलर इकोनॉमी प्रणाली जे किचेन मे बचल नीक भोजन के बर्बाद होय सं रोकय आ अर्ध-शहरी क्षेत्र मे समय पर जरूरतमंद धरि पहुँचाबय लेल बनाओल गेल अछि। गणितीय प्राथमिकता अनुकूलन (O(n log n)) द्वारा ई प्रणाली भोजनक मात्रा, सुरक्षित समय आ दूरीक सटीक हिसाब कऽ अनाथालय आ वृद्धाश्रम धरि भोजन पहुँचाबैत अछि।',
    btnExploreWorkspaces: 'भूमिका वर्कस्पेस देखू',
    btnAiSimulation: '१००-सैंपल एआई सिमुलेशन (सेक्शन ५)',
    btnReadPaper: 'शोध पत्र पढ़ू (ICIPAI)',
    btnInteractiveDemo: 'सिस्टम कार्यप्रणाली डेमो देखू',

    howItWorksTitle: 'हमर अवधारणा व्यवहार मे कोना काज करैत अछि',
    howItWorksSubtitle: '५-चरणीय चक्र: बचल भोजन सं लऽ कऽ आश्रय गृह धरि सुरक्षित वितरण',
    stage1Title: '१. बचल भोजनक पंजीकरण आ तात्कालिकता गणना',
    stage1Desc: 'मेस, होटल आ बियाहक कैटरर भोजनक मात्रा (Q), तापमान आ बचल समय (Te) दर्ज करैत छथि। समीकरण (१) सं तुरंत प्राथमिकता अंक निकलैत अछि।',
    stage2Title: '२. एआई मैचिंग आ एल्गोरिद्म १ अनुकूलन',
    stage2Desc: 'O(n log n) गति सं काज कय समीकरण (२) द्वारा दूरी (D) के देखैत सबसँ नजदीक स्वयंसेवक आ अनाथालय सं तुरंते जोड़ी बनाओल जाइत अछि।',
    stage3Title: '३. स्वयंसेवक द्वारा FSSAI ५-बिंदु खाद्य सुरक्षा जांच',
    stage3Desc: 'स्वयंसेवक पहुंचि कऽ सुगंध, पैकिंग आ थर्मामीटर सं तापमान (>६०°C गरम वा <५°C शीतल) जाँचि कऽ भोजनक गुणवत्ता प्रमाणित करैत छथि।',
    stage4Title: '४. त्वरित परिवहन आ अर्ध-शहरी रूटिंग',
    stage4Desc: 'बाइक आ ई-रिक्शा द्वारा अर्ध-शहरी सड़कि पर सुरक्षित समय सीमाक भीतर भोजन पहुँचाओल जाइत अछि।',
    stage5Title: '५. आश्रय गृह मे सुपुर्दगी आ डिजिटल ऑडिट',
    stage5Desc: 'आश्रय गृह द्वारा डिजिटल क्यूआर सं पुष्टि। मिथेन गैसक बचाव आ जल संरक्षणक तुरंत हिसाब आ डिजिटल प्रमाणपत्र जारी।',

    simModalTitle: 'एआई प्राथमिकता अनुकूलन आ नियंत्रित सिमुलेशन इंजन',
    simModalSubtitle: 'शोध पत्र २ अनुभवजन्य आधार (ICIPAI 2026) • अनुभाग ३ आ ५',
    simTab100: '१००-सैंपल सिमुलेशन (अनुभाग ५)',
    simTabTable1: 'तालिका १ तुलनात्मक विश्लेषण',
    simTabSandbox: 'समीकरण १ आ २ लाइव सैंडबॉक्स',
    simTabCore: 'शोध पत्र २ मुख्य निष्कर्ष',
    simRunBtn: 'नियंत्रित सिमुलेशन फेर सं चलाऊ (n=100)',
    simRunning: '१०० बैचक सिमुलेशन चलि रहल अछि...',
    simSampleSize: 'नमूना आकार (n)',
    simSensitivity: 'समय संवेदनशीलता (बीटा)',
    simDistanceDispersion: 'दूरी फैलाव (किमी)',
    simSpoilageReduction: 'रोकल गेल भोजन बर्बादी',
    simWrrImprovement: 'कचरा कमी अनुपात (WRR)',
    simDistanceReduction: 'परिवहन दूरी बचत',
    simZeroSpoilageAchieved: 'शून्य बर्बादी हासिल',
    simProposedModel: 'प्रस्तावित प्राथमिकता मॉडल',
    simFcfsBaseline: 'पारंपरिक FCFS आधार',
    simMetricCol: 'प्रदर्शन मानक',
    simFcfsCol: 'पारंपरिक (FCFS)',
    simAiModelCol: 'प्रस्तावित एआई मॉडल',
    simGainCol: 'वास्तविक सुधार',
    simVoiceAnnounce: 'सिमुलेशन पूरा भेल। प्रस्तावित एआई प्राथमिकता मॉडल सब १०० बैच मे भोजनक बर्बादी के शून्य कऽ देलक।',
    readPaperBtn: 'शोध पत्र पढ़ू (ICIPAI)',
    viewPaperPdfBtn: 'संलग्न शोध पत्र पीडीएफ खोलू',

    advantagesTitle: 'शून्य अपशिष्ट भोजन प्रबंधनक मुख्य लाभ',
    advantagesSubtitle: 'बचल भोजन के कचरा मे फेंकय के बदला जरूरतमंद के खुआबय सं पर्यावरण, समाज आ संस्था सभ के भारी लाभ होइत अछि।',
    methodologyTitle: 'शोध पत्रक विषय-वस्तु आ कार्यप्रणाली',
    methodologySubtitle: 'ICIPAI 2026 मे प्रकाशित • एडवांसेज इन इंटेलिजेंट सिस्टम्स रिसर्च (खंड २११)',
    operationalRolesTitle: 'ऑपरेशनल वर्कस्पेस आ भूमिका पोर्टल',
    operationalRolesSubtitle: 'सक्रिय वर्कस्पेस मे जाय आ वास्तविक काजक परीक्षण करय लेल नीचाँ कोनो भूमिका चुनु।',
    radarTitle: 'जियो-सक्षम समन्वय रडार',
    radarSubtitle: 'पेपर २ समीकरण २ ग्रिड • मधुबनी अर्ध-शहरी क्षेत्र',

    speechStage1: 'चरण १: भोजन दाता द्वारा बचल भोजनक मात्रा आ सुरक्षित समय दर्ज कएल गेल। समीकरण १ द्वारा तात्कालिकता अंकक हिसाब भऽ रहल अछि।',
    speechStage2: 'चरण २: एआई मैचिंग इंजन समीकरण २ द्वारा दूरी आ समयक हिसाब कय सबसँ नीक स्वयंसेवक आ अनाथालय के जोड़ैत अछि।',
    speechStage3: 'चरण ३: स्वयंसेवक पहुँची कऽ ५-बिंदु खाद्य सुरक्षा आ तापमानक भौतिक जांच कय भोजनक शुद्धता प्रमाणित करैत छथि।',
    speechStage4: 'चरण ४: स्वयंसेवक बाइक सं सुरक्षित अर्ध-शहरी रास्ता द्वारा भोजनक त्वरित परिवहन करैत छथि।',
    speechStage5: 'चरण ५: अनाथालय द्वारा डिजिटल क्यूआर सं भोजनक प्राप्ति दर्ज कएल गेल। कार्बन आ जल संरक्षणक डिजिटल हिसाब सुरक्षित भेल।',
    speechSimDone: 'नियंत्रित सिमुलेशन पूरा भेल। प्रस्तावित एआई मॉडल बत्तीसटा सड़य वला भोजन बैच के सुरक्षित बचा लेलक।',

    close: 'बंद करू',
    back: 'पाछाँ',
    next: 'आगाँ',
    simulate: 'सिम्युलेट करू',
    autoPlay: 'ऑटो-प्ले शुरू करू',
    pause: 'रोकूँ',
    verified: 'सत्यापित',
    priorityScore: 'एआई प्राथमिकता अंक',

    // AI-Assisted Explainer Section
    aiMeaningBadge: 'शोध पत्र २ सैद्धांतिक आ अनुभवजन्य आधार • ICIPAI 2026',
    aiMeaningTitle: 'एतय "AI-Assisted" केर असली अर्थ की थिक आ हम एकरा ई नाम किएक देलहुँ?',
    aiMeaningSubtitle: 'ई कोनो भ्रामक चैटबॉट नहि थिक। ई संदर्भ-संवेदनशील निर्णय इंटेलिजेंस इंजन थिक जे भोजनक मात्रा, सुरक्षित समय आ परिवहन दूरीक O(n log n) गति मे सटीक संतुलन करैत अछि।',
    aiPillar1Title: 'गणितीय निर्णय इंटेलिजेंस (भ्रामक जेनरेटिव एआई नहि)',
    aiPillar1Desc: 'भोजन सुरक्षा आ भूख मिटाबय जेहेन संवेदनशील काज मे गलत अनुमान लगयनिहार मॉडल पर विश्वास नहि कएल जा सकैत अछि। हमर ढाँचा O(n log n) समय मे पारदर्शी गणितीय मॉडल लागू करैत अछि।',
    aiPillar2Title: 'समय घटय पर गतिशील तात्कालिकता',
    aiPillar2Desc: 'पारंपरिक डेटाबेस भोजन के साधारण सामान बुझैत अछि। एतय जेना-जेना सुरक्षित समय (Te) घटैत अछि, प्राथमिकता अंक अपने-आप बढ़ैत अछि—जाही सं सड़य वला ताजा भोजन तुरंते आगाँ आबि जाइत अछि।',
    aiPillar3Title: 'दूरीक समायोजन (1 / (1 + D))',
    aiPillar3Desc: 'समीकरण (२) परिवहन दूरी (D) के देखैत २–६ किमी केर सुरक्षित अर्ध-शहरी क्षेत्र मे डिलीवरी तय करैत अछि, जाही सं बिना फ्रिज वला गाड़ी के सेहो १५ मिनट मे भोजन पहुँचि जाइत अछि।',
    aiNeedSectionTitle: 'शून्य अपशिष्ट भोजन प्रबंधन मे एआई-सहायक प्रणाली केर जरूरत किएक पड़ल?',
    aiNeedSectionSubtitle: 'पारंपरिक व्यवस्था केर कमी सभ आ कोना एल्गोरिद्म आधारित निर्णय प्रणाली भोजन बर्बादी के रोकैत अछि।',
    aiNeedPoint1Title: '१. FCFS (पहिने आऊ, पहिने पाऊ) केर बर्बादी',
    aiNeedPoint1Desc: 'पारंपरिक संस्था जे पहिने फोन करैत अछि ओकरा पहिने भोजन पठबैत अछि। एहि मे २ घंटा मे सड़य वला १०० किग्रा ताजा भोजन ताकैत रहि जाइत अछि आ महीना भरि चलय वला सूखा राशन पहिने चलि जाइत अछि।',
    aiNeedPoint2Title: '२. बैक्टीरिया बढ़य आ समयक लड़ाई',
    aiNeedPoint2Desc: 'पकाएल भोजन (दाल, भात, तरकारी, रोटी) ३ घंटा मे बैक्टीरियाक खतरा वला तापमान (५°C सं ६०°C) मे पहुँचि जाइत अछि। मनुष्य दर्जनों जगहक हिसाब तुरंते नहि कऽ सकैत छथि।',
    aiNeedPoint3Title: '३. अनुभवजन्य परीक्षण मे बर्बादी पर रोक (अनुभाग ५)',
    aiNeedPoint3Desc: '१०० अर्ध-शहरी भोजन बैचक नियंत्रित सिमुलेशन प्रमाणित कएलक जे ई एआई-सहायक मॉडल भोजन बर्बादी मे +२८% सं ३७% केर सुधार करैत अछि आ दूरी १५% सं २५% घटबैत अछि।',
    aiCompareTitle: 'तुलनात्मक प्रमाण: पारंपरिक वितरण बनाम प्रस्तावित एआई-सहायक प्रणाली',
    aiCompareSubtitle: 'शोध पत्र २ (ICIPAI 2026, अनुभाग ५.४) केर तालिका १ केर विवरण',
  },
};

export function getTranslation(language: SupportedLanguage): TranslationDictionary {
  return TRANSLATIONS[language] || TRANSLATIONS.en;
}
