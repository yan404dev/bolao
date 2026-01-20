# Arena de Elite - API 🚀

API REST Spring Boot para a plataforma Arena de Elite.

> 📚 Para documentação geral do projeto, veja o [README principal](../../README.md).
>
> 💬 [Entre na comunidade no WhatsApp](https://chat.whatsapp.com/K6Ni8HK72Bw2us79Erk0t6)

## 🏗️ Arquitetura

O projeto segue princípios de Clean Architecture com estrutura modular organizada por domínio.

```
src/main/java/com/bolao/
├── bet/                    # Domínio de palpites
│   ├── entities/           # Entidades de domínio (Bet, Prediction)
│   ├── repositories/       # Camada de acesso a dados
│   ├── usecases/           # Lógica de negócio
│   ├── listeners/          # Handlers de eventos
│   ├── schedulers/         # Jobs em background
│   └── BetController.java  # Endpoints HTTP
├── payment/                # Domínio de pagamentos
│   ├── entities/           # Payment, PaymentStatus
│   ├── repositories/       # Acesso a dados
│   ├── usecases/           # GeneratePayment, HandleWebhook
│   ├── events/             # Eventos de domínio
│   └── PaymentController.java
├── round/                  # Domínio de rodadas
│   ├── entities/           # Round, Match
│   ├── repositories/       # Acesso a dados
│   ├── usecases/           # ProcessResults, SyncRounds
│   ├── services/           # RoundPricing, RoundStats
│   └── RoundController.java
├── fixture/                # Integração com API externa
│   ├── services/           # Cliente API-Football
│   └── dtos/               # DTOs da API externa
├── shared/                 # Recursos compartilhados
│   ├── entities/           # FailedEventEntity (DLQ)
│   ├── repositories/       # Repositórios compartilhados
│   ├── services/           # FailedEventService
│   ├── config/             # Configuração Spring
│   └── exceptions/         # Tratamento global de exceções
└── BolaoApiApplication.java
```

## 📦 Módulos de Domínio

### Bet (Palpites)

Gerencia submissão de palpites, confirmação de pagamento e pontuação.

| Componente | Responsabilidade |
|------------|------------------|
| `SubmitBetUseCase` | Cria novo palpite com previsões |
| `ConfirmBetPaymentUseCase` | Atualiza status do palpite após pagamento |
| `CancelLatePendingBetsUseCase` | Cancela palpites não pagos após início da rodada |
| `BetPaymentListener` | Reage ao PaymentApprovedEvent |
| `PaymentRetryScheduler` | Retenta confirmações de pagamento falhas |

### Payment (Pagamentos)

Gerencia geração de pagamento PIX e processamento de webhooks.

| Componente | Responsabilidade |
|------------|------------------|
| `GeneratePaymentUseCase` | Cria pagamento PIX via Mercado Pago |
| `HandlePaymentWebhookUseCase` | Processa atualizações de status de pagamento |
| `PaymentProvider` | Interface para gateways de pagamento |
| `MercadoPagoPaymentProvider` | Implementação Mercado Pago |
| `MockPaymentProvider` | Mock para desenvolvimento |

### Round (Rodadas)

Gerencia rodadas e sincronização de dados de partidas.

| Componente | Responsabilidade |
|------------|------------------|
| `SyncRoundsUseCase` | Importa rodadas da API-Football |
| `ProcessRoundResultsUseCase` | Calcula pontos após partidas |
| `RoundPricingService` | Precificação dinâmica de bilhetes |
| `RoundStatsService` | Estatísticas e KPIs da rodada |

## 🔧 Padrões Principais

### Padrão Use Case

Cada operação de negócio é encapsulada em uma classe de use case dedicada:

```java
@Service
@RequiredArgsConstructor
public class SubmitBetUseCase {
    private final BetRepository betRepository;
    private final RoundRepository roundRepository;

    @Transactional
    public BetResponseDto execute(CreateBetDto request) {
        // Lógica de negócio aqui
    }
}
```

### Padrão Repository

Repositórios de domínio abstraem o acesso a dados com interfaces limpas:

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
Após 5 tentativas -> Move para status DEAD
```

### Arquitetura Orientada a Eventos

Eventos de domínio desacoplam módulos:

```java
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
public void onPaymentApproved(PaymentApprovedEvent event) {
    confirmBetPaymentUseCase.execute(event.getBetId(), event.getPaidAt());
}
```

## 🗄️ Banco de Dados

### Migrations

O schema do banco é gerenciado com Flyway:

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

## ⚙️ Configuração

| Propriedade | Descrição | Padrão |
|-------------|-----------|--------|
| `server.port` | Porta da API | 3001 |
| `spring.datasource.url` | URL PostgreSQL | localhost:5432/bolao |
| `spring.jpa.hibernate.ddl-auto` | Gerenciamento de schema | validate |
| `spring.flyway.enabled` | Habilitar migrations | true |

## 🚀 Executando

```bash
# Desenvolvimento
mvn spring-boot:run

# Build de produção
mvn clean package -DskipTests
java -jar target/api-0.1.0.jar
```

## 🧪 Testes

```bash
mvn test
```

## 🤝 Contribuindo

Quer contribuir com a API? Veja o [Guia de Contribuição](../../CONTRIBUTING.md) no repositório principal.

---

Feito com ❤️ pela comunidade Arena de Elite
