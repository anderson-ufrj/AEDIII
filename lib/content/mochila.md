---
title: "Problema da Mochila - 0-1 e Fracionária"
author: "Ricardo"
pages: 25
source: "mochila.pdf"
---

# Microsoft PowerPoint - mochila

## 📚 Pré-requisitos

Antes de estudar o Problema da Mochila, certifique-se de conhecer:

- **Algoritmos gulosos**: Estratégia de escolha local ótima
- **Programação dinâmica**: Conceitos básicos de otimização
- **Ordenação de vetores**: Ordenação por múltiplos critérios
- **Análise de complexidade**: Comparação entre abordagens

**Tempo estimado de estudo**: 2-3 horas

---



Problema da Mochila

Problema da Mochila

Um ladrão que rouba uma loja encontra n itens, onde cada item vale v reais e

pesa p quilos. O ladrão deseja levar a carga mais valiosa possível, mas consegue

levar apenas w quilos em sua mochila.

No problema da mochila 0-1, o ladrão deve levar itens inteiros. Já no problema

da mochila fracionária, o ladrão pode levar frações de um item.

## Problema da Mochila 0-1

### Dados do Problema

| Item | Valor (R$) | Peso (Kg) | Valor por Kg |
|------|------------|-----------|--------------|
| 1    | 60         | 10        | 6            |
| 2    | 100        | 20        | 5            |
| 3    | 120        | 30        | 4            |

**Peso suportado pela mochila: 50Kg**

### Processo de Resolução

Ao resolver este problema pelo método guloso considerando valor por kg, uma abordagem possível seria:

1. **Estado inicial**: Mochila vazia (0 Kg, R$0,00)
2. **Adicionar Item 1**: Como tem o maior valor por kg (6), adicionamos primeiro
   - Mochila: 10 Kg, R$60,00
3. **Adicionar Item 2**: Segundo maior valor por kg (5)
   - Mochila: 30 Kg, R$160,00 (Item 1 + Item 2)
4. **Tentar Item 3**: Não cabe! Pesa 30 Kg e só restam 20 Kg de capacidade
   - Esta solução gulosa resulta em: 30 Kg, R$160,00

**Observação importante**: Esta não é a solução ótima! Veja abaixo.

### Solução Ótima (Programação Dinâmica)

Usando técnicas mais sofisticadas (programação dinâmica ou busca completa), descobrimos que a solução ótima é diferente:

**Combinação ótima**: Item 2 + Item 3

| Item Selecionado | Valor (R$) | Peso (Kg) |
|------------------|------------|-----------|
| Item 2           | 100        | 20        |
| Item 3           | 120        | 30        |
| **TOTAL**        | **220**    | **50**    |

**Valor total: R$220,00 (capacidade completa: 50 Kg)**

**Lição importante**: O algoritmo guloso (escolher sempre o item com maior valor por kg) nem sempre encontra a solução ótima no problema da mochila 0-1. É necessário usar programação dinâmica ou outras técnicas para garantir otimalidade.

## Problema da Mochila Fracionária

### Diferença Fundamental

No problema da mochila fracionária, podemos fracionar (dividir) um item e levar apenas uma parte dele.

**Exemplo**: Se cabe apenas mais 10 Kg na mochila e temos um item que pesa 100 Kg, podemos fracionar o item de forma a colocar apenas 10% de seu peso na mochila e consequentemente aproveitar 10% de seu valor.

### Dados do Problema

Usaremos o **mesmo conjunto de dados** apresentado anteriormente na mochila 0-1:
- **3 itens** com valores, pesos e valor por kg já calculados
- **Capacidade da mochila: 50 Kg**

(Veja a tabela completa na seção "Problema da Mochila 0-1" acima)

### Processo de Resolução (Algoritmo Guloso)

Para a mochila fracionária, o algoritmo guloso **SEMPRE** encontra a solução ótima! Basta ordenar os itens por valor por kg (ordem decrescente) e pegar o máximo possível de cada um:

1. **Adicionar Item 1 completo**: Maior valor/kg (6)
   - Peso usado: 10 Kg
   - Valor acumulado: R$60,00

2. **Adicionar Item 2 completo**: Segundo maior valor/kg (5)
   - Peso usado: 10 + 20 = 30 Kg
   - Valor acumulado: R$60,00 + R$100,00 = R$160,00

3. **Adicionar FRAÇÃO do Item 3**: Restam 20 Kg de capacidade, mas o Item 3 pesa 30 Kg
   - Fração que cabe: 20/30 = 2/3 do item
   - Peso da fração: 2/3 × 30 = 20 Kg
   - Valor da fração: 2/3 × R$120,00 = R$80,00
   - Peso total: 30 + 20 = 50 Kg (capacidade completa!)
   - Valor total: R$160,00 + R$80,00 = R$240,00

### Solução Ótima

**Combinação ótima**: Item 1 (completo) + Item 2 (completo) + 2/3 do Item 3

| Item Selecionado | Valor (R$) | Peso (Kg) |
|------------------|------------|-----------|
| Item 1 (100%)    | 60         | 10        |
| Item 2 (100%)    | 100        | 20        |
| Item 3 (66.7%)   | 80         | 20        |
| **TOTAL**        | **240**    | **50**    |

**Valor total: R$240,00 (capacidade completa: 50 Kg)**

**Comparação importante**:
- Mochila 0-1: R$220,00 (não pode fracionar)
- Mochila Fracionária: R$240,00 (pode fracionar)

A possibilidade de fracionar itens permite obter R$20,00 a mais de valor!

## 💪 Exercícios Graduados

### 🟢 Nível Básico - Compreensão

**Exercício 1: Resolução Manual**
- Resolva manualmente o problema da mochila 0-1 para os seguintes dados:
  - Capacidade: 15 Kg
  - Item A: 12 reais, 4 Kg (valor/kg = 3)
  - Item B: 10 reais, 6 Kg (valor/kg = 1,67)
  - Item C: 8 reais, 5 Kg (valor/kg = 1,6)
  - Item D: 11 reais, 7 Kg (valor/kg = 1,57)
- Experimente a abordagem gulosa (por valor/kg) e encontre a solução ótima
- Demonstre por que a abordagem gulosa falha neste caso

**Exercício 2: Análise de Complexidade**
- Calcule a complexidade do algoritmo guloso para mochila fracionária
- Calcule a complexidade do algoritmo de programação dinâmica para mochila 0-1
- Explique por que existe essa diferença de complexidade

### 🟡 Nível Intermediário - Implementação

**Exercício 3: Mochila Fracionária (Algoritmo Guloso)**
Implemente um programa completo que resolva o problema da mochila fracionária:
- Leia n itens (valor e peso de cada um)
- Leia a capacidade da mochila
- **Ordene** os itens por valor/kg (ordem decrescente)
- Aplique o algoritmo guloso
- Exiba: valor máximo, peso total usado, lista de itens com suas frações

**Exercício 4: Mochila 0-1 (Programação Dinâmica)**
Implemente o algoritmo de programação dinâmica para mochila 0-1:
- Use uma tabela DP[i][w] onde:
  - i = número de itens considerados (0 a n)
  - w = capacidade considerada (0 a W)
- Implemente a reconstrução da solução (quais itens foram selecionados)
- Teste com o exemplo do material (3 itens, 50 Kg)

**Exercício 5: Comparação Experimental**
Implemente AMBAS as soluções (0-1 e fracionária) e compare:
- Use o mesmo conjunto de 10 itens aleatórios
- Meça o tempo de execução para n=10, 50, 100, 200 itens
- Compare os valores obtidos (quanto a mais a fracionária consegue?)
- Plote gráficos: tempo × n e diferença_valor × n

### 🔴 Nível Avançado - Variações e Otimizações

**Exercício 6: Mochila com Múltiplas Instâncias**
Variação: cada item pode ser colocado múltiplas vezes (mochila ilimitada)
- Adapte o algoritmo de programação dinâmica
- Equação de recorrência diferente: DP[w] = max(DP[w], DP[w-peso[i]] + valor[i])
- Implemente e teste
- Mostre um caso onde a solução ótima usa o mesmo item várias vezes

**Exercício 7: Mochila 2D (Duas Restrições)**
Problema: agora a mochila tem limite de peso E limite de volume
- Item i tem: valor[i], peso[i], volume[i]
- Mochila tem: capacidade_peso W, capacidade_volume V
- Use DP[i][w][v] tridimensional
- Otimize para usar apenas duas dimensões (espaço O(W×V) ao invés de O(n×W×V))

**Exercício 8: Branch and Bound para Mochila 0-1**
Implemente uma solução usando Branch and Bound:
- Use limite superior calculado com solução fracionária
- Implemente poda de ramos não promissores
- Compare eficiência com programação dinâmica para n=20, 50, 100

### 🎯 Projeto Integrador

**Sistema de Otimização de Carga**

Crie um sistema completo de otimização de carga para uma empresa de transportes:

**Funcionalidades**:
1. **Entrada de dados**:
   - Cadastro de itens (nome, valor, peso, volume, fragilidade)
   - Múltiplas mochilas/caminhões com capacidades diferentes
2. **Resolver múltiplas variantes**:
   - Mochila 0-1 clássica
   - Mochila fracionária (carga divisível como grãos, líquidos)
   - Mochila 2D (peso e volume)
   - Múltiplas mochilas (alocar itens em diferentes caminhões)
3. **Restrições adicionais**:
   - Itens frágeis não podem ficar no fundo
   - Alguns itens devem ir juntos (dependências)
   - Priorização por prazo de entrega
4. **Saída**:
   - Visualização gráfica da carga em cada caminhão
   - Relatório de otimização (valor total, % de capacidade usada)
   - Comparação entre diferentes estratégias

**Critérios de avaliação**:
- Corretude dos algoritmos implementados
- Interface clara e intuitiva
- Tratamento de casos especiais (sem solução viável, empates)
- Documentação e testes
- Criatividade nas extensões implementadas