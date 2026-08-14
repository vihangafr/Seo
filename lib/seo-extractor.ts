import * as cheerio from 'cheerio';
import { ExtractedMeta, SeoIssue } from '@/types/seo';

export function extractSeoFromHtml(html: string, pageUrl: string = 'https://example.com'): {
  extracted: ExtractedMeta;
  initialIssues: SeoIssue[];
  initialScore: number;
} {
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim() || undefined;
  const description = $('meta[name="description"]').attr('content')?.trim() || 
                      $('meta[property="og:description"]').attr('content')?.trim() || 
                      undefined;
  const keywords = $('meta[name="keywords"]').attr('content')?.trim() || undefined;
  const canonical = $('link[rel="canonical"]').attr('href')?.trim() || undefined;
  const robots = $('meta[name="robots"]').attr('content')?.trim() || undefined;

  // Open Graph
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || undefined;
  const ogDescription = $('meta[property="og:description"]').attr('content')?.trim() || undefined;
  const ogImage = $('meta[property="og:image"]').attr('content')?.trim() || undefined;
  const ogUrl = $('meta[property="og:url"]').attr('content')?.trim() || undefined;
  const ogType = $('meta[property="og:type"]').attr('content')?.trim() || undefined;
  const ogSiteName = $('meta[property="og:site_name"]').attr('content')?.trim() || undefined;

  // Twitter
  const twitterCard = $('meta[name="twitter:card"]').attr('content')?.trim() || undefined;
  const twitterTitle = $('meta[name="twitter:title"]').attr('content')?.trim() || undefined;
  const twitterDescription = $('meta[name="twitter:description"]').attr('content')?.trim() || undefined;
  const twitterImage = $('meta[name="twitter:image"]').attr('content')?.trim() || undefined;

  // Headings
  const h1: string[] = [];
  $('h1').each((_, el) => {
    const text = $(el).text().trim();
    if (text) h1.push(text);
  });

  const h2: string[] = [];
  $('h2').each((_, el) => {
    const text = $(el).text().trim();
    if (text && h2.length < 15) h2.push(text);
  });

  const h3: string[] = [];
  $('h3').each((_, el) => {
    const text = $(el).text().trim();
    if (text && h3.length < 15) h3.push(text);
  });

  // Images
  const images: { src: string; alt: string }[] = [];
  let imagesWithoutAlt = 0;
  $('img').each((_, el) => {
    const src = $(el).attr('src') || '';
    const alt = $(el).attr('alt') || '';
    if (src) {
      images.push({ src, alt });
      if (!alt.trim()) imagesWithoutAlt++;
    }
  });

  // Schemas (JSON-LD)
  const schemas: any[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el).html() || '{}';
      const parsed = JSON.parse(raw);
      schemas.push(parsed);
    } catch {
      // Ignored malformed existing JSON-LD
    }
  });

  // Links
  let parsedHost = '';
  try {
    parsedHost = new URL(pageUrl).hostname;
  } catch {
    parsedHost = 'example.com';
  }

  const links: { href: string; text: string; isInternal: boolean }[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')?.trim() || '';
    const text = $(el).text().trim();
    if (href && !href.startsWith('#') && !href.startsWith('javascript:') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      let isInternal = true;
      if (href.startsWith('http://') || href.startsWith('https://')) {
        try {
          const linkHost = new URL(href).hostname;
          isInternal = linkHost === parsedHost || linkHost.endsWith(`.${parsedHost}`);
        } catch {
          isInternal = false;
        }
      }
      if (links.length < 30) {
        links.push({ href, text: text.slice(0, 60), isInternal });
      }
    }
  });

  // Text content heuristics
  $('script, style, noscript, svg, nav, footer').remove();
  const rawBodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const textSample = rawBodyText.slice(0, 3000);
  const wordCount = rawBodyText.split(/\s+/).filter(Boolean).length;

  // Contact heuristics
  const phoneMatch = rawBodyText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const emailMatch = rawBodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const addressMatch = rawBodyText.match(/\d+\s+[A-Za-z0-9\s,.'-]{5,50}(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Suite|Ste|Drive|Dr|Way|Lane|Ln)[A-Za-z0-9\s,.'-]*/i);

  const titleLength = title?.length || 0;
  const descriptionLength = description?.length || 0;

  const extracted: ExtractedMeta = {
    title,
    description,
    keywords,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    ogSiteName,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    headings: { h1, h2, h3 },
    images: images.slice(0, 15),
    schemas,
    links,
    textSample,
    detectedContact: {
      phone: phoneMatch ? phoneMatch[0] : undefined,
      email: emailMatch ? emailMatch[0] : undefined,
      address: addressMatch ? addressMatch[0] : undefined,
    },
    metrics: {
      titleLength,
      descriptionLength,
      h1Count: h1.length,
      imagesWithoutAlt,
      totalImages: images.length,
      hasCanonical: !!canonical,
      hasOgTags: !!(ogTitle || ogDescription || ogImage),
      hasSchema: schemas.length > 0,
      wordCount,
    },
  };

  // Generate initial issues and score
  const initialIssues: SeoIssue[] = [];
  let score = 100;

  if (!title) {
    initialIssues.push({
      id: 'missing-title',
      severity: 'critical',
      title: 'Missing Page Title',
      message: 'Your page is missing a <title> tag. Search engines cannot display a clickable headline in search results.',
      category: 'meta',
      fixSuggestion: 'Add a 50-60 character descriptive title featuring your main keyword and business name.',
    });
    score -= 25;
  } else if (titleLength < 30) {
    initialIssues.push({
      id: 'short-title',
      severity: 'warning',
      title: 'Title Too Short',
      message: `Current title is only ${titleLength} characters. You are missing valuable keyword real estate.`,
      category: 'meta',
      fixSuggestion: 'Expand title to 50-60 characters with clear location/specialization details.',
    });
    score -= 10;
  } else if (titleLength > 65) {
    initialIssues.push({
      id: 'long-title',
      severity: 'warning',
      title: 'Title Exceeds Recommended Length',
      message: `Current title is ${titleLength} characters and will be truncated by Google with an ellipsis (...).`,
      category: 'meta',
      fixSuggestion: 'Trim your title to under 60 characters so searchers see your full message.',
    });
    score -= 8;
  }

  if (!description) {
    initialIssues.push({
      id: 'missing-desc',
      severity: 'critical',
      title: 'Missing Meta Description',
      message: 'No meta description found. Google will pull random body text snippet that may look messy.',
      category: 'meta',
      fixSuggestion: 'Write a 140-160 character description with an irresistible hook and call to action.',
    });
    score -= 20;
  } else if (descriptionLength < 70) {
    initialIssues.push({
      id: 'short-desc',
      severity: 'warning',
      title: 'Short Meta Description',
      message: `Current description is only ${descriptionLength} characters. It leaves out key reasons to click.`,
      category: 'meta',
      fixSuggestion: 'Enrich description to 140-155 characters highlighting your unique value.',
    });
    score -= 8;
  } else if (descriptionLength > 165) {
    initialIssues.push({
      id: 'long-desc',
      severity: 'warning',
      title: 'Meta Description Truncated',
      message: `Current description is ${descriptionLength} characters, which gets cut off on mobile SERPs.`,
      category: 'meta',
      fixSuggestion: 'Tighten description to 150-160 characters for crisp display across all devices.',
    });
    score -= 6;
  }

  if (h1.length === 0) {
    initialIssues.push({
      id: 'missing-h1',
      severity: 'critical',
      title: 'Missing H1 Heading',
      message: 'No primary <h1> tag detected on the page. Search bots need this to identify primary topic.',
      category: 'content',
      fixSuggestion: 'Add one clear <h1> summarizing your core offering.',
    });
    score -= 15;
  } else if (h1.length > 1) {
    initialIssues.push({
      id: 'multiple-h1',
      severity: 'warning',
      title: 'Multiple H1 Headings Detected',
      message: `Found ${h1.length} <h1> tags. Multiple H1 tags can dilute semantic focus.`,
      category: 'content',
      fixSuggestion: 'Consolidate down to 1 main <h1> and convert secondary headings to <h2>.',
    });
    score -= 5;
  }

  if (!ogTitle || !ogImage) {
    initialIssues.push({
      id: 'missing-og',
      severity: 'warning',
      title: 'Incomplete Open Graph Tags',
      message: 'Missing og:title or og:image. Links shared on WhatsApp, Facebook, iMessage & LinkedIn will look plain without a card banner.',
      category: 'social',
      fixSuggestion: 'Define complete Open Graph & Twitter Card tags with high-res 1200x630 image.',
    });
    score -= 12;
  }

  if (schemas.length === 0) {
    initialIssues.push({
      id: 'missing-schema',
      severity: 'critical',
      title: 'Zero Structured Schema Markup',
      message: 'No JSON-LD schema detected. Your site is missing out on Google Rich Snippets (star ratings, business hours, FAQ dropdowns).',
      category: 'schema',
      fixSuggestion: 'Deploy schema.org JSON-LD (LocalBusiness, Organization, WebSite, FAQPage).',
    });
    score -= 20;
  }

  if (!canonical) {
    initialIssues.push({
      id: 'missing-canonical',
      severity: 'warning',
      title: 'Missing Canonical Tag',
      message: 'No canonical URL specified. Search engines may penalize duplicate content if accessed with/without trailing slashes or www.',
      category: 'meta',
      fixSuggestion: 'Set <link rel="canonical" href="..."> to point to the authoritative URL.',
    });
    score -= 5;
  }

  if (imagesWithoutAlt > 0) {
    initialIssues.push({
      id: 'missing-alt',
      severity: 'warning',
      title: `${imagesWithoutAlt} Image(s) Missing Alt Text`,
      message: 'Images without alt attributes hurt accessibility and miss Google Image Search indexing opportunities.',
      category: 'content',
      fixSuggestion: 'Add descriptive alt text to all informative images.',
    });
    score -= Math.min(imagesWithoutAlt * 2, 8);
  }

  return {
    extracted,
    initialIssues,
    initialScore: Math.max(score, 18),
  };
}
