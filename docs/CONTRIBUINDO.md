# Guia de Contribuição

Obrigado por considerar contribuir com o projeto AED III! Este documento fornece diretrizes para contribuir de forma efetiva.

## Código de Conduta

### Nossos Compromissos

- Manter um ambiente respeitoso e inclusivo
- Aceitar feedback construtivo com profissionalismo
- Focar no que é melhor para a comunidade educacional
- Demonstrar empatia com outros contribuidores

## Como Contribuir

### Reportando Bugs

Antes de criar uma issue de bug:

1. **Verifique se o bug já foi reportado** nas [Issues existentes](../../issues)
2. **Colete informações**:
   - Versão do navegador
   - Sistema operacional
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots se aplicável

Template para reportar bugs:

```markdown
**Descrição do Bug**
Descrição clara e concisa do problema.

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '....'
3. Role até '....'
4. Veja o erro

**Comportamento Esperado**
Descrição do que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente**
 - OS: [ex. Windows 11]
 - Navegador: [ex. Chrome 120]
 - Versão: [ex. 1.0.0]
```

### Sugerindo Melhorias

Issues para sugestões devem incluir:

- **Título claro** descrevendo a melhoria
- **Descrição detalhada** do recurso proposto
- **Casos de uso** - por que isso é útil?
- **Exemplos** de como funcionaria
- **Alternativas consideradas**

### Pull Requests

#### Fluxo de Trabalho

1. **Fork o projeto**
2. **Clone seu fork**:
   ```bash
   git clone https://github.com/seu-usuario/AEDIII.git
   cd AEDIII
   ```

3. **Crie uma branch** seguindo a convenção:
   ```bash
   # Para novas funcionalidades
   git checkout -b funcionalidade/nome-da-funcionalidade

   # Para correções de bugs
   git checkout -b correcao/nome-do-bug

   # Para documentação
   git checkout -b docs/o-que-foi-documentado
   ```

4. **Faça suas alterações** seguindo os padrões do projeto

5. **Teste suas mudanças**:
   ```bash
   npm test
   npm run build
   ```

6. **Commit suas alterações** seguindo os padrões:
   ```bash
   git commit -m "tipo(escopo): descrição curta

   Descrição mais detalhada se necessário

   Fixes #123"
   ```

7. **Push para seu fork**:
   ```bash
   git push origin funcionalidade/nome-da-funcionalidade
   ```

8. **Abra um Pull Request** no repositório original

#### Padrões de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

**Formato**: `tipo(escopo): descrição`

**Tipos**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc.
- `refactor`: Refatoração de código
- `perf`: Melhorias de performance
- `test`: Adição ou correção de testes
- `chore`: Atualização de dependências, config, etc.
- `a11y`: Melhorias de acessibilidade

**Exemplos**:
```bash
feat(compiler): adicionar suporte para C++17
fix(pdf-viewer): corrigir zoom em dispositivos móveis
docs(readme): atualizar instruções de instalação
perf(images): otimizar carregamento com lazy loading
a11y(navigation): adicionar navegação por teclado
```

#### Checklist do Pull Request

Antes de enviar, verifique:

- [ ] O código segue os padrões do projeto
- [ ] Comentários foram adicionados onde necessário
- [ ] Documentação foi atualizada (README, JSDoc, etc.)
- [ ] Testes foram adicionados/atualizados
- [ ] Todos os testes estão passando
- [ ] Build de produção funciona sem erros
- [ ] Mensagens de commit seguem o padrão
- [ ] Branch está atualizada com main

## Padrões de Código

### TypeScript

```typescript
// ✅ Bom: Interface descritiva com JSDoc
/**
 * Representa um conteúdo do curso
 */
interface CourseContent {
  slug: string;
  title: string;
  content: string;
}

// ❌ Ruim: Any type
const data: any = {};

// ✅ Bom: Type específico
const data: CourseContent = { ... };
```

### React Components

```typescript
// ✅ Bom: Componente funcional com types
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
}

// ❌ Ruim: Sem types
export function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Nomenclatura

- **Componentes**: PascalCase (`ContentCard`, `PDFViewer`)
- **Funções**: camelCase (`getContentBySlug`, `formatDate`)
- **Constantes**: UPPER_SNAKE_CASE (`CACHE_TTL`, `API_URL`)
- **Arquivos**: kebab-case (`content-loader.ts`, `use-keyboard-navigation.ts`)
- **Variáveis**: camelCase (`userName`, `isLoading`)

### Estrutura de Arquivos

```
components/
├── component-name.tsx        # Componente principal
├── component-name.test.tsx   # Testes
└── component-name.module.css # Estilos (se necessário)

lib/
├── hooks/
│   └── use-hook-name.ts      # Hooks customizados
├── utils/
│   └── utility-name.ts       # Funções utilitárias
└── constants/
    └── constant-group.ts     # Constantes
```

## Testes

### Escrevendo Testes

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentName } from './component-name';

describe('ComponentName', () => {
  it('deve renderizar corretamente', () => {
    render(<ComponentName />);
    expect(screen.getByText('Texto esperado')).toBeInTheDocument();
  });

  it('deve chamar callback quando clicado', async () => {
    const onClick = vi.fn();
    render(<ComponentName onClick={onClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Rodando Testes

```bash
# Modo watch (recomendado durante desenvolvimento)
npm test

# Executar uma vez
npm run test:run

# Com interface visual
npm run test:ui

# Com cobertura
npm run test:coverage
```

## Documentação

### JSDoc

Documente funções públicas e tipos complexos:

```typescript
/**
 * Calcula as dimensões responsivas de uma imagem
 *
 * @param originalWidth - Largura original da imagem
 * @param originalHeight - Altura original da imagem
 * @param maxWidth - Largura máxima desejada
 * @returns Objeto com width e height calculados
 *
 * @example
 * ```ts
 * const dims = calculateDimensions(1920, 1080, 800);
 * // { width: 800, height: 450 }
 * ```
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number
): { width: number; height: number } {
  // implementação
}
```

### Comentários

```typescript
// ✅ Bom: Explica o "porquê"
// Usamos setTimeout para evitar race condition com o PDF.js
setTimeout(() => renderPDF(), 100);

// ❌ Ruim: Explica o óbvio
// Define variável como true
const isActive = true;
```

## Acessibilidade

Toda contribuição deve manter/melhorar a acessibilidade:

- **Labels ARIA** em elementos interativos
- **Navegação por teclado** funcional
- **Contraste** seguindo WCAG AA
- **Foco visível** em todos elementos
- **Textos alternativos** em imagens

## Performance

Considere performance em suas contribuições:

- Use `useMemo` e `useCallback` quando apropriado
- Implemente lazy loading para componentes pesados
- Otimize imagens antes de commit
- Evite re-renders desnecessários
- Teste em conexões lentas

## Perguntas?

- Abra uma [Discussion](../../discussions) para perguntas gerais
- Use [Issues](../../issues) para bugs e sugestões específicas
- Consulte o [CLAUDE.md](../CLAUDE.md) para detalhes de arquitetura

---

**Obrigado por contribuir! 🚀**

Desenvolvido com ❤️ para IFSULDEMINAS
