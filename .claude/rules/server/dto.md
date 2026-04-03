# 📦 DTO Rules

## 🎯 Objective

Define strict rules for Data Transfer Objects (DTOs).

The goal is to ensure:

* Strong validation
* Clear contracts
* Safe data input
* Consistent API documentation

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

DTO = **input contract + validation layer + API documentation**

---

## 📁 Location

```
modules/<feature>/dto/
  create-<feature>.dto.ts
  update-<feature>.dto.ts
```

---

## 🧩 Responsibilities

DTOs MUST:

* Define input structure
* Validate data using `class-validator`
* Document fields using `@nestjs/swagger`
* Act as single source of truth for input

---

## ❌ Forbidden Responsibilities

DTOs MUST NOT:

* Contain business logic
* Contain database logic
* Be used as output/entity models

---

## 🧪 Validation Rules (MANDATORY)

### ✅ DO

Use `class-validator` decorators on EVERY field:

* `@IsString()` — string fields
* `@IsEmail()` — email fields
* `@IsNumber()` — number fields
* `@IsBoolean()` — boolean fields
* `@IsNotEmpty()` — required fields (use alongside type validators)
* `@IsOptional()` — optional fields (update DTOs)
* `@MinLength(n)` — minimum string length
* `@MaxLength(n)` — maximum string length

`@IsNotEmpty()` MUST always be combined with a type validator:

```typescript
@IsString()
@IsNotEmpty()
name: string
```

---

## 📝 Swagger Documentation (MANDATORY)

Every field MUST have a Swagger decorator from `@nestjs/swagger`:

* `@ApiProperty()` — required fields
* `@ApiPropertyOptional()` — optional fields (update DTOs)

Always include an `example` value:

```typescript
@ApiProperty({ example: 'user@email.com' })
@IsEmail()
@IsNotEmpty()
email: string
```

---

## 💡 Complete Examples

### Create DTO

```typescript
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string
}
```

### Update DTO (all fields optional)

```typescript
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string

  @ApiPropertyOptional({ example: 'new@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string
}
```

### Auth DTO

```typescript
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignInDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  password: string
}
```

---

## 🔁 DTO Types

* **Create DTO** — all required fields with validation
* **Update DTO** — all fields optional with `@IsOptional()` and `@ApiPropertyOptional()`
* **Query DTO** — filters, pagination (use `@IsOptional()` for all)
* **Auth DTO** — login/signup specific inputs

---

## 🧠 Naming Conventions

### ✅ DO

* `CreateUserDto`
* `UpdateUserDto`
* `SignInDto`
* `PaginationDto`

### ❌ DON'T

* `UserData`, `Payload`, `UserInput` — too generic

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* Missing `@ApiProperty` / `@ApiPropertyOptional` decorators
* Missing validation decorators
* `@IsNotEmpty()` used without a type validator
* Logic inside DTOs
* Reusing DTOs as output models

---

## 🛑 Final Rule

If a DTO:

* Is missing validation decorators
* Is missing Swagger decorators
* Contains business logic

→ STOP
→ Fix before proceeding

Validation and documentation are **mandatory for all DTOs**
