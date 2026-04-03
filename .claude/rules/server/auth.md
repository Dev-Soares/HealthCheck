# 🔐 Authentication Rules

## 🎯 Objective

Define strict rules for authentication and authorization.

The goal is to ensure:

* Secure authentication flow
* Consistent user handling
* Safe token management

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

Authentication MUST be:

* Secure
* Stateless (JWT-based)
* Isolated from business logic

---

## 🔑 Auth Strategy

* JWT-based authentication via `@nestjs/jwt` (NOT passport/passport-jwt)
* Token stored in HTTP-only cookies
* Guards used to protect routes (`AuthGuard`, `OptionalAuthGuard`, `OwnershipGuard`)

---

## 🔁 Auth Flow (MANDATORY)

```
POST /auth/login
  → AuthController receives SignInDto
  → AuthService.signIn(email, password)
      → UserService.findByEmailWithPassword(email)  [gets user with password hash]
      → HashService.comparePassword(plain, hash)    [bcrypt compare]
      → if invalid → throw UnauthorizedException('E-mail ou senha inválidos')
      → jwtService.signAsync({ sub: user.id, name: user.name })
      → return { access_token }
  → res.cookie('access_token', access_token, cookieConfig)
  → return { message: 'Sign In successful' }

POST /auth/logout
  → res.clearCookie('access_token', cookieConfig)
  → return { message: 'Logged out' }
```

---

## 🧩 Module Responsibilities

### `AuthService`

* Validate user credentials (email + password)
* Generate JWT via `jwtService.signAsync()`
* Return `{ access_token }` to the controller
* Does NOT set cookies (controller handles that)

### `AuthController`

* Receives `SignInDto`
* Calls `authService.signIn()`
* Sets/clears the cookie using `@Res({ passthrough: true })`
* Returns a simple `{ message }` response

### `HashService` (in `common/hash/`)

* `hashPassword(plain: string): Promise<string>` — bcrypt hash
* `comparePassword(plain: string, hash: string): Promise<boolean>` — bcrypt compare
* Used by `UserService` (on create/update) and `AuthService` (on login)

---

## 🍪 Cookie Configuration (MANDATORY)

Cookies MUST use the shared `cookieConfig` from `src/common/config/cookie.config.ts`:

```typescript
// common/config/cookie.config.ts
import type { CookieOptions } from 'express'

const isProduction = process.env.NODE_ENV === 'production'

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'strict',
  maxAge: 1000 * 60 * 60 * 24, // 1 day
}
```

### ✅ DO

* Import `cookieConfig` and use it for both `res.cookie()` and `res.clearCookie()`
* Use `@Res({ passthrough: true })` in auth controller methods — NOT `@Res()` alone

### ❌ DON'T

* Do NOT hardcode cookie options inline
* Do NOT use `@Res()` without `passthrough: true` (breaks NestJS interceptors)
* Do NOT store tokens in `localStorage` or response body

---

## 🔐 Cookie Handling in Controller

```typescript
import { cookieConfig } from 'src/common/config/cookie.config'
import type { Response } from 'express'

@Post('login')
@HttpCode(HttpStatus.OK)
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

---

## 🧾 JWT Payload

The JWT payload MUST be minimal:

```typescript
const payload = { sub: user.id, name: user.name }
const token = await this.jwtService.signAsync(payload)
```

### ✅ DO

* Keep payload minimal: `{ sub: user.id, name: user.name }`
* Use `sub` for the user ID (JWT standard claim)

### ❌ DON'T

* Do NOT include sensitive data (password, email, roles) in the JWT payload
* Do NOT add unnecessary fields to the payload

---

## 🔐 Password Handling

### ✅ DO

* Hash passwords with `HashService.hashPassword()` before saving
* Compare with `HashService.comparePassword()` during login
* Use strong bcrypt salt rounds (configured in `HashService`)

### ❌ DON'T

* Do NOT store plain text passwords
* Do NOT log passwords anywhere
* Do NOT implement bcrypt directly in services — use `HashService`

---

## 🔐 Route Protection

```typescript
@UseGuards(AuthGuard)            // authenticated users only
@UseGuards(OptionalAuthGuard)    // works with or without auth
@UseGuards(AuthGuard, OwnershipGuard)  // authenticated + must own the resource
```

### ❌ DON'T

* Do NOT manually check auth inside services or controllers
* Do NOT parse or verify tokens manually

---

## 🚫 Anti-Patterns

Claude MUST avoid:

* Manual auth logic in controllers
* Token in localStorage or response body
* Hardcoded cookie options (use `cookieConfig`)
* Weak password handling
* Skipping guards on protected routes
* Using passport / passport-jwt (not used in this project)
* JWT payload with sensitive data

---

## 🛑 Final Rule

If authentication is:

* Insecure
* Inconsistent
* Handled manually outside the defined flow

→ STOP
→ Refactor immediately

Security is **non-negotiable**
