---
title: "Compactação de Arquivos - Técnicas e Algoritmos"
author: "Prof. Ricardo José Martins"
pages: 17
source: "008_-_Compactacao_de_Arquivos.pdf"
---

# Compactação de Arquivos

## Introdução

Compactadores de arquivos são softwares especializados em gerar uma representação mais eficiente de vários arquivos dentro de um único arquivo de modo que ocupem menos espaço na mídia de armazenamento ou o tempo de transferência deles sobre uma rede seja reduzido.

Os compactadores foram muito utilizados no passado quando as mídias de armazenamento tinham preços elevados e era necessário economizar espaço para armazenamento. Atualmente o uso deles é mais voltado a transferência de arquivos pela Internet para reduzir a massa de dados a ser transferida pela rede.

## Run-Length Encoding (RLE)

Run-length (ou RLE) é uma técnica para comprimir cadeias de caracteres onde existem sequências longas de caracteres repetidos.

O princípio do funcionamento dessa codificação é simples: Quando temos a ocorrência de uma repetição contínua de determinado caractere, por exemplo, AAAAAAAAAAAA, é possível substituir sua representação pelo par (12, A). Entretanto não podemos simplesmente substituir no meio do texto a seqüencia de letras pelo número, senão uma frase como:

**Exemplo original:**
```
all is too well.
```

**Se tornaria:**
```
a2l is t2o we2l.
```

Como identificar se o número 2 estava realmente presente no texto original ou foi introduzido pela codificação? Neste caso precisamos identificar o início da codificação por um caractere especial. Assim, se usarmos por exemplo o símbolo de "@" como caractere especial, teremos:

```
a@2l is t@2o we@2l.
```

E conseguimos identificar exatamente onde o número 2 realmente existe na frase, e onde ele é parte da codificação. Entretanto, a cadeia ao invés de ser comprimida, foi na verdade expandida. Usando um caractere de escape a seqüencia mínima que podemos codificar sem causar expansão do arquivo precisa ter tamanho 3. Além disso o caractere especial não pode ser um dos caracteres que ocorrem dentro do texto.

### Protocolo MNP5

Uma solução alternativa para o caractere de escape foi usada pelo protocolo MNP5, usado por fabricantes de modems. Nesse protocolo, ao invés de um caractere de escape, sempre que encontra uma repetição de 3 ou mais caracteres o codificador escreve os 3 primeiros caracteres repetidos no arquivo de saída, seguidos do número de repetições (além das 3 que já foram).

**Exemplos:**
- 3 caracteres "a" em sequência → `aaa0`
- 4 caracteres "b" → `bbb1`

Repare que ainda assim existe um risco de expansão, mas ela é ligeiramente menor (e mais rara) do que no caso do caractere de escape.

### RLE em Imagens

Na compressão de imagens esta técnica é mais promissora pois imagens apresentam maiores áreas contínuas de uma mesma cor. Desenhos e outras imagens com número limitados de cores tendem a ser melhor comprimíveis usando esta técnica.

Uma abordagem interessante é a usada na compressão de imagens monocromáticas. Nessas imagens cada pixel é representado por apenas um bit. Assim o arquivo pode ser armazenado como uma lista dos tamanhos das sequências alternadamente de pixels brancos (1) e negros (0), sem precisar indicar qual o valor da próxima seqüencia.

Caso o primeiro pixel não seja da cor branca (1), o primeiro valor armazenado é 0, indicando uma seqüencia de tamanho 0 de pixels brancos.

## Run-Length Bit a Bit

Se a quantidade de valores forem bem definidas em um arquivo, podemos compactar o arquivo armazenando em apenas alguns bits ao invés de um byte todo.

**Exemplo:** Imagine um arquivo apenas com as letras a, b, c e d. Como são apenas quatro valores, apenas dois bits são capazes de diferenciar uma informação da outra:
- a (00)
- b (01)
- c (10)
- d (11)

**Texto original:**
```
accaaddaadba
```

**Associações binárias:**
```
00 10 10 00    00 11 11 00    00 11 01 00
```

**Convertendo para inteiro:**
```
40 60 52
```

**Finalmente para ASCII:**
```
(<4
```

Ou seja, o texto foi reduzido de 12 para 3 caracteres.

### Exercícios

1. Implemente um compactador e um descompactador para o exemplo definido acima.

2. Implemente um compactador e um descompactador para um arquivo que possui 8 dígitos diferentes: a, b, c, d, e, f, g e h.

## Compressão Estatística

Baseia-se no uso de uma representação otimizada de caracteres ou grupos de caracteres afim de reduzir o tamanho dos dados. Caracteres de maior freqüência de ocorrência são representados por códigos binários pequenos, e os de menor freqüência são representados por códigos proporcionalmente maiores.

**Principais algoritmos:**
- Algoritmo de Huffman
- Algoritmo de Shannon-Fano

## Algoritmo de Huffman

### Passos do Algoritmo

1. **Tabela de probabilidades:** Necessita-se de uma tabela com a probabilidade de ocorrência de cada caractere.

2. **Geração da árvore binária:** Aplicação de um algoritmo para geração dos códigos otimizados de cada caractere através de uma árvore binária.

3. **Ordenação:** Ordena-se a tabela de ocorrências (ordem crescente).

4. **Construção da árvore:**
   - Retira-se da lista os dois caracteres de menor probabilidade
   - Estes formarão um novo ramo cuja probabilidade será a soma dos mesmos
   - Insere-se este novo caractere ordenadamente na lista
   - Volta-se ao primeiro passo até que reste somente um elemento na lista, cuja probabilidade seja 1

### Exemplo de Codificação

Para se montar o código, gera-se "0" cada vez que for para a esquerda e "1" cada vez que for para a direita na árvore.

**Características:**
- Comprimento variável
- Códigos mais curtos para caracteres mais frequentes
- Códigos mais longos para caracteres menos frequentes

## Algoritmo de Shannon-Fano

A forma desta técnica tem muitas semelhanças com a de Huffman. Necessita-se de uma tabela com a probabilidade de ocorrência de cada caractere, e de um procedimento para a codificação em binário.

Por outro lado, o procedimento para a codificação, diferentemente de Huffman, baseia-se na divisão de conjuntos de probabilidades para a obtenção do código binário.

### Procedimento

1. **Divisão de grupos:** Divide-se a tabela em dois grupos cuja soma de probabilidades seja igual ou semelhante.

2. **Atribuição de códigos:**
   - O primeiro grupo recebe como primeiro valor de código o binário 0
   - O segundo recebe 1

3. **Recursão:** Repetimos o procedimento anterior, dividindo em dois subgrupos de probabilidades equivalentes.

4. **Finalização:** O processo se repete até que não haja mais grupos a dividir.

### Diferenças entre Huffman e Shannon-Fano

- **Huffman:** Constrói a árvore de baixo para cima (dos menores para os maiores)
- **Shannon-Fano:** Divide recursivamente de cima para baixo

Ambos produzem códigos de comprimento variável, mas Huffman geralmente produz códigos mais eficientes.
