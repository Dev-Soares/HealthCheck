# 🎨 Styling & UI/UX Rules

## 🎯 Objective

Define strict rules for styling and visual design.

The goal is to ensure:

* Modern and polished UI
* Consistent design system
* High-quality UX
* Zero "generic AI-looking" interfaces

Claude MUST follow these rules strictly.

---

## 🧱 Styling System (MANDATORY)

This project uses **Tailwind CSS v4** via the `@tailwindcss/vite` plugin.

* Tailwind CSS is the **PRIMARY and ONLY** styling method
* Custom font: `Outfit` (configured in Tailwind)
* Dark mode: `darkMode: 'class'`

### ✅ DO

* Use Tailwind classes directly in JSX
* Follow consistent spacing scale
* Use semantic and clean class composition

### ❌ DON'T

* Do NOT use inline `style={{}}` objects
* Do NOT use `styled-components`
* Do NOT create `.css` or `.scss` files
* Do NOT mix CSS frameworks

---

## 🎨 Design Philosophy

The UI MUST be:

* Modern
* Minimal but not empty
* Visually balanced
* Professional (SaaS-level quality)

### ❌ FORBIDDEN DESIGN

* Generic UI (default-looking)
* Flat and lifeless layouts
* Excessive borders everywhere
* Random colors
* Poor or inconsistent spacing
* Overcrowded interfaces

---

## 📐 Spacing & Layout

### ✅ DO

* Use consistent spacing scale: `p-4`, `p-6`, `gap-4`, `gap-6`
* Prefer whitespace over clutter
* Use `max-w-*` containers when needed

### ❌ DON'T

* Do NOT cram elements together
* Do NOT use inconsistent/random spacing values

---

## 🧩 Component Aesthetics

### ✅ DO

* Rounded corners: `rounded-xl`, `rounded-2xl`
* Subtle shadows: `shadow-sm`, `shadow-md`
* Soft borders: `border border-neutral-200 dark:border-neutral-700`
* Hover and transition states on interactive elements

### ❌ DON'T

* Do NOT use harsh borders
* Do NOT create sharp/ugly edges
* Do NOT ignore interaction states (hover, focus, active)

---

## 🌈 Colors

### ✅ DO

* Use a consistent color palette
* Neutral base + one accent color
* Keep contrast readable (accessible)
* Support dark mode with `dark:` variants

### ❌ DON'T

* Do NOT use too many colors
* Do NOT use overly saturated or random colors

---

## ✨ Interactions & Feedback

### ✅ DO

* Add hover states: `hover:bg-neutral-100`
* Add transitions: `transition-all duration-200`
* Provide visual feedback (loading states, button disabled states)
* Use React Hot Toast for notifications

### ❌ DON'T

* Do NOT create static/non-interactive UI
* Do NOT ignore user feedback states

---

## 🧠 Visual Hierarchy

### ✅ DO

* Use font sizes intentionally: `text-sm`, `text-base`, `text-lg`, `text-xl`
* Use font weights: `font-medium`, `font-semibold`, `font-bold`
* Separate sections clearly
* Use `Outfit` font (configured in Tailwind)

### ❌ DON'T

* Do NOT make everything look the same weight/size
* Do NOT flatten visual hierarchy

---

## 🌙 Dark Mode

* Dark mode is configured via `darkMode: 'class'` in Tailwind config
* Toggle is handled by `themeContext` in `shared/contexts/`
* Always add `dark:` variants for backgrounds, text, and borders

```typescript
// ✅ Correct — always provide dark variant
className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
```

---

## 🧼 Clean UI Rule

Every screen MUST feel:

* Organized
* Easy to scan
* Not overwhelming

---

## 🧩 Reusable UI

### ✅ DO

* Extract reusable UI into `shared/components/`
* Maintain visual consistency across all components

### ❌ DON'T

* Do NOT duplicate styled components with small differences

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* "Template-looking" UI
* Overuse of cards without purpose
* Misaligned layouts
* Inconsistent paddings
* No hover/active states
* `style={{}}` objects
* `styled-components`
* New CSS files

---

## 🚀 Quality Benchmark

The UI should resemble:

* Modern SaaS dashboards
* Clean fintech apps
* Minimalist but premium interfaces

---

## 🛑 Final Rule

If the UI looks:

* Generic
* Unpolished
* Like a basic template

→ STOP
→ Redesign using better spacing, hierarchy, and Tailwind classes

UI quality is **mandatory, not optional**
