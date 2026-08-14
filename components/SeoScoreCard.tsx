'use client';

import React from 'react';
import { OptimizedSeoResult, ExtractedMeta } from '@/types/seo';
import { ShieldCheck, TrendingUp, Sparkles, Download, CheckCircle2, AlertTriangle, FileText, ArrowUpRight } from 'lucide-react';

interface SeoScoreCardProps {
  result: OptimizedSeoResult;
  extracted?: ExtractedMeta;
  onDownloadAll: () => void;
  onOpenIssues: () => void;
}

export const SeoScoreCard: React.FC<SeoScoreCardProps> = ({
  result,
  extracted,
  onDownloadAll,
  onOpenIssues,
}) => {
  const { audit, businessInfo } = result;
  const scoreDelta = audit.afterScore - audit.beforeScore;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Score & Health Stats */}
        <div className="lg:col-span-4 flex items-center gap-5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-emerald-600 flex flex-col items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <span className="text-3xl font-black tracking-tight">{audit.afterScore}</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">SEO Score</span>
            </div>
            <div className="absolute -top-2 -right-2 bg-[#2563EB] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
              +{scoreDelta}%
            </div>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-wider">
              <span>Audit Status</span>
            </div>
            <h3 className="text-base font-black text-[#0F172A] uppercase tracking-wide leading-snug">
              Search Console Ready
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Baseline score was <span className="font-bold text-slate-800">{audit.beforeScore}/100</span>.
            </p>
            <button
              onClick={onOpenIssues}
              className="text-xs font-black uppercase tracking-wider text-[#2563EB] hover:text-blue-700 inline-flex items-center gap-1 pt-1"
            >
              <span>View Resolved Issues ({audit.issues.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Business Identity & Key Highlights */}
        <div className="lg:col-span-5 space-y-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-blue-50 text-[#2563EB] rounded-full border border-blue-200/60">
                {businessInfo.category}
              </span>
              <span className="text-xs text-slate-700 font-bold">
                {businessInfo.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
              {businessInfo.summary}
            </p>
          </div>

          {/* Targeted Keywords */}
          {businessInfo.targetKeywords && businessInfo.targetKeywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Target Keywords:</span>
              {businessInfo.targetKeywords.slice(0, 4).map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Button & Quick Export */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center lg:items-end">
          <button
            onClick={onDownloadAll}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-black text-white text-xs sm:text-sm font-black uppercase tracking-wider px-5 py-3.5 rounded-2xl shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download All SEO Files</span>
          </button>

          <p className="text-[11px] text-slate-400 font-medium text-center lg:text-right">
            Includes <code className="font-mono text-slate-700 font-bold">sitemap_live.xml</code>, <code className="font-mono text-slate-700 font-bold">robots.txt</code>, and schema.
          </p>
        </div>
      </div>

      {/* Actionable Wins Banner */}
      {audit.actionableWins && audit.actionableWins.length > 0 && (
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {audit.actionableWins.slice(0, 3).map((win, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{win}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
