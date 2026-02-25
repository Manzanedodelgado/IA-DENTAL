---
name: ui-ux-pro-max
description: Searchable database of UI styles, color palettes, typography pairings, chart types, UX guidelines, and stack-specific best practices. Use this skill whenever the user asks to design, build, improve, or review any UI — dashboard, landing page, forms, components, etc.
---

# UI/UX Pro Max Skill

This skill provides a BM25-powered search engine over curated databases of UI/UX design knowledge. Use it every time you work on visual interfaces.

## Prerequisites

Python 3 must be available:
```bash
python3 --version
```

## Script Path

All searches run through:
```bash
python3 /Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/.agents/skills/ui-ux-pro-max/scripts/search.py
```

## When to Use

Use this skill automatically when the user asks to:
- Design, build, create, implement, or improve any UI component or page
- Review or fix visual quality issues
- Choose colors, fonts, layout, or style
- Work on dashboards, landing pages, forms, modals, chat UIs, cards

## Workflow

### Step 1 — Generate Design System (ALWAYS start here)

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

For this project: dental clinic SaaS dashboard in React + TailwindCSS.

Example for this project:
```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "dental clinic healthcare SaaS dashboard professional" --design-system -p "SmilePro"
```

### Step 2 — Domain Searches (as needed)

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>
```

| Domain | Use For |
|--------|---------|
| `style` | UI style (glassmorphism, minimalism, brutalism) |
| `color` | Color palettes |
| `typography` | Font pairings (Google Fonts) |
| `landing` | Page structure, CTAs |
| `chart` | Chart types and libraries |
| `ux` | Best practices and anti-patterns |
| `product` | Product type recommendations |

### Step 3 — Stack Guidelines (this project uses React)

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack react
```

### Step 4 — Persist Design System

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "SmilePro"
```

Creates `design-system/MASTER.md` with global design rules and `design-system/pages/<page>.md` for page-specific overrides.

## Key Rules for This Project

- **Stack**: React + TailwindCSS
- **Style**: Professional, clinical, premium — NO brutalism, NO neon
- **Primary color**: `#0056b3` (corporate blue), accent `#ffe4e6` (salmon)
- **Icons**: Lucide React only (no emojis as icons)
- **Typography**: Inter or similar professional sans-serif
- **No emoji icons in UI** — use Lucide SVG icons
- All clickable elements must have `cursor-pointer`
- Hover: `transition-colors duration-200` or `transition-all duration-300`
- Light mode contrast: body text `#051650`, muted `#475569` minimum

## Pre-Delivery Checklist

- [ ] No emojis used as icons
- [ ] All icons from Lucide React, consistent sizing
- [ ] Hover states — no layout shift, clear visual feedback
- [ ] Light mode contrast ≥ 4.5:1
- [ ] Borders visible (not `border-white/10`)
- [ ] Smooth transitions 150–300ms
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] All images have alt text, inputs have labels
