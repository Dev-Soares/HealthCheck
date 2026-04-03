# 🧱 Backend Architecture Rules

## 🎯 Objective

Define strict architectural rules for the backend.

The goal is to ensure:

* True separation of concerns
* Decoupled business logic
* Predictable request flow
* Scalable and maintainable structure

Claude MUST follow these rules strictly.

---

## 🧠 Core Principles

* Controllers are transport layer ONLY
* Services contain ALL business logic
* PrismaService is ONLY a data access tool
* DTOs define input contracts
* Output types are inline `Pick<>` aliases defined in services (no separate entity files)

---

## 🔁 Request Flow (MANDATORY)

```
Controller → Service → PrismaService → Database
```

---

## 🚫 FORBIDDEN FLOWS

```
Controller → PrismaService ❌
Controller → Business Logic ❌
Service → HTTP Layer ❌
PrismaService → Business Logic ❌
```

---

## 📁 Module Structure (FLAT FILES — MANDATORY)

Each module MUST use flat files at the module root:

```
modules/<feature>/
  <feature>.controller.ts
  <feature>.service.ts
  <feature>.module.ts
  dto/
    create-<feature>.dto.ts
    update-<feature>.dto.ts
```

### ⚠️ DO NOT create subfolders for controllers or services

```
modules/user/user.controller.ts   ✅
modules/user/controllers/user.controller.ts  ❌
modules/user/services/user.service.ts  ❌
```

---

## 🗄️ Database Layer

Prisma is encapsulated in its own module:

```
modules/database/
  database.module.ts
  prisma.service.ts
```

* `PrismaService extends PrismaClient` and implements `OnModuleInit`
* `DatabaseModule` exports `PrismaService`
* Feature modules import `DatabaseModule` to inject `PrismaService` in their services

### ⚠️ IMPORTANT

* There is NO `src/prisma/` folder
* PrismaService lives at `modules/database/prisma.service.ts`
* Always import from `'../database/prisma.service'` inside feature services

---

## 🎮 Controllers (Transport Layer)

### ✅ RESPONSIBILITY

* Handle HTTP requests
* Receive DTOs
* Call services
* Return responses

### ✅ DO

* Keep controllers minimal (1-5 lines per method)
* Use DTOs for validation
* Delegate everything to services
* Apply guards via decorators (`@UseGuards`)

### ❌ DON'T

* Do NOT implement business logic
* Do NOT access PrismaService
* Do NOT transform complex data
* Do NOT contain decision-making logic

### ⚠️ Rule

Controller = **entry point only**

---

## 🧠 Services (Business Layer)

### ✅ RESPONSIBILITY

* Contain ALL business logic
* Orchestrate operations
* Enforce rules
* Handle errors via try/catch + NestJS exceptions

### ✅ DO

* Be explicit and readable
* Handle all decision-making
* Call PrismaService for data access
* Use `type XPublic = Pick<X, 'field1' | 'field2'>` for output typing
* Always use Prisma `select` to exclude sensitive fields (password, tokens)
* Write error messages in **Portuguese (pt-BR)**

### ❌ DON'T

* Do NOT depend on HTTP concepts (req, res)
* Do NOT return raw Prisma models with sensitive fields
* Do NOT mix unrelated responsibilities

### ⚠️ Rule

Service = **source of truth for business behavior**

---

## 📦 DTOs (Input Contracts)

### ✅ RESPONSIBILITY

* Define request structure
* Validate input using class-validator
* Document fields with `@nestjs/swagger`

### ✅ DO

* Validate ALL incoming data
* Keep DTOs explicit and strict
* Use both class-validator AND `@ApiProperty` decorators

### ❌ DON'T

* Do NOT include business logic
* Do NOT reuse DTOs as output models

---

## 🧩 Output Typing (Inline Pick Pattern)

There are **no entity files**. Output types are defined inline in service files using `Pick<>`:

```typescript
// user.service.ts
type UserPublic = Pick<User, 'id' | 'name' | 'email'>

async findOne(id: string): Promise<UserPublic> {
  // ...
  return await this.prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  })
}
```

### ✅ DO

* Define `type XPublic = Pick<X, ...>` at the top of the service file
* Use Prisma `select` to match the output type fields
* Keep output consistent across all methods

### ❌ DON'T

* Do NOT create entity class files
* Do NOT return full Prisma models with sensitive fields
* Do NOT use `Omit<>` when `Pick<>` is cleaner for small sets of fields

---

## 🔄 Data Transformation Rules

### ✅ DO

* Transform data inside services via `select` and inline types
* Keep output consistent

### ❌ DON'T

* Do NOT transform data in controllers
* Do NOT leak raw Prisma responses with sensitive fields

---

## 🔁 Cross-Module Communication

### ✅ DO

* Use services to communicate between modules
* Inject other module's service (e.g. `UserService` injected in `AuthService`)

### ❌ DON'T

* Do NOT access another module's PrismaService directly
* Do NOT create hidden dependencies

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* Fat controllers
* Logic inside DTOs
* Direct database access outside services
* Returning raw database objects with sensitive fields
* Mixed responsibilities in services
* Tight coupling between modules
* `controllers/` or `services/` subfolders inside modules

---

## 🛑 Final Rule

If any code:

* Breaks layer separation
* Couples business logic to infrastructure
* Violates the request flow

→ STOP
→ Refactor to comply with architecture

Architecture consistency is **mandatory**
