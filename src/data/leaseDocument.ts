export type LeaseParagraph = {
  id: string;
  heading?: string;
  text: string;
};

// Two-page mock lease. Snippets in extracted.ts must appear verbatim in `text`.
export const leaseDocument: LeaseParagraph[] = [
  {
    id: "p-title",
    heading: "OFFICE LEASE AGREEMENT",
    text:
      "This Office Lease Agreement (this “Lease”) is made and entered into effective as of March 14, 2024 (the “Effective Date”), by and between the parties identified below, and shall be governed by the laws of the State of California.",
  },
  {
    id: "p-parties",
    heading: "1. Parties",
    text:
      "Landlord: Sand Hill Holdings, LLC, a Delaware limited liability company, whose principal place of business is 2800 Sand Hill Road, Menlo Park, California 94025. Tenant: Sequoia Capital Office Holdings, Inc., a Delaware corporation, whose principal place of business is the Premises.",
  },
  {
    id: "p-premises",
    heading: "2. Premises",
    text:
      "Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, those certain premises consisting of approximately forty-one thousand two hundred (41,200) rentable square feet, designated as Suites 200 through 230 (the “Premises”), located on the second (2nd) floor of the building commonly known as 2800 Sand Hill Road (the “Building”).",
  },
  {
    id: "p-term",
    heading: "3. Term",
    text:
      "The initial term of this Lease (the “Initial Term”) shall be one hundred twenty (120) months. The Commencement Date shall be April 1, 2024, and the Initial Term shall continue through and including the Expiration Date of March 31, 2034, unless sooner terminated or extended in accordance with the terms hereof.",
  },
  {
    id: "p-rent",
    heading: "4. Base Rent",
    text:
      "Tenant shall pay annual Base Rent for the Premises in equal monthly installments in advance. For the first Lease Year, Base Rent shall be One Hundred Thirty-Two and 50/100 Dollars ($132.50) per rentable square foot per annum. Thereafter, Base Rent shall be increased on each anniversary of the Commencement Date by three percent (3.00%) over the then-current Base Rent. Notwithstanding the foregoing, Base Rent shall be fully abated for the first four (4) full calendar months following the Commencement Date.",
  },
  {
    id: "p-cam",
    heading: "5. Operating Expenses",
    text:
      "Commencing on January 1, 2025, Tenant shall pay, as Additional Rent, Tenant's Pro Rata Share of Operating Expenses in excess of the Base Year (calendar year 2024) Operating Expenses. Operating Expenses shall include, without limitation, common area maintenance, insurance, utilities not separately metered, janitorial services, and management fees not to exceed three percent (3.00%) of gross rents.",
  },
  {
    id: "p-deposit",
    heading: "6. Security Deposit",
    text:
      "Concurrently with Tenant's execution of this Lease, Tenant shall deliver to Landlord an irrevocable standby Letter of Credit in the amount of One Million Eight Hundred Twenty Thousand Dollars ($1,820,000) issued by a financial institution reasonably acceptable to Landlord, which Letter of Credit shall serve as the Security Deposit hereunder.",
  },
  {
    id: "p-use",
    heading: "7. Permitted Use",
    text:
      "The Premises shall be used and occupied by Tenant solely for general office purposes and ancillary research-and-development activity, and for no other purpose without Landlord's prior written consent, which consent may be granted or withheld in Landlord's reasonable discretion.",
  },
  {
    id: "p-exclusive",
    heading: "8. Exclusivity",
    text:
      "During the Term, Landlord shall not lease space within the Building to any venture-capital or growth-equity firm whose principal business is the deployment of third-party capital into private companies; provided, however, that this restriction shall not apply to a tenant occupying less than three thousand (3,000) rentable square feet.",
  },
  {
    id: "p-options",
    heading: "9. Renewal Options",
    text:
      "Tenant shall have two (2) successive options to extend the Term for a period of five (5) years each, at ninety-five percent (95%) of the then-prevailing Fair Market Rent (“FMR”) determined as set forth in Schedule 9.A. Each option must be exercised by written notice delivered to Landlord no later than twelve (12) months prior to the then-current Expiration Date.",
  },
  {
    id: "p-rofr",
    heading: "10. Right of First Refusal",
    text:
      "During the Term, Tenant shall have an ongoing Right of First Refusal over Suites 240 through 260 (approximately 12,400 RSF) on the second floor of the Building. Landlord shall promptly deliver written notice to Tenant of any bona fide third-party offer for such space, and Tenant shall have ten (10) business days within which to elect to lease such space on the same material economic terms.",
  },
  {
    id: "p-assign",
    heading: "11. Assignment and Subletting",
    text:
      "Tenant shall not assign this Lease or sublet all or any portion of the Premises without Landlord's consent, which consent shall not be unreasonably withheld, conditioned, or delayed; provided that Tenant may, without Landlord's consent, assign this Lease or sublet the Premises to any Affiliate of Tenant.",
  },
  {
    id: "p-indem",
    heading: "12. Indemnification",
    text:
      "Each party shall indemnify, defend, and hold harmless the other party from and against any and all claims, damages, losses, and expenses arising out of the indemnifying party's negligent acts or omissions on or about the Premises or Common Areas; provided that, except in the case of gross negligence or willful misconduct, the indemnification obligations under this Section 14 shall be capped at Five Million Dollars ($5,000,000) per occurrence.",
  },
  {
    id: "p-misc",
    heading: "13. Miscellaneous",
    text:
      "This Lease constitutes the entire agreement of the parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, and agreements. This Lease shall be binding upon and inure to the benefit of the parties hereto and their respective successors and permitted assigns.",
  },
];
