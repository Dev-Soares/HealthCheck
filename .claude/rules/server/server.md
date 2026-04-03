# 🛠️ Backend Overview (Server Rules)

## 🎯 Objective

Provide a high-level definition of the backend architecture, stack, and general rules.

This document acts as the **global context** for all other backend rules.

Claude MUST read and follow this before applying any other backend rule files.

---

## 🧠 Core Philosophy

This backend is built to be:

* Scalable
* Modular
* Secure
* Predictable
* Easy to maintain

All implementations MUST prioritize:

* Separation of concerns
* Clean architecture
* Explicit behavior over implicit magic
* Consistency across modules

---

## ⚙️ Tech Stack (MANDATORY)

The backend is built using:

* NestJS (framework)
* TypeScript (type safety)
* Prisma (ORM) via `PrismaService` in `DatabaseModule`
* JWT (authentication via HTTP-only cookies)
* class-validator + `@nestjs/swagger` (DTO validation + documentation)
* bcrypt via `HashService` (password hashing)
* nestjs-pino (structured logging)
* helmet + ThrottlerModule (security)

---

## 📁 Project Structure (BASE)

```
src/
  modules/            # Feature-based modules (auth, user, database, health...)
  common/             # Guards, filters, hash, config, types
```

### Inside `common/`:

```
common/
  config/             # App-wide config (e.g. cookie.config.ts)
  filters/            # Global exception filters
  guards/             # Auth guards (BaseJwtGuard, AuthGuard, OptionalAuthGuard, OwnershipGuard)
  hash/               # HashModule + HashService (bcrypt)
  types/              # Shared TypeScript types (req-types, query-types)
  dto/                # Shared DTOs (e.g. pagination)
```

---

## 🧩 Module Structure (FLAT FILES — MANDATORY)

Each feature inside `modules/` MUST follow this **flat file structure**:

```
modules/<feature>/
  <feature>.controller.ts   # HTTP layer
  <feature>.service.ts      # Business logic
  <feature>.module.ts       # NestJS module
  dto/                      # Input validation (class-validator + @nestjs/swagger)
```

### ⚠️ IMPORTANT

* Do NOT create `controllers/` or `services/` subfolders inside a module
* Files are flat at the module root: `user.controller.ts`, `user.service.ts`, `user.module.ts`
* `dto/` IS a subfolder (e.g. `dto/create-user.dto.ts`, `dto/update-user.dto.ts`)
* There is NO `entities/` folder — output types are defined inline in services using `Pick<>`

---

## 🗄️ Database Module

Prisma is encapsulated in a dedicated module:

```
modules/database/
  database.module.ts
  prisma.service.ts       # PrismaService extends PrismaClient, implements OnModuleInit
```

`PrismaService` is exported by `DatabaseModule` and injected into feature services.

---

## 🧠 Layer Responsibilities

---

### 🎮 Controllers

* Handle HTTP requests
* Receive and validate DTOs
* Call services
* Return responses

---

### 🧠 Services

* Contain ALL business logic
* Orchestrate operations
* Communicate with PrismaService
* Handle errors using try/catch + NestJS exceptions

---

### 🗄️ PrismaService

* Data access layer only
* Injected into services via DatabaseModule
* MUST NOT contain business logic

---

### 📦 DTOs

* Define input contracts
* Use class-validator + `@nestjs/swagger` decorators
* Enforce validation rules

---

## 🔁 Request Flow (MANDATORY)

```
Controller → Service → PrismaService → Database
```

### 🚫 FORBIDDEN FLOWS

```
Controller → PrismaService ❌
Controller → Business Logic ❌
Service → HTTP Logic ❌
```

---

## 🔐 Authentication Strategy

* JWT-based authentication
* Token stored in HTTP-only cookies via `cookieConfig` (`common/config/cookie.config.ts`)
* Guards used for route protection (`AuthGuard`, `OptionalAuthGuard`, `OwnershipGuard`)

---

## 🧠 Development Principles

### ✅ DO

* Keep controllers thin (1-5 lines per method)
* Keep services focused and explicit
* Validate ALL input via DTOs
* Isolate database access via PrismaService
* Follow module-based architecture
* Write error messages in **Portuguese (pt-BR)**

### ❌ DON'T

* Do NOT place business logic in controllers
* Do NOT access PrismaService outside services
* Do NOT skip validation
* Do NOT create tight coupling between modules
* Do NOT return sensitive fields (password, tokens) in responses

---

## 🚫 Strict Prohibitions

Claude MUST NEVER:

* Bypass service layer
* Access database directly in controllers
* Skip DTO validation
* Mix responsibilities across layers
* Introduce hidden side-effects

---

## 🛑 Final Rule

If any implementation:

* Breaks the defined architecture
* Violates separation of concerns
* Introduces inconsistency

→ STOP
→ Refactor to align with backend standards

Clean architecture is **mandatory, not optional**
