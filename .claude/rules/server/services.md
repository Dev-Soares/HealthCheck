# 🧠 Services Rules

## 🎯 Objective

Define strict rules for service layer implementation.

The goal is to ensure:

* Clean business logic
* Decoupling from infrastructure
* Predictable behavior
* High maintainability

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

Service = **the single source of truth for business logic**

---

## 📁 Location (FLAT — MANDATORY)

```
modules/<feature>/<feature>.service.ts
```

### ✅ Correct

```
modules/user/user.service.ts
modules/auth/auth.service.ts
```

### ❌ Wrong

```
modules/user/services/user.service.ts   ❌
```

Services are flat files at the module root, NOT in a `services/` subfolder.

---

## 🧩 Responsibilities

Services MUST:

* Contain ALL business rules
* Orchestrate application logic
* Communicate with PrismaService
* Handle errors and edge cases
* Control data flow between layers

---

## ❌ Forbidden Responsibilities

Services MUST NOT:

* Handle HTTP (req, res)
* Perform input validation (DTO's responsibility)
* Render or format UI responses
* Contain unrelated logic

---

## 🔁 Method Structure Pattern

Each service method MUST follow this flow:

```typescript
async methodName(input): Promise<OutputType> {
  // 1. Hash/prepare data if needed (e.g. hash password before saving)
  // 2. Fetch or write via PrismaService (wrapped in try/catch)
  // 3. Apply business logic (check results, compare values)
  // 4. Handle edge cases (throw NestJS exceptions)
  // 5. Return clean result (typed with Pick<>)
}
```

---

## 🧩 Output Typing (MANDATORY)

There are **no entity files**. Define output types inline at the top of the service file:

```typescript
import { User } from '@prisma/client'

type UserPublic = Pick<User, 'id' | 'name' | 'email'>
```

Then use it as the return type and enforce it via Prisma `select`:

```typescript
async findOne(id: string): Promise<UserPublic> {
  // ...
  return await this.prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  })
}
```

### ✅ DO

* Define `type XPublic = Pick<X, ...>` at the top of every service file
* Use Prisma `select` to match the output type fields exactly
* Keep output shape consistent across all methods

### ❌ DON'T

* Do NOT return full Prisma records with `password` or other sensitive fields
* Do NOT create separate entity class files

---

## ⚠️ Error Handling Pattern (MANDATORY)

All Prisma operations MUST be wrapped in `try/catch` to handle database errors:

```typescript
async create(data: CreateUserDto): Promise<UserPublic> {
  const hashedPassword = await this.hashService.hashPassword(data.password)
  try {
    return await this.prisma.user.create({
      data: { name: data.name, email: data.email, password: hashedPassword },
      select: { id: true, name: true, email: true },
    })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('E-mail já cadastrado')
    }
    throw new InternalServerErrorException('Erro ao criar usuário')
  }
}
```

### Common Prisma error codes

| Code | Meaning | Exception to throw |
|------|---------|-------------------|
| `P2002` | Unique constraint violation | `ConflictException` |
| `P2025` | Record not found | `NotFoundException` |

### Rethrow Pattern (MANDATORY)

When a NestJS exception is thrown inside the try block (e.g. after a `.findUnique()` check), it must be rethrown — not wrapped in `InternalServerErrorException`:

```typescript
} catch (error) {
  if (error instanceof NotFoundException) throw error
  if (error instanceof UnauthorizedException) throw error
  throw new InternalServerErrorException('Erro ao buscar usuário')
}
```

---

## 🌍 Error Message Language

All error messages MUST be in **Portuguese (pt-BR)**:

```typescript
// ✅ Correct
throw new NotFoundException('Usuário não encontrado')
throw new ConflictException('E-mail já cadastrado')
throw new UnauthorizedException('Email ou senha inválidos')

// ❌ Wrong
throw new NotFoundException('User not found')
```

---

## 🗄️ PrismaService Usage

### ✅ DO

* Inject `PrismaService` via constructor
* Use `select` to limit returned fields
* Use `include` intentionally and sparingly
* Use `prisma.$transaction()` for multi-step operations that must be atomic

### ❌ DON'T

* Do NOT expose PrismaService outside services
* Do NOT mix Prisma logic with business rules

---

## 🔁 Cross-Module Usage

### ✅ DO

* Inject and use other services when needed
* Example: `AuthService` injects `UserService` and `HashService`

### ❌ DON'T

* Do NOT directly access another module's PrismaService
* Do NOT create circular dependencies

---

## 🧠 Naming Conventions

### ✅ DO

Use clear, action-based names:

* `create`
* `findOne`
* `findByEmailWithPassword`
* `update`
* `remove`

### ❌ DON'T

* Do NOT use vague names: `handleUser`, `processData`

---

## 💡 Complete Example

```typescript
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { Prisma, User } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'

type UserPublic = Pick<User, 'id' | 'name' | 'email'>

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserPublic> {
    try {
      return await this.prisma.user.create({
        data: { name: data.name, email: data.email },
        select: { id: true, name: true, email: true },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('E-mail já cadastrado')
      }
      throw new InternalServerErrorException('Erro ao criar usuário')
    }
  }

  async findOne(id: string): Promise<UserPublic> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true },
      })
      if (!user) throw new NotFoundException('Usuário não encontrado')
      return user
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new InternalServerErrorException('Erro ao buscar usuário')
    }
  }
}
```

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* Business logic in controllers
* Prisma access outside services
* Fat methods (>50-80 lines)
* Silent failures (swallowed errors)
* Duplicated logic
* Mixed responsibilities
* `services/` subfolder inside modules
* Error messages in English

---

## 🛑 Final Rule

If a service:

* Becomes hard to read
* Mixes responsibilities
* Leaks infrastructure details

→ STOP
→ Refactor into smaller, clean units

Services MUST remain the **core of clean architecture**
