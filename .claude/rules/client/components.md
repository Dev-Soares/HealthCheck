# 🧩 Components Rules

## 🎯 Objective

Define strict rules for how components must be created, structured, and organized.

The goal is to ensure:

* Reusability
* Readability
* Separation of concerns
* Zero duplication

Claude MUST follow these rules when creating or editing components.

---

## 📁 Component Location Rules

There are ONLY two valid locations for components:

1. `shared/components/` → reusable across 2+ features
2. `modules/<feature>/components/` → feature-specific

### ⚠️ Decision Rule

| Scenario | Where it goes |
|----------|---------------|
| Used in 1 feature | `modules/<feature>/components/` |
| Used in 2+ features | `shared/components/` |
| Page layout only | inline in `pages/` (no extraction needed) |

### ❌ DON'T

* Do NOT create components inside `pages/`
* Do NOT mix shared and feature logic
* Do NOT create "random" component folders

---

## 🦴 Skeleton Components (MANDATORY)

Every module MUST have a `skeletons/` folder with loading skeleton components for each async component:

```
modules/<feature>/
  components/
    FeatureCard.tsx
  skeletons/
    FeatureSkeleton.tsx     # Skeleton for FeatureCard while loading
```

### ✅ DO

* Create a skeleton for every component that loads async data
* Use Tailwind `animate-pulse` for skeleton animation
* Match the skeleton layout to the real component's layout

### 💡 Example

```typescript
// modules/feature/skeletons/FeatureSkeleton.tsx
const FeatureSkeleton = () => (
  <div className="animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800 p-4 flex flex-col gap-3">
    <div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700" />
    <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
    <div className="h-3 w-4/5 rounded bg-neutral-200 dark:bg-neutral-700" />
  </div>
)

export default FeatureSkeleton
```

### Usage in component with TanStack Query

```typescript
const { data, isPending } = useGetFeature(id)

if (isPending) return <FeatureSkeleton />
```

---

## 🧠 Component Responsibility

Each component MUST have a **single responsibility**.

### ✅ DO

* Keep components small and focused
* Split components when they grow too large (>150-200 lines)
* Separate logic from presentation

### ❌ DON'T

* Do NOT create "God components"
* Do NOT handle multiple responsibilities in one component

---

## 🔌 Logic vs UI Separation

### ✅ DO

* Move all logic to hooks (`modules/.../hooks/`)
* Keep components declarative
* Use props to receive data and actions from hooks

### ❌ DON'T

* Do NOT embed complex logic inside JSX
* Do NOT fetch data directly inside components
* Do NOT call service functions from components

---

## 🏷️ Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Component | `PascalCase.tsx` | `FeatureCard.tsx`, `LoginForm.tsx` |
| Skeleton | `[Name]Skeleton.tsx` | `FeatureSkeleton.tsx`, `ProfileSkeleton.tsx` |

One component per file — always.

---

## 🧱 Component File Structure

For simple components: single file `ComponentName.tsx`

For complex components: folder pattern

```
ComponentName/
  index.tsx
  types.ts      (optional — local prop types)
```

---

## 🧾 Props Rules

### ✅ DO

* Strongly type all props with TypeScript
* Keep props minimal and clear
* Use explicit, descriptive names

### ❌ DON'T

* Do NOT pass unnecessary props
* Do NOT use deeply nested prop chains (prop drilling)
* Do NOT use `any` for prop types

### ⚠️ Decision Rule

If props become too complex → split the component or move logic to a hook

---

## 🎨 Styling Rules

### ✅ DO

* Use Tailwind classes directly in JSX
* Keep styling consistent with design system

### ❌ DON'T

* Do NOT use inline `style={{}}` objects
* Do NOT mix CSS frameworks or files
* Do NOT use styled-components

---

## 🔁 Reusability Rules

### ✅ DO

* Design shared components to be flexible and configurable via props
* Use composition over duplication

### ❌ DON'T

* Do NOT duplicate components across modules
* Do NOT hardcode feature-specific logic in shared components

---

## 📦 Shared Component Standards

Shared components MUST be:

* Generic (no feature-specific data)
* Configurable via props
* Stateless (or minimally stateful for UI only)
* Independent from modules

### ❌ STRICTLY FORBIDDEN

* Shared components importing from modules
* Shared components containing business logic

---

## 🧪 Conditional Rendering

### ✅ DO

* Show skeletons while `isPending`
* Show error states when `isError`
* Keep conditions clean and readable

```typescript
if (isPending) return <FeatureSkeleton />
if (isError) return <ErrorMessage />
return <FeatureCard data={data} />
```

### ❌ DON'T

* Do NOT write complex ternaries inline in JSX
* Do NOT clutter JSX with logic

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* Components with multiple responsibilities
* Logic-heavy JSX
* Copy-paste components across modules
* Components tightly coupled to specific data formats
* Deeply nested JSX without abstraction
* Missing skeleton components for async content
* Calling service functions directly from components

---

## 🛑 Final Rule

If a component becomes:

* Too large (>150-200 lines)
* Hard to read
* Hard to reuse

→ STOP
→ Refactor into smaller components or move logic to hooks

Clean components are **mandatory, not optional**
