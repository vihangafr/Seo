'use client';

import React from 'react';
import { SeoIssue, ExtractedMeta } from '@/types/seo';
import { X, CheckCircle2, AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react';

interface TechnicalAuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  issues: SeoIssue[];
  initialScore: number;
  afterScore: number;
  extracted?: ExtractedMeta;
}

export const TechnicalAuditDrawer: React.FC<TechnicalAuditDrawerProps> = ({
  isOpen,
  onClose,
  issues,
  initialScore,
  afterScore,
  extracted,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F172A]/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white min-h-screen shadow-2xl p-6 sm:p-10 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
                TECHNICAL SEO AUDIT &amp; FIX REPORT
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Baseline score improved from {initialScore}/100 to {afterScore}/100
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          {extracted?.metrics && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Word Count</span>
                <span className="text-sm font-black text-[#0F172A]">{extracted.metrics.wordCount} words</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">H1 Headings</span>
                <span className="text-sm font-black text-[#0F172A]">{extracted.metrics.h1Count} found</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Images</span>
                <span className="text-sm font-black text-[#0F172A]">{extracted.metrics.totalImages} images</span>
              </div>
            </div>
          )}

          {/* Issues List */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Audit Breakdown ({issues.length} Items)
            </h3>

            <div className="space-y-3">
              {issues.map((issue) => {
                const isGood = issue.severity === 'good';
                const isCritical = issue.severity === 'critical';

                return (
                  <div
                    key={issue.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isGood
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                        : isCritical
                        ? 'bg-rose-50/50 border-rose-200 text-slate-800'
                        : 'bg-amber-50/50 border-amber-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isGood ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : isCritical ? (
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">{issue.title}</h4>
                          <span
                            className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${
                              isGood
                                ? 'bg-emerald-100 text-emerald-800'
                                : isCritical
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {issue.severity === 'good' ? 'Resolved' : issue.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{issue.message}</p>
                        <div className="pt-2 text-xs font-medium text-[#2563EB] bg-white p-3 rounded-xl border border-slate-200">
                          <span className="font-bold">Fix: </span>
                          {issue.fixSuggestion}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full bg-[#0F172A] hover:bg-black text-white text-xs font-black uppercase tracking-wider py-4 rounded-2xl transition-all shadow-sm"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
