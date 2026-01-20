# Arena de Elite - Web 🌐

Frontend Next.js para a plataforma Arena de Elite.

> 📚 Para documentação geral do projeto, veja o [README principal](../../README.md).
>
> 💬 [Entre na comunidade no WhatsApp](https://chat.whatsapp.com/K6Ni8HK72Bw2us79Erk0t6)

## 🏗️ Arquitetura

O projeto segue uma arquitetura baseada em features com módulos compartilhados.

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/             # Página inicial (route group)
│   ├── apostar/            # Fluxo de palpites
│   ├── calendario/         # Visualização de calendário
│   ├── ranking/            # Classificação
│   ├── regulamento/        # Página de regras
│   ├── rodada/             # Detalhes da rodada
│   ├── layout.tsx          # Layout raiz
│   └── globals.css         # Estilos globais
├── shared/                 # Módulos compartilhados
│   ├── components/         # Componentes reutilizáveis
│   ├── entities/           # Interfaces TypeScript
│   ├── services/           # Funções cliente API
│   ├── schemas/            # Schemas de validação Zod
│   ├── utils/              # Funções utilitárias
│   ├── lib/                # Configurações de terceiros
│   ├── constants/          # Constantes da aplicação
│   └── providers/          # Providers de contexto React
```

## 📦 Módulos de Feature

### Apostar

O fluxo de palpites é estruturado com componentes e hooks co-localizados:

```
apostar/
├── page.tsx                       # Componente da página
├── _components/
│   ├── active-rounds/             # Lista de rodadas disponíveis
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

Classificação com filtragem, paginação e busca:

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

## 🧩 Módulos Compartilhados

### Components

Componentes de UI reutilizáveis construídos com shadcn/ui:

| Componente | Descrição |
|------------|-----------|
| `DataTable` | Tabela genérica com paginação e filtragem |
| `Modal` | Dialog modal acessível |
| `Badge` | Indicadores de status |
| `Button` | Botões de ação com variantes |
| `Card` | Containers de conteúdo |

### Entities

Interfaces TypeScript correspondentes às respostas da API:

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

Schemas Zod para validação de formulários:

```typescript
export const bettingFormSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  predictions: z.array(predictionSchema),
});
```

## 🔧 Padrões Principais

### Padrão Container/Presenter

Lógica é separada da apresentação usando hooks customizados:

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

### Co-localização de Features

Cada feature contém seus próprios componentes, hooks e tipos:

```
feature/
├── page.tsx              # Ponto de entrada da rota
├── _components/          # Componentes específicos da feature
│   └── component/
│       ├── component.tsx
│       └── hooks/
│           └── use-component.ts
```

### Integração com API

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

## 🎨 Estilização

- **TailwindCSS** para estilização utility-first
- **Variáveis CSS** para temas
- **shadcn/ui** para componentes base
- **Design responsivo** com abordagem mobile-first

## ⚙️ Configuração

| Arquivo | Propósito |
|---------|-----------|
| `tailwind.config.ts` | Customização do Tailwind |
| `next.config.ts` | Configuração do Next.js |
| `tsconfig.json` | Configurações TypeScript |

## 🚀 Executando

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build
pnpm start

# Linting
pnpm lint
```

## 🔐 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_API_URL` | URL da API backend |

## 🤝 Contribuindo

Quer contribuir com o frontend? Veja o [Guia de Contribuição](../../CONTRIBUTING.md) no repositório principal.

---

Feito com ❤️ pela comunidade Arena de Elite
