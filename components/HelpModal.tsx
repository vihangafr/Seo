'use client';

import React from 'react';
import { X, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 sm:p-10 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
                SMALL BUSINESS TECHNICAL SEO GUIDE
              </h2>
              <p className="text-xs text-slate-400 font-medium">Frequently Asked Technical Search Concepts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-medium">
          <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-950">
              1. What is Schema.org Structured Data?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Schema markup is invisible machine code added to your website that translates your business information (like opening hours, physical address, star ratings, and menu items) into structured data that Googlebot reads instantly. It allows your business to appear with rich gold stars, FAQ dropdowns, and local business knowledge panels.
            </p>
          </div>

          <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950">
              2. Why do Search Console sitemaps often fail with errors?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Google Search Console is extremely strict. Common errors include: missing XML declarations, improper date formatting (must be ISO YYYY-MM-DD), unescaped ampersands (<code className="font-mono text-emerald-900 font-bold">&amp;</code> vs <code className="font-mono text-emerald-900 font-bold">&amp;amp;</code>), and mismatched canonical domains. SchemaFlow formats every <code className="font-mono text-emerald-900 font-bold">sitemap_live.xml</code> with guaranteed zero parsing errors.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
              3. What are the ideal Meta Tag lengths?
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Meta Title:</strong> 50 to 60 characters (approx 580 pixels). Anything longer gets clipped with an ellipsis (<span className="font-mono font-bold">...</span>) on Google.</li>
              <li><strong>Meta Description:</strong> 140 to 155 characters. Optimized for high click-through rates with an active call-to-action.</li>
            </ul>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
              4. How fast will Google update my search snippet?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Once you update your meta tags and submit your <code className="font-mono text-slate-900 font-bold">sitemap_live.xml</code> in Google Search Console, Google usually recrawls standard pages within <strong>24 to 72 hours</strong>. You can speed this up by using the &quot;URL Inspection&quot; tool in Search Console and clicking &quot;Request Indexing&quot;.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-2xl transition-all shadow-sm"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
