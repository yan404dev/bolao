# Bolao Web

Frontend Next.js para a aplicacao de bolao.

## Arquitetura

O projeto segue uma arquitetura baseada em features com modulos compartilhados.

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/             # Pagina inicial (route group)
│   ├── apostar/            # Fluxo de palpites
│   ├── calendario/         # Visualizacao de calendario
│   ├── ranking/            # Classificacao
│   ├── regulamento/        # Pagina de regras
│   ├── rodada/             # Detalhes da rodada
│   ├── layout.tsx          # Layout raiz
│   └── globals.css         # Estilos globais
├── shared/                 # Modulos compartilhados
│   ├── components/         # Componentes reutilizaveis
│   ├── entities/           # Interfaces TypeScript
│   ├── services/           # Funcoes cliente API
│   ├── schemas/            # Schemas de validacao Zod
│   ├── utils/              # Funcoes utilitarias
│   ├── lib/                # Configuracoes de terceiros
│   ├── constants/          # Constantes da aplicacao
│   └── providers/          # Providers de contexto React
```

## Modulos de Feature

### Apostar

O fluxo de palpites e estruturado com componentes e hooks co-localizados:

```
apostar/
├── page.tsx                       # Componente da pagina
├── _components/
│   ├── active-rounds/             # Lista de rodadas disponiveis
│   │   ├── active-rounds.tsx
│   │   └── hooks/
│   │       └── use-active-rounds.ts
│   └── betting-flow/              # Fluxo do modal de palpites
│       ├── betting-modal.tsx
│       ├── hooks/
│       │   ├── use-betting-form.ts
│       │   └── use-betting-modal.ts
│       └── _components/
│           ├── betting-modal-form.tsx
│           └── betting-modal-success.tsx
```

### Ranking

Classificacao com filtragem, paginacao e busca:

```
ranking/
├── page.tsx
├── _components/
│   ├── ranking-table/
│   │   ├── ranking-table.tsx
│   │   ├── columns.tsx
│   │   └── hooks/
│   │       └── use-ranking-table.ts
│   └── closed-rounds/
│       └── closed-rounds.tsx
```

## Modulos Compartilhados

### Components

Componentes de UI reutilizaveis construidos com shadcn/ui:

| Componente | Descricao |
|------------|-----------|
| `DataTable` | Tabela generica com paginacao e filtragem |
| `Modal` | Dialog modal acessivel |
| `Badge` | Indicadores de status |
| `Button` | Botoes de acao com variantes |
| `Card` | Containers de conteudo |

### Entities

Interfaces TypeScript correspondentes as respostas da API:

```typescript
interface Round {
  id: number;
  title: string;
  status: 'OPEN' | 'CLOSED' | 'CALCULATED';
  matches: Match[];
  ticketPrice: number;
  prizePool: number;
}

interface Bet {
  id: number;
  ticketCode: string;
  name: string;
  predictions: Prediction[];
  status: 'PENDING' | 'PAID' | 'CANCELLED';
}
```

### Services

Cliente de API usando Axios com service objects:

```typescript
// shared/lib/api.ts - Instância Axios configurada
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// shared/services/round.service.ts
export const roundService = {
  getAll: async (filters?: RoundFilters): Promise<RoundEntity[]> => {
    const { data } = await api.get<{ data: RoundEntity[] }>("/rounds", {
      params: filters,
    });
    return data.data;
  },

  getById: async (roundId: number): Promise<RoundEntity> => {
    const { data } = await api.get<{ data: RoundEntity }>(`/rounds/${roundId}`);
    return data.data;
  },

  getActiveRound: async (): Promise<RoundEntity | null> => {
    const rounds = await roundService.getAll({ status: "OPEN" });
    return rounds.length > 0 ? rounds[0] : null;
  },
};

// shared/services/bet.service.ts
export const betService = {
  create: async (payload: CreateBetPayload): Promise<CreateBetResponse> => {
    const { data } = await api.post<{ data: CreateBetResponse }>("/bets", payload);
    return data.data;
  },

  getByTicketCode: async (ticketCode: string): Promise<BetEntity> => {
    const { data } = await api.get<{ data: BetEntity }>(`/bets/code/${ticketCode}`);
    return data.data;
  },
};
```

### Schemas

Schemas Zod para validacao de formularios:

```typescript
export const bettingFormSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  predictions: z.array(predictionSchema),
});
```

## Padroes Principais

### Padrao Container/Presenter

Logica e separada da apresentacao usando hooks customizados:

```typescript
// Container (hook)
function useBettingModal() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const mutation = useSubmitBet();

  return { step, setStep, mutation };
}

// Presenter (componente)
function BettingModal() {
  const { step, mutation } = useBettingModal();
  return step === 'form' ? <Form /> : <Success />;
}
```

### Co-localizacao de Features

Cada feature contem seus proprios componentes, hooks e tipos:

```
feature/
├── page.tsx              # Ponto de entrada da rota
├── _components/          # Componentes especificos da feature
│   └── component/
│       ├── component.tsx
│       └── hooks/
│           └── use-component.ts
```

### Integracao com API

React Query gerencia o estado do servidor usando os service objects:

```typescript
import { roundService } from "@/shared/services/round.service";

function useRounds(filters?: RoundFilters) {
  return useQuery({
    queryKey: ['rounds', filters],
    queryFn: () => roundService.getAll(filters),
  });
}

function useActiveRound() {
  return useQuery({
    queryKey: ['rounds', 'active'],
    queryFn: () => roundService.getActiveRound(),
  });
}
```

## Estilizacao

- TailwindCSS para estilizacao utility-first
- Variaveis CSS para temas
- shadcn/ui para componentes base
- Design responsivo com abordagem mobile-first

## Configuracao

| Arquivo | Proposito |
|---------|-----------|
| `tailwind.config.ts` | Customizacao do Tailwind |
| `next.config.ts` | Configuracao do Next.js |
| `tsconfig.json` | Configuracoes TypeScript |

## Executando

```bash
# Desenvolvimento
pnpm dev

# Build de producao
pnpm build
pnpm start

# Linting
pnpm lint
```

## Variaveis de Ambiente

| Variavel | Descricao |
|----------|-----------|
| `NEXT_PUBLIC_API_URL` | URL da API backend |
