# BACKEND.md

## Visão Geral

Este backend segue uma arquitetura baseada em módulos utilizando NestJS.

A estrutura principal é:

* Controller → Service → Prisma (acesso direto ao banco)
* NÃO utilizamos camada de repository
* A lógica de negócio fica exclusivamente nos services

---

## Regras Obrigatórias

### 1. Arquitetura

* Sempre seguir o padrão:

  * Controller → Service → Prisma
* NÃO criar camada de repository
* NÃO adicionar abstrações desnecessárias

---

### 2. Services

* Toda lógica de negócio deve estar nos services
* Services são responsáveis por:

  * validações de regra de negócio
  * chamadas ao banco via Prisma
  * transformação de dados

#### Exemplo de padrão:

```ts
@Injectable()
export class ExampleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDto) {
    return this.prisma.example.create({
      data,
    });
  }
}
```

---

### 3. Prisma

* O acesso ao banco é feito diretamente nos services
* Utilizar o `PrismaService` centralizado em um modulo proprio de database `database/prisma.service.ts`
* NÃO criar wrappers ou repositories para o Prisma

---

### 4. Controllers

* Controllers devem ser simples
* Responsáveis apenas por:

  * receber requisição
  * chamar service
  * retornar resposta

#### Exemplo:

```ts
@Controller('example')
export class ExampleController {
  constructor(private readonly service: ExampleService) {}

  @Post()
  create(@Body() data: CreateDto) {
    return this.service.create(data);
  }
}
```

---

### 5. DTOs

* Cada módulo deve possuir sua própria pasta `dto`
* Utilizar DTOs para:

  * validação de entrada
  * tipagem

Estrutura:

```
module/
  dto/
    create-entity.dto.ts
    update-entity.dto.ts
```

---

### 6. Estrutura de Módulos

Cada módulo deve seguir:

```
module/
  module.controller.ts
  module.service.ts
  module.module.ts
  dto/
```

---

### 7. Autenticação e Guards

* Guards ficam em `common/guards`
* Reutilizar `auth.guard` e `optionalAuth.guard`
* NÃO recriar lógica de autenticação em múltiplos lugares

---

### 8. Tratamento de Erros

* Utilizar o filtro global em:

  * `common/filters/all-exceptions.filter.ts`
* NÃO fazer try/catch desnecessário nos controllers
* Tratar erros no nível correto (service quando necessário)

---

### 9. Código Limpo

* Nome de métodos deve ser descritivo:

  * `createUser`
  * `findAllPosts`
  * `updateComplaint`
* Evitar funções genéricas como `handle`, `process`, etc.

---

## Anti-patterns (PROIBIDO)

❌ Criar camada de repository
❌ Colocar lógica de negócio no controller
❌ Duplicar lógica entre services
❌ Acessar banco fora do service
❌ Criar abstrações desnecessárias
❌ Ignorar DTOs

---

## Padrões de Implementação

### Criar um novo módulo

1. Criar pasta em `modules/`
2. Adicionar:

   * controller
   * service
   * module
   * dto/

---

### Criar endpoint

1. Definir DTO
2. Criar método no service
3. Chamar no controller

---

### Acesso ao banco

Sempre via:

```ts
this.prisma.model.method()
```

---

## Diretrizes para IA (Claude)

Ao gerar código para este projeto:

* Siga ESTRITAMENTE este documento
* NÃO invente novas arquiteturas
* NÃO crie repositories
* SEMPRE use Prisma diretamente no service
* Mantenha consistência com os módulos existentes
* Use os arquivos atuais como referência

Se houver dúvida, siga o padrão já existente no projeto