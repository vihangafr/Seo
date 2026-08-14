'use client';

import React, { useState } from 'react';
import { OptimizedSeoResult } from '@/types/seo';
import { Copy, Check, ExternalLink, Code2, Globe, Layers, BookOpen } from 'lucide-react';

interface PublishGuidesTabProps {
  result: OptimizedSeoResult;
}

export const PublishGuidesTab: React.FC<PublishGuidesTabProps> = ({ result }) => {
  const [activePlatform, setActivePlatform] = useState<
    'nextjs' | 'html' | 'wordpress' | 'shopify' | 'webflow' | 'squarespace'
  >('nextjs');
  const [copied, setCopied] = useState(false);

  const { meta, social, schemas, businessInfo } = result;

  const getNextJsSnippet = () => {
    return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: ${JSON.stringify(meta.optimizedTitle)},
  description: ${JSON.stringify(meta.optimizedDescription)},
  alternates: {
    canonical: ${JSON.stringify(meta.canonicalUrl)},
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: ${JSON.stringify(social.ogTitle)},
    description: ${JSON.stringify(social.ogDescription)},
    url: ${JSON.stringify(meta.canonicalUrl)},
    siteName: ${JSON.stringify(businessInfo.name)},
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: ${JSON.stringify(social.twitterTitle)},
    description: ${JSON.stringify(social.twitterDescription)},
  },
};

export default function Page() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(${schemas.allCombinedJsonLd}),
        }}
      />
      <main>
        {/* Your Page Content */}
      </main>
    </>
  );
}`;
  };

  const getHtmlSnippet = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>${meta.optimizedTitle}</title>
  <meta name="title" content="${meta.optimizedTitle}">
  <meta name="description" content="${meta.optimizedDescription}">
  <link rel="canonical" href="${meta.canonicalUrl}">
  <meta name="robots" content="${meta.robotsDirectives}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${social.ogType}">
  <meta property="og:url" content="${meta.canonicalUrl}">
  <meta property="og:title" content="${social.ogTitle}">
  <meta property="og:description" content="${social.ogDescription}">

  <!-- Twitter / X -->
  <meta property="twitter:card" content="${social.twitterCard}">
  <meta property="twitter:url" content="${meta.canonicalUrl}">
  <meta property="twitter:title" content="${social.twitterTitle}">
  <meta property="twitter:description" content="${social.twitterDescription}">

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
${schemas.allCombinedJsonLd}
  </script>
</head>
<body>
  <!-- Body content -->
</body>
</html>`;
  };

  const getSnippet = () => {
    if (activePlatform === 'nextjs') return getNextJsSnippet();
    if (activePlatform === 'html') return getHtmlSnippet();
    return '';
  };

  const copyCurrentSnippet = () => {
    const text = getSnippet();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
            PUBLISHING &amp; CMS INTEGRATION GUIDES
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Step-by-step instructions and 1-click code exports for any web platform.
          </p>
        </div>

        {(activePlatform === 'nextjs' || activePlatform === 'html') && (
          <button
            onClick={copyCurrentSnippet}
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-2xl transition-all shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Snippet!' : 'Copy Code Snippet'}</span>
          </button>
        )}
      </div>

      {/* Platform Selector Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-600 overflow-x-auto">
        <button
          onClick={() => setActivePlatform('nextjs')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activePlatform === 'nextjs' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
          }`}
        >
          Next.js (App Router)
        </button>
        <button
          onClick={() => setActivePlatform('html')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activePlatform === 'html' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
          }`}
        >
          Raw HTML &lt;head&gt;
        </button>
        <button
          onClick={() => setActivePlatform('wordpress')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activePlatform === 'wordpress' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
          }`}
        >
          WordPress
        </button>
        <button
          onClick={() => setActivePlatform('shopify')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activePlatform === 'shopify' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
          }`}
        >
          Shopify
        </button>
        <button
          onClick={() => setActivePlatform('webflow')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activePlatform === 'webflow' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
          }`}
        >
          Webflow
        </button>
        <button
          onClick={() => setActivePlatform('squarespace')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activePlatform === 'squarespace' ? 'bg-white text-[#0F172A] shadow-sm font-black' : 'hover:text-[#0F172A]'
          }`}
        >
          Squarespace &amp; Wix
        </button>
      </div>

      {/* Code / Guide Views */}
      {activePlatform === 'nextjs' || activePlatform === 'html' ? (
        <div className="bg-[#0F172A] rounded-3xl p-6 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner relative max-h-[500px] overflow-y-auto">
          <div className="sticky top-0 right-0 flex justify-between items-center pb-3 mb-3 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-bold bg-[#0F172A]/90 backdrop-blur">
            <span>{activePlatform === 'nextjs' ? 'app/layout.tsx or app/page.tsx' : 'index.html'}</span>
            <button
              onClick={copyCurrentSnippet}
              className="text-blue-400 hover:text-blue-300 font-sans font-bold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="leading-relaxed whitespace-pre-wrap">{getSnippet()}</pre>
        </div>
      ) : activePlatform === 'wordpress' ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-base font-black text-[#0F172A] uppercase tracking-wider">
            Publishing on WordPress (Yoast / RankMath / Code Snippets)
          </h3>
          <div className="space-y-3.5 text-xs text-slate-700 font-medium">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">1. Set SEO Title &amp; Meta Description:</span>
              <p className="leading-relaxed">In your page/post editor under the Yoast or RankMath box, paste the optimized Title and Description from the Meta Tags tab.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">2. Add Schema.org JSON-LD:</span>
              <p className="leading-relaxed">Install the free <strong>WPCode</strong> or <strong>Header and Footer Scripts</strong> plugin. Paste the Schema script into the <em>Header</em> field.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">3. Upload sitemap_live.xml:</span>
              <p className="leading-relaxed">Upload <code className="font-mono text-slate-900 font-bold">sitemap_live.xml</code> to your WordPress root via cPanel File Manager or FTP.</p>
            </div>
          </div>
        </div>
      ) : activePlatform === 'shopify' ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-base font-black text-[#0F172A] uppercase tracking-wider">
            Publishing on Shopify
          </h3>
          <div className="space-y-3.5 text-xs text-slate-700 font-medium">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">1. Store Title &amp; Description:</span>
              <p className="leading-relaxed">Go to <strong>Online Store &gt; Preferences</strong>. Paste your optimized title and description in the Title and Meta Description fields.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">2. Inject JSON-LD Schema:</span>
              <p className="leading-relaxed">Go to <strong>Online Store &gt; Themes &gt; Edit Code</strong>. Open <code className="font-mono text-slate-900 font-bold">layout/theme.liquid</code> and paste the &lt;script type=&quot;application/ld+json&quot;&gt; right before the closing <code className="font-mono text-slate-900 font-bold">&lt;/head&gt;</code> tag.</p>
            </div>
          </div>
        </div>
      ) : activePlatform === 'webflow' ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-base font-black text-[#0F172A] uppercase tracking-wider">
            Publishing on Webflow
          </h3>
          <div className="space-y-3.5 text-xs text-slate-700 font-medium">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">1. Page Settings SEO:</span>
              <p className="leading-relaxed">Open <strong>Page Settings</strong> in Webflow Designer. Paste the Title and Meta Description in the SEO section.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">2. Custom Code &lt;head&gt;:</span>
              <p className="leading-relaxed">Under <strong>Inside &lt;head&gt; tag</strong> in Page Settings or Site Settings, paste the structured schema script tag.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-base font-black text-[#0F172A] uppercase tracking-wider">
            Publishing on Squarespace &amp; Wix
          </h3>
          <div className="space-y-3.5 text-xs text-slate-700 font-medium">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">Squarespace:</span>
              <p className="leading-relaxed">Go to <strong>Settings &gt; Advanced &gt; Code Injection</strong> and paste the Schema markup in the Header area.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-black text-[#0F172A] uppercase tracking-wider block mb-1">Wix:</span>
              <p className="leading-relaxed">Go to <strong>Marketing &amp; SEO &gt; SEO Tools &gt; Structured Data (Schema)</strong> or <strong>Custom Code</strong> in Settings to insert your JSON-LD.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
