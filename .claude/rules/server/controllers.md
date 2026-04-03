# 🎮 Controllers Rules

## 🎯 Objective

Define strict rules for controller layer implementation.

The goal is to ensure:

* Thin and predictable controllers
* Clear separation from business logic
* Clean and consistent request handling

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

Controller = **transport layer only**

---

## 📁 Location (FLAT — MANDATORY)

```
modules/<feature>/<feature>.controller.ts
```

### ✅ Correct

```
modules/user/user.controller.ts
modules/auth/auth.controller.ts
```

### ❌ Wrong

```
modules/user/controllers/user.controller.ts   ❌
```

Controllers are flat files at the module root, NOT in a `controllers/` subfolder.

---

## 🧩 Responsibilities

Controllers MUST:

* Handle HTTP requests
* Receive and validate DTOs
* Call service methods
* Return responses

---

## ❌ Forbidden Responsibilities

Controllers MUST NOT:

* Contain business logic
* Access PrismaService
* Make decisions based on business rules
* Handle complex data transformations
* Contain reusable logic

---

## 🔁 Request Handling Pattern

Each controller method MUST follow:

```typescript
@HttpMethod()
async methodName(@Body() dto: SomeDto) {
  return this.service.someMethod(dto)
}
```

Keep methods to **1-5 lines maximum**. If logic appears → move to service.

---

## 🧾 DTO Usage (MANDATORY)

### ✅ DO

* Use DTOs for ALL inputs
* Use decorators: `@Body()`, `@Param()`, `@Query()`
* Use `@UseGuards()` for protected routes
* Use `@Req()` only to read `req.user` (set by guards) — never to parse tokens manually

### ❌ DON'T

* Do NOT accept raw objects
* Do NOT skip validation
* Do NOT decode tokens manually in controllers

---

## 🍪 Cookie Handling (Auth Routes Only)

For auth routes that set/clear cookies, use `@Res({ passthrough: true })`:

```typescript
@Post('login')
async signIn(
  @Body() dto: SignInDto,
  @Res({ passthrough: true }) res: Response,
): Promise<{ message: string }> {
  const result = await this.authService.signIn(dto.email, dto.password)
  res.cookie('access_token', result.access_token, cookieConfig)
  return { message: 'Sign In successful' }
}

@Post('logout')
logout(@Res({ passthrough: true }) res: Response): { message: string } {
  res.clearCookie('access_token', cookieConfig)
  return { message: 'Logged out' }
}
```

* Import `cookieConfig` from `src/common/config/cookie.config`
* `passthrough: true` is mandatory to keep NestJS interceptors working

---

## 🔐 Guard Usage

```typescript
@UseGuards(AuthGuard)           // requires authenticated user
@UseGuards(OptionalAuthGuard)   // user may or may not be authenticated
@UseGuards(AuthGuard, OwnershipGuard)  // authenticated + must be resource owner
```

Access the request user via `@Req() req: AuthenticatedRequest` (set by guard):

```typescript
@UseGuards(OptionalAuthGuard)
@Get('me')
async findMe(@Req() req: OptionalAuthRequest) {
  if (!req.user) return null
  return this.userService.findOne(req.user.sub)
}
```

---

## 🧩 Naming Conventions

### ✅ DO

Use clear RESTful naming:

* `create`
* `findAll`
* `findOne`
* `update`
* `remove`
* Custom names when semantically necessary: `findMe`, `signIn`, `logout`

### ❌ DON'T

* Do NOT use vague names like `handle`, `process`

---

## 🧩 Example (CORRECT)

```typescript
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }

  @UseGuards(AuthGuard, OwnershipGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard, OwnershipGuard)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard, OwnershipGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
```

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* Fat controllers
* Business logic inside controllers
* Direct database access
* Manual validation (global `ValidationPipe` handles it)
* Complex conditionals
* Hidden side-effects
* `controllers/` subfolder inside modules

---

## 🛑 Final Rule

If a controller:

* Contains logic
* Accesses database
* Becomes large or complex

→ STOP
→ Refactor into service layer

Controllers MUST remain **thin, clean, and predictable**
