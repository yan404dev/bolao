# Bolao API

API REST Spring Boot para a aplicacao de bolao.

## Arquitetura

O projeto segue principios de Clean Architecture com estrutura modular organizada por dominio.

```
src/main/java/com/bolao/
├── bet/                    # Dominio de apostas
│   ├── entities/           # Entidades de dominio (Bet, Prediction)
│   ├── repositories/       # Camada de acesso a dados
│   ├── usecases/           # Logica de negocio
│   ├── listeners/          # Handlers de eventos
│   ├── schedulers/         # Jobs em background
│   └── BetController.java  # Endpoints HTTP
├── payment/                # Dominio de pagamentos
│   ├── entities/           # Payment, PaymentStatus
│   ├── repositories/       # Acesso a dados
│   ├── usecases/           # GeneratePayment, HandleWebhook
│   ├── events/             # Eventos de dominio
│   └── PaymentController.java
├── round/                  # Dominio de rodadas
│   ├── entities/           # Round, Match
│   ├── repositories/       # Acesso a dados
│   ├── usecases/           # ProcessResults, SyncRounds
│   ├── services/           # RoundPricing, RoundStats
│   └── RoundController.java
├── fixture/                # Integracao com API externa
│   ├── services/           # Cliente API-Football
│   └── dtos/               # DTOs da API externa
├── shared/                 # Recursos compartilhados
│   ├── entities/           # FailedEventEntity (DLQ)
│   ├── repositories/       # Repositorios compartilhados
│   ├── services/           # FailedEventService
│   ├── config/             # Configuracao Spring
│   └── exceptions/         # Tratamento global de excecoes
└── BolaoApiApplication.java
```

## Modulos de Dominio

### Bet (Apostas)

Gerencia submissao de apostas, confirmacao de pagamento e pontuacao.

| Componente | Responsabilidade |
|------------|------------------|
| `SubmitBetUseCase` | Cria nova aposta com palpites |
| `ConfirmBetPaymentUseCase` | Atualiza status da aposta apos pagamento |
| `CancelLatePendingBetsUseCase` | Cancela apostas nao pagas apos inicio da rodada |
| `BetPaymentListener` | Reage ao PaymentApprovedEvent |
| `PaymentRetryScheduler` | Retenta confirmacoes de pagamento falhas |

### Payment (Pagamentos)

Gerencia geracao de pagamento PIX e processamento de webhooks.

| Componente | Responsabilidade |
|------------|------------------|
| `GeneratePaymentUseCase` | Cria pagamento PIX via Mercado Pago |
| `HandlePaymentWebhookUseCase` | Processa atualizacoes de status de pagamento |
| `PaymentProvider` | Interface para gateways de pagamento |
| `MercadoPagoPaymentProvider` | Implementacao Mercado Pago |
| `MockPaymentProvider` | Mock para desenvolvimento |

### Round (Rodadas)

Gerencia rodadas de apostas e sincronizacao de dados de partidas.

| Componente | Responsabilidade |
|------------|------------------|
| `SyncRoundsUseCase` | Importa rodadas da API-Football |
| `ProcessRoundResultsUseCase` | Calcula pontos apos partidas |
| `RoundPricingService` | Precificacao dinamica de bilhetes |
| `RoundStatsService` | Estatisticas e KPIs da rodada |

## Padroes Principais

### Padrao Use Case

Cada operacao de negocio e encapsulada em uma classe de use case dedicada:

```java
@Service
@RequiredArgsConstructor
public class SubmitBetUseCase {
    private final BetRepository betRepository;
    private final RoundRepository roundRepository;

    @Transactional
    public BetResponseDto execute(CreateBetDto request) {
        // Logica de negocio aqui
    }
}
```

### Padrao Repository

Repositorios de dominio abstraem o acesso a dados com interfaces limpas:

```java
public interface BetRepository {
    Bet save(Bet bet);
    Optional<Bet> findById(Long id);
    List<Bet> findByRoundId(Long roundId);
}
```

### Dead Letter Queue

O processamento de eventos falhos usa um mecanismo de retry baseado em banco de dados:

```
Evento falha -> Persiste na tabela failed_events
                      |
Scheduler executa a cada 60s -> Busca retries pendentes
                      |
Retry com exponential backoff (1min, 2min, 4min...)
                      |
Apos 5 tentativas -> Move para status DEAD
```

### Arquitetura Orientada a Eventos

Eventos de dominio desacoplam modulos:

```java
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
public void onPaymentApproved(PaymentApprovedEvent event) {
    confirmBetPaymentUseCase.execute(event.getBetId(), event.getPaidAt());
}
```

## Banco de Dados

### Migrations

O schema do banco e gerenciado com Flyway:

```
src/main/resources/db/migration/
├── V1__create_rounds_table.sql
├── V2__create_matches_table.sql
├── V3__create_bets_table.sql
├── V4__create_predictions_table.sql
├── V5__create_payments_table.sql
└── V6__create_failed_events_table.sql
```

### Relacionamento de Entidades

```
rounds (1) ─── (N) matches
   │
   └──── (N) bets (1) ─── (N) predictions
              │
              └──── (1) payments
```

## Configuracao

| Propriedade | Descricao | Padrao |
|-------------|-----------|--------|
| `server.port` | Porta da API | 3001 |
| `spring.datasource.url` | URL PostgreSQL | localhost:5432/bolao |
| `spring.jpa.hibernate.ddl-auto` | Gerenciamento de schema | validate |
| `spring.flyway.enabled` | Habilitar migrations | true |

## Executando

```bash
# Desenvolvimento
mvn spring-boot:run

# Build de producao
mvn clean package -DskipTests
java -jar target/api-0.1.0.jar
```

## Testes

```bash
mvn test
```
