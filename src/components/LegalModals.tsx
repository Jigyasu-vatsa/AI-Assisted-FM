import React, { useState } from 'react';
import { ShieldCheck, FileText, Building2, Lock, Scale, X, ExternalLink, Award } from 'lucide-react';

export type LegalModalType = 'about' | 'privacy' | 'terms' | null;

interface Props {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<Props> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              {activeModal === 'about' && <Building2 className="w-5 h-5" />}
              {activeModal === 'privacy' && <Lock className="w-5 h-5" />}
              {activeModal === 'terms' && <Scale className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">
                JIGSY INDIA Corporate Documentation
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeModal === 'about' && 'About JIGSY INDIA & Developer Profile'}
                {activeModal === 'privacy' && 'Privacy Policy & Data Governance'}
                {activeModal === 'terms' && 'Terms of Service & Research Evaluation Agreement'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {activeModal === 'about' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  Jigyasu Integrated Global Services Private Limited (JIGSY INDIA)
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  JIGSY INDIA is an incorporated technology and development enterprise established in Darbhanga, Bihar. The company focuses on next-generation digital platforms, sustainable systems engineering, software services, and skill enablement.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-slate-400">DPIIT Reg:</div>
                    <div className="font-bold text-white">DIPP228528</div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-slate-400">GSTIN:</div>
                    <div className="font-bold text-white">10AAHCJ0404B1ZN</div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-slate-400">MSME UDYAM:</div>
                    <div className="font-bold text-white truncate">UDYAM-BR-34-0051280</div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-slate-400">CIN:</div>
                    <div className="font-bold text-white truncate">U62099BR2025PTC078592</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  About the Lead Engineer & Researcher
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Mr. Jigyasu Vatsa</strong> is the founder of JIGSY INDIA and lead developer of this circular economy food redistribution platform. This system is developed as part of his M.Tech dissertation in Computer Science & Engineering. The project demonstrates how structured digital infrastructure, geo-enabled routing, and decentralized volunteer coordination can effectively divert edible surplus away from methane-producing landfills toward community nourishment.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="https://jigyasu.jigsy.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold hover:bg-amber-500/20 text-xs transition-colors"
                  >
                    <span>Visit Developer Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://jigsy.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-700 text-xs transition-colors"
                  >
                    <span>Corporate Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white">1. Scope & Research Nature</h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  This web application is currently a research simulation and academic dissertation prototype developed by Mr. Jigyasu Vatsa, partially supported by JIGSY INDIA. It does not commercially collect, monetize, or harvest personal identifiable information (PII).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white">2. Local-First Browser Storage</h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  All active donation records, volunteer statuses, and simulation logs are stored strictly inside your browser's local sandbox (<code className="text-emerald-400">localStorage</code>). No persistent private records are dispatched to third-party ad networks or unauthorized cloud warehouses.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white">3. Statutory Adherence</h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  JIGSY INDIA is committed to the principles of the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 of India regarding data governance, transparency, and data minimization.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white">4. Data Pseudonymization & Safe Harbor</h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  In adherence with standard academic research ethics and the DPDP Act 2023, all volunteer dispatcher names, recipient beneficiary titles, and operational contact extensions in this public demonstration sandbox are pseudonymized. No individual's private mobile phone number or personal identity is published without written consent. Inquiries regarding research logs are routed through formal institutional channels.
                </p>
              </div>
            </div>
          )}

          {activeModal === 'terms' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white">1. Non-Commercial Academic Disclaimer</h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  This web platform is engineered as an academic demonstration and research framework. It is currently not deployed for public commercial transactions or hazardous operations. All simulation modules and demonstration data are intended for technical evaluation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white">2. Food Safety & Verification Protocols</h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  The framework outlines mandatory 5-point quality inspection protocols (sensory, thermal, and packaging integrity) designed in accordance with hygienic food redistribution standards. Any future production deployment will strictly adhere to the Food Safety and Standards Authority of India (FSSAI) guidelines for surplus food redistribution.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white">3. Intellectual Property Rights</h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  All underlying software architecture, design schematics, and digital assets are the intellectual property of Jigyasu Integrated Global Services Private Limited (JIGSY INDIA) and Mr. Jigyasu Vatsa (© 2026 onwards).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            JIGSY INDIA • Legal & Academic Governance
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
