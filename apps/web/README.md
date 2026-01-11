# Bolao Web

Next.js frontend for the Bolao betting pool application.

## Architecture

The project follows a feature-based architecture with shared modules.

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/             # Landing page (route group)
│   ├── apostar/            # Betting flow
│   ├── calendario/         # Calendar view
│   ├── ranking/            # Leaderboard
│   ├── regulamento/        # Rules page
│   ├── rodada/             # Round details
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── shared/                 # Shared modules
│   ├── components/         # Reusable UI components
│   ├── entities/           # TypeScript interfaces
│   ├── services/           # API client functions
│   ├── schemas/            # Zod validation schemas
│   ├── utils/              # Utility functions
│   ├── lib/                # Third-party configurations
│   ├── constants/          # Application constants
│   └── providers/          # React context providers
```

## Feature Modules

### Apostar (Betting)

The betting flow is structured with co-located components and hooks:

```
apostar/
├── page.tsx                       # Page component
├── _components/
│   ├── active-rounds/             # Available rounds list
│   │   ├── active-rounds.tsx
│   │   └── hooks/
│   │       └── use-active-rounds.ts
│   └── betting-flow/              # Betting modal flow
│       ├── betting-modal.tsx
│       ├── hooks/
│       │   ├── use-betting-form.ts
│       │   └── use-betting-modal.ts
│       └── _components/
│           ├── betting-modal-form.tsx
│           └── betting-modal-success.tsx
```

### Ranking

Leaderboard with filtering, pagination, and search:

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

## Shared Modules

### Components

Reusable UI components built with shadcn/ui:

| Component | Description |
|-----------|-------------|
| `DataTable` | Generic table with pagination and filtering |
| `Modal` | Accessible modal dialog |
| `Badge` | Status indicators |
| `Button` | Action buttons with variants |
| `Card` | Content containers |

### Entities

TypeScript interfaces matching API responses:

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

API client functions using fetch:

```typescript
export async function getRounds(): Promise<Round[]> {
  const response = await fetch(`${API_URL}/rounds`);
  return response.json();
}

export async function submitBet(data: CreateBetDto): Promise<BetResponse> {
  const response = await fetch(`${API_URL}/bets`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}
```

### Schemas

Zod schemas for form validation:

```typescript
export const bettingFormSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  predictions: z.array(predictionSchema),
});
```

## Key Patterns

### Container/Presenter Pattern

Logic is separated from presentation using custom hooks:

```typescript
// Container (hook)
function useBettingModal() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const mutation = useSubmitBet();

  return { step, setStep, mutation };
}

// Presenter (component)
function BettingModal() {
  const { step, mutation } = useBettingModal();
  return step === 'form' ? <Form /> : <Success />;
}
```

### Feature Co-location

Each feature contains its own components, hooks, and types:

```
feature/
├── page.tsx              # Route entry point
├── _components/          # Feature-specific components
│   └── component/
│       ├── component.tsx
│       └── hooks/
│           └── use-component.ts
```

### API Integration

React Query handles server state:

```typescript
function useRounds() {
  return useQuery({
    queryKey: ['rounds'],
    queryFn: getRounds,
  });
}
```

## Styling

- TailwindCSS for utility-first styling
- CSS variables for theming
- shadcn/ui for base components
- Responsive design with mobile-first approach

## Configuration

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Tailwind customization |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript settings |

## Running

```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start

# Linting
pnpm lint
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL |
