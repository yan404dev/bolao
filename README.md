# Bolao

Aplicacao full-stack de bolao para palpites de partidas de futebol. Os usuarios podem fazer palpites nos placares das partidas, e o sistema calcula automaticamente os pontos e rankings quando as partidas sao finalizadas.

## Estrutura do Projeto

Este e um monorepo gerenciado com [Turborepo](https://turbo.build/repo) e [pnpm workspaces](https://pnpm.io/workspaces).

```
bolao/
├── apps/
│   ├── api/          # API REST Spring Boot (Java 21)
│   └── web/          # Frontend Next.js (React 19)
├── turbo.json        # Configuracao Turborepo
└── pnpm-workspace.yaml
```

## Stack Tecnologica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 15, React 19, TypeScript, TailwindCSS, shadcn/ui |
| Backend | Spring Boot 3.4, Java 21, Spring Data JPA |
| Banco de Dados | PostgreSQL 16 |
| Migrations | Flyway |
| Pagamento | Mercado Pago PIX |
| API Externa | API-Football |

## Pre-requisitos

- Node.js 20+
- pnpm 9+
- Java 21
- Maven 3.9+
- PostgreSQL 16
- Docker (opcional)

## Configuracao do Ambiente

1. Copie os arquivos de ambiente de exemplo:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

2. Configure as variaveis em cada `.env`:

**API (`apps/api/.env`):**

| Variavel | Descricao |
|----------|-----------|
| `DB_URL` | String de conexao PostgreSQL |
| `DB_USERNAME` | Usuario do banco |
| `DB_PASSWORD` | Senha do banco |
| `API_FOOTBALL_KEY` | Chave de acesso API-Football |
| `MERCADO_PAGO_ACCESS_TOKEN` | Credenciais Mercado Pago |

**Web (`apps/web/.env.local`):**

| Variavel | Descricao |
|----------|-----------|
| `NEXT_PUBLIC_API_URL` | URL da API backend |

## Executando Localmente

### Banco de Dados

```bash
# Usando Docker
docker run -d \
  --name bolao-db \
  -e POSTGRES_USER=bolao \
  -e POSTGRES_PASSWORD=bolao123 \
  -e POSTGRES_DB=bolao \
  -p 5432:5432 \
  postgres:16
```

### Backend (API)

```bash
cd apps/api
mvn spring-boot:run
```

A API estara disponivel em `http://localhost:3001`.

### Frontend (Web)

```bash
pnpm install
pnpm dev
```

A aplicacao web estara disponivel em `http://localhost:3000`.

## Documentacao da API

### Principais Endpoints

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/api/v1/rounds` | Listar todas as rodadas |
| GET | `/api/v1/rounds/:id` | Obter detalhes da rodada |
| POST | `/api/v1/rounds/sync` | Sincronizar rodadas da API-Football |
| POST | `/api/v1/bets` | Submeter novo palpite |
| GET | `/api/v1/bets/:ticketCode` | Buscar palpite por bilhete |
| POST | `/api/v1/payments` | Gerar pagamento PIX |
| POST | `/api/v1/payments/webhook` | Webhook de pagamento |

## Documentacao dos Projetos

- [Arquitetura da API](apps/api/README.md)
- [Arquitetura do Web](apps/web/README.md)

## Licenca

Projeto privado. Todos os direitos reservados.
