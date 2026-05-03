export type Property = {
  id: string;
  name: string;
  city: string;
  assetClass: "Office" | "Retail" | "Industrial" | "Mixed-use";
  sqft: number;
  occupancy: number; // 0-1
  walt: number; // years
  noi: number; // $M
  gav: number; // $M
};

export const properties: Property[] = [
  { id: "P-01", name: "2800 Sand Hill Rd", city: "Menlo Park, CA", assetClass: "Office", sqft: 184000, occupancy: 0.96, walt: 7.4, noi: 14.2, gav: 178 },
  { id: "P-02", name: "599 Market St", city: "San Francisco, CA", assetClass: "Office", sqft: 312000, occupancy: 0.84, walt: 5.1, noi: 9.8, gav: 121 },
  { id: "P-03", name: "770 N Point St", city: "San Francisco, CA", assetClass: "Retail", sqft: 36400, occupancy: 0.99, walt: 6.8, noi: 2.4, gav: 38 },
  { id: "P-04", name: "1750 Fillmore St", city: "San Francisco, CA", assetClass: "Retail", sqft: 28200, occupancy: 1.0, walt: 9.2, noi: 1.7, gav: 26 },
  { id: "P-05", name: "1450 Industrial Way", city: "Hayward, CA", assetClass: "Industrial", sqft: 144000, occupancy: 0.92, walt: 8.6, noi: 3.1, gav: 41 },
  { id: "P-06", name: "455 Forbes Blvd", city: "South SF, CA", assetClass: "Industrial", sqft: 188000, occupancy: 0.88, walt: 6.3, noi: 3.6, gav: 47 },
  { id: "P-07", name: "730 Montgomery St", city: "San Francisco, CA", assetClass: "Office", sqft: 64800, occupancy: 0.91, walt: 5.7, noi: 4.1, gav: 52 },
  { id: "P-08", name: "651 Brannan St", city: "San Francisco, CA", assetClass: "Office", sqft: 121000, occupancy: 0.93, walt: 6.4, noi: 7.2, gav: 88 },
  { id: "P-09", name: "1026 Valencia St", city: "San Francisco, CA", assetClass: "Retail", sqft: 12200, occupancy: 1.0, walt: 4.2, noi: 0.9, gav: 14 },
  { id: "P-10", name: "2598 Market St", city: "San Francisco, CA", assetClass: "Retail", sqft: 22800, occupancy: 0.95, walt: 9.0, noi: 1.5, gav: 22 },
  { id: "P-11", name: "1700 Owens St", city: "San Francisco, CA", assetClass: "Mixed-use", sqft: 144800, occupancy: 0.86, walt: 5.9, noi: 6.8, gav: 81 },
  { id: "P-12", name: "550 Townsend St", city: "San Francisco, CA", assetClass: "Office", sqft: 96400, occupancy: 0.78, walt: 4.6, noi: 4.4, gav: 58 },
];

export const portfolioSummary = {
  properties: properties.length,
  totalSqft: properties.reduce((s, p) => s + p.sqft, 0),
  gav: 766, // $M, hand-tuned headline
  noi: 59.7,
  occupancy: 0.91,
  walt: 6.2,
  yieldOnCost: 0.078,
  weightedRent: 84.2,
};

export type TopTenant = {
  name: string;
  revenuePct: number;
  sqft: number;
  expiry: string;
};

export const topTenants: TopTenant[] = [
  { name: "Sequoia Capital Office", revenuePct: 14.2, sqft: 41200, expiry: "Mar 2034" },
  { name: "WeWork 599 Market", revenuePct: 9.6, sqft: 64800, expiry: "Feb 2034" },
  { name: "Pinterest South Park", revenuePct: 8.4, sqft: 49500, expiry: "Jul 2032" },
  { name: "Anduril Mission Bay", revenuePct: 7.1, sqft: 73900, expiry: "Sep 2035" },
  { name: "Rivian Service Hub", revenuePct: 5.8, sqft: 88500, expiry: "Jan 2034" },
  { name: "Allbirds HQ", revenuePct: 4.9, sqft: 22600, expiry: "Apr 2031" },
  { name: "Patagonia Flagship", revenuePct: 4.2, sqft: 14800, expiry: "Aug 2030" },
  { name: "Trader Joe's #142", revenuePct: 3.6, sqft: 13250, expiry: "Nov 2037" },
];

export type RolloverPoint = { year: number; sqft: number; revenue: number };
export const rollover: RolloverPoint[] = [
  { year: 2025, sqft: 18400, revenue: 1.4 },
  { year: 2026, sqft: 22600, revenue: 1.9 },
  { year: 2027, sqft: 96800, revenue: 9.4 },
  { year: 2028, sqft: 38200, revenue: 4.1 },
  { year: 2029, sqft: 14400, revenue: 1.3 },
  { year: 2030, sqft: 41200, revenue: 4.7 },
  { year: 2031, sqft: 51800, revenue: 5.6 },
  { year: 2032, sqft: 49500, revenue: 5.0 },
  { year: 2033, sqft: 22000, revenue: 2.4 },
  { year: 2034, sqft: 178300, revenue: 19.2 },
];

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  citation?: string;
  chart?:
    | { type: "bars"; label: string; series: { x: string; y: number }[] }
    | {
        type: "compare";
        label: string;
        rows: { label: string; current: number; market: number }[];
      };
};

export const chatThread: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    text: "What's my lease rollover risk in 2027?",
  },
  {
    id: "m2",
    role: "assistant",
    text:
      "2027 is a heavier roll year — about 96.8K sf comes due, representing ~9.4% of contractual revenue. Most of that sits at 599 Market (WeWork sub-block) and 550 Townsend.",
    citation: "Lease 2024-A § 3, Lease 2022-H § 9",
    chart: {
      type: "bars",
      label: "Lease rollover by year (RSF)",
      series: [
        { x: "'25", y: 18400 },
        { x: "'26", y: 22600 },
        { x: "'27", y: 96800 },
        { x: "'28", y: 38200 },
        { x: "'29", y: 14400 },
        { x: "'30", y: 41200 },
        { x: "'31", y: 51800 },
        { x: "'32", y: 49500 },
        { x: "'33", y: 22000 },
        { x: "'34", y: 178300 },
      ],
    },
  },
  {
    id: "m3",
    role: "user",
    text: "Which tenants are below market on rent?",
  },
  {
    id: "m4",
    role: "assistant",
    text:
      "Three tenants are materially below CoStar mid-market: Trader Joe's #142 ($62.5 vs ~$78), WeWork 599 Market ($71.0 vs ~$92), and Patagonia Flagship ($84.0 vs ~$96). Combined mark-to-market upside is ~$3.1M annual.",
    citation: "CoStar Q1 2026, internal benchmark v4",
    chart: {
      type: "compare",
      label: "In-place vs market rent ($/sf)",
      rows: [
        { label: "Trader Joe's #142", current: 62.5, market: 78 },
        { label: "WeWork 599 Market", current: 71.0, market: 92 },
        { label: "Patagonia Flagship", current: 84.0, market: 96 },
      ],
    },
  },
  {
    id: "m5",
    role: "user",
    text: "Show me concentration risk by tenant.",
  },
  {
    id: "m6",
    role: "assistant",
    text:
      "Top-3 tenant concentration is 32.2% of revenue — above the 30% threshold flagged in your investment policy. Sequoia alone contributes 14.2%.",
    citation: "Investment policy v3.1, Section 6.4",
  },
  {
    id: "m7",
    role: "user",
    text: "What's my portfolio WALT vs benchmark?",
  },
  {
    id: "m8",
    role: "assistant",
    text:
      "Your weighted-average lease term is 6.2 years vs the West-Coast peer set at 5.4 years. Industrial assets are pulling that up (8.6y at 1450 Industrial Way).",
    citation: "Green Street Q1 2026 peer index",
  },
  {
    id: "m9",
    role: "user",
    text: "Any unusual exclusivity clauses to flag?",
  },
  {
    id: "m10",
    role: "assistant",
    text:
      "Two: Sequoia's exclusivity bars any VC/growth-equity tenant > 3,000 sf at 2800 Sand Hill — could limit future leasing. Trader Joe's blocks any full-line grocer > 8,000 sf at 1750 Fillmore.",
    citation: "Lease 2024-A § 8, Lease 2022-C § 12",
  },
  {
    id: "m11",
    role: "user",
    text: "How much free rent is outstanding across the book?",
  },
  {
    id: "m12",
    role: "assistant",
    text:
      "$2.41M of contractual abatement remains unburned across 4 leases, weighted toward Q3 2024. Sequoia is the largest single concession at $1.46M.",
    citation: "Abatement schedule, rent roll 2026-04",
  },
];
