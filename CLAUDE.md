# Surgical Clerkship Companion — Claude Code Instructions

## Project Overview
A web app for medical students on their surgery clerkship. Built by Firas Moussa (MS3, Class of 2027, Chicago Medical School at Rosalind Franklin University), pursuing general surgery / surgical oncology.

**Repo:** `firasmoussa/surgical-clerkship-companion`
**Local path:** `~/Desktop/surg-companion`
**Stack:** Next.js (App Router) + Tailwind v4 + Supabase

---

## Code Style & Conventions
- Never use em-dashes in code comments or copy
- TypeScript throughout — always type props explicitly
- Tailwind for all styling — no CSS modules or inline style objects unless absolutely necessary (e.g. dynamic colors)
- Component files use PascalCase: `LapCholeAnatomySVG.tsx`
- Page files live at `src/app/procedures/[procedure]/[tab]/page.tsx`
- Shared components live at `src/app/procedures/[procedure]/_components/`
- Keep responses concise and direct — no filler

---

## Design System

### Philosophy
Warm surgical atlas aesthetic. Feels like a Netter anatomy book — premium reference, not a cramped study tool.

### Colors (defined in `globals.css` via `@theme inline`)
| Token | Hex | Usage |
|---|---|---|
| `parchment` | `#F5EFE4` | Page background |
| `surface` | `#EDE5D8` | Cards, image panels |
| `border-warm` | `#C9BBAA` | All borders |
| `charcoal` | `#2A2520` | Nav background |
| `ink` | `#1C1A17` | Primary text |
| `secondary` | `#6B5E50` | Body copy |
| `muted` | `#9E8E7E` | Labels, hints |
| `ochre` | `#C17B2F` | Primary action color — active tabs, selected chips, checkboxes, CTAs |
| `cvs` | `#3D6B4F` | CVS/safety elements only |
| `cvs-light` | `#D4E8DC` | CVS callout background |
| `cvs-border` | `#93C4A9` | CVS callout border |
| `danger` | `#8B3A3A` | Danger/complication accents |

### Typography
- **Serif (Playfair Display):** procedure titles, structure names, page headings — always italic, `font-normal`
- **Sans (Geist):** all UI chrome, body copy, labels
- Procedure titles: `font-serif italic text-[26px] text-ink font-normal`
- Section headings: `font-serif italic text-[20px] text-ink font-normal`
- Body: `text-[13px] text-secondary leading-relaxed`
- Labels/caps: `text-[11px] text-muted uppercase tracking-wider`

### Components

**Cards**
```tsx
<div className="rounded-lg border border-border-warm p-4">
```

**Info card with left border accent**
```tsx
<div className="rounded-md border-l-[3px] p-3" style={{ borderLeftColor: "#C17B2F", backgroundColor: "#EDE5D8" }}>
```

**Toggle (illustrated / intraoperative)**
```tsx
<div className="inline-flex self-start rounded-[5px] overflow-hidden text-sm" style={{ border: "0.5px solid #C9BBAA" }}>
  <button className={`px-3.5 py-1.5 transition-colors ${active ? "bg-ochre text-parchment font-medium" : "text-muted hover:text-secondary bg-transparent"}`}>
```

**Chips**
- Default: `border border-border-warm text-secondary bg-transparent rounded-full px-3 py-1 text-xs`
- Selected (illustrated): `bg-ochre border-ochre text-parchment`
- Selected (intraop): use `STRUCTURE_COLORS[name]` from `LapCholeIntraopView`

**Custom checkbox**
```tsx
<div
  className="w-4 h-4 rounded-[3px] flex-shrink-0 flex items-center justify-center transition-colors"
  style={{ backgroundColor: done ? "#C17B2F" : "transparent", border: done ? "none" : "1.5px solid #C9BBAA" }}
>
  {done && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="#F5EFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
</div>
```
Never use native `<input type="checkbox" />`.

**Tabs (StickyTabs)**
- Active: `border-b-2 border-ochre text-ochre font-medium`
- Inactive: `border-b-2 border-transparent text-muted hover:text-secondary`

**CVS callout**
```tsx
<div className="rounded-md p-3 border border-cvs-border bg-cvs-light">
  <div className="text-[11px] text-cvs font-medium mb-1">CVS criteria</div>
  <p className="text-[11px] text-cvs leading-snug">Two structures enter the gallbladder, and only two.</p>
</div>
```

**Level tags (pimp page)**
- Level 1 Core: `text-secondary border-border-warm bg-surface`
- Level 2 Expected: `text-ochre border-ochre bg-surface`
- Level 3 Advanced: `text-danger border-danger bg-surface`

**Buttons**
- Primary: `bg-ochre text-parchment rounded-[6px] px-4 py-2 text-[13px] font-medium`
- Outline: `border border-ochre text-ochre rounded-[6px] px-4 py-2 text-[13px]`
- Ghost: `border border-border-warm text-secondary rounded-[6px] px-4 py-2 text-[13px]`

**Tables**
```tsx
<div className="overflow-x-auto rounded-lg border border-border-warm">
  <table className="w-full text-left text-[12.5px]">
    <thead>
      <tr className="bg-surface border-b border-border-warm">
        <th className="px-4 py-3 text-[11px] text-muted uppercase tracking-wider font-medium">
```
Alternating rows: `i % 2 === 0 ? "bg-parchment" : "bg-surface"`

**Numbered steps (timeline)**
```tsx
<div className="flex gap-4 pb-6 relative">
  <div className="flex flex-col items-center flex-shrink-0">
    <div className="w-7 h-7 rounded-full border border-border-warm bg-surface flex items-center justify-center text-[11px] text-ochre font-medium">
      {i + 1}
    </div>
    {i < steps.length - 1 && <div className="w-px flex-1 bg-border-warm mt-1" />}
  </div>
  <div className="pt-0.5">
    <div className="text-[13px] font-medium text-ink">{step.title}</div>
    <div className="text-[13px] text-secondary leading-relaxed">{step.body}</div>
  </div>
</div>
```

---

## App Structure

```
src/
  app/
    globals.css                         -- design tokens (@theme inline)
    layout.tsx                          -- global shell: charcoal nav + footer
    page.tsx                            -- home page
    procedures/
      lap-chole/
        layout.tsx                      -- procedure title + StickyTabs (shared across all tabs)
        page.tsx                        -- overview tab
        anatomy/page.tsx                -- anatomy tab (toggle + chips + checklist)
        steps/page.tsx                  -- steps tab (numbered timeline)
        complications/page.tsx          -- complications tab (table)
        pimp/page.tsx                   -- pimp questions tab (accordion cards by category)
        quiz/page.tsx                   -- quiz tab (one question at a time, score tracking)
        _components/
          StickyTabs.tsx                -- tab nav (Overview / Anatomy / Steps / Complications / Pimp / Quiz)
          LapCholeAnatomySVG.tsx        -- interactive illustrated SVG, accepts `selected: string | null`
          LapCholeIntraopView.tsx       -- intraop photo view with hotspot dots, exports STRUCTURE_COLORS
    submit/
      page.tsx                          -- submit a pimp question form
    api/
      pimp/
        submit/
          route.ts                      -- POST handler -> inserts into Supabase
    components/
      TooltipTerm.tsx                   -- inline tooltip for surgical terms
      Disclosure.tsx                    -- expand/collapse for pimp explanations
    dev/
      calibrator/page.tsx               -- dev-only hotspot coordinate calibration tool
```

### Layout hierarchy
- `layout.tsx` (root) -- nav + footer shell, max-w-5xl container
- `procedures/lap-chole/layout.tsx` -- procedure title + StickyTabs
- Individual `page.tsx` files -- content only, no repeated headers or tabs

---

## Key Components

### LapCholeAnatomySVG
- 9 labeled anatomical structures
- `selected: string | null` prop
- Clicking a structure chip highlights it, dims everything else
- Special behaviors:
  - Rouviere's sulcus: shows safety zone overlay
  - Calot's triangle: shows border labels
  - Inferior liver edge: highlights as amber line only

### LapCholeIntraopView
- 3 real OR slides from Gupta 2023 (CC BY-NC, PMC10201064)
- Exports `STRUCTURE_COLORS: Record<string, string>`
- `selected: string | null` prop
- Dots: 8px default, grow to 16px + label when selected
- Auto-switches slides only if selected structure not visible on current slide
- Hotspot coordinates as x/y percentages -- use `/dev/calibrator` to adjust

### Structure names (exact keys -- must match)
```
Gallbladder fundus
Infundibulum
Cystic duct
Cystic artery
Common hepatic duct (CHD)
Common bile duct (CBD)
Inferior liver edge
Calot's triangle
Rouviere's sulcus
```

---

## Backend

**Supabase**
- Table: `pimp_submissions`
- API: `POST /api/pimp/submit`
- Anti-spam: honeypot field + time-to-submit check
- Credentials in `.env.local` (never commit)

---

## Roadmap (in priority order)
1. ~~Pick a name for the app~~ (TBD)
2. ~~Visual redesign~~ -- done: globals.css, layout.tsx, StickyTabs, anatomy page, overview, steps, complications, pimp, quiz
3. **Lap appy cleanup** -- anatomy SVG refinements, quiz content, pimp questions
4. **Third procedure** -- inguinal hernia repair or TBD based on cases Firas is scrubbing
5. **Upstash rate limiting** on `POST /api/pimp/submit` -- 5 submissions / IP / 10 min using `@upstash/ratelimit` and `@upstash/redis`

---

## Git Workflow
```bash
git add .
git commit -m "your message"
git push
```
Always push at the end of a session.
