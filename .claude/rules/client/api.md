# 🌐 API & Data Flow Rules

## 🎯 Objective

Define strict rules for handling API communication and data flow.

The goal is to ensure:

* Clean separation of concerns
* Predictable data flow
* Testable logic
* Zero coupling between UI and API

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle (SRP)

Each layer has ONE responsibility:

* `/api` → HTTP configuration only (axios instance + interceptors)
* `service/` → API communication (one function per endpoint)
* `hooks/` → state + orchestration (TanStack Query)
* `components/` → UI only

---

## 🔁 Data Flow (MANDATORY)

```
UI (Component/Page)
        ↓
     Hook (TanStack Query)
        ↓
    Service function
        ↓
      api/axios
```

### 🚫 INVALID FLOWS (FORBIDDEN)

```
Component → service function ❌
Component → axios ❌
Hook → axios directly ❌
Page → service function ❌
```

---

## 🌐 `/api` Layer (GLOBAL)

```
src/api/
  axios.ts
  interceptors/
    forbidden-interceptor.ts
```

### ✅ RESPONSIBILITY

* Configure axios instance (base URL, headers, defaults)
* Register interceptors
* Export the configured `api` instance

### ❌ FORBIDDEN

* Do NOT create feature-specific functions here
* Do NOT call endpoints from here
* Do NOT add business logic

### ⚠️ Rule

This layer is **infrastructure only** — no domain knowledge

---

## 🔌 Service Layer (PER MODULE)

```
modules/<feature>/service/
  create<Feature>Service.ts
  get<Feature>Service.ts
  update<Feature>Service.ts
  delete<Feature>Service.ts
```

### ⚠️ Folder name is `service/` (singular) — NEVER `services/`

### ✅ RESPONSIBILITY

* Perform API calls using the axios instance from `/api/axios`
* Encapsulate endpoints
* Return raw response data
* One function per action/endpoint

### ✅ DO

* Import `api` from `@/api/axios`
* Keep functions pure (no hooks, no state, no UI logic)
* Name files: `[action][Entity]Service.ts`

### 💡 Service file example

```typescript
// modules/feature/service/getFeatureService.ts
import { api } from '@/api/axios'
import type { Feature } from '../types/feature'

export const getFeatureService = async (id: string): Promise<Feature> => {
  const { data } = await api.get(`/feature/${id}`)
  return data
}
```

```typescript
// modules/feature/service/createFeatureService.ts
import { api } from '@/api/axios'
import type { CreateFeatureData } from '../types/createFeature'
import type { Feature } from '../types/feature'

export const createFeatureService = async (body: CreateFeatureData): Promise<Feature> => {
  const { data } = await api.post('/feature', body)
  return data
}
```

### ❌ DON'T

* Do NOT use React hooks in services
* Do NOT manage state
* Do NOT show toasts or handle UI feedback
* Do NOT use `services/` (plural)

---

## 🧠 Hooks Layer (TanStack Query — MANDATORY)

```
modules/<feature>/hooks/
  use[Action][Entity].ts
```

### ✅ RESPONSIBILITY

* Call service functions
* Manage server state via TanStack Query
* Expose loading, error, data to components
* Invalidate queries on mutations

### Naming convention

* `use[Action][Entity]` — e.g. `useGetFeature`, `useCreateFeature`, `useDeleteUser`

### 💡 Query hook (GET)

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
```

### 💡 Mutation hook (POST / PATCH / DELETE)

```typescript
// modules/feature/hooks/useCreateFeature.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFeatureService } from '../service/createFeatureService'
import type { CreateFeatureData } from '../types/createFeature'

export const useCreateFeature = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateFeatureData) => createFeatureService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feature'] })
    },
  })
}
```

### ❌ DON'T

* Do NOT call axios directly in hooks
* Do NOT use raw `useState/useEffect` for server data — use TanStack Query
* Do NOT duplicate service logic
* Do NOT move UI rendering into hooks

---

## 🖥️ Components & Pages

### ✅ DO

* Use hooks to access data
* Render UI based on hook state (`isPending`, `isError`, `data`)

### ❌ DON'T

* Do NOT call service functions directly
* Do NOT call axios
* Do NOT implement API logic

---

## ⚠️ Error Handling

### ✅ DO

* Let TanStack Query manage error state (`isError`, `error`)
* Access error state from the hook in the component

### ❌ DON'T

* Do NOT handle API errors inside components
* Do NOT leak raw axios errors to UI

---

## 🧩 Scalability Rule

For each new feature:

1. Create service functions in `modules/<feature>/service/`
2. Create hooks using TanStack Query
3. Use hooks in UI components
4. NEVER skip layers

---

## 🛑 Final Rule

If any API usage violates this flow:

→ STOP
→ Refactor to follow the correct architecture

Clean data flow is **mandatory**
