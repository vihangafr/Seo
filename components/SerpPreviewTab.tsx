'use client';

import React, { useState } from 'react';
import { OptimizedSeoResult } from '@/types/seo';
import { Monitor, Smartphone, Share2, Star, CheckCircle, ChevronDown, Sparkles } from 'lucide-react';

interface SerpPreviewTabProps {
  result: OptimizedSeoResult;
}

export const SerpPreviewTab: React.FC<SerpPreviewTabProps> = ({ result }) => {
  const { meta, social, businessInfo, schemas } = result;
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activePlatform, setActivePlatform] = useState<'google' | 'social'>('google');

  let domain = 'example.com';
  try {
    domain = new URL(meta.canonicalUrl).hostname;
  } catch {
    domain = meta.canonicalUrl;
  }

  const faqList = schemas.faqSchemaJson?.mainEntity || [];

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
            LIVE SEARCH ENGINE &amp; SOCIAL PREVIEWS
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Simulate exactly how your business will look to real searchers and social media users.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center text-xs font-black uppercase tracking-wider text-slate-600">
            <button
              onClick={() => setActivePlatform('google')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activePlatform === 'google' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
              }`}
            >
              Google Search SERP
            </button>
            <button
              onClick={() => setActivePlatform('social')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activePlatform === 'social' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
              }`}
            >
              Social Media Cards
            </button>
          </div>

          {activePlatform === 'google' && (
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center text-xs text-slate-600">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 rounded-xl transition-all ${
                  device === 'desktop' ? 'bg-white text-[#0F172A] shadow-sm' : 'hover:text-[#0F172A]'
                }`}
                title="Desktop Google Search"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded-xl transition-all ${
                  device === 'mobile' ? 'bg-white text-[#0F172A] shadow-sm' : 'hover:text-[#0F172A]'
                }`}
                title="Mobile Google Search"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {activePlatform === 'google' ? (
        <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 flex justify-center">
          {device === 'desktop' ? (
            /* Desktop Google Result Simulation */
            <div className="w-full max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-sm font-sans space-y-2.5">
              {/* Google URL Line */}
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-600">
                  {domain.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs">{businessInfo.name}</span>
                  <span className="text-[11px] text-slate-400 truncate block">
                    https://{domain}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-bold leading-snug">
                {meta.optimizedTitle}
              </h3>

              {/* Rich Snippet Star Rating & Badges */}
              <div className="flex items-center gap-2 text-xs text-slate-600 pt-0.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-black text-slate-900">4.9</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-medium">Rating: 4.9 · Verified {businessInfo.category}</span>
              </div>

              {/* Meta Description snippet */}
              <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2 font-normal">
                {meta.optimizedDescription}
              </p>

              {/* Expandable Rich Results FAQ Preview */}
              {faqList.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                    People Also Ask / Rich FAQs:
                  </span>
                  {faqList.slice(0, 2).map((item: any, i: number) => (
                    <div key={i} className="text-xs text-[#1a0dab] font-semibold flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0 cursor-pointer hover:underline">
                      <span>{item.name || item.question}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Mobile Google Result Simulation */
            <div className="w-full max-w-sm bg-white p-6 rounded-3xl border-2 border-slate-300 shadow-md font-sans space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600">
                  {domain.charAt(0).toUpperCase()}
                </div>
                <div className="truncate">
                  <span className="font-bold text-slate-900 text-xs block truncate">{businessInfo.name}</span>
                  <span className="text-[10px] text-slate-400 truncate block">https://{domain}</span>
                </div>
              </div>

              <h3 className="text-base text-[#1a0dab] font-bold leading-tight">
                {meta.optimizedTitle}
              </h3>

              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-black text-slate-900">4.9</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-medium">500+ Reviews</span>
              </div>

              <p className="text-xs text-[#4d5156] leading-relaxed font-normal">
                {meta.optimizedDescription}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Social Media Previews (X / Twitter & Facebook / LinkedIn) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* X / Twitter Card Preview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black text-[#0F172A] uppercase tracking-wider">X / Twitter Card Preview</span>
              <span className="text-[11px] font-mono font-bold text-slate-400">summary_large_image</span>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <div className="w-full h-44 bg-gradient-to-tr from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  {businessInfo.category}
                </span>
                <h4 className="text-base font-black mt-1 text-white leading-tight uppercase tracking-wider">
                  {businessInfo.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xs line-clamp-1 font-medium">
                  {result.social.ogImageSuggestedAlt}
                </p>
              </div>

              <div className="p-4 bg-white space-y-1">
                <span className="text-[11px] text-slate-400 block font-mono lowercase truncate font-medium">
                  {domain}
                </span>
                <h4 className="text-xs font-black text-[#0F172A] line-clamp-1">
                  {social.twitterTitle}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                  {social.twitterDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Facebook / LinkedIn Open Graph Card Preview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black text-[#0F172A] uppercase tracking-wider">Facebook / LinkedIn Share Card</span>
              <span className="text-[11px] font-mono font-bold text-slate-400">og:image (1200x630)</span>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <div className="w-full h-44 bg-gradient-to-tr from-blue-950 to-slate-900 flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Official Website
                </span>
                <h4 className="text-base font-black mt-1 text-white leading-tight uppercase tracking-wider">
                  {businessInfo.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xs line-clamp-1 font-medium">
                  {result.meta.canonicalUrl}
                </p>
              </div>

              <div className="p-4 bg-slate-100 border-t border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">
                  {domain}
                </span>
                <h4 className="text-xs font-black text-[#0F172A] line-clamp-1">
                  {social.ogTitle}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                  {social.ogDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
