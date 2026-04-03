# 🛡️ Guards Rules

## 🎯 Objective

Define strict rules for guards and route protection.

The goal is to ensure:

* Secure access control
* Centralized authorization logic
* Clean route protection

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

Guards = **access control layer**

---

## 📁 Location

All guards live in:

```
src/common/guards/auth/
  base-jwt.guard.ts
  auth.guard.ts
  optionalAuth.guard.ts
  ownership.guard.ts
  auth.module.ts        # AuthGuardModule — exports all guards
```

Feature modules import `AuthGuardModule` to use the guards.

---

## 🧩 Guard Hierarchy

### `BaseJwtGuard` (abstract)

The base class shared by `AuthGuard` and `OptionalAuthGuard`. Contains the JWT verification logic:

```typescript
@Injectable()
export abstract class BaseJwtGuard {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {}

  protected verifyToken(token: string): Promise<RequestTokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    })
  }
}
```

---

### `AuthGuard` (requires authentication)

Extends `BaseJwtGuard`. Reads `access_token` from cookies. Throws `UnauthorizedException` if missing, expired, or invalid:

```typescript
@Injectable()
export class AuthGuard extends BaseJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.cookies?.access_token

    if (!token) throw new UnauthorizedException('Usuário não autenticado')

    try {
      request.user = await this.verifyToken(token)
      return true
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado')
      }
      throw new UnauthorizedException('Token inválido')
    }
  }
}
```

After activation: `request.user` contains `{ sub: string, name: string }`.

---

### `OptionalAuthGuard` (authentication optional)

Extends `BaseJwtGuard`. Never throws. Sets `request.user = null` if no token or invalid:

```typescript
@Injectable()
export class OptionalAuthGuard extends BaseJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.cookies?.access_token

    if (!token) {
      request.user = null
      return true
    }

    try {
      request.user = await this.verifyToken(token)
    } catch {
      request.user = null
    }

    return true
  }
}
```

Use when a route should work for both authenticated and unauthenticated users.

---

### `OwnershipGuard` (resource ownership)

Does NOT extend `BaseJwtGuard`. Compares `request.user.sub` with `request.params.id`. Throws `ForbiddenException` if they don't match:

```typescript
@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const targetUserId = request.params.id

    if (!targetUserId) {
      throw new InternalServerErrorException(
        'OwnershipGuard aplicado em rota sem parâmetro ":id"',
      )
    }

    if (request.user.sub !== targetUserId) {
      throw new ForbiddenException('Sem permissão para acessar este recurso')
    }

    return true
  }
}
```

`OwnershipGuard` MUST always be used together with `AuthGuard` (which populates `request.user`):

```typescript
@UseGuards(AuthGuard, OwnershipGuard)  // ✅ correct order
```

---

## 🔁 Usage in Controllers

```typescript
// Route requires authentication
@UseGuards(AuthGuard)
@Get('protected')
protectedRoute() { ... }

// Route works with or without authentication
@UseGuards(OptionalAuthGuard)
@Get('me')
async findMe(@Req() req: OptionalAuthRequest) {
  if (!req.user) return null
  return this.userService.findOne(req.user.sub)
}

// Route requires authentication + must be the resource owner
@UseGuards(AuthGuard, OwnershipGuard)
@Patch(':id')
update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
  return this.userService.update(id, dto)
}
```

---

## 🧾 Request Types

Use typed request interfaces from `src/common/types/req-types`:

```typescript
import type { AuthenticatedRequest, OptionalAuthRequest } from 'src/common/types/req-types'

// AuthenticatedRequest — req.user is guaranteed to exist
// OptionalAuthRequest  — req.user may be null
```

---

## ❌ Forbidden

* Do NOT implement auth logic manually in controllers or services
* Do NOT create new JWT guards from scratch — extend `BaseJwtGuard`
* Do NOT use `OwnershipGuard` without `AuthGuard` before it
* Do NOT duplicate guard logic across modules

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* Manual auth checks in controllers (`if (!req.user)`)
* Duplicated token verification
* Mixing auth with business logic
* Using `passport` / `passport-jwt` strategy pattern (project uses `@nestjs/jwt` directly)

---

## 🛑 Final Rule

If route protection is inconsistent or guards are reimplemented:

→ STOP
→ Use the existing guard hierarchy from `AuthGuardModule`

Security MUST be centralized and consistent
