# 🗄️ Prisma Rules

## 🎯 Objective

Define strict rules for using Prisma as the database layer.

The goal is to ensure:

* Clean data access
* No business logic leakage
* Predictable queries
* Safe and maintainable database interactions

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

PrismaService = **data access layer only**

---

## 📁 Location (MANDATORY)

```
modules/database/
  database.module.ts
  prisma.service.ts
```

### ⚠️ IMPORTANT

* There is **no** `src/prisma/` folder
* `PrismaService` lives at `src/modules/database/prisma.service.ts`
* `PrismaService extends PrismaClient` and implements `OnModuleInit`
* `DatabaseModule` exports `PrismaService` — feature modules import `DatabaseModule`

```typescript
// prisma.service.ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
}
```

```typescript
// user.module.ts — import DatabaseModule to get PrismaService
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

---

## 🧩 Responsibilities

PrismaService MUST:

* Execute database queries
* Return raw data to services
* Be used ONLY inside services

---

## ❌ Forbidden Responsibilities

PrismaService MUST NOT:

* Contain business logic
* Validate business rules
* Be accessed outside services

---

## 🔁 Usage Rule

### ✅ DO

* Inject `PrismaService` into services via constructor
* Use explicit and readable queries

```typescript
constructor(private readonly prisma: PrismaService) {}
```

### ❌ DON'T

* Do NOT use Prisma in controllers
* Do NOT expose PrismaService across modules (use the module's service instead)
* Do NOT scatter queries across multiple layers

---

## 🧼 Query Design

### ✅ DO

* Use `select` to limit returned fields (never return `password` or tokens)
* Use `include` intentionally and only when needed
* Keep queries simple and readable

```typescript
// ✅ Correct — use select to control output
await this.prisma.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true },
})

// ❌ Wrong — returns password and all other fields
await this.prisma.user.findUnique({ where: { id } })
```

### ❌ DON'T

* Do NOT fetch unnecessary data
* Do NOT create overly complex queries inline

---

## 🔐 Data Safety

### ✅ DO

* Always exclude sensitive fields (`password`, tokens) via `select`
* Control what is returned in every query

### ❌ DON'T

* Do NOT expose full database records blindly

---

## 🧠 Transaction Rules

### ✅ DO

* Use `prisma.$transaction()` when multiple operations must succeed or fail together

```typescript
await this.prisma.$transaction([
  this.prisma.user.create({ data: userData }),
  this.prisma.profile.create({ data: profileData }),
])
```

### ❌ DON'T

* Do NOT perform critical multi-step operations without a transaction

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* PrismaService usage outside services
* Business logic inside queries
* Massive queries doing too much at once
* Returning full records with sensitive fields
* Referencing `src/prisma/` (does not exist)

---

## 🛑 Final Rule

If PrismaService is used outside the service layer:

→ STOP
→ Refactor immediately

Database access MUST remain isolated in services
