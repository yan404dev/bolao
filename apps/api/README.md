# Bolao API

Spring Boot REST API for the Bolao betting pool application.

## Architecture

The project follows Clean Architecture principles with a modular structure organized by domain.

```
src/main/java/com/bolao/
├── bet/                    # Bet domain
│   ├── entities/           # Domain entities (Bet, Prediction)
│   ├── repositories/       # Data access layer
│   ├── usecases/           # Business logic
│   ├── listeners/          # Event handlers
│   ├── schedulers/         # Background jobs
│   └── BetController.java  # HTTP endpoints
├── payment/                # Payment domain
│   ├── entities/           # Payment, PaymentStatus
│   ├── repositories/       # Data access
│   ├── usecases/           # GeneratePayment, HandleWebhook
│   ├── events/             # Domain events
│   └── PaymentController.java
├── round/                  # Round domain
│   ├── entities/           # Round, Match
│   ├── repositories/       # Data access
│   ├── usecases/           # ProcessResults, SyncRounds
│   ├── services/           # RoundPricing, RoundStats
│   └── RoundController.java
├── fixture/                # External API integration
│   ├── services/           # API-Football client
│   └── dtos/               # External API DTOs
├── shared/                 # Cross-cutting concerns
│   ├── entities/           # FailedEventEntity (DLQ)
│   ├── repositories/       # Shared repositories
│   ├── services/           # FailedEventService
│   ├── config/             # Spring configuration
│   └── exceptions/         # Global exception handling
└── BolaoApiApplication.java
```

## Domain Modules

### Bet

Handles bet submission, payment confirmation, and scoring.

| Component | Responsibility |
|-----------|----------------|
| `SubmitBetUseCase` | Creates new bet with predictions |
| `ConfirmBetPaymentUseCase` | Updates bet status after payment |
| `CancelLatePendingBetsUseCase` | Cancels unpaid bets after round starts |
| `BetPaymentListener` | Reacts to PaymentApprovedEvent |
| `PaymentRetryScheduler` | Retries failed payment confirmations |

### Payment

Manages PIX payment generation and webhook processing.

| Component | Responsibility |
|-----------|----------------|
| `GeneratePaymentUseCase` | Creates PIX payment via Mercado Pago |
| `HandlePaymentWebhookUseCase` | Processes payment status updates |
| `PaymentProvider` | Interface for payment gateways |
| `MercadoPagoPaymentProvider` | Mercado Pago implementation |
| `MockPaymentProvider` | Development mock |

### Round

Manages betting rounds and match data synchronization.

| Component | Responsibility |
|-----------|----------------|
| `SyncRoundsUseCase` | Imports rounds from API-Football |
| `ProcessRoundResultsUseCase` | Calculates points after matches |
| `RoundPricingService` | Dynamic ticket pricing |
| `RoundStatsService` | Round statistics and KPIs |

## Key Patterns

### Use Case Pattern

Each business operation is encapsulated in a dedicated use case class:

```java
@Service
@RequiredArgsConstructor
public class SubmitBetUseCase {
    private final BetRepository betRepository;
    private final RoundRepository roundRepository;

    @Transactional
    public BetResponseDto execute(CreateBetDto request) {
        // Business logic here
    }
}
```

### Repository Pattern

Domain repositories abstract data access with clean interfaces:

```java
public interface BetRepository {
    Bet save(Bet bet);
    Optional<Bet> findById(Long id);
    List<Bet> findByRoundId(Long roundId);
}
```

### Dead Letter Queue

Failed event processing uses a database-backed retry mechanism:

```
Event fails -> Persisted to failed_events table
                      |
Scheduler runs every 60s -> Finds pending retries
                      |
Retry with exponential backoff (1min, 2min, 4min...)
                      |
After 5 attempts -> Moves to DEAD status
```

### Event-Driven Architecture

Domain events decouple modules:

```java
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
public void onPaymentApproved(PaymentApprovedEvent event) {
    confirmBetPaymentUseCase.execute(event.getBetId(), event.getPaidAt());
}
```

## Database

### Migrations

Database schema is managed with Flyway:

```
src/main/resources/db/migration/
├── V1__create_rounds_table.sql
├── V2__create_matches_table.sql
├── V3__create_bets_table.sql
├── V4__create_predictions_table.sql
├── V5__create_payments_table.sql
└── V6__create_failed_events_table.sql
```

### Entity Relationship

```
rounds (1) ─── (N) matches
   │
   └──── (N) bets (1) ─── (N) predictions
              │
              └──── (1) payments
```

## Configuration

| Property | Description | Default |
|----------|-------------|---------|
| `server.port` | API port | 3001 |
| `spring.datasource.url` | PostgreSQL URL | localhost:5432/bolao |
| `spring.jpa.hibernate.ddl-auto` | Schema management | validate |
| `spring.flyway.enabled` | Enable migrations | true |

## Running

```bash
# Development
mvn spring-boot:run

# Production build
mvn clean package -DskipTests
java -jar target/api-0.1.0.jar
```

## Testing

```bash
mvn test
```
