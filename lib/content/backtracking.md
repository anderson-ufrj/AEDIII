---
title: "Backtracking - Técnicas de Busca Exaustiva"
author: "Ricardo"
pages: 15
source: "backtracking.pdf"
---

# Microsoft PowerPoint - backtracking

## 📚 Pré-requisitos

Antes de estudar Backtracking, você deve dominar:

- **Recursão**: Chamadas recursivas, casos base, pilha de execução
- **Estruturas de dados básicas**: Arrays multidimensionais (matrizes)
- **Lógica de programação**: Condicionais, loops
- **Conceito de espaço de busca**: Árvore de decisões

**Tempo estimado de estudo**: 3-4 horas

---



Backtracking

Backtracking

Um algoritmo de backtracking começa com uma solução vazia e amplia a solução passo a passo. A pesquisa recursivamente passa por todas as formas diferentes de como uma solução pode ser construída.

Sudoku

![Imagem 1](/images/backtracking_p3_img0.jpeg)

Sudoku

```c
#include <bits/stdc++.h>

// UNASSIGNED é usado por células vazias
#define UNASSIGNED 0

// N é usado para o tamanho do Sudoku. Será NxN
#define N 9

// Esta função encontra uma entrada no Sudoku que não foi numerada
bool FindUnassignedLocation(int grid[N][N], int &row, int &col);

// Checa se é permitido colocar um determinado número na célula encontrada
bool isSafe(int grid[N][N], int row, int col, int num);
```

```c
/* Faz um preenchimento, para atribuir valores para todas as células não numeradas, verificando os requisitos para solução do Sudoku (não duplicação nas linhas, colunas e matrizes 3x3) */
bool SolveSudoku(int grid[N][N])
{
    int row, col;

    // Se não há célula vazia, sucesso!
    if (!FindUnassignedLocation(grid, row, col))
        return true; // successo!

    // considerando dígitos de 1 a 9
    for (int num = 1; num <= 9; num++)
    {
        // if looks promising
        if (isSafe(grid, row, col, num))
        {
            // faz tentativa de preenchimento
            grid[row][col] = num;

            // retorna, se deu certo, prossiga!
            if (SolveSudoku(grid))
                return true;

            // falha, desfaz a inserção e tenta novamente
            grid[row][col] = UNASSIGNED;
        }
    }

    return false; // isto engatilha o backtracking
}
```

```c
/* Procura uma célula que não foi preenchida. Se for encontrada, linha e coluna são retornadas nos ponteiros */
bool FindUnassignedLocation(int grid[N][N], int &row, int &col)
{
    for (row = 0; row < N; row++)
        for (col = 0; col < N; col++)
            if (grid[row][col] == UNASSIGNED)
                return true;

    return false;
}
```

```c
// Retorna um booleano que indica se um número já foi utilizado em uma linha específica
bool UsedInRow(int grid[N][N], int row, int num)
{
    for (int col = 0; col < N; col++)
        if (grid[row][col] == num)
            return true;

    return false;
}

// Retorna um booleano que indica se um número já foi utilizado em uma coluna específica
bool UsedInCol(int grid[N][N], int col, int num)
{
    for (int row = 0; row < N; row++)
        if (grid[row][col] == num)
            return true;

    return false;
}

// Retorna um booleano que indica se um número já foi utilizado em uma matriz 3x3 específica
bool UsedInBox(int grid[N][N], int boxStartRow, int boxStartCol, int num)
{
    for (int row = 0; row < 3; row++)
        for (int col = 0; col < 3; col++)
            if (grid[row+boxStartRow][col+boxStartCol] == num)
                return true;

    return false;
}
```

```c
/* Retorna um booleano que indica se será permitido colocar um número em uma determinada célula */
bool isSafe(int grid[N][N], int row, int col, int num)
{
    /* Checa se num já não está na linha definida, na coluna definida ou na matriz 3x3 correspondente */
    return !UsedInRow(grid, row, num) &&
           !UsedInCol(grid, col, num) &&
           !UsedInBox(grid, row - row%3 , col - col%3, num);
}
```

```c
/* Função para imprimir a matriz toda */
void printGrid(int grid[N][N])
{
    for (int row = 0; row < N; row++)
    {
        for (int col = 0; col < N; col++)
            printf("%2d", grid[row][col]);
        printf("\n");
    }
}
```

```c
int main()
{
    // 0 significa células não numeradas
    int grid[N][N] = {{3, 0, 6, 5, 0, 8, 4, 0, 0},
                      {5, 2, 0, 0, 0, 0, 0, 0, 0},
                      {0, 8, 7, 0, 0, 0, 0, 3, 1},
                      {0, 0, 3, 0, 1, 0, 0, 8, 0},
                      {9, 0, 0, 8, 6, 3, 0, 0, 5},
                      {0, 5, 0, 0, 9, 0, 6, 0, 0},
                      {1, 3, 0, 0, 0, 0, 2, 5, 0},
                      {0, 0, 0, 0, 0, 0, 0, 7, 4},
                      {0, 0, 5, 2, 0, 6, 3, 0, 0}};

    if (SolveSudoku(grid) == true)
        printGrid(grid);
    else
        printf("No solution exists");

    return 0;
}
```

Problema das N-Rainhas

Como exemplo, considere o problema de calcular o número de maneiras em que as rainhas podem ser colocadas em um xadrez n × n para que nenhuma rainha se ataque. Por exemplo, quando n = 4, existem duas soluções possíveis:

um algoritmo de backtracking começa com uma solução vazia e amplia a solução passo a passo. A pesquisa recursivamente passa por todas as formas diferentes de como uma solução pode ser construída.

Backtracking

Como exemplo, considere o problema de calcular o número de maneiras em que as rainhas podem ser colocadas em um xadrez n × n para que nenhuma rainha se ataque. Por exemplo, quando n = 4, existem duas soluções possíveis:

![Imagem 1](/images/backtracking_p11_img0.jpeg)

Backtracking

O problema pode ser resolvido usando backtracking colocando rainhas na linha da placa por linha. Mais precisamente, exatamente uma rainha será colocada em cada linha para que nenhuma rainha ataque qualquer das rainhas colocadas antes. Uma solução é encontrada quando todas as n rainhas foram colocadas na placa.

Por exemplo, quando n = 4, algumas soluções parciais geradas pelo algoritmo de backtracking são as seguintes:

Backtracking

![Imagem 1](/images/backtracking_p13_img0.jpeg)

![Imagem 2](/images/backtracking_p13_img1.jpeg)

![Imagem 3](/images/backtracking_p13_img2.jpeg)

Backtracking

No nível inferior, as três primeiras configurações são ilegais, porque as rainhas se atacam. No entanto, a quarta configuração é válida e pode ser estendida para uma solução completa colocando mais duas rainhas na placa. Existe apenas uma maneira de colocar as duas rainhas restantes.

## 💪 Exercícios Graduados

### 🟢 Nível Básico - Compreensão

**Exercício 1: Análise do Sudoku**
- Dado o código de resolução de Sudoku apresentado, trace manualmente a execução para uma grade 4x4 parcialmente preenchida
- Identifique quantas chamadas recursivas são feitas
- Desenhe a árvore de decisões para as primeiras 3 células vazias

**Exercício 2: Validação de Soluções**
- Implemente apenas as funções auxiliares de validação do Sudoku (`UsedInRow`, `UsedInCol`, `UsedInBox`)
- Teste com diferentes configurações válidas e inválidas
- Calcule a complexidade de cada função

### 🟡 Nível Intermediário - Implementação

**Exercício 3: N-Rainhas Completo**
- Implemente a solução completa para o problema das N-Rainhas usando backtracking
- Sua implementação deve:
  - Funcionar para qualquer valor de N (4 ≤ N ≤ 12)
  - Exibir todas as soluções possíveis (não apenas a primeira)
  - Contar o número total de soluções encontradas
  - Imprimir o tabuleiro de forma visualmente clara (use 'Q' para rainha e '.' para vazio)

**Exercício 4: Sudoku 9x9**
- Implemente um resolvedor de Sudoku 9x9 completo baseado no código apresentado
- Adicione validação de entrada para garantir que a grade inicial é válida
- Teste com pelo menos 3 grades diferentes (fácil, médio, difícil)
- Meça e compare o tempo de execução para cada dificuldade

### 🔴 Nível Avançado - Otimização e Extensão

**Exercício 5: Coloração de Grafos**
- Adapte a técnica de backtracking para resolver o problema de coloração de grafos
- Dado um grafo G = (V, E) e K cores, determine se é possível colorir todos os vértices usando no máximo K cores de forma que vértices adjacentes tenham cores diferentes
- Implemente e teste com grafos de diferentes tamanhos
- Encontre o número cromático (mínimo de cores necessárias) para um grafo dado

**Exercício 6: Otimização com Poda**
- Melhore o algoritmo das N-Rainhas implementando técnicas de poda:
  - **Poda por simetria**: Elimine soluções simétricas
  - **Heurística**: Tente primeiro as colunas com menos ataques possíveis
  - Compare o desempenho (número de chamadas recursivas) entre a versão básica e otimizada para N=8, N=10, N=12

**Exercício 7: Labirinto com Backtracking**
- Crie um programa que encontre TODOS os caminhos possíveis em um labirinto usando backtracking
- O labirinto é representado por uma matriz onde:
  - 0 = caminho livre
  - 1 = parede
  - S = início (start)
  - E = fim (end)
- Implemente movimento em 4 direções (cima, baixo, esquerda, direita)
- Encontre o caminho mais curto entre os possíveis
- **Desafio extra**: Adicione movimento em 8 direções (incluindo diagonais)

### 🎯 Projeto Integrador

**Sudoku Interativo**
Crie um jogo de Sudoku completo com:
1. Geração automática de puzzles válidos (use backtracking para gerar solução completa, depois remova números)
2. Validação em tempo real da entrada do usuário
3. Sistema de dicas (revela um número correto)
4. Solver automático usando backtracking
5. Diferentes níveis de dificuldade (controle quantos números iniciais são fornecidos)

**Critérios de avaliação**:
- Corretude das soluções geradas
- Interface amigável (pode ser linha de comando ou gráfica)
- Eficiência do algoritmo
- Qualidade do código (organização, comentários, modularização)
