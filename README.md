# Grospace

**AI lease management for commercial real estate.**

Extract clauses from leases, run a deal pipeline, and chat with your portfolio — in one workspace.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-ff0080?logo=framer&logoColor=white)

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3002
```

Production build:

```bash
npm run build
npm start
```

## Routes

| Path         | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `/`          | Lease extraction — split-pane document viewer with click-to-source highlight. |
| `/pipeline`  | Deal Kanban — sourcing → LOI → diligence → closed, with NOI deltas.           |
| `/portfolio` | Portfolio chat — summary, top tenants, AI replies with inline charts.         |

## Stack

- **Next.js 15** App Router, server components for the shell, client components for interactivity
- **Tailwind CSS v4** with token-based design system (see `src/app/globals.css`)
- **Framer Motion** for stagger-mount and hover-lift animations
- **lucide-react** icon set
- **next/font** loading Inter (sans), Space Grotesk (display), JetBrains Mono (mono)

## Screenshots

![Hero](./public/screenshots/hero.png)

![Dashboard](./public/screenshots/dashboard.png)

![Detail](./public/screenshots/detail.png)

## Project layout

```
src/
  app/
    page.tsx           Lease extraction
    pipeline/page.tsx  Deal Kanban
    portfolio/page.tsx Portfolio chat
    layout.tsx
    globals.css
  components/
    Shell.tsx          Sidebar + topbar + main
  data/
    leases.ts
    leaseDocument.ts
    extracted.ts
    deals.ts
    portfolio.ts
```

## License

Internal MVP — © Grospace.
