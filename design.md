# Design System — nathancalong.github.io

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Headline** | Space Grotesk | 600, 700 | Section titles, hero text, nav logo |
| **Label** | Space Grotesk | 500, 600 | Chips, badges, nav links, button text |
| **Body** | DM Sans | 300, 400, 500 | Paragraphs, descriptions, card body text |
| **Mono / Terminal** | Space Mono | 400, 700 | Terminal output, prompts, code, tech stack chips |

### Scale

| Token | Size | Usage |
|-------|------|-------|
| `text-xs` | 0.75rem | Chip text, fine print |
| `text-sm` | 0.875rem | Terminal text, labels, nav links |
| `text-base` | 1rem | Body text |
| `text-lg` | 1.125rem | Card titles |
| `text-xl` | 1.25rem | Sub-headings |
| `text-2xl` | 2rem | Section titles |
| `text-hero` | clamp(2.5rem, 5vw, 4rem) | Hero / terminal title |

---

## Color Palette

### Primary — Amber

| Swatch | Hex | Usage |
|--------|-----|-------|
| **Primary** | `#E8943A` | Accent color, links, active states, terminal prompt |
| Primary Light | `#F2B866` | Hover highlights, glow effects |
| Primary Dim | `rgba(232, 148, 58, 0.15)` | Chip backgrounds, subtle fills |
| Primary Glow | `rgba(232, 148, 58, 0.30)` | Box-shadow glows, text-shadow |

### Secondary — Slate Blue

| Swatch | Hex | Usage |
|--------|-----|-------|
| **Secondary** | `#5B8FB9` | Secondary links, hover accent, info highlights |
| Secondary Light | `#7BAFD6` | Hover states |
| Secondary Dim | `rgba(91, 143, 185, 0.15)` | Secondary chip fills |

### Tertiary — Teal

| Swatch | Hex | Usage |
|--------|-----|-------|
| **Tertiary** | `#40C4AA` | Success states, tertiary accents |

### Neutrals — Background & Surface

| Swatch | Hex | Usage |
|--------|-----|-------|
| **Background** | `#0A0A0F` | Page background |
| **Surface** | `#121219` | Cards, nav, elevated surfaces |
| Surface Raised | `#1A1A22` | Hover card state, input fields |
| **Text** | `#E2E2EA` | Primary text |
| **Text Muted** | `#7A7A8A` | Secondary text, descriptions |
| Border | `rgba(232, 148, 58, 0.10)` | Card borders, dividers |
| Border Hover | `rgba(232, 148, 58, 0.35)` | Hover borders |

---

## Effects

| Effect | Value |
|--------|-------|
| **Glow (box)** | `0 0 25px rgba(232, 148, 58, 0.12)` |
| **Glow (text)** | `0 0 8px rgba(232, 148, 58, 0.25)` |
| **Phosphor** | `0 0 4px rgba(232, 148, 58, 0.3)` |
| **Frosted glass** | `backdrop-filter: blur(12px); background: rgba(18, 18, 25, 0.85)` |
| **Border radius** | `0.75rem` (cards), `4px` (chips) |
| **Scanline overlay** | `repeating-linear-gradient, opacity 0.4` |
| **Grid background** | `60px` grid, primary at `0.03` opacity |

---

## Spacing

Based on 4px grid: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96`

---

## Component Tokens

| Component | Background | Border | Text | Hover |
|-----------|-----------|--------|------|-------|
| **Card** | `surface` | `border` | `text` | `border-hover` + glow |
| **Chip** | `primary-dim` | `rgba(primary, 0.15)` | `primary` | `rgba(primary, 0.12)` bg |
| **Nav link** | transparent | none | `text-muted` | `primary` + underline |
| **Terminal** | `background` | `border` | `text` | — |
| **Terminal prompt** | — | — | `primary` | — |
| **Terminal output** | — | — | `text-muted` | — |
