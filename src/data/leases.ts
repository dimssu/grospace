export type Lease = {
  id: string;
  tenant: string;
  asset: string;
  address: string;
  sqft: number;
  baseRent: number; // $/sf/yr
  escalator: string;
  term: string;
  renewalOption: string;
  executedDate: string;
  expiration: string;
  exclusions: string[];
};

export const leases: Lease[] = [
  {
    id: "L-2024-A",
    tenant: "Sequoia Capital Office",
    asset: "2800 Sand Hill Rd, Menlo Park",
    address: "2800 Sand Hill Rd, Menlo Park, CA 94025",
    sqft: 41200,
    baseRent: 132.5,
    escalator: "3.0% annual",
    term: "120 months",
    renewalOption: "Two 5-year options at 95% FMR",
    executedDate: "2024-03-14",
    expiration: "2034-03-31",
    exclusions: ["Competing VC tenants", "Co-working operators"],
  },
  {
    id: "L-2023-B",
    tenant: "Patagonia Flagship",
    asset: "770 N Point St, San Francisco",
    address: "770 N Point St, San Francisco, CA 94109",
    sqft: 14800,
    baseRent: 84.0,
    escalator: "CPI capped at 4.0%",
    term: "84 months",
    renewalOption: "One 5-year option at FMR",
    executedDate: "2023-08-02",
    expiration: "2030-08-31",
    exclusions: ["Competing outdoor apparel within 0.5mi"],
  },
  {
    id: "L-2022-C",
    tenant: "Trader Joe's #142",
    asset: "1750 Fillmore St, San Francisco",
    address: "1750 Fillmore St, San Francisco, CA 94115",
    sqft: 13250,
    baseRent: 62.5,
    escalator: "10% every 5 years",
    term: "180 months",
    renewalOption: "Three 5-year options at fixed bumps",
    executedDate: "2022-11-21",
    expiration: "2037-11-30",
    exclusions: ["Other full-line grocers > 8,000 sf"],
  },
  {
    id: "L-2024-D",
    tenant: "Rivian Service Hub",
    asset: "1450 Industrial Way, Hayward",
    address: "1450 Industrial Way, Hayward, CA 94544",
    sqft: 88500,
    baseRent: 22.4,
    escalator: "2.75% annual",
    term: "120 months",
    renewalOption: "One 10-year option at FMR",
    executedDate: "2024-01-09",
    expiration: "2034-01-31",
    exclusions: ["Auto dealerships within site"],
  },
  {
    id: "L-2023-E",
    tenant: "Allbirds HQ",
    asset: "730 Montgomery St, San Francisco",
    address: "730 Montgomery St, San Francisco, CA 94111",
    sqft: 22600,
    baseRent: 98.0,
    escalator: "3.25% annual",
    term: "96 months",
    renewalOption: "One 5-year option at 100% FMR",
    executedDate: "2023-04-18",
    expiration: "2031-04-30",
    exclusions: ["Direct-to-consumer footwear brands"],
  },
  {
    id: "L-2024-F",
    tenant: "Sweetgreen Mission",
    asset: "2727 Mariposa St, San Francisco",
    address: "2727 Mariposa St, San Francisco, CA 94110",
    sqft: 3450,
    baseRent: 110.0,
    escalator: "3.0% annual + percentage rent over $2.4M",
    term: "120 months",
    renewalOption: "Two 5-year options at FMR",
    executedDate: "2024-06-04",
    expiration: "2034-06-30",
    exclusions: ["Fast-casual salad concepts"],
  },
  {
    id: "L-2023-G",
    tenant: "Ritual Café",
    asset: "1026 Valencia St, San Francisco",
    address: "1026 Valencia St, San Francisco, CA 94110",
    sqft: 1850,
    baseRent: 96.0,
    escalator: "CPI capped at 3.5%",
    term: "60 months",
    renewalOption: "One 5-year option at FMR",
    executedDate: "2023-09-12",
    expiration: "2028-09-30",
    exclusions: ["Specialty coffee roasters"],
  },
  {
    id: "L-2022-H",
    tenant: "WeWork 599 Market",
    asset: "599 Market St, San Francisco",
    address: "599 Market St, San Francisco, CA 94105",
    sqft: 64800,
    baseRent: 71.0,
    escalator: "Fixed steps: 2.5%/yr",
    term: "144 months",
    renewalOption: "One 7-year option at 92.5% FMR",
    executedDate: "2022-02-28",
    expiration: "2034-02-28",
    exclusions: ["Co-working/flex office tenants > 10,000 sf"],
  },
];

export const focalLeaseId = "L-2024-A";
