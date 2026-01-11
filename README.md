# Bolao

A full-stack betting pool application for football match predictions. Users can place bets on match scores, and the system automatically calculates points and rankings when matches are completed.

## Project Structure

This is a monorepo managed with [Turborepo](https://turbo.build/repo) and [pnpm workspaces](https://pnpm.io/workspaces).

```
bolao/
├── apps/
│   ├── api/          # Spring Boot REST API (Java 21)
│   └── web/          # Next.js Frontend (React 19)
├── turbo.json        # Turborepo configuration
└── pnpm-workspace.yaml
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, TailwindCSS, shadcn/ui |
| Backend | Spring Boot 3.4, Java 21, Spring Data JPA |
| Database | PostgreSQL 16 |
| Migrations | Flyway |
| Payment | Mercado Pago PIX |
| External API | API-Football |

## Prerequisites

- Node.js 20+
- pnpm 9+
- Java 21
- Maven 3.9+
- PostgreSQL 16
- Docker (optional)

## Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Configure the variables in `.env`:

| Variable | Description |
|----------|-------------|
| `DB_URL` | PostgreSQL connection string |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `API_FOOTBALL_KEY` | API-Football access key |
| `MERCADO_PAGO_ACCESS_TOKEN` | Mercado Pago credentials |

## Running Locally

### Database

```bash
# Using Docker
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

The API will be available at `http://localhost:3001`.

### Frontend (Web)

```bash
pnpm install
pnpm dev
```

The web application will be available at `http://localhost:3000`.

## API Documentation

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/rounds` | List all rounds |
| GET | `/api/v1/rounds/:id` | Get round details |
| POST | `/api/v1/rounds/sync` | Sync rounds from API-Football |
| POST | `/api/v1/bets` | Submit a new bet |
| GET | `/api/v1/bets/:ticketCode` | Get bet by ticket |
| POST | `/api/v1/payments` | Generate PIX payment |
| POST | `/api/v1/payments/webhook` | Payment webhook |

## Project Documentation

- [API Architecture](apps/api/README.md)
- [Web Architecture](apps/web/README.md)

## License

Private project. All rights reserved.
