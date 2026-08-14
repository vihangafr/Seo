'use client';

import React, { useState } from 'react';
import { Search, Globe, Code, ArrowRight, CheckCircle2, Sliders, ChevronDown, ChevronUp, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { SAMPLE_WEBSITES } from '@/lib/sample-websites';

interface UrlInputBarProps {
  onAnalyze: (payload: { url?: string; rawHtml?: string; sampleId?: string; instructions?: string }) => void;
  isLoading: boolean;
  loadingStep: string;
}

export const UrlInputBar: React.FC<UrlInputBarProps> = ({ onAnalyze, isLoading, loadingStep }) => {
  const [urlInput, setUrlInput] = useState('');
  const [showRawHtml, setShowRawHtml] = useState(false);
  const [rawHtmlContent, setRawHtmlContent] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customInstructions, setCustomInstructions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showRawHtml && rawHtmlContent.trim()) {
      onAnalyze({ rawHtml: rawHtmlContent, url: urlInput || 'https://mywebsite.com', instructions: customInstructions });
    } else if (urlInput.trim()) {
      onAnalyze({ url: urlInput.trim(), instructions: customInstructions });
    }
  };

  const handleSampleClick = (sampleId: string) => {
    const sample = SAMPLE_WEBSITES.find((s) => s.id === sampleId);
    if (sample) {
      setUrlInput(sample.url);
      onAnalyze({ sampleId, url: sample.url, instructions: customInstructions });
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-blue-200/60 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Search Engine Optimization</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight uppercase">
            Optimize Your Website for Google &amp; Search Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Enter your URL to automatically crawl metadata, write high-CTR titles and descriptions, build Google-compliant Schema.org JSON-LD, and generate zero-error <span className="font-bold text-slate-800">sitemap_live.xml</span> files.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl border-2 border-slate-200 focus-within:border-[#2563EB] bg-slate-50/50 transition-all shadow-sm">
            <div className="flex items-center flex-1 pl-3 pr-2 py-1.5">
              <Globe className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                type="text"
                placeholder="Enter website URL (e.g. https://yourbusiness.com)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                disabled={isLoading}
                className="w-full bg-transparent text-[#0F172A] placeholder:text-slate-400 focus:outline-none text-sm sm:text-base font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || (!urlInput.trim() && !rawHtmlContent.trim())}
              className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <span>Audit &amp; Optimize</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Quick Real-World Demos */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              <span>Or test with a real small business demo:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_WEBSITES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSampleClick(sample.id)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#0F172A] bg-slate-100 hover:bg-slate-200/80 px-3.5 py-2 rounded-xl transition-all border border-slate-200/60"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  <span>{sample.name}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400">({sample.badge})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced / HTML Mode Toggle */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setShowRawHtml(!showRawHtml)}
              className="inline-flex items-center gap-1.5 hover:text-[#0F172A] transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showRawHtml ? 'Hide HTML paste box' : 'Paste raw HTML instead (staging/localhost)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 hover:text-[#0F172A] transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAdvanced ? 'Hide SEO Directives' : 'Add custom SEO directives'}</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Collapsible Raw HTML input */}
          {showRawHtml && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Paste Raw Page HTML Code
              </label>
              <textarea
                rows={4}
                value={rawHtmlContent}
                onChange={(e) => setRawHtmlContent(e.target.value)}
                placeholder="<!DOCTYPE html><html><head><title>My Business</title>...</head><body>...</body></html>"
                className="w-full text-xs font-mono p-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] text-slate-900"
              />
              <p className="text-[11px] text-slate-500 font-medium">
                Perfect for websites under construction, behind password protection, or hosted locally.
              </p>
            </div>
          )}

          {/* Collapsible Advanced instructions */}
          {showAdvanced && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Custom SEO Goals &amp; Keywords (Optional)
              </label>
              <input
                type="text"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="e.g. Focus on our 24/7 emergency service and downtown Seattle area"
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] text-slate-900 font-medium"
              />
              <p className="text-[11px] text-slate-500 font-medium">
                Provide any special promotions, target locations, or high-priority search terms.
              </p>
            </div>
          )}
        </form>

        {/* Loading Progress Feedback */}
        {isLoading && (
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-4 text-blue-950">
            <Loader2 className="w-6 h-6 text-[#2563EB] animate-spin shrink-0" />
            <div className="flex-1">
              <p className="font-black text-xs uppercase tracking-wider text-[#0F172A]">
                {loadingStep || 'Analyzing website architecture...'}
              </p>
              <p className="text-xs text-blue-700 font-medium mt-0.5">
                Generating rich Schema.org structured data, click-worthy metadata, and search-console sitemaps.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
