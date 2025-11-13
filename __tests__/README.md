# Testes

Este projeto usa **Vitest** e **Testing Library** para testes automatizados.

## Executando Testes

```bash
# Modo interativo (watch mode)
npm test

# Executar uma vez
npm run test:run

# Interface visual
npm run test:ui

# Com coverage
npm run test:coverage
```

## Estrutura de Testes

- `__tests__/` - Testes unitários e de componentes
- `vitest.config.ts` - Configuração do Vitest
- `vitest.setup.ts` - Setup global dos testes

## Escrevendo Testes

### Teste de Componente

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/my-component';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Teste de Função

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/lib/my-function';

describe('myFunction', () => {
  it('should return expected value', () => {
    expect(myFunction(1, 2)).toBe(3);
  });
});
```

## Convenções

- Arquivos de teste devem ter extensão `.test.ts` ou `.test.tsx`
- Use `describe` para agrupar testes relacionados
- Use nomes descritivos para os testes
- Teste casos de sucesso e falha
- Mantenha os testes simples e focados
