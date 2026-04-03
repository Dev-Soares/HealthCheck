# 🖥️ Frontend Overview (Client Rules)

## 🎯 Objective

Provide a high-level definition of the frontend architecture, stack, and general rules.

This document acts as the **global context** for all other client rules.

Claude MUST read and follow this before applying any other rule files.

---

## 🧠 Core Philosophy

This frontend is built to be:

* Scalable
* Predictable
* Modular
* Clean and maintainable

All implementations MUST prioritize:

* Readability over cleverness
* Consistency over personal preference
* Simplicity over unnecessary complexity

---

## ⚙️ Tech Stack (MANDATORY)

The project is built using:

* React 19 (UI library)
* TypeScript (type safety)
* Tailwind CSS v4 (styling — ONLY method)
* React Router v7 (routing)
* TanStack Query v5 (server state)
* Axios (HTTP client)
* React Hook Form v7 + Zod v4 (forms)
* React Hot Toast (notifications)
* Phosphor Icons (`@phosphor-icons/react`)

---

## 📁 Project Structure (BASE)

```
src/
  pages/        # Route-level components (no business logic)
  modules/      # Feature-based architecture
  shared/       # Global reusable code
  api/          # HTTP client configuration
```

---

## 🧩 Module Structure (MANDATORY)

Each feature inside `modules/` MUST follow **exactly** this structure:

```
modules/<feature>/
  components/     # UI specific to the feature
  hooks/          # State + business logic (TanStack Query)
  service/        # API calls (one file per action)
  types/          # TypeScript types + Zod schemas
  skeletons/      # Loading skeleton components
```

Optional (when needed):

```
  contexts/       # Feature-specific React contexts
  config/         # Feature-specific constants/config
```

### ⚠️ IMPORTANT

* The service folder is `service/` (singular) — NOT `services/`
* There is NO `schemas/` folder — Zod schemas live inside `types/`
* Every module MUST have a `skeletons/` folder for async components

---

## 🔁 Shared Structure

```
shared/
  components/     # Reusable UI components (Input, Spinner, Toast, etc.)
  hooks/          # Generic hooks (useNavigateTo, etc.)
  contexts/       # Global contexts (userContext, themeContext)
  layouts/        # Layout components (Header, Sidebar, BottomNav, Content)
  services/       # Global services (e.g. findMeService)
  utils/          # Pure utility functions
```

---

## 🌐 API Layer

```
api/
  axios.ts              # Configured axios instance
  interceptors/         # Axios interceptors (auth, errors)
```

---

## 📄 Pages Layer

### ✅ RESPONSIBILITY

* Route mapping
* Layout composition
* Calling module hooks

### ❌ FORBIDDEN

* Business logic
* Direct API calls
* Complex state handling
* Creating components here

---

## 📦 Libraries & Responsibilities

### 🔄 TanStack Query v5

* Handles ALL server state (API data)
* Used inside hooks ONLY
* Responsible for: caching, fetching, refetching, synchronization
* Syntax: `useQuery({ queryKey, queryFn })` / `useMutation({ mutationFn })`

### 🧭 React Router v7

* Handles routing
* Pages are mapped to routes
* No business logic inside routes

### 🎨 Tailwind CSS v4

* ONLY styling solution
* Use classes directly in JSX
* Config via `@tailwindcss/vite` plugin

### 📋 React Hook Form v7 + Zod v4

* All forms use React Hook Form with `zodResolver`
* Zod schemas defined in `modules/<feature>/types/`

---

## 🔁 Data & State Strategy

### 🧠 Server State (API Data)

Handled by **TanStack Query** in hooks:

* `useQuery` for fetching (GET)
* `useMutation` for mutations (POST/PATCH/DELETE)
* Hooks call service functions

### 🧩 Client State (UI / Local)

Handled by:

* `useState` — UI-only state (modals, toggles)
* React Context — global state (auth user, theme)

### ⚠️ Rule

Do NOT mix server state and client state responsibilities

---

## 🏷️ Naming Conventions (MANDATORY)

| Type | Pattern | Example |
|------|---------|---------|
| Component | `PascalCase.tsx` | `LoginForm.tsx` |
| Hook | `use[Action][Entity].ts` | `useCreateFeature.ts`, `useGetUser.ts` |
| Service file | `[action][Entity]Service.ts` | `createFeatureService.ts`, `getUserService.ts` |
| Type file | `[action\|entity].ts` | `createFeature.ts`, `feature.ts` |
| Skeleton | `[Feature]Skeleton.tsx` | `FeatureSkeleton.tsx` |

---

## 🚫 Strict Prohibitions

Claude MUST NEVER:

* Create logic inside pages
* Call APIs directly in components
* Use `services/` (plural) — always `service/` (singular)
* Create a `schemas/` folder — Zod goes in `types/`
* Mix styling approaches (Tailwind only)
* Ignore TypeScript typing
* Break module boundaries

---

## 🛑 Final Rule

If any implementation:

* Breaks the defined structure
* Ignores existing patterns
* Introduces inconsistency

→ STOP
→ Refactor to align with project standards

Consistency is **mandatory, not optional**
