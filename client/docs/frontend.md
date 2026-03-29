# FRONTEND RULES — SECURITYON

## STACK

* React + TypeScript
* Vite
* TailwindCSS
* Axios (com interceptors)
* Arquitetura modular por domínio (modules)

---

## GLOBAL STRUCTURE

* O projeto é dividido em:

  * `/modules` → features de negócio
  * `/shared` → código reutilizável global
  * `/pages` → páginas da aplicação
  * `/api` → configuração base de requisições

* PROIBIDO criar novas estruturas fora desse padrão

---

## MODULE ARCHITECTURE (REGRA MAIS IMPORTANTE)

Cada feature DEVE seguir EXATAMENTE essa estrutura:

```
/modules/{feature}/
  components/
  hooks/
  service/
  types/
  skeletons/
```

Opcional:

```
  contexts/
  config/
```

### REGRAS

* NÃO misturar responsabilidades entre pastas
* NÃO pular camadas (ex: componente chamando API direto)
* SEMPRE seguir esse fluxo:

```
Component → Hook → Service → API
```

---

## COMPONENTS

* Um componente por arquivo
* Nome em PascalCase
* Componentes são BURROS (sem regra de negócio complexa)

### PROIBIDO

* Fazer chamada de API dentro de componentes
* Colocar lógica pesada dentro do JSX
* Acessar axios diretamente

---

## HOOKS

* Toda lógica de negócio DEVE estar em hooks
* Hooks são o ponto de conexão entre UI e serviços

### PADRÃO

* Nome sempre: `use[Action][Entity]`

  * ex: `useCreatePost`, `useFindAllArticles`

### RESPONSABILIDADE

* Chamar services
* Controlar estado
* Tratar loading e erro

---

## SERVICES

* Responsáveis EXCLUSIVAMENTE por comunicação com API

### REGRAS

* Sempre separados por ação:

  * `createXService`
  * `findAllXService`
  * `updateXService`
  * `deleteXService`

* NÃO usar lógica de UI

* NÃO usar hooks dentro de services

---

## API LAYER

* Toda requisição passa pelo axios configurado em `/api/axios.ts`
* Interceptors ficam em `/api/interceptors`

### PROIBIDO

* Criar instâncias novas de axios
* Fazer fetch direto

---

## TYPES

* Tipos sempre dentro da pasta `/types` da feature
* Separar por ação

Exemplo:

```
types/
  createPost.ts
  post.ts
  updatePost.ts
```

---

## SKELETONS

* Cada componente assíncrono relevante deve ter skeleton correspondente
* Skeletons ficam em `/skeletons`

---

## SHARED (CÓDIGO GLOBAL)

### `/shared/components`

* Componentes reutilizáveis (Input, Spinner, etc)

### `/shared/hooks`

* Hooks genéricos (ex: scroll, navegação)

### `/shared/contexts`

* Contextos globais (user, theme)

### `/shared/layouts`

* Estrutura visual (Header, Sidebar, etc)

### `/shared/services`

* Serviços globais (ex: findMe)

### `/shared/utils`

* Funções utilitárias puras

---

## PAGES

* Apenas composição de componentes
* NÃO conter lógica de negócio

### PROIBIDO

* Chamar service direto
* Criar lógica complexa

---

## NAMING CONVENTIONS

* Componentes: `PascalCase.tsx`
* Hooks: `useSomething.ts`
* Services: `actionEntityService.ts`
* Types: `actionEntity.ts` ou `entity.ts`

---

## DATA FLOW (OBRIGATÓRIO)

Sempre seguir:

```
UI (Component)
  ↓
Hook
  ↓
Service
  ↓
Axios/API
```

---

## PROIBIÇÕES GERAIS

* NÃO acessar API fora de services
* NÃO colocar lógica de negócio em componentes
* NÃO quebrar estrutura de modules
* NÃO duplicar lógica entre features
* NÃO criar arquivos genéricos fora de /shared

---

## BOAS PRÁTICAS OBRIGATÓRIAS

* Código simples > código complexo
* Reutilizar sempre que possível
* Seguir padrões já existentes no projeto
* Antes de criar algo novo, verificar se já existe algo similar
* Componentes simples, curtos, seguindo a SRP

---

## REGRA FINAL (CRÍTICA)

* SEMPRE imitar o padrão já existente dentro da feature mais parecida
* SE existir dúvida, copiar a estrutura de outro módulo (articles, posts, complaints, etc)

---

## COMO IMPLEMENTAR NOVA FEATURE

1. Criar nova pasta em `/modules`
2. Replicar estrutura padrão
3. Criar types
4. Criar services
5. Criar hooks
6. Criar componentes
7. Integrar na página

---

## FILOSOFIA DO PROJETO

* Separação clara de responsabilidades
* Código previsível
* Facilidade de manutenção
* Escalabilidade por módulos

---

## REGRA DE OURO

Se o código novo não parecer com o resto do projeto, está errado.