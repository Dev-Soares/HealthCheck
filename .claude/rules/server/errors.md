# 🚨 Error Handling Rules

## 🎯 Objective

Define strict error handling rules.

The goal is to ensure:

* Predictable error responses
* Clean error flow
* Easy debugging

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

Errors MUST be:

* Explicit
* Meaningful
* Consistent
* Written in **Portuguese (pt-BR)**

---

## 🧩 Where to Handle Errors

### ✅ DO

* Handle errors in services using `try/catch`
* Throw NestJS built-in exceptions

### ❌ DON'T

* Do NOT handle errors in controllers
* Do NOT swallow errors silently
* Do NOT let Prisma errors bubble up raw to the client

---

## ⚠️ Standard Exceptions

Use NestJS built-in exceptions:

* `NotFoundException` — recurso não encontrado
* `BadRequestException` — requisição inválida
* `UnauthorizedException` — não autenticado / credenciais inválidas
* `ForbiddenException` — sem permissão para o recurso
* `ConflictException` — conflito (ex: e-mail já cadastrado)
* `InternalServerErrorException` — erro inesperado do servidor

---

## 🔁 Error Pattern in Services (MANDATORY)

All Prisma operations MUST be wrapped in `try/catch`. Handle specific Prisma error codes, then fall back to `InternalServerErrorException`:

```typescript
async create(data: CreateUserDto): Promise<UserPublic> {
  try {
    return await this.prisma.user.create({ ... })
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

---

## 🔄 Rethrow Pattern (MANDATORY)

When a NestJS exception is thrown manually inside the `try` block, it MUST be re-thrown in the `catch` — otherwise it gets swallowed and wrapped in `InternalServerErrorException`:

```typescript
async findOne(id: string): Promise<UserPublic> {
  try {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('Usuário não encontrado')
    return user
  } catch (error) {
    if (error instanceof NotFoundException) throw error       // ✅ rethrow
    if (error instanceof UnauthorizedException) throw error   // ✅ rethrow
    throw new InternalServerErrorException('Erro ao buscar usuário')
  }
}
```

---

## 🗄️ Prisma Error Codes Reference

| Code | Meaning | Exception |
|------|---------|-----------|
| `P2002` | Unique constraint violation | `ConflictException` |
| `P2025` | Record not found (on update/delete) | `NotFoundException` |

---

## 🌍 Error Message Language

All messages MUST be in **Portuguese (pt-BR)**:

```typescript
// ✅ Correct
throw new NotFoundException('Usuário não encontrado')
throw new ConflictException('E-mail já cadastrado')
throw new UnauthorizedException('Email ou senha inválidos')
throw new ForbiddenException('Sem permissão para acessar este recurso')
throw new InternalServerErrorException('Erro ao atualizar usuário')

// ❌ Wrong
throw new NotFoundException('User not found')
```

---

## 🧼 Error Messages

### ✅ DO

* Use clear, human-readable messages in pt-BR
* Be specific about what failed

### ❌ DON'T

* Do NOT expose internal details (SQL, stack traces, Prisma messages)
* Do NOT use generic messages like `'Erro'` alone

---

## 🔁 Error Flow

```
Service throws NestJS exception
        ↓
AllExceptionsFilter (global filter) catches it
        ↓
Structured response sent to client
```

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* Errors in controllers
* Swallowed errors (empty catch blocks)
* Raw Prisma errors reaching the client
* Forgetting to rethrow NestJS exceptions inside try/catch
* Error messages in English

---

## 🛑 Final Rule

If error handling is inconsistent:

→ STOP
→ Refactor using the try/catch + rethrow pattern

Error handling MUST be predictable and consistent across the entire codebase
