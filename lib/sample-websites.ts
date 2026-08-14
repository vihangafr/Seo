import { SampleWebsite } from '@/types/seo';

export const SAMPLE_WEBSITES: SampleWebsite[] = [
  {
    id: 'bakery',
    name: "Bella's Artisan Sourdough Bakery",
    category: 'Local Food & Bakery',
    url: 'https://bellasartisanbakery.com',
    badge: 'Local Business',
    description: 'Family-owned rustic organic sourdough bakery & espresso bar in Austin, TX.',
    mockHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home - Bella's Bakery</title>
  <meta name="description" content="Welcome to our bakery website. We sell bread and pastries.">
  <!-- Missing OG tags, missing schema, missing canonical -->
</head>
<body>
  <header>
    <h1>Fresh Bread Everyday</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/menu">Daily Loaves</a>
      <a href="/catering">Catering & Events</a>
      <a href="/our-story">Our Story</a>
      <a href="/contact">Visit Us</a>
    </nav>
  </header>
  <main>
    <h2>Naturally Fermented Wild Yeast Sourdough in East Austin</h2>
    <p>At Bella's Artisan Bakery, we believe slow food is good food. Every loaf undergoes a 36-hour slow cold fermentation process using 100% organic, stone-ground heritage grains sourced from local Texas mills.</p>
    
    <h2>Featured Baked Goods</h2>
    <ul>
      <li>Country Sourdough Boule ($9.50) - Crisp caramelized blistered crust with open airy crumb.</li>
      <li>Rosemary & Kalamata Olive Loaf ($11.00) - Infused with fresh garden rosemary and Greek olives.</li>
      <li>Cardamom Kouign-Amann ($5.50) - Flaky butter laminated pastry dusted with coarse sugar.</li>
      <li>Almond Pain au Chocolat ($6.00) - Valrhona 64% dark chocolate filled double-baked croissant.</li>
    </ul>

    <img src="/images/sourdough-fresh.jpg" />
    <img src="/images/croissants.jpg" />

    <h2>Visit Our Austin Bakeshop</h2>
    <p>Address: 1408 E 6th Street, Suite 102, Austin, TX 78702</p>
    <p>Phone: (512) 555-0194</p>
    <p>Email: hello@bellasartisanbakery.com</p>
    <p>Hours: Tuesday to Sunday: 7:00 AM – 3:00 PM (or until sold out). Closed Mondays.</p>
  </main>
  <footer>
    <p>&copy; 2026 Bella's Artisan Bakery LLC.</p>
  </footer>
</body>
</html>`,
  },
  {
    id: 'dental',
    name: 'BrightSmile Family & Cosmetic Dentistry',
    category: 'Healthcare & Dental',
    url: 'https://brightsmiledentalcare.com',
    badge: 'Medical Clinic',
    description: 'Gentle, pain-free dental clinic providing dental implants, Invisalign, and family care.',
    mockHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dentist Seattle WA | BrightSmile Care</title>
  <!-- Missing meta description, duplicate H1, no JSON-LD schema -->
</head>
<body>
  <h1>Seattle Dentist</h1>
  <h1>Comprehensive Family & Cosmetic Dental Care</h1>
  <p>Dr. Sarah Jenkins, DDS and our caring dental team provide gentle, advanced dental treatments for adults and children across Seattle and Bellevue.</p>
  
  <h2>Our Dental Services</h2>
  <ul>
    <li>Preventive Dental Cleanings & Digital 3D X-Rays</li>
    <li>Invisalign Clear Aligners & Orthodontics</li>
    <li>Same-Day Dental Crowns with CEREC technology</li>
    <li>Dental Implants & Smile Makeovers</li>
    <li>Emergency Dental Relief & Tooth Extractions</li>
  </ul>

  <h2>Why Choose BrightSmile Seattle</h2>
  <p>Over 500+ 5-star patient reviews. We accept most major PPO dental insurances and offer 0% APR financing payment plans. Sedation dentistry available for anxious patients.</p>

  <p>Location: 2200 4th Ave, Suite 300, Seattle, WA 98121</p>
  <p>Contact: (206) 555-8392 | appointments@brightsmiledentalcare.com</p>
  <p>Hours: Mon-Thu 8am-5pm, Fri 8am-2pm.</p>

  <nav>
    <a href="/services">Services</a>
    <a href="/invisalign">Invisalign</a>
    <a href="/implants">Dental Implants</a>
    <a href="/patient-reviews">Reviews</a>
    <a href="/book-online">Book Appointment</a>
  </nav>
</body>
</html>`,
  },
  {
    id: 'ecommerce',
    name: 'TerraKind Sustainable Home Goods',
    category: 'E-commerce & Retail',
    url: 'https://terrakindliving.com',
    badge: 'Online Store',
    description: 'Zero-waste bamboo, organic linen, and plastic-free home living essentials.',
    mockHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TerraKind - Eco Friendly Products</title>
  <meta name="description" content="Shop eco friendly home stuff online at TerraKind store.">
</head>
<body>
  <h1>Sustainable Living, Simplified</h1>
  <p>Discover ethical, organic home essentials designed to eliminate single-use plastics without sacrificing aesthetic elegance.</p>

  <h2>Best Selling Organic Home Essentials</h2>
  <div>
    <h3>Organic French Flax Linen Bed Sheet Set</h3>
    <p>Price: $185.00 USD. Certified OEKO-TEX standard 100 linen grown ethically in Normandy. Ultra breathable and softens with every wash.</p>
  </div>
  <div>
    <h3>Solid Brass & Bamboo Safety Razor Kit</h3>
    <p>Price: $42.00 USD. Plastic-free zero-waste shaving kit includes 10 Swedish stainless steel replacement blades.</p>
  </div>
  <div>
    <h3>Hand-Poured Soy & Botanical Candle</h3>
    <p>Price: $28.00 USD. 100% American soy wax with wild cedarwood and lavender essential oils. 55+ hour clean burn time.</p>
  </div>

  <p>Free carbon-neutral shipping on all US orders over $75. 30-day risk-free home trial.</p>
  <nav>
    <a href="/collections/bedding">Linen Bedding</a>
    <a href="/collections/bathroom">Zero Waste Bath</a>
    <a href="/collections/kitchen">Plastic-Free Kitchen</a>
    <a href="/sustainability">Our Eco Impact</a>
    <a href="/shipping-returns">Shipping Policy</a>
  </nav>
</body>
</html>`,
  },
  {
    id: 'b2b-saas',
    name: 'PulseFlow AI Workflow Automation',
    category: 'B2B Software & SaaS',
    url: 'https://pulseflowai.io',
    badge: 'Technology SaaS',
    description: 'No-code workflow automation and real-time CRM data synchronization for revenue teams.',
    mockHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PulseFlow - Automate your business processes</title>
  <meta name="description" content="PulseFlow is a tool that connects your apps and does automation with AI.">
</head>
<body>
  <h1>Automate Repetitive Workflows 10x Faster with PulseFlow</h1>
  <p>Connect HubSpot, Salesforce, Slack, Notion, and Postgres in seconds. Build intelligent multi-step triggers with autonomous error self-healing.</p>

  <h2>Key Capabilities</h2>
  <ul>
    <li>Real-Time Bidirectional CRM Sync across 200+ enterprise integrations</li>
    <li>Autonomous AI Agent Fallbacks when webhooks fail or payloads change</li>
    <li>SOC2 Type II Certified, HIPAA compliant, and end-to-end encrypted</li>
    <li>Instant visual canvas with live sandbox payload inspection</li>
  </ul>

  <h2>Transparent Pricing</h2>
  <p>Starter: $49/mo (10,000 tasks). Pro: $149/mo (50,000 tasks + priority support). Enterprise: Custom SLA & dedicated VPC.</p>

  <nav>
    <a href="/features">Features</a>
    <a href="/integrations">Integrations</a>
    <a href="/pricing">Pricing</a>
    <a href="/docs">API Documentation</a>
    <a href="/security">Security & Compliance</a>
  </nav>
</body>
</html>`,
  },
  {
    id: 'legal',
    name: 'Vanguard Intellectual Property & Patent Law',
    category: 'Professional Services',
    url: 'https://vanguardpatentlaw.com',
    badge: 'Law Firm',
    description: 'Strategic patent prosecution, trademark registration, and IP litigation for tech founders.',
    mockHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanguard IP Law Firm</title>
</head>
<body>
  <h1>Protecting Breakthrough Inventions and Global Trademarks</h1>
  <p>Former USPTO patent examiners and registered patent attorneys defending technology pioneers, AI startups, and biotech innovators in Silicon Valley and nationwide.</p>

  <h2>Practice Areas</h2>
  <ul>
    <li>Patent Prosecution & Prior Art Clearance Searches</li>
    <li>USPTO & International Madrid Protocol Trademark Registration</li>
    <li>Trade Secret Protection & Non-Disclosure Strategy</li>
    <li>IP Due Diligence for Venture Capital Series A/B Rounds</li>
    <li>Patent Infringement Defense & PTAB Inter Partes Reviews</li>
  </ul>

  <p>Headquarters: 450 Serra Mall, Suite 400, Palo Alto, CA 94301</p>
  <p>Consultation: (650) 555-0142 | info@vanguardpatentlaw.com</p>

  <nav>
    <a href="/attorneys">Our Patent Attorneys</a>
    <a href="/patents">Patent Prosecution</a>
    <a href="/trademarks">Trademark Registration</a>
    <a href="/case-studies">Representative Matters</a>
    <a href="/schedule-consultation">Book Confidential Consultation</a>
  </nav>
</body>
</html>`,
  },
];
