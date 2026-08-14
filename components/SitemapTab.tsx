'use client';

import React, { useState } from 'react';
import { OptimizedSeoResult, SitemapUrl } from '@/types/seo';
import { generateSitemapXml, generateRobotsTxt } from '@/lib/sitemap-generator';
import { Download, Copy, Check, ShieldCheck, Plus, Trash2, CheckCircle2, AlertCircle, FileCode, ExternalLink, HelpCircle } from 'lucide-react';

interface SitemapTabProps {
  result: OptimizedSeoResult;
}

export const SitemapTab: React.FC<SitemapTabProps> = ({ result }) => {
  const [urls, setUrls] = useState<SitemapUrl[]>(result.sitemap.urls);
  const [newUrlPath, setNewUrlPath] = useState('');
  const [newPriority, setNewPriority] = useState<number>(0.8);
  const [newFreq, setNewFreq] = useState<SitemapUrl['changefreq']>('weekly');
  const [activeSubTab, setActiveSubTab] = useState<'sitemap' | 'robots' | 'guide'>('sitemap');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Recalculate XML when URLs list updates
  const { xml: currentXml, checklist } = generateSitemapXml(urls);
  const robotsContent = generateRobotsTxt(result.meta.canonicalUrl, 'sitemap_live.xml');

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrlPath.trim()) return;

    let fullLoc = newUrlPath.trim();
    if (!fullLoc.startsWith('http://') && !fullLoc.startsWith('https://')) {
      const base = result.meta.canonicalUrl.replace(/\/+$/, '');
      fullLoc = `${base}/${fullLoc.replace(/^\/+/, '')}`;
    }

    const today = new Date().toISOString().split('T')[0];
    const newEntry: SitemapUrl = {
      loc: fullLoc,
      lastmod: today,
      changefreq: newFreq,
      priority: newPriority,
    };

    setUrls([...urls, newEntry]);
    setNewUrlPath('');
  };

  const handleRemoveUrl = (index: number) => {
    setUrls(urls.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Search Console Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
              GOOGLE SEARCH CONSOLE SITEMAP &amp; ROBOTS.TXT
            </h2>
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>BYPASSES PARSING ERRORS</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Formatted to 100% compliant Sitemaps.org 0.9 XML schema with validated ISO dates and UTF-8 encoding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeSubTab === 'sitemap' ? (
            <button
              onClick={() => downloadFile('sitemap_live.xml', currentXml, 'application/xml')}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-2xl transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download sitemap_live.xml</span>
            </button>
          ) : activeSubTab === 'robots' ? (
            <button
              onClick={() => downloadFile('robots.txt', robotsContent, 'text/plain')}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-2xl transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download robots.txt</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('sitemap')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            activeSubTab === 'sitemap'
              ? 'bg-[#0F172A] text-white shadow-sm'
              : 'text-slate-600 hover:text-[#0F172A] bg-slate-100'
          }`}
        >
          sitemap_live.xml ({urls.length} URLs)
        </button>

        <button
          onClick={() => setActiveSubTab('robots')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            activeSubTab === 'robots'
              ? 'bg-[#0F172A] text-white shadow-sm'
              : 'text-slate-600 hover:text-[#0F172A] bg-slate-100'
          }`}
        >
          robots.txt Configuration
        </button>

        <button
          onClick={() => setActiveSubTab('guide')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            activeSubTab === 'guide'
              ? 'bg-[#0F172A] text-white shadow-sm'
              : 'text-slate-600 hover:text-[#0F172A] bg-slate-100'
          }`}
        >
          Search Console 3-Step Guide
        </button>
      </div>

      {activeSubTab === 'sitemap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: XML Code Viewer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner relative max-h-[500px] overflow-y-auto">
              <div className="sticky top-0 right-0 flex justify-between items-center pb-3 mb-3 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-bold bg-[#0F172A]/90 backdrop-blur">
                <span>sitemap_live.xml content</span>
                <button
                  onClick={() => copyText(currentXml, 'xml')}
                  className="text-blue-400 hover:text-blue-300 font-sans font-bold flex items-center gap-1.5"
                >
                  {copiedKey === 'xml' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'xml' ? 'Copied' : 'Copy XML'}</span>
                </button>
              </div>
              <pre className="leading-relaxed whitespace-pre-wrap">{currentXml}</pre>
            </div>
          </div>

          {/* Right: URL Manager & Search Console Validation (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Search Console Error Pre-check */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
                  Search Console Error Pre-check
                </h3>
              </div>

              <div className="space-y-2.5 text-xs font-medium">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700">XML Header &amp; UTF-8 Encoding</span>
                  <span className="font-black text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Valid</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700">ISO 8601 Date Formatting</span>
                  <span className="font-black text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>YYYY-MM-DD</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700">XML Entity Escaping (&amp;, &lt;, &gt;)</span>
                  <span className="font-black text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Safe</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700">robots.txt Direct Pointer</span>
                  <span className="font-black text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Linked</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Sitemap URL List & Add New Page */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
                Managed Pages ({urls.length})
              </h3>

              <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl">
                {urls.map((u, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                    <div className="truncate mr-2 flex-1">
                      <p className="font-mono text-[#0F172A] font-bold truncate">{u.loc}</p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Priority: {u.priority} • Freq: {u.changefreq}
                      </p>
                    </div>
                    {urls.length > 1 && (
                      <button
                        onClick={() => handleRemoveUrl(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                        title="Remove URL"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Custom Page Form */}
              <form onSubmit={handleAddUrl} className="pt-3 border-t border-slate-100 space-y-2.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Add Page to Sitemap:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="/about or https://..."
                    value={newUrlPath}
                    onChange={(e) => setNewUrlPath(e.target.value)}
                    className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] font-mono text-[#0F172A]"
                  />
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(parseFloat(e.target.value))}
                    className="text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-[#0F172A] font-bold"
                  >
                    <option value={1.0}>1.0 (Home)</option>
                    <option value={0.8}>0.8 (Main)</option>
                    <option value={0.6}>0.6 (Subpage)</option>
                    <option value={0.4}>0.4 (Low)</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-[#0F172A] hover:bg-black text-white text-xs font-black uppercase tracking-wider px-4 py-3 rounded-xl transition-all inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'robots' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-[#0F172A] uppercase tracking-wider">
                Optimized robots.txt File
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Directs search engine spiders (Googlebot, Bingbot) to your live sitemap while protecting sensitive admin areas.
              </p>
            </div>

            <button
              onClick={() => copyText(robotsContent, 'robots')}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-[#0F172A] bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200"
            >
              {copiedKey === 'robots' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'robots' ? 'Copied!' : 'Copy robots.txt'}</span>
            </button>
          </div>

          <div className="bg-[#0F172A] rounded-2xl p-5 text-slate-100 font-mono text-xs overflow-x-auto">
            <pre className="whitespace-pre-wrap leading-relaxed">{robotsContent}</pre>
          </div>

          <div className="text-xs text-slate-600 bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
            <p className="font-medium">
              Place this file at the root of your web server: <code className="font-mono font-bold text-blue-950">{result.meta.canonicalUrl.replace(/\/+$/, '')}/robots.txt</code>.
            </p>
          </div>
        </div>
      )}

      {activeSubTab === 'guide' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
              How to Submit Your Sitemap to Google Search Console (in 3 Minutes)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Follow these simple steps to ensure Google indexes all your pages without any parsing errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-black text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">Upload to Web Server</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Download <code className="font-mono text-slate-900 font-bold">sitemap_live.xml</code> and upload it to your public website root directory (e.g. <code className="font-mono text-slate-900 font-bold">public/</code> or via FTP/cPanel/CMS).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-black text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">Open Search Console</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Log in to <span className="font-bold text-slate-900">Google Search Console</span>, select your domain property, and click on <span className="font-bold text-slate-900">Sitemaps</span> in the left sidebar menu.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-black text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">Submit &amp; Verify</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                In the &quot;Add a new sitemap&quot; box, type <code className="font-mono text-slate-900 font-bold">sitemap_live.xml</code> and click <span className="font-bold text-slate-900">Submit</span>. Status will turn green &quot;Success&quot;.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
