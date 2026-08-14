'use client';

import React from 'react';
import { Sparkles, ShieldCheck, FileCode, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenHelp?: () => void;
  savedCount?: number;
  onOpenHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHelp, savedCount = 0, onOpenHistory }) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm shadow-blue-500/20 font-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-[#0F172A] text-lg tracking-tight uppercase">SchemaFlow</span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#2563EB] px-2.5 py-0.5 rounded-full border border-blue-200/60">
                SEO ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              AI Metadata, Schema Markup &amp; Search Console Sitemaps for Small Businesses
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {savedCount > 0 && (
            <button
              onClick={onOpenHistory}
              className="text-xs font-black uppercase tracking-wider text-slate-700 hover:text-[#0F172A] bg-slate-100 hover:bg-slate-200/80 px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 border border-slate-200/60"
            >
              <FileCode className="w-4 h-4 text-slate-500" />
              <span>Saved Sites ({savedCount})</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-2 text-xs text-emerald-800 font-black uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Google Rich Results 2026 Ready</span>
          </div>

          {onOpenHelp && (
            <button
              onClick={onOpenHelp}
              className="p-2 text-slate-500 hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-colors"
              title="SEO Guide & Search Console Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

