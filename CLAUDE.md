# Fullstack App Template

Monorepo com pnpm workspaces. Backend NestJS + Frontend React.

## Estrutura

```
fullstack-app-template/
  server/   # NestJS API
  client/   # React + Vite
```

## Comandos

```bash
# Rodar tudo em paralelo (dev)
pnpm dev

# Rodar separado
pnpm --filter server start:dev
pnpm --filter client dev

# Build
pnpm build

# Banco de dados (PostgreSQL via Docker)
docker compose up -d

# Prisma
pnpm --filter server exec prisma migrate dev
pnpm --filter server exec prisma generate
pnpm --filter server exec prisma studio
```

## Como adicionar uma nova feature

### Backend (`server/`)

1. Criar pasta `src/modules/<feature>/`
2. Criar `<feature>.module.ts`, `<feature>.controller.ts`, `<feature>.service.ts`
3. Criar `dto/create-<feature>.dto.ts` e `dto/update-<feature>.dto.ts`
4. Registrar o module em `app.module.ts`
5. Seguir as regras em `server/CLAUDE.md` (carregadas automaticamente)

### Frontend (`client/`)

1. Criar pasta `src/modules/<feature>/` com subpastas: `components/`, `hooks/`, `service/`, `types/`, `skeletons/`
2. Criar types (Zod schema + tipo inferido) em `types/`
3. Criar service functions em `service/`
4. Criar hooks com TanStack Query em `hooks/`
5. Criar componentes em `components/` com skeleton correspondente em `skeletons/`
6. Integrar na página em `pages/`
7. Seguir as regras em `client/CLAUDE.md` (carregadas automaticamente)

## Regras de código

As regras são carregadas automaticamente pelo Claude ao trabalhar em cada pasta:

- `server/CLAUDE.md` → regras do backend (NestJS, Prisma, Guards, DTOs, etc.)
- `client/CLAUDE.md` → regras do frontend (React, TanStack Query, Zod, Tailwind, etc.)

Não é necessário mencionar as regras — Claude as aplica automaticamente.

## Approach

- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read unless the file may have changed.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.
