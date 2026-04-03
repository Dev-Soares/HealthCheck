# 🧱 Frontend Architecture Rules

## 🎯 Objective

Define mandatory architecture rules for the frontend.

The goal is to ensure:

* Predictability
* Scalability
* Clear separation of concerns
* Zero architectural inconsistency

Claude MUST follow these rules strictly.

---

## 📁 Project Structure

```
src/
  pages/
  modules/
  shared/
  api/
```

---

## 🧠 Core Principles

* Pages orchestrate, NOT implement logic
* Modules contain business/domain logic
* Shared contains reusable and generic code
* API layer is centralized
* No cross-layer violations allowed

---

## 📄 Pages Layer (`/pages`)

### ✅ DO

* Compose components from modules
* Define layout structure
* Call module hooks

### ❌ DON'T

* Do NOT implement business logic
* Do NOT call APIs directly
* Do NOT create components here
* Do NOT manipulate complex state

---

## 🧩 Modules Layer (`/modules`)

Each module represents a **feature/domain**:

```
modules/
  auth/
  feature/
  profile/
```

### Module structure (MANDATORY — exact folder names):

```
modules/<feature>/
  components/     # Feature UI components
  hooks/          # TanStack Query hooks + logic
  service/        # API functions (singular — NOT services/)
  types/          # TypeScript types + Zod schemas
  skeletons/      # Loading skeleton components
```

Optional:

```
  contexts/       # Feature-specific contexts
  config/         # Feature-specific config/constants
```

### ⚠️ Critical naming rules

* `service/` is **singular** — NEVER `services/`
* `types/` holds both TS types AND Zod schemas — NEVER create `schemas/`
* `skeletons/` is MANDATORY for every module

### ✅ DO

* Place ALL business logic in hooks
* Encapsulate API calls in service functions
* Keep everything related to a feature together
* Follow naming conventions exactly

### ❌ DON'T

* Do NOT import from pages
* Do NOT leak internal logic outside the module
* Do NOT create generic reusable components here

---

## 🔁 Shared Layer (`/shared`)

Full structure:

```
shared/
  components/     # Reusable UI (Input, Spinner, Toast, ToggleTheme, ErrorMessage...)
  hooks/          # Generic hooks (useNavigateTo, useFindMe...)
  contexts/       # Global contexts (userContext, themeContext)
  layouts/        # Layout components (Header, Sidebar, BottomNav, Content)
  services/       # Global services (findMeService, etc.)
  utils/          # Pure utility functions
```

### ✅ DO

* Create reusable UI components
* Store global contexts here
* Keep layouts here

### ❌ DON'T

* Do NOT include business logic
* Do NOT depend on specific modules
* Do NOT import from modules

### ⚠️ Decision Rule

Used in 2+ modules → belongs in `shared`

---

## 🌐 API Layer (`/api`)

```
api/
  axios.ts              # Configured axios instance (base URL, defaults)
  interceptors/         # Axios interceptors (e.g. forbidden-interceptor.ts)
```

### ✅ DO

* Configure axios instance here
* Handle interceptors (auth headers, global error handling)

### ❌ DON'T

* Do NOT place feature-specific API calls here
* Do NOT add business logic

---

## 🚫 Cross-Layer Rules (STRICT)

### ❌ FORBIDDEN

```
pages → API directly
pages → business logic
shared → modules
modules → pages
components → service functions directly
```

### ✅ ALLOWED FLOW

```
pages → modules → service/ → api/axios
              ↓
           shared/
```

---

## 🏷️ Naming Conventions (MANDATORY)

| Type | Pattern | Example |
|------|---------|---------|
| Component | `PascalCase.tsx` | `FeatureCard.tsx`, `LoginForm.tsx` |
| Hook | `use[Action][Entity].ts` | `useCreateFeature.ts`, `useGetUser.ts` |
| Service file | `[action][Entity]Service.ts` | `createFeatureService.ts` |
| Type file | `[entity\|action].ts` | `feature.ts`, `createFeature.ts` |
| Skeleton | `[Feature]Skeleton.tsx` | `FeatureSkeleton.tsx` |

---

## 🧠 Component Placement Rules

| Scenario | Where it goes |
|----------|---------------|
| Specific to one feature | `modules/<feature>/components/` |
| Reusable across 2+ features | `shared/components/` |
| Page layout structure | `pages/` (inline, no extraction needed) |

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* "God components" (too much responsibility)
* Logic inside JSX
* Duplicated logic across modules
* Direct API usage outside service functions
* Mixing UI + business logic
* `services/` folder (always `service/`)
* `schemas/` folder (always `types/`)
* Missing `skeletons/` in modules

---

## 🛑 Final Rule

If any implementation violates this architecture:

→ STOP
→ Refactor to comply before continuing

Architecture consistency is **more important than speed**
