'use client';

import React, { useState } from 'react';
import { OptimizedSeoResult, ExtractedMeta } from '@/types/seo';
import { Copy, Check, Info, Sparkles, RefreshCw, Eye, Share2, Tag, ShieldCheck } from 'lucide-react';

interface MetaTagsTabProps {
  result: OptimizedSeoResult;
  extracted?: ExtractedMeta;
  onUpdateMeta?: (updated: Partial<OptimizedSeoResult['meta']>) => void;
}

export const MetaTagsTab: React.FC<MetaTagsTabProps> = ({ result, extracted, onUpdateMeta }) => {
  const [title, setTitle] = useState(result.meta.optimizedTitle);
  const [description, setDescription] = useState(result.meta.optimizedDescription);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'editor' | 'html'>('editor');

  const titleLength = title.length;
  const descriptionLength = description.length;

  const isTitleGood = titleLength >= 45 && titleLength <= 65;
  const isDescGood = descriptionLength >= 130 && descriptionLength <= 165;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (onUpdateMeta) {
      onUpdateMeta({ optimizedTitle: newTitle });
    }
  };

  const handleDescriptionChange = (newDesc: string) => {
    setDescription(newDesc);
    if (onUpdateMeta) {
      onUpdateMeta({ optimizedDescription: newDesc });
    }
  };

  const fullHeadHtml = `<!-- Primary SEO Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="robots" content="${result.meta.robotsDirectives}">
<link rel="canonical" href="${result.meta.canonicalUrl}">

<!-- Open Graph / Facebook / WhatsApp -->
<meta property="og:type" content="${result.social.ogType}">
<meta property="og:url" content="${result.meta.canonicalUrl}">
<meta property="og:title" content="${result.social.ogTitle}">
<meta property="og:description" content="${result.social.ogDescription}">
<meta property="og:image" content="${extracted?.ogImage || `${result.meta.canonicalUrl}/og-image.jpg`}">

<!-- Twitter / X -->
<meta property="twitter:card" content="${result.social.twitterCard}">
<meta property="twitter:url" content="${result.meta.canonicalUrl}">
<meta property="twitter:title" content="${result.social.twitterTitle}">
<meta property="twitter:description" content="${result.social.twitterDescription}">
<meta property="twitter:image" content="${extracted?.twitterImage || extracted?.ogImage || `${result.meta.canonicalUrl}/og-image.jpg`}">`;

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
            CLICK-OPTIMIZED META &amp; OPEN GRAPH TAGS
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Engineered for high organic click-through rates (CTR) and mobile SERP compatibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center text-xs font-black uppercase tracking-wider text-slate-600">
            <button
              onClick={() => setViewMode('editor')}
              className={`px-4 py-2 rounded-xl transition-all ${
                viewMode === 'editor' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
              }`}
            >
              Interactive Editor
            </button>
            <button
              onClick={() => setViewMode('html')}
              className={`px-4 py-2 rounded-xl transition-all ${
                viewMode === 'html' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
              }`}
            >
              Raw &lt;head&gt; HTML
            </button>
          </div>

          <button
            onClick={() => copyToClipboard(fullHeadHtml, 'all-meta')}
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-2xl transition-all shadow-sm"
          >
            {copiedKey === 'all-meta' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey === 'all-meta' ? 'Copied All!' : 'Copy Head Code'}</span>
          </button>
        </div>
      </div>

      {viewMode === 'html' ? (
        <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
            <span>index.html &lt;head&gt; section snippet</span>
            <button
              onClick={() => copyToClipboard(fullHeadHtml, 'raw-html')}
              className="text-blue-400 hover:text-blue-300 font-sans flex items-center gap-1.5"
            >
              {copiedKey === 'raw-html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'raw-html' ? 'Copied' : 'Copy snippet'}</span>
            </button>
          </div>
          <pre className="leading-relaxed whitespace-pre-wrap">{fullHeadHtml}</pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Title & Description */}
          <div className="space-y-6">
            {/* Meta Title Field */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#2563EB]" />
                  <span>Meta Title (&lt;title&gt;)</span>
                </label>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isTitleGood
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : titleLength > 65
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {titleLength} / 60 chars
                  </span>
                  <button
                    onClick={() => copyToClipboard(title, 'title')}
                    className="p-1.5 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
                    title="Copy title"
                  >
                    {copiedKey === 'title' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full text-sm font-bold text-[#0F172A] bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-all"
              />

              <div className="text-xs text-slate-600 bg-blue-50/70 rounded-2xl p-3.5 border border-blue-100 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  <span className="font-bold text-blue-950">Why this works: </span>
                  {result.meta.titleRationale}
                </p>
              </div>

              {extracted?.title && (
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-400">Previous tag: </span>
                  <span className="line-through text-slate-400">{extracted.title}</span>
                </div>
              )}
            </div>

            {/* Meta Description Field */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#2563EB]" />
                  <span>Meta Description</span>
                </label>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isDescGood
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : descriptionLength > 165
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {descriptionLength} / 155 chars
                  </span>
                  <button
                    onClick={() => copyToClipboard(description, 'desc')}
                    className="p-1.5 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
                    title="Copy description"
                  >
                    {copiedKey === 'desc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <textarea
                rows={3}
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-[#0F172A] bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-all leading-relaxed"
              />

              <div className="text-xs text-slate-600 bg-blue-50/70 rounded-2xl p-3.5 border border-blue-100 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  <span className="font-bold text-blue-950">Why this works: </span>
                  {result.meta.descriptionRationale}
                </p>
              </div>

              {extracted?.description && (
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-400">Previous tag: </span>
                  <span className="line-through text-slate-400">{extracted.description}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Open Graph, Canonical & Robots */}
          <div className="space-y-6">
            {/* Social Sharing (Open Graph / Twitter) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
                    Open Graph &amp; Social Cards
                  </h3>
                </div>
                <span className="text-[11px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {result.social.ogType}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-500 block mb-1">og:title</span>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[#0F172A] font-bold">
                    {result.social.ogTitle}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-500 block mb-1">og:description</span>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-medium">
                    {result.social.ogDescription}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-bold text-slate-500 block mb-1">twitter:card</span>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[#0F172A] font-mono text-[11px] font-bold">
                      {result.social.twitterCard}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block mb-1">Suggested Image Alt</span>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-[11px] truncate font-medium">
                      {result.social.ogImageSuggestedAlt}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Indexing Directives */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
                  Canonical &amp; Robots Directives
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-500 block mb-1">Canonical Tag (rel=&quot;canonical&quot;)</span>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-[#0F172A] font-bold truncate flex items-center justify-between">
                    <span>{result.meta.canonicalUrl}</span>
                    <button
                      onClick={() => copyToClipboard(`<link rel="canonical" href="${result.meta.canonicalUrl}" />`, 'canonical')}
                      className="text-slate-400 hover:text-[#0F172A] pl-2"
                    >
                      {copiedKey === 'canonical' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-500 block mb-1">Robots Meta Directive</span>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 font-mono text-[11px] text-emerald-900 font-bold">
                    {result.meta.robotsDirectives}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
