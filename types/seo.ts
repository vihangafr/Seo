export interface ExtractedMeta {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  images: { src: string; alt: string }[];
  schemas: any[];
  links: { href: string; text: string; isInternal: boolean }[];
  textSample: string;
  detectedContact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  metrics: {
    titleLength: number;
    descriptionLength: number;
    h1Count: number;
    imagesWithoutAlt: number;
    totalImages: number;
    hasCanonical: boolean;
    hasOgTags: boolean;
    hasSchema: boolean;
    wordCount: number;
  };
}

export interface SeoIssue {
  id: string;
  severity: 'critical' | 'warning' | 'good';
  title: string;
  message: string;
  category: 'meta' | 'schema' | 'social' | 'sitemap' | 'content';
  fixSuggestion: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  title?: string;
}

export interface OptimizedSeoResult {
  businessInfo: {
    name: string;
    category: string;
    summary: string;
    targetKeywords: string[];
    targetAudience: string;
    locationOrServiceArea?: string;
  };
  meta: {
    optimizedTitle: string;
    titleRationale: string;
    optimizedDescription: string;
    descriptionRationale: string;
    canonicalUrl: string;
    focusKeywords: string[];
    robotsDirectives: string;
  };
  social: {
    ogTitle: string;
    ogDescription: string;
    ogType: string;
    ogImageSuggestedAlt: string;
    twitterCard: 'summary_large_image' | 'summary';
    twitterTitle: string;
    twitterDescription: string;
  };
  schemas: {
    primaryType: string;
    primarySchemaJson: any;
    faqSchemaJson?: any;
    websiteSchemaJson?: any;
    breadcrumbSchemaJson?: any;
    allCombinedJsonLd: string;
    validationStatus: {
      isValid: boolean;
      conformsToGoogle: boolean;
      notes: string[];
    };
  };
  sitemap: {
    xmlContent: string;
    urls: SitemapUrl[];
    validationChecklist: {
      hasXmlDeclaration: boolean;
      hasCorrectNamespace: boolean;
      hasValidDates: boolean;
      hasEscapedUrls: boolean;
      searchConsoleReady: boolean;
    };
  };
  robotsTxt: {
    content: string;
  };
  audit: {
    beforeScore: number;
    afterScore: number;
    scoreBreakdown: {
      metaTags: { before: number; after: number };
      schemaMarkup: { before: number; after: number };
      socialGraph: { before: number; after: number };
      searchConsoleReady: { before: number; after: number };
    };
    issues: SeoIssue[];
    actionableWins: string[];
  };
}

export interface SampleWebsite {
  id: string;
  name: string;
  category: string;
  url: string;
  badge: string;
  description: string;
  mockHtml: string;
}
