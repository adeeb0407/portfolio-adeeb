/**
 * Every fact on the site lives here. Sources: Adeeb's own answers (Nov 2026), his resume,
 * pronttera.com, the Tijarah and Frostique sites, and the YouTube and Discord APIs.
 * No religious references anywhere (Adeeb's rule). No education, no resume download.
 */

export const PERSON = {
  first: "ADEEB",
  last: "SHAH",
  name: "Adeeb Shah",
  role: "Founder & CEO, Pronttera",
  craft: "Full-stack product engineer",
  city: "Pune, India",
  email: "info@pronttera.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adeebdev/" },
    { label: "GitHub", href: "https://github.com/adeeb0407" },
    { label: "X", href: "https://x.com/adeebshah41" },
    { label: "Instagram", href: "https://instagram.com/adeeb0407" },
    { label: "YouTube", href: "https://www.youtube.com/@Tridenttm" },
    { label: "Discord", href: "https://discord.gg/7Hz7gB45S2" },
  ],
};

/** The opening statement. Words wrapped in [brackets] get highlighted as they scroll in. */
export const STATEMENT =
  "I build software that lets small businesses [own their customers.] No marketplace in the middle, no commission on every order. Their name, their app, their data. I've been shipping things people use since I was [sixteen,] and in 2026 I learned to [sell them too.] Now I ship AI agents that do real work: read-only, every query shown, [evals over vibes.]";

export const PROOF = [
  { value: "10,000+", label: "Tijarah customers", note: "Live on iOS and Android" },
  { value: "15,000", label: "players online at 16", note: "Acronoid Ragnarok servers" },
  { value: "1,000+", label: "Frostique customers", note: "Zero commission" },
  { value: "20,000+", label: "Zerox Cloud users", note: "Built for a client" },
  { value: "285", label: "videos as TridentTM", note: "On YouTube since 2013" },
  { value: "1,000+", label: "Discord members", note: "Acronoid E-Sports, at its peak" },
];

export const PRODUCTS = [
  {
    id: "tijarah",
    name: "Tijarah",
    kicker: "Community marketplace · iOS and Android",
    line: "The talent was always there. The directory wasn't.",
    body: "Find, chat with and book verified local providers: home kitchens, tailors, tutors, caterers and boutiques. Reviews only come from real bookings, and providers keep every rupee.",
    stats: [
      { b: "10,000+", s: "customers" },
      { b: "25,000+", s: "members" },
      { b: "3,200+", s: "verified providers" },
      { b: "48", s: "cities" },
      { b: "61%", s: "women-led" },
      { b: "4.8★", s: "App Store" },
    ],
    href: "https://landing.tijarahapp.in/",
    cta: "Visit Tijarah",
    theme: { bg: "#e9d27a", ink: "#1a1406", accent: "#1a1406" },
    devices: { phones: ["/products/tijarah-discover.webp", "/products/tijarah-chat.webp", "/products/tijarah-dashboard.webp"] },
    logo: "/brand/tijarah-logo.webp",
  },
  {
    id: "frostique",
    name: "Frostique",
    kicker: "White-label ordering for bakeries",
    line: "Your bakery. Your app. Zero commission.",
    body: "Every bakery gets its own ordering site and app in its own name, for a flat fee. Custom-cake builder, WhatsApp orders, advance bookings, next-day payouts. One bakery stopped paying a 22% delivery-app cut.",
    stats: [
      { b: "1,000+", s: "customers" },
      { b: "0%", s: "commission" },
      { b: "22%", s: "fee one bakery stopped paying" },
      { b: "14 days", s: "free trial" },
    ],
    href: "https://www.frostique.store/",
    cta: "Visit Frostique",
    theme: { bg: "#e7c7cf", ink: "#2a0d17", accent: "#2a0d17" },
    devices: { laptop: "/products/frostique-dashboard.webp", tablet: "/products/frostique-analytics.webp", phones: ["/products/frostique-storefront.webp"] },
    logo: "/brand/frostique-logo.webp",
  },
  {
    id: "fitstack",
    name: "FitStack",
    kicker: "Gym community platform · In development",
    line: "A social network for the gym floor.",
    body: "Gyms connect in, and their members get a community that is theirs: talk, train together, share the work. Opening soon.",
    stats: [
      { b: "Soon", s: "opening" },
      { b: "Gyms", s: "connected, not booked" },
    ],
    href: "",
    cta: "Opening soon",
    theme: { bg: "#1c1c1f", ink: "#eef0f2", accent: "#d9ff4a" },
    devices: {},
    logo: "",
  },
];

export const WORK = [
  { name: "Rixura", what: "Teleradiology platform", tag: "Healthcare", year: "2025", img: "/work/rixura.webp", href: "https://rixura.com/" },
  { name: "PayFace", what: "Pay with your face", tag: "Fintech", year: "2025", img: "/work/payface.webp", href: "https://pronttera.com/case-studies/payface/" },
  { name: "Zerox Cloud", what: "Print marketplace · 20,000+ users", tag: "Consumer", year: "2025", img: "/work/zerox.webp", href: "https://pronttera.com/case-studies/zerox-cloud/" },
  { name: "KhanSaab", what: "Inventory, POS and storefront", tag: "Retail", year: "2026", img: "/work/khansaab.webp", href: "https://pronttera.com/case-studies/khansaab/" },
  { name: "Endo45", what: "Endodontics mobile app", tag: "Healthcare", year: "2025", img: "", href: "https://www.endo45.co.nz/" },
  { name: "Fyntrix", what: "AI-powered financial platform", tag: "AI", year: "2025", img: "", href: "https://fyntrix.ai/" },
  { name: "Rafai AI", what: "Analytics agent over a logistics database", tag: "AI agent", year: "2026", img: "/work/rafai.webp", href: "https://rafai-ai-interface.vercel.app/" },
  { name: "ClinicSoft Agent", what: "Ask a clinic group's records anything", tag: "AI agent", year: "2026", img: "/work/clinicsoft.webp", href: "https://emr-ai-umber.vercel.app/ask" },
];

export const OFF_CLOCK = [
  { k: "Football", v: "Played professionally.", glyph: "ball" },
  { k: "Badminton", v: "Court whenever the week allows.", glyph: "shuttle" },
  { k: "Valorant · CS2", v: "Still TridentTM in every lobby.", glyph: "aim" },
  { k: "YouTube", v: "285 videos since he was eleven.", glyph: "play" },
];

/** The long version: eight chapters, told in order. Every fact is from Adeeb or his resume. */
export const CHAPTERS = [
  {
    year: "2013",
    age: "Age 11",
    title: "Hit record.",
    body: "Started a YouTube channel as TridentTM. Gameplay, tutorials, then daily live streams. The channel taught him that if you ship every week, people show up.",
    facts: ["285 videos", "TridentTM", "Weekly uploads, daily streams"],
    img: "/brand/trident-gaming-logo.webp",
    tone: "#2c3e63",
  },
  {
    year: "2017",
    age: "Age 16",
    title: "Built a world.",
    body: "Ran two Ragnarok Online private servers, Acronoid and Zodiac, on the open-source rAthena emulator with kRO client files. Servers in India and the Philippines. The community grew on Facebook with players across the Philippines.",
    facts: ["~15,000 players online", "rAthena + kRO", "India + Philippines"],
    img: "",
    glyph: "ro",
    tone: "#22305a",
  },
  {
    year: "Teens",
    age: "First business",
    title: "Built the machines.",
    body: "Assembled custom PCs and sold them to schools and colleges. Sourcing parts, building, delivering, supporting. The first time code and customers met hardware and invoices.",
    facts: ["Custom builds", "Schools and colleges", "Pune"],
    img: "",
    glyph: "pc",
    tone: "#245a4b",
  },
  {
    year: "2019",
    age: "Acronoid E-Sports",
    title: "Ran the tournaments.",
    body: "Founded the Acronoid E-Sports Discord. Through lockdown he organised and live-streamed CS:GO, PUBG Mobile and Valorant community tournaments, casting finals for a crew that peaked above a thousand members.",
    facts: ["1,000+ members at peak", "CS:GO · PUBG Mobile · Valorant", "Streamed on YouTube"],
    img: "/brand/acronoid-esports.webp",
    tone: "#3b4591",
  },
  {
    year: "2020",
    age: "Amazon",
    title: "Went pro.",
    body: "Joined Amazon as a database engineer. By night, taught himself the MERN stack and shipped a run of side projects: a chat app, a social network, scrapers and auth starters.",
    facts: ["Database engineer", "MERN stack", "Side projects every month"],
    img: "",
    glyph: "db",
    tone: "#7a5424",
  },
  {
    year: "2022",
    age: "Auckland",
    title: "Typed, then flew.",
    body: "Moved to TypeScript and NestJS as a product engineer at Smartle, then to Techwondoe in Auckland. Led the migration of an 18-year-old Django codebase to FastAPI, designed the AWS infrastructure and shipped a cross-platform app with Next.js and Capacitor.",
    facts: ["18-year codebase migrated", "AWS end to end", "Mentored interns"],
    img: "",
    glyph: "akl",
    tone: "#245c66",
  },
  {
    year: "2024",
    age: "December",
    title: "Founded Pronttera.",
    body: "Started the company solo from Auckland, incorporated in India, to take on a freelance pipeline that had outgrown one person. Went full time in April 2025. Pronttera Labs now trains new engineers on real product work.",
    facts: ["Solo founder", "Pronttera Labs", "Clients in India and abroad"],
    img: "/brand/pronttera-logo.webp",
    tone: "#1f5a75",
  },
  {
    year: "2025",
    age: "Products",
    title: "Owns the product.",
    body: "Tijarah and Frostique are live, FitStack is boarding. All three share one idea: the business keeps its customers, its data and every rupee.",
    facts: ["Tijarah · 10,000+ customers", "Frostique · 1,000+ customers", "FitStack · in development"],
    img: "/products/tijarah-discover.webp",
    tone: "#7a3a24",
  },
  {
    year: "2026",
    age: "Dubai",
    title: "Went to market.",
    body: "Moved to Dubai to open new markets for Pronttera. The year the engineer learned to sell: prospecting, pitching, pricing, closing, and marketing from the ground up. And the year the agents went live: Rafai AI for a logistics company, ClinicSoft Agent for a clinic group, each answering plain-English questions from the client's own database under read-only permissions.",
    facts: ["Dubai base", "Sales and marketing", "AI agents in production", "FitStack boarding"],
    img: "",
    glyph: "dxb",
    tone: "#6b5330",
  },
];

/** The record: every achievement, with its proof. Categories drive the filter chips. */
export type AchCat = "Products" | "Engineering" | "Community" | "Business";
export const ACHIEVEMENTS: { cat: AchCat; title: string; detail: string; metric: string; unit: string; year: string }[] = [
  { cat: "Community", title: "Ran two Ragnarok Online servers at sixteen", detail: "Acronoid and Zodiac, built on rAthena with kRO client files, hosted in India and the Philippines. Community grown on Facebook.", metric: "15,000", unit: "players online", year: "2017" },
  { cat: "Business", title: "Built and sold custom PCs as a teenager", detail: "Assembled machines and sold them to schools and colleges in Pune. First customers, first invoices.", metric: "First", unit: "business", year: "Teens" },
  { cat: "Community", title: "Founded Acronoid E-Sports", detail: "Organised and live-streamed CS:GO, PUBG Mobile and Valorant community tournaments through lockdown, casting the finals.", metric: "1,000+", unit: "members at peak", year: "2019" },
  { cat: "Community", title: "Thirteen years on YouTube as TridentTM", detail: "Started at eleven. Gameplay, tutorials, daily streams, tournament broadcasts.", metric: "285", unit: "videos", year: "2013" },
  { cat: "Engineering", title: "Database engineer at Amazon", detail: "Production data and server operations at scale, while teaching himself the MERN stack at night.", metric: "2020", unit: "Amazon", year: "2020" },
  { cat: "Engineering", title: "Migrated an 18-year-old codebase", detail: "Led the move from a legacy Django monolith to a modern FastAPI architecture at Techwondoe, improving maintainability and performance.", metric: "18", unit: "years of legacy retired", year: "2023" },
  { cat: "Engineering", title: "Designed AWS infrastructure end to end", detail: "EC2, RDS, S3, Cognito, SNS, CloudFront, Elastic Beanstalk, with CodePipeline releases. Cut cloud costs by restructuring live resources.", metric: "AWS", unit: "end to end", year: "2023" },
  { cat: "Engineering", title: "Shipped a cross-platform app from one codebase", detail: "Next.js and Capacitor for Android and iOS, backed by NestJS and AWS.", metric: "2", unit: "platforms, one codebase", year: "2024" },
  { cat: "Business", title: "Founded Pronttera solo, from Auckland", detail: "Incorporated in India in December 2024 to take on a freelance pipeline that had outgrown one person. Full time since April 2025.", metric: "Dec 24", unit: "founded", year: "2024" },
  { cat: "Products", title: "Launched Tijarah on the App Store and Google Play", detail: "Community marketplace. 8,000 members in the first month, 25,000+ members and 3,200+ verified providers across 48 cities since. Rated 4.8 and 4.7.", metric: "10,000+", unit: "customers", year: "2025" },
  { cat: "Products", title: "Launched Frostique", detail: "White-label ordering for bakeries: their own site and app, flat fee, no commission. One bakery stopped paying a 22% delivery-app cut.", metric: "1,000+", unit: "customers", year: "2025" },
  { cat: "Business", title: "Zerox Cloud for a client", detail: "Print marketplace with a vendor dashboard and three-day payouts. 40% faster orders, 20% cheaper than walk-in.", metric: "20,000+", unit: "users", year: "2025" },
  { cat: "Business", title: "Rixura, a profitable healthcare platform", detail: "DICOM-native teleradiology: scan request to signed report and invoice in one flow. Revenue-generating from launch.", metric: "DICOM", unit: "native viewer", year: "2025" },
  { cat: "Business", title: "KhanSaab retail system", detail: "Inventory, GST point of sale and storefront on one 56-table PostgreSQL database. Row-level-locked stock, zero oversells.", metric: "100+", unit: "orders a day", year: "2026" },
  { cat: "Business", title: "Pronttera Labs", detail: "An educational initiative training aspiring engineers on real product work.", metric: "Labs", unit: "mentoring", year: "2025" },
  { cat: "Business", title: "Moved to Dubai to open new markets", detail: "Prospecting, pitching, pricing and closing for Pronttera. Learned sales and marketing by doing it.", metric: "DXB", unit: "new base", year: "2026" },
  { cat: "Engineering", title: "Rafai AI, an analytics agent for logistics", detail: "Ask Rafai Technologies' operations anything in plain English: consignments, freight billed, vehicle documents, per-km costs. Answers come only from the views the signed-in role may read, every query is shown, and anything outside the role is refused rather than answered.", metric: "Read-only", unit: "every query shown", year: "2026" },
  { cat: "Engineering", title: "ClinicSoft Agent for a clinic group", detail: "A plain-English agent over a ClinicSoft 9.0 database for a medical and dental group with three branches and about 977,000 records: revenue, claims, no-shows, stock, compliance. Role-based guardrails, charts on demand, and a page that explains what it will refuse.", metric: "977k", unit: "records, 3 branches", year: "2026" },
  { cat: "Engineering", title: "Agents in production, not demos", detail: "Pronttera's rule for AI: evals over vibes, a tool layer (MCP) between the model and the data, and permissions enforced below the model so it can never see what the user cannot.", metric: "Evals", unit: "not vibes", year: "2026" },
  { cat: "Products", title: "FitStack, boarding", detail: "A social network for the gym floor. Gyms connect in, members get a community that is theirs.", metric: "Soon", unit: "opening", year: "2026" },
];

/** Range: the four pillars he now works across. The last two are the 2026 growth. */
export const RANGE = [
  { n: "01", title: "Engineering", line: "Systems that hold.", since: "2013", items: ["React, Next.js, React Native", "Node.js, NestJS, FastAPI", "AWS end to end, Docker, Kubernetes", "Multi-tenant SaaS, DICOM, payments"] },
  { n: "02", title: "Product", line: "Ship what people pay for.", since: "2021", items: ["Discovery to launch, weekly demos", "Three products on the app stores", "Pricing, onboarding, retention", "Zero-commission as a principle"] },
  { n: "03", title: "Sales & Marketing", line: "Learned in 2026, in the field.", since: "2026", items: ["Prospecting and pitching in Dubai", "Positioning and pricing", "Campaigns, content, brand", "Closing, then keeping the client"] },
  { n: "04", title: "Leadership", line: "The person running the company.", since: "2024", items: ["Solo founder, co-creating with a team", "Pronttera Labs mentoring", "Communities of 1,000+ since nineteen", "A personal brand, built in public"] },
  { n: "05", title: "Agentic AI", line: "Agents that do work, not demos.", since: "2025", items: ["LLM agents over live databases", "RAG, MCP tool layers, evals", "Role-based guardrails below the model", "Two agents live in 2026"] },
];

/** The AI section: his position, the principles, and the two agents that are live. */
export const AI_TAKE = {
  kicker: "On the AI bubble",
  lines: [
    "Yes, the valuations are a bubble.",
    "The usefulness is not.",
    "AGI is a headline. An agent that answers a clinic's revenue question at 11pm, from its own records, without leaking a thing, is a product.",
  ],
  principles: [
    { k: "Evals, not vibes", v: "Every agent ships with a test set. If the eval doesn't pass, it doesn't go live." },
    { k: "Read-only by default", v: "Agents answer from the views a role may read. Permissions sit below the model, not in the prompt." },
    { k: "Every query shown", v: "The user sees the SQL. Trust is earned by showing the work." },
    { k: "A tool layer in between", v: "MCP-style tools between the model and the data, so the model never touches raw infrastructure." },
  ],
  agents: [
    { name: "Rafai AI", shot: "/work/rafai.webp", who: "Rafai Technologies · logistics", what: "Ask about operations in plain English: consignments in transit, freight billed by month, expired vehicle documents, per-km cost.", href: "https://rafai-ai-interface.vercel.app/", prompts: ["How much did we collect last month?", "Which vehicles have expired documents right now?", "How many consignments are still in transit?", "Show freight billed by month for the last twelve months."] },
    { name: "ClinicSoft Agent", shot: "/work/clinicsoft.webp", who: "Medical and dental group · 3 branches · 977k records", what: "Revenue, claims, no-shows, stock and compliance, answered from the practice's own ClinicSoft 9.0 records, and only what your role may see.", href: "https://emr-ai-umber.vercel.app/ask", prompts: ["What were no-shows by branch this quarter?", "Which claims are still unpaid after 30 days?", "Show revenue by department for the last six months.", "What stock is below its reorder level?"] },
  ],
};

/** Client words, as published in Pronttera's case studies. */
export const QUOTES = [
  { q: "Working with this team has been a game-changer for Rixura.", by: "Shahzeb Shaikh", role: "Product Owner, Rixura" },
  { q: "A truly futuristic, frictionless payment experience.", by: "Zain Shaikh", role: "CEO, PayFace" },
  { q: "Zerox Cloud has reimagined printing by removing long queues and complex setups.", by: "Abhishek Ahuja", role: "Investor, Zerox Cloud" },
  { q: "Transformed our vision into a modern e-commerce platform.", by: "Safwan Khan", role: "Owner, KhanSaab" },
];

export const STACK = [
  "TypeScript", "JavaScript", "Python", "SQL", "React", "Next.js", "React Native", "Capacitor", "Tailwind",
  "Node.js", "NestJS", "Express", "FastAPI", "Django", "GraphQL", "REST", "PostgreSQL", "MySQL", "MongoDB",
  "Aurora", "AWS", "Lambda", "ECS", "EC2", "RDS", "S3", "CloudFront", "Cognito", "Docker", "Kubernetes",
  "Terraform", "CI/CD", "Razorpay", "Cashfree", "LLM agents", "RAG", "Figma", "Salesforce",
];
