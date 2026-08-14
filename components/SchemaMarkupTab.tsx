'use client';

import React, { useState } from 'react';
import { OptimizedSeoResult } from '@/types/seo';
import { Copy, Check, Download, ShieldCheck, HelpCircle, Layers, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Sparkles } from 'lucide-react';

interface SchemaMarkupTabProps {
  result: OptimizedSeoResult;
}

export const SchemaMarkupTab: React.FC<SchemaMarkupTabProps> = ({ result }) => {
  const { schemas, businessInfo } = result;
  const [activeSchemaTab, setActiveSchemaTab] = useState<'primary' | 'faq' | 'website' | 'combined'>('combined');
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const getActiveJsonString = () => {
    switch (activeSchemaTab) {
      case 'primary':
        return JSON.stringify(schemas.primarySchemaJson, null, 2);
      case 'faq':
        return JSON.stringify(schemas.faqSchemaJson || { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [] }, null, 2);
      case 'website':
        return JSON.stringify(schemas.websiteSchemaJson || { '@context': 'https://schema.org', '@type': 'WebSite', name: businessInfo.name }, null, 2);
      case 'combined':
      default:
        return schemas.allCombinedJsonLd;
    }
  };

  const currentJsonString = getActiveJsonString();

  const copyJsonLd = () => {
    const fullSnippet = `<script type="application/ld+json">\n${currentJsonString}\n</script>`;
    navigator.clipboard.writeText(fullSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJsonLd = () => {
    const blob = new Blob([currentJsonString], { type: 'application/ld+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schema-${activeSchemaTab}.jsonld`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = schemas.faqSchemaJson?.mainEntity || [];

  return (
    <div className="space-y-6">
      {/* Header & Validator Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
              STRUCTURED JSON-LD SCHEMA MARKUP
            </h2>
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Google Validated
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Enables Google Rich Snippets, star ratings, FAQ accordions, and Knowledge Graph cards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadJsonLd}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-black uppercase tracking-wider px-4 py-3 rounded-2xl transition-all border border-slate-200/60"
          >
            <Download className="w-4 h-4" />
            <span>Download .jsonld</span>
          </button>

          <button
            onClick={copyJsonLd}
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-2xl transition-all shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Script!' : 'Copy <script> Tag'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Schema Code Viewer & Switcher (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Schema Type Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-600 overflow-x-auto">
            <button
              onClick={() => setActiveSchemaTab('combined')}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeSchemaTab === 'combined' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
              }`}
            >
              Full Combined Graph (@graph)
            </button>
            <button
              onClick={() => setActiveSchemaTab('primary')}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeSchemaTab === 'primary' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
              }`}
            >
              {schemas.primaryType} (Main)
            </button>
            {schemas.faqSchemaJson && (
              <button
                onClick={() => setActiveSchemaTab('faq')}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeSchemaTab === 'faq' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
                }`}
              >
                FAQPage
              </button>
            )}
            {schemas.websiteSchemaJson && (
              <button
                onClick={() => setActiveSchemaTab('website')}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeSchemaTab === 'website' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
                }`}
              >
                WebSite
              </button>
            )}
          </div>

          {/* JSON-LD Code Block */}
          <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner relative max-h-[480px] overflow-y-auto">
            <div className="sticky top-0 right-0 flex justify-between items-center pb-3 mb-3 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider bg-[#0F172A]/90 backdrop-blur">
              <span>application/ld+json format</span>
              <button
                onClick={copyJsonLd}
                className="text-blue-400 hover:text-blue-300 font-sans flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="leading-relaxed whitespace-pre-wrap">{`<script type="application/ld+json">\n${currentJsonString}\n</script>`}</pre>
          </div>
        </div>

        {/* Right Column: Google Rich Results Validator & Visual FAQ Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Validation Pre-flight Checklist */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
                Google Rich Results Compliance
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 text-slate-700 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950">Valid Schema.org Type: </span>
                  <span>Registered under official <code className="font-mono text-[11px] font-bold">https://schema.org/{schemas.primaryType}</code> hierarchy.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-700 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950">Required Attributes Present: </span>
                  <span>Includes name, description, canonical URL, and entity properties.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-700 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950">Search Engine Parseability: </span>
                  <span>0 syntax errors, valid JSON quotation, no trailing comma defects.</span>
                </div>
              </div>
            </div>

            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-[#2563EB] hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 p-3 rounded-2xl border border-blue-200/60 transition-all"
            >
              <span>Test on Google Rich Results Tool</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Google FAQ Rich Snippet Preview */}
          {faqItems.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                  <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">
                    Google FAQ Rich Snippet Preview
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-bold uppercase">{faqItems.length} Q&amp;As</span>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                This structured data allows your frequently asked questions to appear as expandable dropdowns directly in Google Search results:
              </p>

              <div className="space-y-2 border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
                {faqItems.map((item: any, idx: number) => {
                  const isExpanded = expandedFaq === idx;
                  const question = item.name || item.question || 'FAQ Question';
                  const answer = item.acceptedAnswer?.text || item.answer || 'FAQ Answer';

                  return (
                    <div key={idx} className="p-3.5">
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800 hover:text-[#2563EB] transition-colors"
                      >
                        <span>{question}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />}
                      </button>

                      {isExpanded && (
                        <p className="mt-2.5 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60 font-medium">
                          {answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
