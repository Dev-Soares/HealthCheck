# 🧾 Forms Rules

## 🎯 Objective

Define strict rules for building and handling forms.

The goal is to ensure:

* Type safety
* Validation consistency
* Clean separation of concerns
* Predictable form behavior

Claude MUST follow these rules strictly.

---

## 🧠 Core Stack (MANDATORY)

All forms MUST use:

* **Zod v4** → schema validation
* **React Hook Form v7** → form state management
* **`zodResolver`** from `@hookform/resolvers/zod` → connect them

---

## 📁 Form Location Rules

Forms follow module-based organization:

```
modules/<feature>/
  components/     # Form UI component
  hooks/          # Form hook (useForm + zodResolver)
  types/          # Zod schema + inferred TypeScript type
```

### ⚠️ There is NO `schemas/` folder

Zod schemas live inside `modules/<feature>/types/`, alongside TypeScript types.

---

## 🧪 Schema + Type Rules (Zod)

Location: `modules/<feature>/types/`

### ✅ DO

* Define ALL validation using Zod
* Export both the schema and the inferred type from the same file
* The Zod schema IS the single source of truth for the type

### 💡 Example

```typescript
// modules/auth/types/signIn.ts
import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

export type SignInData = z.infer<typeof signInSchema>
```

### ❌ DON'T

* Do NOT create a separate `schemas/` folder
* Do NOT duplicate type definitions alongside Zod schemas
* Do NOT define schemas inside components or hooks

---

## 🧠 Form Hook Rules

Location: `modules/<feature>/hooks/`

### ✅ RESPONSIBILITY

* Initialize React Hook Form with `useForm`
* Connect Zod schema via `zodResolver`
* Handle form submission
* Call service functions (not axios directly)

### 💡 Example

```typescript
// modules/auth/hooks/useSignIn.ts
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signInSchema, type SignInData } from '../types/signIn'
import { signInService } from '../service/signInService'

export const useSignIn = () => {
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: SignInData) => signInService(data),
  })

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data))

  return {
    ...form,
    onSubmit,
    isPending: mutation.isPending,
  }
}
```

### ❌ DON'T

* Do NOT call axios directly in the hook
* Do NOT define the Zod schema here (import it from `types/`)
* Do NOT mix UI concerns in the hook

---

## 🖥️ Form Component Rules

Location: `modules/<feature>/components/`

### ✅ RESPONSIBILITY

* Render form inputs
* Bind inputs using `register` or `Controller`
* Display validation errors from form state
* Trigger submit via the hook's `onSubmit`

### 💡 Example

```typescript
// modules/auth/components/LoginForm.tsx
import { useSignIn } from '../hooks/useSignIn'

const LoginForm = () => {
  const { register, onSubmit, formState: { errors }, isPending } = useSignIn()

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <input {...register('email')} placeholder="E-mail" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input type="password" {...register('password')} placeholder="Senha" />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

### ❌ DON'T

* Do NOT create validation logic here
* Do NOT call service functions directly
* Do NOT manage form state with `useState`

---

## 🔁 Data Flow (MANDATORY)

```
User Input
    ↓
React Hook Form
    ↓
Zod Validation (zodResolver)
    ↓
Hook onSubmit
    ↓
TanStack Query mutation
    ↓
Service function
    ↓
API
```

---

## 🔄 Controlled vs Uncontrolled

### ✅ DO

* Use `register` (uncontrolled) by default
* Use `Controller` only for custom/third-party inputs that don't support `ref`

### ❌ DON'T

* Do NOT overuse `Controller`
* Do NOT use `useState` to track field values

---

## 🧩 Reusability Rules

### ✅ DO

* Extract reusable inputs (e.g. `Input`, `PasswordInput`) to `shared/components/`
* Keep form-specific logic inside the module

### ❌ DON'T

* Do NOT create form-specific logic in shared components

---

## 🚫 Anti-Patterns

Claude MUST avoid:

* `useState` for form state
* Zod schema defined inside a component or hook
* API calls directly in form components
* Creating a `schemas/` folder
* Duplicate TypeScript interfaces alongside Zod inferred types
* Missing `zodResolver` connection

---

## 🧪 Type Safety Rule

The Zod schema is the ONLY source of truth:

```typescript
// ✅ Correct
type SignInData = z.infer<typeof signInSchema>

// ❌ Wrong — duplicate interface
interface SignInData {
  email: string
  password: string
}
```

---

## 🛑 Final Rule

If a form does not use Zod + React Hook Form + zodResolver:

→ STOP
→ Refactor to comply

Forms MUST be predictable and type-safe
