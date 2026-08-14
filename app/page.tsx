'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { Header } from '@/components/Header';
import { UrlInputBar } from '@/components/UrlInputBar';
import { SeoScoreCard } from '@/components/SeoScoreCard';
import { MetaTagsTab } from '@/components/MetaTagsTab';
import { SchemaMarkupTab } from '@/components/SchemaMarkupTab';
import { SitemapTab } from '@/components/SitemapTab';
import { SerpPreviewTab } from '@/components/SerpPreviewTab';
import { PublishGuidesTab } from '@/components/PublishGuidesTab';
import { TechnicalAuditDrawer } from '@/components/TechnicalAuditDrawer';
import { SavedSitesModal, SavedAnalysis } from '@/components/SavedSitesModal';
import { HelpModal } from '@/components/HelpModal';
import { OptimizedSeoResult, ExtractedMeta, SeoIssue } from '@/types/seo';
import { Tag, Layers, MapPin, Eye, BookOpen, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'searchpilot_saved_audits';
const STORAGE_EVENT = 'searchpilot_saved_updated';

function subscribeToStorage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function getStorageSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return localStorage.getItem(STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getServerStorageSnapshot(): string {
  return '[]';
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [currentResult, setCurrentResult] = useState<OptimizedSeoResult | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedMeta | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'meta' | 'schema' | 'sitemap' | 'serp' | 'publish'>('meta');
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const savedSitesRaw = useSyncExternalStore(
    subscribeToStorage,
    getStorageSnapshot,
    getServerStorageSnapshot
  );

  const savedSites: SavedAnalysis[] = useMemo(() => {
    try {
      return JSON.parse(savedSitesRaw);
    } catch {
      return [];
    }
  }, [savedSitesRaw]);

  const saveAnalysisToStorage = (siteUrl: string, result: OptimizedSeoResult, extracted: ExtractedMeta) => {
    try {
      const newEntry: SavedAnalysis = {
        id: `site-${Date.now()}`,
        url: siteUrl,
        timestamp: new Date().toISOString(),
        businessName: result.businessInfo.name,
        category: result.businessInfo.category,
        score: result.audit.afterScore,
        result,
        extracted,
      };

      const updated = [newEntry, ...savedSites.filter((s) => s.url !== siteUrl)].slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(STORAGE_EVENT));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  };

  const handleDeleteSavedSite = (id: string) => {
    const updated = savedSites.filter((s) => s.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(STORAGE_EVENT));
    } catch {
      // Ignored
    }
  };

  const handleSelectSavedSite = (saved: SavedAnalysis) => {
    setCurrentUrl(saved.url);
    setCurrentResult(saved.result);
    setExtractedData(saved.extracted);
    setErrorMessage(null);
  };

  const handleAnalyze = async ({
    url,
    rawHtml,
    sampleId,
    instructions,
  }: {
    url?: string;
    rawHtml?: string;
    sampleId?: string;
    instructions?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep('1/4: Crawling webpage and scanning meta tags...');

    try {
      // Step 1: Crawl and extract HTML
      const crawlRes = await fetch('/api/seo/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, rawHtml, sampleId }),
      });

      if (!crawlRes.ok) {
        const errJson = await crawlRes.json().catch(() => ({ error: 'Crawl request failed' }));
        throw new Error(errJson.error || 'Failed to crawl website.');
      }

      const crawlData = await crawlRes.json();
      const extracted: ExtractedMeta = crawlData.extracted;
      const targetUrl: string = crawlData.url;

      setExtractedData(extracted);
      setCurrentUrl(targetUrl);

      // Step 2: AI Optimization & Schema generation
      setLoadingStep('2/4: AI synthesizing click-optimized meta tags...');
      setTimeout(() => {
        setLoadingStep('3/4: Building Google-compliant Schema.org JSON-LD...');
      }, 900);
      setTimeout(() => {
        setLoadingStep('4/4: Validating sitemap_live.xml for Search Console...');
      }, 1800);

      const optRes = await fetch('/api/seo/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl,
          extracted,
          customInstructions: instructions,
        }),
      });

      if (!optRes.ok) {
        const errJson = await optRes.json().catch(() => ({ error: 'Optimization request failed' }));
        throw new Error(errJson.error || 'Failed to generate SEO optimization.');
      }

      const optData = await optRes.json();
      const result: OptimizedSeoResult = optData.result;

      setCurrentResult(result);
      saveAnalysisToStorage(targetUrl, result, extracted);
    } catch (err: any) {
      console.error('Optimization error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during SEO generation.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleDownloadAllFiles = () => {
    if (!currentResult) return;

    // Download sitemap_live.xml
    const sitemapBlob = new Blob([currentResult.sitemap.xmlContent], { type: 'application/xml' });
    const sitemapUrl = URL.createObjectURL(sitemapBlob);
    const a1 = document.createElement('a');
    a1.href = sitemapUrl;
    a1.download = 'sitemap_live.xml';
    document.body.appendChild(a1);
    a1.click();
    document.body.removeChild(a1);
    URL.revokeObjectURL(sitemapUrl);

    // Download robots.txt
    setTimeout(() => {
      const robotsBlob = new Blob([currentResult.robotsTxt.content], { type: 'text/plain' });
      const robotsUrl = URL.createObjectURL(robotsBlob);
      const a2 = document.createElement('a');
      a2.href = robotsUrl;
      a2.download = 'robots.txt';
      document.body.appendChild(a2);
      a2.click();
      document.body.removeChild(a2);
      URL.revokeObjectURL(robotsUrl);
    }, 200);

    // Download schema.jsonld
    setTimeout(() => {
      const schemaBlob = new Blob([currentResult.schemas.allCombinedJsonLd], { type: 'application/ld+json' });
      const schemaUrl = URL.createObjectURL(schemaBlob);
      const a3 = document.createElement('a');
      a3.href = schemaUrl;
      a3.download = 'schema-markup.jsonld';
      document.body.appendChild(a3);
      a3.click();
      document.body.removeChild(a3);
      URL.revokeObjectURL(schemaUrl);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header
        onOpenHelp={() => setIsHelpModalOpen(true)}
        savedCount={savedSites.length}
        onOpenHistory={() => setIsSavedModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Input Bar */}
        <UrlInputBar
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          loadingStep={loadingStep}
        />

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-start space-x-3 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Error during analysis: </span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Optimized Results Workspace */}
        {currentResult && (
          <div className="space-y-6">
            {/* Overview & Score Card */}
            <SeoScoreCard
              result={currentResult}
              extracted={extractedData || undefined}
              onDownloadAll={handleDownloadAllFiles}
              onOpenIssues={() => setIsAuditDrawerOpen(true)}
            />

            {/* Navigation Tabs */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('meta')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'meta'
                    ? 'bg-[#2563EB] text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Meta &amp; Social</span>
              </button>

              <button
                onClick={() => setActiveTab('schema')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'schema'
                    ? 'bg-[#2563EB] text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Schema.org JSON-LD</span>
              </button>

              <button
                onClick={() => setActiveTab('sitemap')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'sitemap'
                    ? 'bg-[#2563EB] text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Sitemap &amp; Robots</span>
              </button>

              <button
                onClick={() => setActiveTab('serp')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'serp'
                    ? 'bg-[#2563EB] text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>SERP Previews</span>
              </button>

              <button
                onClick={() => setActiveTab('publish')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === 'publish'
                    ? 'bg-[#2563EB] text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Publish Guides</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div>
              {activeTab === 'meta' && (
                <MetaTagsTab
                  result={currentResult}
                  extracted={extractedData || undefined}
                  onUpdateMeta={(updated) => {
                    setCurrentResult({
                      ...currentResult,
                      meta: { ...currentResult.meta, ...updated },
                    });
                  }}
                />
              )}

              {activeTab === 'schema' && (
                <SchemaMarkupTab result={currentResult} />
              )}

              {activeTab === 'sitemap' && (
                <SitemapTab result={currentResult} />
              )}

              {activeTab === 'serp' && (
                <SerpPreviewTab result={currentResult} />
              )}

              {activeTab === 'publish' && (
                <PublishGuidesTab result={currentResult} />
              )}
            </div>
          </div>
        )}

        {/* Feature Highlights when no site is loaded yet */}
        {!currentResult && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">
                CTR-OPTIMIZED META TAGS
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Generate high-converting titles and descriptions with strict character limits (55-60 chars) so Google never truncates your message with (...).
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">
                VALID SCHEMA.ORG JSON-LD
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Unlock Google Rich Snippets, Star Ratings, Local Knowledge Graph, and FAQ dropdowns with zero syntax errors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">
                ZERO-ERROR SITEMAP_LIVE.XML
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Strict Sitemaps.org 0.9 XML compliance with ISO timestamps and XML entity escaping to bypass standard Search Console parsing rejections.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="h-16 bg-white border-t border-slate-200 px-6 sm:px-10 flex items-center justify-between shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500 mt-12">
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#0F172A] font-black">SCHEMAFLOW AI ENGINE</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">Sitemaps &amp; Robots Managed</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="text-[#2563EB] hover:underline"
            >
              SEO Guidelines
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">Search Console 2026 Ready</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {currentResult && (
        <TechnicalAuditDrawer
          isOpen={isAuditDrawerOpen}
          onClose={() => setIsAuditDrawerOpen(false)}
          issues={currentResult.audit.issues}
          initialScore={currentResult.audit.beforeScore}
          afterScore={currentResult.audit.afterScore}
          extracted={extractedData || undefined}
        />
      )}

      <SavedSitesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedSites={savedSites}
        onSelectSite={handleSelectSavedSite}
        onDeleteSite={handleDeleteSavedSite}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
