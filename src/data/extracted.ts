export type ExtractedField = {
  id: string;
  field: string;
  value: string;
  confidence: number;
  category: "Parties" | "Term" | "Economics" | "Options" | "Use" | "Other";
  sourceRange: {
    paragraphId: string;
    snippet: string;
  };
};

// Each sourceRange.snippet must EXACTLY appear in the corresponding paragraph
// in `leaseDocument` so the click-to-source highlight can locate it.
export const extractedFields: ExtractedField[] = [
  {
    id: "x1",
    field: "Landlord",
    value: "Sand Hill Holdings, LLC",
    confidence: 0.97,
    category: "Parties",
    sourceRange: {
      paragraphId: "p-parties",
      snippet: "Sand Hill Holdings, LLC, a Delaware limited liability company",
    },
  },
  {
    id: "x2",
    field: "Tenant",
    value: "Sequoia Capital Office Holdings, Inc.",
    confidence: 0.96,
    category: "Parties",
    sourceRange: {
      paragraphId: "p-parties",
      snippet: "Sequoia Capital Office Holdings, Inc., a Delaware corporation",
    },
  },
  {
    id: "x3",
    field: "Premises",
    value: "Suites 200–230, 41,200 RSF",
    confidence: 0.94,
    category: "Term",
    sourceRange: {
      paragraphId: "p-premises",
      snippet:
        "approximately forty-one thousand two hundred (41,200) rentable square feet",
    },
  },
  {
    id: "x4",
    field: "Commencement date",
    value: "April 1, 2024",
    confidence: 0.99,
    category: "Term",
    sourceRange: {
      paragraphId: "p-term",
      snippet: "Commencement Date shall be April 1, 2024",
    },
  },
  {
    id: "x5",
    field: "Expiration date",
    value: "March 31, 2034",
    confidence: 0.98,
    category: "Term",
    sourceRange: {
      paragraphId: "p-term",
      snippet: "Expiration Date of March 31, 2034",
    },
  },
  {
    id: "x6",
    field: "Base rent (Year 1)",
    value: "$132.50 / RSF / yr",
    confidence: 0.95,
    category: "Economics",
    sourceRange: {
      paragraphId: "p-rent",
      snippet:
        "One Hundred Thirty-Two and 50/100 Dollars ($132.50) per rentable square foot",
    },
  },
  {
    id: "x7",
    field: "Annual escalator",
    value: "3.00% fixed",
    confidence: 0.92,
    category: "Economics",
    sourceRange: {
      paragraphId: "p-rent",
      snippet:
        "increased on each anniversary of the Commencement Date by three percent (3.00%)",
    },
  },
  {
    id: "x8",
    field: "Free rent",
    value: "Months 1–4 abated",
    confidence: 0.88,
    category: "Economics",
    sourceRange: {
      paragraphId: "p-rent",
      snippet:
        "Base Rent shall be fully abated for the first four (4) full calendar months",
    },
  },
  {
    id: "x9",
    field: "Security deposit",
    value: "$1,820,000 (LOC)",
    confidence: 0.9,
    category: "Economics",
    sourceRange: {
      paragraphId: "p-deposit",
      snippet:
        "irrevocable standby Letter of Credit in the amount of One Million Eight Hundred Twenty Thousand Dollars ($1,820,000)",
    },
  },
  {
    id: "x10",
    field: "Operating expense base",
    value: "Calendar 2024 base year",
    confidence: 0.86,
    category: "Economics",
    sourceRange: {
      paragraphId: "p-cam",
      snippet:
        "Tenant's Pro Rata Share of Operating Expenses in excess of the Base Year (calendar year 2024)",
    },
  },
  {
    id: "x11",
    field: "Renewal option",
    value: "Two 5-year options @ 95% FMR",
    confidence: 0.93,
    category: "Options",
    sourceRange: {
      paragraphId: "p-options",
      snippet:
        "two (2) successive options to extend the Term for a period of five (5) years each, at ninety-five percent (95%) of the then-prevailing Fair Market Rent",
    },
  },
  {
    id: "x12",
    field: "Right of first refusal",
    value: "Suites 240–260 (12,400 RSF)",
    confidence: 0.81,
    category: "Options",
    sourceRange: {
      paragraphId: "p-rofr",
      snippet:
        "ongoing Right of First Refusal over Suites 240 through 260 (approximately 12,400 RSF)",
    },
  },
  {
    id: "x13",
    field: "Permitted use",
    value: "General office; ancillary lab",
    confidence: 0.89,
    category: "Use",
    sourceRange: {
      paragraphId: "p-use",
      snippet:
        "general office purposes and ancillary research-and-development activity",
    },
  },
  {
    id: "x14",
    field: "Exclusivity",
    value: "No competing VC tenants in Bldg",
    confidence: 0.76,
    category: "Use",
    sourceRange: {
      paragraphId: "p-exclusive",
      snippet:
        "Landlord shall not lease space within the Building to any venture-capital or growth-equity firm",
    },
  },
  {
    id: "x15",
    field: "Assignment & subletting",
    value: "Consent — not unreasonably withheld",
    confidence: 0.84,
    category: "Other",
    sourceRange: {
      paragraphId: "p-assign",
      snippet:
        "Landlord's consent, which consent shall not be unreasonably withheld, conditioned, or delayed",
    },
  },
  {
    id: "x16",
    field: "Indemnification",
    value: "Mutual; capped at $5M per claim",
    confidence: 0.79,
    category: "Other",
    sourceRange: {
      paragraphId: "p-indem",
      snippet:
        "indemnification obligations under this Section 14 shall be capped at Five Million Dollars ($5,000,000) per occurrence",
    },
  },
];
