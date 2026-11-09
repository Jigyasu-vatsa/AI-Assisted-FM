import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  X,
  ExternalLink,
  Copy,
  Check,
  Quote,
  Download,
  Sparkles,
  Layers,
  Cpu,
  ArrowRight,
} from 'lucide-react';

export const ResearchPaperModal: React.FC = () => {
  const {
    paperModalOpen,
    setPaperModalOpen,
    paperModalTab,
    setPaperModalTab,
    setProofModalOpen,
    setSimulationModalOpen,
  } = useApp();

  const [citationFormat, setCitationFormat] = useState<'ieee' | 'apa' | 'bibtex' | 'mla'>('ieee');
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!paperModalOpen) return null;

  // Local PDF path
  const LOCAL_PAPER_PDF_PATH = "/assets/aistudio/AI-assisted_Smart_Food_Redistribution_System_with_Priority-Based_Optimization_A_Circular_Economy_Framework_for_Sustainable_Resource_Management_d3a3a383.pdf";
  const DOI_URL = "https://doi.org/10.2991/978-94-6239-789-7_18";

  // Citations for Paper II (ICIPAI 2026)
  const citationsPaper2: Record<string, string> = {
    ieee: `J. Vatsa, B. Kumar, G. Jha, and D. Chaudhary, "AI-assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for Sustainable Resource Management," in Proc. Int. Conf. on Innovation and Practices in Artificial Intelligence (ICIPAI 2026), Advances in Intelligent Systems Research, vol. 211, Springer / Atlantis Press, 2026, pp. 251-264. DOI: 10.2991/978-94-6239-789-7_18.`,
    apa: `Vatsa, J., Kumar, B., Jha, G., & Chaudhary, D. (2026). AI-assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for Sustainable Resource Management. In M. Singh et al. (Eds.), Proceedings of the International Conference on Innovation and Practices in Artificial Intelligence (ICIPAI 2026), Advances in Intelligent Systems Research (Vol. 211, pp. 251–264). https://doi.org/10.2991/978-94-6239-789-7_18`,
    bibtex: `@inproceedings{vatsa2026aiassisted,
  author    = {Vatsa, Jigyasu and Kumar, Brajesh and Jha, Gyanvati and Chaudhary, Diwakar},
  title     = {AI-assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for Sustainable Resource Management},
  booktitle = {Proceedings of the International Conference on Innovation and Practices in Artificial Intelligence (ICIPAI 2026)},
  series    = {Advances in Intelligent Systems Research},
  volume    = {211},
  pages     = {251--264},
  year      = {2026},
  publisher = {Springer / Atlantis Press},
  doi       = {10.2991/978-94-6239-789-7_18}
}`,
    mla: `Vatsa, Jigyasu, et al. "AI-assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for Sustainable Resource Management." Proceedings of the International Conference on Innovation and Practices in Artificial Intelligence (ICIPAI 2026), Advances in Intelligent Systems Research, vol. 211, 2026, pp. 251-264.`,
  };

  // Citations for Paper I (GTISD 2026)
  const citationsPaper1: Record<string, string> = {
    ieee: `L. Gre and J. Vatsa, "Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution," in Proc. Int. Conf. on Green Technology and Interdisciplinary Sustainable Development (GTISD-2026), Sandip University, Madhubani, Apr. 2026, pp. 1-8. ISBN: 978-81-685333-9.`,
    apa: `Gre, L., & Vatsa, J. (2026). Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution. Proceedings of the International Conference on Green Technology and Interdisciplinary Sustainable Development (GTISD-2026), 1–8. ISBN: 978-81-685333-9.`,
    bibtex: `@inproceedings{gre2026zerowaste,
  author    = {Gre, Lushi and Vatsa, Jigyasu},
  title     = {Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution},
  booktitle = {Proceedings of the International Conference on Green Technology and Interdisciplinary Sustainable Development (GTISD-2026)},
  year      = {2026},
  isbn      = {978-81-685333-9},
  address   = {Sandip University, Madhubani, Bihar, India}
}`,
    mla: `Gre, Lushi, and Jigyasu Vatsa. "Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution." Proceedings of the International Conference on GTISD-2026, Sandip University, 2026, pp. 1-8.`,
  };

  const currentCitations = paperModalTab === 'paper2' ? citationsPaper2 : citationsPaper1;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(currentCitations[citationFormat]);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  Peer-Reviewed Research Publication
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  {paperModalTab === 'paper2' ? 'ICIPAI 2026 • Advances in Intelligent Systems' : 'GTISD 2026 • Foundations'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Academic Research & Empirical Methodology
              </h2>
            </div>
          </div>
          <button
            onClick={() => setPaperModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Switcher Tabs: Paper II (Primary AI-assisted) vs Paper I (Baseline) */}
        <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaperModalTab('paper2')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                paperModalTab === 'paper2'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Paper II: AI-Assisted Priority Optimization (ICIPAI 2026)</span>
            </button>
            <button
              onClick={() => setPaperModalTab('paper1')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                paperModalTab === 'paper1'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paper I: Phase I Framework (GTISD 2026)</span>
            </button>
          </div>

          {paperModalTab === 'paper2' && (
            <a
              href={LOCAL_PAPER_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold transition-all shrink-0"
            >
              <Download className="w-3 h-3" />
              <span>Download Manuscript PDF</span>
            </a>
          )}
        </div>

        {/* Paper Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {paperModalTab === 'paper2' ? (
            /* PAPER II CONTENT */
            <>
              {/* Title & Authors */}
              <div className="text-center space-y-2 border-b border-slate-800 pb-4">
                <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  Official Conference Paper • ICIPAI 2026
                </span>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                  AI-assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for Sustainable Resource Management
                </h1>
                <div className="text-xs text-emerald-400 font-semibold">
                  Jigyasu Vatsa*¹, Brajesh Kumar², Gyanvati Jha³, and Diwakar Chaudhary⁴
                </div>
                <div className="text-xs text-slate-400 space-y-0.5 max-w-2xl mx-auto text-[11px]">
                  <div>¹ M.Tech CSE Pursuing & Teaching Assistant, SOCSE, Sandip University, Sijoul (*jigyasu.vatsa@gmail.com)</div>
                  <div>² Former Dean SOCSE, Sandip University, Sijoul, Madhubani</div>
                  <div>³ JIGSY INDIA R&D Cell (Part-time member)</div>
                  <div>⁴ Supervisor, Assistant Professor & Dean SOCSE, Sandip University, Sijoul, Madhubani, Bihar, India</div>
                  <div className="text-amber-400 font-mono text-[11px] pt-1.5">
                    Proceedings of the International Conference on Innovation and Practices in Artificial Intelligence (ICIPAI 2026)
                  </div>
                  <div className="text-slate-400 font-mono text-[10px]">
                    Advances in Intelligent Systems Research, Vol. 211 • Partially supported by JIGSY's R&D cell
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={LOCAL_PAPER_PDF_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Open Attached Paper PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={DOI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
                  >
                    <span>Publisher DOI Record</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  </a>

                  <button
                    onClick={() => {
                      setPaperModalOpen(false);
                      setSimulationModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900/80 text-purple-300 border border-purple-800 font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Launch Interactive Simulation Engine →</span>
                  </button>
                </div>
              </div>

              {/* Abstract & Key Findings */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Abstract
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed text-justify">
                  Food waste and food insecurity continue to coexist as critical global challenges, particularly in developing economies such as India, where inefficient distribution systems result in the simultaneous loss of edible food and inadequate access to nutrition. This study proposes an AI-assisted smart food redistribution system grounded in circular economy principles, aimed at transforming surplus food into a reusable societal resource through a scalable and digitally coordinated framework. A lightweight priority-based optimization model is introduced, where allocation decisions are driven by a dynamic scoring function incorporating food quantity, remaining expiry time, and location-based distance constraints, thereby ensuring that high-risk and high-volume surplus is prioritized for timely redistribution. Conceptual evaluation indicates that the integration of priority-based allocation and location-aware matching can significantly reduce food wastage (estimated 25–40%) while improving delivery efficiency and responsiveness.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="text-slate-400">Keywords:</span>
                  <span className="bg-slate-900 text-emerald-300 px-2 py-0.5 rounded border border-slate-800">AI-assisted Systems</span>
                  <span className="bg-slate-900 text-emerald-300 px-2 py-0.5 rounded border border-slate-800">Food Redistribution</span>
                  <span className="bg-slate-900 text-emerald-300 px-2 py-0.5 rounded border border-slate-800">Circular Economy</span>
                  <span className="bg-slate-900 text-emerald-300 px-2 py-0.5 rounded border border-slate-800">Priority-Based Optimization</span>
                  <span className="bg-slate-900 text-emerald-300 px-2 py-0.5 rounded border border-slate-800">Location-Aware Systems</span>
                </div>
              </div>

              {/* Section 3: Mathematical Model Realization */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Section 3: Priority-Based Mathematical Formulation
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5 font-mono">
                    <div className="text-emerald-400 font-bold">Equation (1): Basic Priority Score</div>
                    <div className="text-sm font-black text-white">
                      Priority_i = Q_i / (T_{'{e,i}'} + ε)
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
                      Assigns higher urgency to food items with larger mass (Q_i) and shorter remaining shelf life (T_{'{e,i}'}). Constant ε &gt; 0 guarantees numerical stability.
                    </p>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5 font-mono">
                    <div className="text-blue-400 font-bold">Equation (2): Location-Aware Extension</div>
                    <div className="text-sm font-black text-white">
                      Priority_i = [Q_i / (T_{'{e,i}'} + ε)] × [1 / (1 + D_i)]
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
                      Integrates spatial distance (D_i) between provider and nearest volunteer/shelter. Minimizes delivery latency and transportation overhead in semi-urban road networks.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl text-xs flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-300">
                    <strong>Computational Complexity:</strong> Linear evaluation O(n) + sorting O(n log n) = <span className="font-mono text-emerald-300">O(n log n)</span>, suitable for resource-constrained semi-urban servers.
                  </div>
                  <button
                    onClick={() => {
                      setPaperModalOpen(false);
                      setSimulationModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 cursor-pointer"
                  >
                    Open Formula Sandbox
                  </button>
                </div>
              </div>

              {/* Section 5: Simulation & Findings Highlights */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Section 5: Empirical Simulation & Performance Metrics
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Evaluated on n = 100 entries</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-400">Wastage Reduction (WRR)</div>
                    <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">28% – 37%</div>
                    <div className="text-[9px] text-slate-500">gain over FCFS baseline</div>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-400">Travel Optimization (TDO)</div>
                    <div className="text-base font-bold text-blue-400 font-mono mt-0.5">15% – 25%</div>
                    <div className="text-[9px] text-slate-500">reduced transit distance</div>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-400">Allocation Time (AAT)</div>
                    <div className="text-base font-bold text-purple-400 font-mono mt-0.5">Automated</div>
                    <div className="text-[9px] text-slate-500">faster dispatch to volunteers</div>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-400">Delivery Efficiency (DE)</div>
                    <div className="text-base font-bold text-amber-300 font-mono mt-0.5">High</div>
                    <div className="text-[9px] text-slate-500">fewer reassignments</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* PAPER I CONTENT (Foundations) */
            <>
              <div className="text-center space-y-2 border-b border-slate-800 pb-4">
                <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-400 border border-blue-800 px-2.5 py-0.5 rounded-full font-bold">
                  Phase I Baseline Paper • GTISD 2026
                </span>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                  Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution
                </h1>
                <div className="text-xs text-blue-400 font-semibold">
                  LUSHI GRE¹ & MR. JIGYASU VATSA²
                </div>
                <div className="text-xs text-slate-400 space-y-0.5 text-[11px]">
                  <div>¹ B.Tech CSE, Sandip University, Madhubani</div>
                  <div>² Teaching Assistant, SOCSE, Sandip University & Founder, JIGSY INDIA</div>
                  <div className="text-amber-400 font-mono text-[11px] pt-1">
                    Presented at International Conference on GTISD-2026 • ISBN: 978-81-685333-9
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Phase I Abstract & Empirical Baseline
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed text-justify">
                  Established the baseline operational workflow in Madhubani: 500 meals documented, 535 kg CO₂e avoided, 224,700 liters of virtual water conserved, and 100% diversion rate across the dining pilot. Paper I laid the ground for the AI-Assisted Priority Optimization developed in Paper II.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setPaperModalOpen(false);
                    setProofModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow"
                >
                  Inspect Phase I Institutional Proof Dossier →
                </button>
              </div>
            </>
          )}

          {/* Cite This Paper Interactive Section */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Quote className="w-4 h-4 text-emerald-400" />
                Cite {paperModalTab === 'paper2' ? 'Paper II (ICIPAI 2026)' : 'Paper I (GTISD 2026)'}
              </h3>

              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {(['ieee', 'apa', 'bibtex', 'mla'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setCitationFormat(fmt)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                      citationFormat === fmt
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap select-all leading-relaxed">
              {currentCitations[citationFormat]}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-mono">
                Click to copy citation formatted in {citationFormat.toUpperCase()}
              </span>
              <button
                onClick={handleCopyCitation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer text-xs"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400">
            Partially supported by JIGSY's R&D cell & Sandip University SOCSE
          </div>
          <button
            onClick={() => setPaperModalOpen(false)}
            className="px-5 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
