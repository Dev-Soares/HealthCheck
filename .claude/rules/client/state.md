# 🧠 State Management Rules

## 🎯 Objective

Define strict rules for managing state across the application.

The goal is to ensure:

* Predictable state flow
* Minimal complexity
* Clear separation of concerns
* Scalability without chaos

Claude MUST follow these rules strictly.

---

## 🧠 Core Philosophy

State MUST be:

* Local by default
* Scoped to features (modules)
* Centralized ONLY when necessary

---

## 🧩 State Layers

There are ONLY three valid state layers:

1. **Local Component State** — `useState` for UI-only
2. **Module State** — TanStack Query hooks (server state)
3. **Global State** — React Context (rare, controlled)

---

## 🖥️ Local State (Component Level)

### ✅ DO

* Use `useState` for:
  * UI-only state (modals open/close, toggles, tab selection)
  * Temporary interactions that don't affect other components

### ❌ DON'T

* Do NOT store API/server data in `useState`
* Do NOT store business data here

### ⚠️ Rule

If state affects more than one component → move to a hook

---

## 🧠 Module State — TanStack Query (DEFAULT APPROACH)

All server state (data from the API) MUST be handled via TanStack Query inside `modules/<feature>/hooks/`.

### Query (GET requests)

```typescript
// modules/feature/hooks/useGetFeature.ts
import { useQuery } from '@tanstack/react-query'
import { getFeatureService } from '../service/getFeatureService'

export const useGetFeature = (id: string) => {
  return useQuery({
    queryKey: ['feature', id],
    queryFn: () => getFeatureService(id),
  })
}

// Usage in component:
const { data, isPending, isError } = useGetFeature(id)
```

### Mutation (POST / PATCH / DELETE)

```typescript
// modules/feature/hooks/useCreateFeature.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFeatureService } from '../service/createFeatureService'

export const useCreateFeature = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFeatureService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feature'] })
    },
  })
}

// Usage in component:
const { mutate, isPending } = useCreateFeature()
```

### ✅ DO

* Use `useQuery` for all GET/fetch operations
* Use `useMutation` for all POST/PATCH/DELETE operations
* Use `queryClient.invalidateQueries()` after mutations to keep data fresh
* Define `queryKey` consistently (e.g. `['feature']`, `['feature', id]`)

### ❌ DON'T

* Do NOT use `useState + useEffect` to fetch server data — always use TanStack Query
* Do NOT store API responses in `useState`
* Do NOT spread state logic across multiple unrelated places

---

## 🌍 Global State (STRICT CONTROL)

### ⚠️ Use ONLY for truly global data

Valid cases:

* Auth user (`userContext`)
* Theme (`themeContext`)
* Global app settings

Location:

```
shared/contexts/
  userContext.tsx
  themeContext.tsx
```

### ✅ DO

* Use React Context for global state
* Keep global state minimal

### ❌ DON'T

* Do NOT create global state for feature-specific data
* Do NOT store feature data (lists, forms, business data) in Context
* Do NOT overuse Context

---

## 🔁 Data Flow

```
Service → Hook (TanStack Query) → Component
```

### ❌ INVALID

```
Component → useState for server data ❌
Service → setState directly ❌
Context for feature data ❌
```

---

## 🧪 Form State

### ✅ DO

* Use React Hook Form for ALL forms (see form.md)

### ❌ DON'T

* Do NOT use `useState` for forms

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* `useState + useEffect` for fetching data (use TanStack Query)
* Global state overuse (Context for feature data)
* State inside service functions
* Business logic inside components
* Duplicated state for the same data
* Prop drilling (lift to hook instead)
* Async logic directly in UI components

---

## 🛑 Final Rule

If state is:

* Fetched from API → use TanStack Query
* UI-only → use `useState`
* Truly global (auth/theme) → use React Context

State MUST remain predictable and contained
