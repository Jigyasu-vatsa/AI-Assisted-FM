import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  ExternalLink,
  Linkedin,
  Facebook,
  ShieldCheck,
  Building2,
  FileText,
  Lock,
} from 'lucide-react';
import { LegalModalType } from './LegalModals';

interface Props {
  onOpenLegal?: (type: LegalModalType) => void;
}

export const JigsyFooter: React.FC<Props> = ({ onOpenLegal }) => {
  const [visitorCount, setVisitorCount] = useState<number>(1482);

  useEffect(() => {
    const saved = localStorage.getItem('zwfm_visitor_count');
    const base = saved ? parseInt(saved, 10) : 1482;
    setVisitorCount(base + 1);
    localStorage.setItem('zwfm_visitor_count', String(base + 1));
  }, []);

  return (
    <footer
      id="contact"
      className="w-full bg-[#1b222a] text-slate-300 text-xs border-t border-slate-800 pt-12 pb-8 px-4 sm:px-8 mt-16 font-sans scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top 4-Column Section (Exact replica of corporate layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: JIGSY INDIA Brand & Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-serif text-white tracking-wider uppercase">
              JIGSY INDIA
            </h3>
            <div className="space-y-2.5 pt-1 text-slate-300">
              <div className="flex items-start gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Darbhanga, Bihar, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="mailto:jigsy25@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  jigsy25@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="tel:+919431400022"
                  className="hover:text-white font-mono font-medium text-emerald-400 transition-colors"
                >
                  +91 94314 00022
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://jigsy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Corporate Portal: jigsy.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Our Sectors (Matching Official Corporate Layout) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Our Sectors</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a
                  href="https://jigsy.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>All Offerings</span>
                </a>
              </li>
              <li>
                <a
                  href="https://jigsy.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Tech Solutions</span>
                </a>
              </li>
              <li>
                <a
                  href="https://jigsy.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Youth Development</span>
                </a>
              </li>
              <li>
                <a
                  href="https://jigsy.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Digital & Legal Consult</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Help & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal && onOpenLegal('about')}
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <a
                  href="#contact"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Contact Details</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal && onOpenLegal('privacy')}
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal && onOpenLegal('terms')}
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Terms of Service</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials, Visitors, Developer Profile */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/jigsy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#0077b5] flex items-center justify-center text-white transition-all shadow"
                aria-label="LinkedIn"
                title="JIGSY on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/jigsy25"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1877f2] flex items-center justify-center text-white transition-all shadow"
                aria-label="Facebook"
                title="JIGSY on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs text-slate-300 pt-1">
              <span className="text-slate-400 font-medium">Total Visitors: </span>
              <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {visitorCount.toLocaleString()}+
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <a
                href="mailto:jigsy25@gmail.com"
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                <span>Personalized Chatting</span>
              </a>

              <a
                href="https://jigyasu.jigsy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-bold bg-amber-950/40 border border-amber-800/60 px-2.5 py-1 rounded-lg transition-all"
              >
                <span>About Developer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Corporate Credential & Registration Metadata Banner */}
        <div className="pt-6 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <span className="font-semibold text-slate-300">जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति</span>
            <span> {" "} </span>
            <span>
              DPIIT: <strong className="text-slate-200 font-mono">DIPP228528</strong>
            </span>
            <span> {" "} </span>
            <span>
              GSTIN: <strong className="text-slate-200 font-mono">10AAHCJ0404B1ZN</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <span>
              MSME: <strong className="text-slate-200 font-mono">UDYAM-BR-34-0051280</strong>
            </span>
            <span> {" "} </span>
            <span>
              CIN: <strong className="text-slate-200 font-mono">U62099BR2025PTC078592</strong>
            </span>
            <span> {" "} </span>
            <span className="italic text-slate-300">
              Jigyasu Integrated Global Services with You
            </span>
          </div>
        </div>

        {/* Bottom Rights & Maintainer Line (M.Tech CSE removed as requested) */}
        <div className="pt-4 border-t border-slate-800/60 text-center space-y-1 text-xs text-slate-400">
          <div className="font-medium text-slate-200">
            Developed & Maintained by <span className="font-bold text-white">Mr. Jigyasu Vatsa</span>
          </div>
          <div className="text-[11px] text-slate-500">
            © 2026 onwards All rights reserved. Jigyasu Integrated Global Services Private Limited
          </div>
        </div>
      </div>
    </footer>
  );
};
