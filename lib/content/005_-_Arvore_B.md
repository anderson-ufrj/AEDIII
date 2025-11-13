---
title: "AED III Árvores B"
author: ""
pages: 77
source: "005_-_Arvore_B.pdf"
---

# AED III Árvores B


## Página 1

AED III

Árvores B

Ciência da Computação – IFSULDEMINAS

Primeiro Semestre de 2014

## Página 2

Roteiro

1

Introdução

2

Inserção em árvore B

3

Remoção em árvore B

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

2 / 33

## Página 3

Árvores B

Estrutura de dados projetada para funcionar especialmente em

memória secundária (como disco magnético).

Semelhante a árvore rubro negra, mas são melhores para minimizar

operações de entrada e saída em disco.

Muito empregada em aplicações que necessitam manipular grandes

quantidades de informação tais como um banco de dados ou um

sistema de arquivos.

Diferente das árvores binárias, cada nó pode ter muitos ﬁlhos, isto é,

o grau de um nó pode ser muito grande.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

3 / 33

## Página 4

Árvores B

Estrutura de dados projetada para funcionar especialmente em

memória secundária (como disco magnético).

Semelhante a árvore rubro negra, mas são melhores para minimizar

operações de entrada e saída em disco.

Muito empregada em aplicações que necessitam manipular grandes

quantidades de informação tais como um banco de dados ou um

sistema de arquivos.

Diferente das árvores binárias, cada nó pode ter muitos ﬁlhos, isto é,

o grau de um nó pode ser muito grande.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

3 / 33

## Página 5

Árvores B

Estrutura de dados projetada para funcionar especialmente em

memória secundária (como disco magnético).

Semelhante a árvore rubro negra, mas são melhores para minimizar

operações de entrada e saída em disco.

Muito empregada em aplicações que necessitam manipular grandes

quantidades de informação tais como um banco de dados ou um

sistema de arquivos.

Diferente das árvores binárias, cada nó pode ter muitos ﬁlhos, isto é,

o grau de um nó pode ser muito grande.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

3 / 33

## Página 6

Árvores B

Estrutura de dados projetada para funcionar especialmente em

memória secundária (como disco magnético).

Semelhante a árvore rubro negra, mas são melhores para minimizar

operações de entrada e saída em disco.

Muito empregada em aplicações que necessitam manipular grandes

quantidades de informação tais como um banco de dados ou um

sistema de arquivos.

Diferente das árvores binárias, cada nó pode ter muitos ﬁlhos, isto é,

o grau de um nó pode ser muito grande.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

3 / 33

## Página 7

Árvores B

Nó

n: número de chaves armazenadas em um nó.

chaves: chaves do nó em ordem crescente.

ﬁlhos ponteiros para os ﬁlhos.

folha: valor booleano que indica se o nó é uma folha.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

4 / 33

## Página 8

Árvores B

Uma árvore B de ordem mínima t é uma árvore de grau mínimo t:

Características

Em um nó as chaves estão ordenadas.

Todas as folhas estão no mesmo nível.

Número de ﬁlhos:

◮De t a 2 * t ﬁlhos.

◮Raiz: de 2 a m ﬁlhos.

Número de chaves:

◮De t - 1 a 2 + t - 1 chaves.

◮Raiz: de 1 a m - 1 chaves.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

5 / 33

## Página 9

Árvores B

Uma árvore B de ordem mínima t é uma árvore de grau mínimo t:

Características

Em um nó as chaves estão ordenadas.

Todas as folhas estão no mesmo nível.

Número de ﬁlhos:

◮De t a 2 * t ﬁlhos.

◮Raiz: de 2 a m ﬁlhos.

Número de chaves:

◮De t - 1 a 2 + t - 1 chaves.

◮Raiz: de 1 a m - 1 chaves.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

5 / 33

## Página 10

Árvores B

Uma árvore B de ordem mínima t é uma árvore de grau mínimo t:

Características

Em um nó as chaves estão ordenadas.

Todas as folhas estão no mesmo nível.

Número de ﬁlhos:

◮De t a 2 * t ﬁlhos.

◮Raiz: de 2 a m ﬁlhos.

Número de chaves:

◮De t - 1 a 2 + t - 1 chaves.

◮Raiz: de 1 a m - 1 chaves.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

5 / 33

## Página 11

Árvores B

Uma árvore B de ordem mínima t é uma árvore de grau mínimo t:

Características

Em um nó as chaves estão ordenadas.

Todas as folhas estão no mesmo nível.

Número de ﬁlhos:

◮De t a 2 * t ﬁlhos.

◮Raiz: de 2 a m ﬁlhos.

Número de chaves:

◮De t - 1 a 2 + t - 1 chaves.

◮Raiz: de 1 a m - 1 chaves.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

5 / 33

## Página 12

Árvores B

Uma árvore B de ordem mínima t é uma árvore de grau mínimo t:

Características

Em um nó as chaves estão ordenadas.

Todas as folhas estão no mesmo nível.

Número de ﬁlhos:

◮De t a 2 * t ﬁlhos.

◮Raiz: de 2 a m ﬁlhos.

Número de chaves:

◮De t - 1 a 2 + t - 1 chaves.

◮Raiz: de 1 a m - 1 chaves.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

5 / 33

## Página 13

Inserindo em uma árvore B

Inserção

Tente inserir a nova chave em um folha.

Se o número de chaves do nó exceder o número de chaves permitidas,

divida a folha em duas, promovendo a chave central para o pai da

folha.

Se o número de chaves do nó pai exceder o número de chaves

permitidas, divida o nó pai em dois, promovendo a chave central para

o ancestral do pai.

Esta estratégia pode ser repetida por todo caminho até o topo.

Se necessário, a raiz é dividida em dois nós, tornando a chave central

em raiz. Se isto acontecer o nível da árvore aumenta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 33

## Página 14

Inserindo em uma árvore B

Inserção

Tente inserir a nova chave em um folha.

Se o número de chaves do nó exceder o número de chaves permitidas,

divida a folha em duas, promovendo a chave central para o pai da

folha.

Se o número de chaves do nó pai exceder o número de chaves

permitidas, divida o nó pai em dois, promovendo a chave central para

o ancestral do pai.

Esta estratégia pode ser repetida por todo caminho até o topo.

Se necessário, a raiz é dividida em dois nós, tornando a chave central

em raiz. Se isto acontecer o nível da árvore aumenta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 33

## Página 15

Inserindo em uma árvore B

Inserção

Tente inserir a nova chave em um folha.

Se o número de chaves do nó exceder o número de chaves permitidas,

divida a folha em duas, promovendo a chave central para o pai da

folha.

Se o número de chaves do nó pai exceder o número de chaves

permitidas, divida o nó pai em dois, promovendo a chave central para

o ancestral do pai.

Esta estratégia pode ser repetida por todo caminho até o topo.

Se necessário, a raiz é dividida em dois nós, tornando a chave central

em raiz. Se isto acontecer o nível da árvore aumenta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 33

## Página 16

Inserindo em uma árvore B

Inserção

Tente inserir a nova chave em um folha.

Se o número de chaves do nó exceder o número de chaves permitidas,

divida a folha em duas, promovendo a chave central para o pai da

folha.

Se o número de chaves do nó pai exceder o número de chaves

permitidas, divida o nó pai em dois, promovendo a chave central para

o ancestral do pai.

Esta estratégia pode ser repetida por todo caminho até o topo.

Se necessário, a raiz é dividida em dois nós, tornando a chave central

em raiz. Se isto acontecer o nível da árvore aumenta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 33

## Página 17

Inserindo em uma árvore B

Inserção

Tente inserir a nova chave em um folha.

Se o número de chaves do nó exceder o número de chaves permitidas,

divida a folha em duas, promovendo a chave central para o pai da

folha.

Se o número de chaves do nó pai exceder o número de chaves

permitidas, divida o nó pai em dois, promovendo a chave central para

o ancestral do pai.

Esta estratégia pode ser repetida por todo caminho até o topo.

Se necessário, a raiz é dividida em dois nós, tornando a chave central

em raiz. Se isto acontecer o nível da árvore aumenta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 33

## Página 18

Árvores B

Árvore B de grau mínimo 3:

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

7 / 33

![Imagem 1](../images/005_-_Arvore_B_p18_img0.jpeg)


## Página 19

Construindo uma árvores B

Suponha que nós começamos com uma árvore B vazia e as chaves

chegam na seguinte ordem: 1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52,

16, 48, 68, 3, 26, 29, 53, 55, 45, 70, 24, 5 e 56.

Nós queremos construir uma árvore B de garu mínimo 3.

Os cinco primeiras chaves vão para a raiz:

Colocar a sexta chave na raiz viola o número máximo de chaves por

nó.

Assim, quando 6 chega, pegamos a chave do meio para fazer a nova

raiz.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

8 / 33

## Página 20

Construindo uma árvores B

Suponha que nós começamos com uma árvore B vazia e as chaves

chegam na seguinte ordem: 1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52,

16, 48, 68, 3, 26, 29, 53, 55, 45, 70, 24, 5 e 56.

Nós queremos construir uma árvore B de garu mínimo 3.

Os cinco primeiras chaves vão para a raiz:

Colocar a sexta chave na raiz viola o número máximo de chaves por

nó.

Assim, quando 6 chega, pegamos a chave do meio para fazer a nova

raiz.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

8 / 33

## Página 21

Construindo uma árvores B

Suponha que nós começamos com uma árvore B vazia e as chaves

chegam na seguinte ordem: 1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52,

16, 48, 68, 3, 26, 29, 53, 55, 45, 70, 24, 5 e 56.

Nós queremos construir uma árvore B de garu mínimo 3.

Os cinco primeiras chaves vão para a raiz:

Colocar a sexta chave na raiz viola o número máximo de chaves por

nó.

Assim, quando 6 chega, pegamos a chave do meio para fazer a nova

raiz.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

8 / 33

## Página 22

Construindo uma árvores B

Suponha que nós começamos com uma árvore B vazia e as chaves

chegam na seguinte ordem: 1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52,

16, 48, 68, 3, 26, 29, 53, 55, 45, 70, 24, 5 e 56.

Nós queremos construir uma árvore B de garu mínimo 3.

Os cinco primeiras chaves vão para a raiz:

Colocar a sexta chave na raiz viola o número máximo de chaves por

nó.

Assim, quando 6 chega, pegamos a chave do meio para fazer a nova

raiz.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

8 / 33

## Página 23

Construindo uma árvores B

Suponha que nós começamos com uma árvore B vazia e as chaves

chegam na seguinte ordem: 1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52,

16, 48, 68, 3, 26, 29, 53, 55, 45, 70, 24, 5 e 56.

Nós queremos construir uma árvore B de garu mínimo 3.

Os cinco primeiras chaves vão para a raiz:

Colocar a sexta chave na raiz viola o número máximo de chaves por

nó.

Assim, quando 6 chega, pegamos a chave do meio para fazer a nova

raiz.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

8 / 33

## Página 24

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 6 à árvore.

A insersão de 6 excede a ordem da árvore, promovemos a chave

mediana.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

9 / 33

## Página 25

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 6 à árvore.

A insersão de 6 excede a ordem da árvore, promovemos a chave

mediana.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

9 / 33

## Página 26

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 6 à árvore.

A insersão de 6 excede a ordem da árvore, promovemos a chave

mediana.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

9 / 33

## Página 27

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 14, 28, 17 e 7 à árvore.

Adicionando a chave 52 à folha direita, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

10 / 33

## Página 28

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 14, 28, 17 e 7 à árvore.

Adicionando a chave 52 à folha direita, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

10 / 33

## Página 29

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 14, 28, 17 e 7 à árvore.

Adicionando a chave 52 à folha direita, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

10 / 33

## Página 30

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 14, 28, 17 e 7 à árvore.

Adicionando a chave 52 à folha direita, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

10 / 33

## Página 31

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 14, 28, 17 e 7 à árvore.

Adicionando a chave 52 à folha direita, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

10 / 33

## Página 32

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 16, 48, 68 e 3 à árvore.

Adicionando a chave 26 à folha esquerda, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

11 / 33

## Página 33

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 16, 48, 68 e 3 à árvore.

Adicionando a chave 26 à folha esquerda, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

11 / 33

## Página 34

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 16, 48, 68 e 3 à árvore.

Adicionando a chave 26 à folha esquerda, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

11 / 33

## Página 35

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 16, 48, 68 e 3 à árvore.

Adicionando a chave 26 à folha esquerda, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

11 / 33

## Página 36

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 16, 48, 68 e 3 à árvore.

Adicionando a chave 26 à folha esquerda, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

11 / 33

## Página 37

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 26, 29, 53, 55, 45 e 70 à árvore.

Adicionando a chave 24 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

12 / 33

## Página 38

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 26, 29, 53, 55, 45 e 70 à árvore.

Adicionando a chave 24 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

12 / 33

## Página 39

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 26, 29, 53, 55, 45 e 70 à árvore.

Adicionando a chave 24 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

12 / 33

## Página 40

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 26, 29, 53, 55, 45 e 70 à árvore.

Adicionando a chave 24 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

12 / 33

## Página 41

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando 26, 29, 53, 55, 45 e 70 à árvore.

Adicionando a chave 24 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

12 / 33

## Página 42

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando a chave 5 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

Adicionando a chave 56 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

A inserção fez com que a altura da árvore aumentasse.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

13 / 33

## Página 43

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando a chave 5 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

Adicionando a chave 56 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

A inserção fez com que a altura da árvore aumentasse.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

13 / 33

## Página 44

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando a chave 5 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

Adicionando a chave 56 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

A inserção fez com que a altura da árvore aumentasse.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

13 / 33

## Página 45

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando a chave 5 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

Adicionando a chave 56 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

A inserção fez com que a altura da árvore aumentasse.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

13 / 33

## Página 46

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando a chave 5 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

Adicionando a chave 56 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

A inserção fez com que a altura da árvore aumentasse.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

13 / 33

## Página 47

Construindo uma árvores B

1, 12, 8, 2, 25, 6, 14, 28, 17, 7, 52, 16, 48, 68, 3, 26, 29, 53,

55, 45, 70, 24, 5 e 56.

Adicionando a chave 5 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

Adicionando a chave 56 à folha, teríamos excesso de chaves.

Promovemos o nó mediano.

A inserção fez com que a altura da árvore aumentasse.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

13 / 33

## Página 48

Aplicação

1 Insira as seguintes chaves em uma árvore B de grau mínimo 3: 3, 7,

9, 23, 45, 1, 5, 14, 25, 24, 13, 11, 8, 19, 4, 31, 35, 56, 15, 60, 16, 20

e 22.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

14 / 33

## Página 49

Split

Função responsável por dividir um nó cheio.

A função recebe como parâmetros x e i:

◮x: nó interno não cheio.

◮i: índice de um ﬁlho de x, tal que x.ﬁlhos[i] é um nó cheio.

A função reparte o ﬁlho de x em dois e ajusta x de forma que ele

tenha uma chave adicional.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

15 / 33

## Página 50

Split

Função responsável por dividir um nó cheio.

A função recebe como parâmetros x e i:

◮x: nó interno não cheio.

◮i: índice de um ﬁlho de x, tal que x.ﬁlhos[i] é um nó cheio.

A função reparte o ﬁlho de x em dois e ajusta x de forma que ele

tenha uma chave adicional.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

15 / 33

## Página 51

Split

Função responsável por dividir um nó cheio.

A função recebe como parâmetros x e i:

◮x: nó interno não cheio.

◮i: índice de um ﬁlho de x, tal que x.ﬁlhos[i] é um nó cheio.

A função reparte o ﬁlho de x em dois e ajusta x de forma que ele

tenha uma chave adicional.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

15 / 33

## Página 52

Split

Função responsável por dividir um nó cheio.

A função recebe como parâmetros x e i:

◮x: nó interno não cheio.

◮i: índice de um ﬁlho de x, tal que x.ﬁlhos[i] é um nó cheio.

A função reparte o ﬁlho de x em dois e ajusta x de forma que ele

tenha uma chave adicional.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

15 / 33

## Página 53

Split

B-TREE-SPLIT(x, i) {

z = ALLOCATE-NODE();

y = x.filhos[i];

// filho de x

z.folha = y.folha;

// z folha, se y folha

z.n = t - 1;

// z tem o mínimo de chaves

for j = 1 to t - 1

// copia chaves de y para z

z.chaves[j] = y.chaves[j + t];

if not y.folha

for j = 1 to t

// copia filhos de y para z

z.filhos[j] = y.filhos[j + t];

y.n = t - 1;

// y tem o mínimo de chaves

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

16 / 33

## Página 54

Split

for j = x.n + 1 downto i + 1

// desloca filhos de x

x.filhos[j + 1] = x.filhos[j];

x.filhos[i + 1] = z;

// faz x apontar para z

for j = x.n downto i

// desloca chaves de x

x.chaves[j + 1] = x.chaves[j];

x.chaves[i] = y.chaves[t];

// inclui nova chave em x

x.n = x.n + 1;

DISK-WRITE(y);

DISK-WRITE(z);

DISK-WRITE(x);

}

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

17 / 33

## Página 55

Inserção

A função de inserção recebe a raiz da árvore, T, e a chave a ser

inserida, k.

B-TREE-INSERT(T, k) {

r = T;

if r.n == 2t -1

// raiz cheia

s = ALLOCATE-NODE();

T = s;

s.folha = false;

s.n = 0;

s.filhos[1] = r;

B-TREE-SPLIT(s, 1);

B-TREE-INSERT-NONFULL(s, k);

else

B-TREE-INSERT-NONFULL(r, k);

}

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

18 / 33

## Página 56

Inserção

A função auxiliar de inserção recebe um nó x e a chave k a ser

inserida.

A inserção é feita nas folhas. Assim, a função percorre a árvore (de

forma recursiva) até encontrar uma folha para a inserção.

B-TREE-INSERT-NONFULL(x, k) {

i = x.n;

if x.folha

// desloca chaves do nó para abrir espaço

while i >= 1 e k < x.chaves[i]

x.chaves[i + 1] = x.chaves[i];

i = i - 1;

// insere a nova chave

x.chaves[i + 1] = k;

x.n = x.n + 1;

DISK-WRITE(x);

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

19 / 33

## Página 57

Inserção

A função auxiliar de inserção recebe um nó x e a chave k a ser

inserida.

A inserção é feita nas folhas. Assim, a função percorre a árvore (de

forma recursiva) até encontrar uma folha para a inserção.

B-TREE-INSERT-NONFULL(x, k) {

i = x.n;

if x.folha

// desloca chaves do nó para abrir espaço

while i >= 1 e k < x.chaves[i]

x.chaves[i + 1] = x.chaves[i];

i = i - 1;

// insere a nova chave

x.chaves[i + 1] = k;

x.n = x.n + 1;

DISK-WRITE(x);

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

19 / 33

## Página 58

Inserção

A função auxiliar de inserção recebe um nó x e a chave k a ser

inserida.

A inserção é feita nas folhas. Assim, a função percorre a árvore (de

forma recursiva) até encontrar uma folha para a inserção.

B-TREE-INSERT-NONFULL(x, k) {

i = x.n;

if x.folha

// desloca chaves do nó para abrir espaço

while i >= 1 e k < x.chaves[i]

x.chaves[i + 1] = x.chaves[i];

i = i - 1;

// insere a nova chave

x.chaves[i + 1] = k;

x.n = x.n + 1;

DISK-WRITE(x);

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

19 / 33

## Página 59

Inserção

A função auxiliar de inserção recebe um nó x e a chave k a ser

inserida.

A inserção é feita nas folhas. Assim, a função percorre a árvore (de

forma recursiva) até encontrar uma folha para a inserção.

B-TREE-INSERT-NONFULL(x, k) {

i = x.n;

if x.folha

// desloca chaves do nó para abrir espaço

while i >= 1 e k < x.chaves[i]

x.chaves[i + 1] = x.chaves[i];

i = i - 1;

// insere a nova chave

x.chaves[i + 1] = k;

x.n = x.n + 1;

DISK-WRITE(x);

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

19 / 33

## Página 60

Inserção

else

// encontra filho para inserção

while i >= 1 e k < x.chaves[i]

i = i - 1;

i = i + 1;

DISK-READ(x.filhos[i]);

// se nó do filho estiver cheio

if x.filhos[i].n == 2t - 1

B-TREE-SPLIT(x, i);

// define o nó da inserção

if k > x.chaves[i]

i = i + 1;

B-TREE-INSERT-NONFULL(x.filhos[i], k);

}

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

20 / 33

## Página 61

Remoção

Durante a inserção, a nova chave é inserida sempre em um nó folha.

Para a exclusão temos quatro casos possíveis:

◮Caso 1: Se a chave a ser removida está em um nó folha e removê-la

não faz com que o nó ﬁque com menos que o número mínimo de

chaves permitidas, podemos remover a chave.

◮Caso 2: Se a chave a ser removida não está em uma folha então é

garantido que seu antecessor ou sucessor está em uma folha. Neste

caso, podemos excluir a chave e promover a chave antecessora ou

sucessora para a posição da chave removida.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

21 / 33

## Página 62

Remoção

Durante a inserção, a nova chave é inserida sempre em um nó folha.

Para a exclusão temos quatro casos possíveis:

◮Caso 1: Se a chave a ser removida está em um nó folha e removê-la

não faz com que o nó ﬁque com menos que o número mínimo de

chaves permitidas, podemos remover a chave.

◮Caso 2: Se a chave a ser removida não está em uma folha então é

garantido que seu antecessor ou sucessor está em uma folha. Neste

caso, podemos excluir a chave e promover a chave antecessora ou

sucessora para a posição da chave removida.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

21 / 33

## Página 63

Remoção

Durante a inserção, a nova chave é inserida sempre em um nó folha.

Para a exclusão temos quatro casos possíveis:

◮Caso 1: Se a chave a ser removida está em um nó folha e removê-la

não faz com que o nó ﬁque com menos que o número mínimo de

chaves permitidas, podemos remover a chave.

◮Caso 2: Se a chave a ser removida não está em uma folha então é

garantido que seu antecessor ou sucessor está em uma folha. Neste

caso, podemos excluir a chave e promover a chave antecessora ou

sucessora para a posição da chave removida.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

21 / 33

## Página 64

Remoção

Se os casos 1 ou 2 levam a um nó folha que contém menos que o

número mínimo de chaves, então temos que ver os irmãos

imediatamente adjacentes à folha em questão:

◮Caso 3: Se um deles tem mais que o número mínimo de chaves, então

nós podemos promover uma de suas chaves para o pai e tomar a chave

pai em folha.

◮Caso 4: Se nenhum deles tem mais que o número de mínimo de

chaves, as folhas podem ser combinadas com seu pai (o oposto da

promoção de uma chave) e a nova folha terá o número correto de

chaves. Se este passo deixar o progenitor com muito poucas chaves,

repita o processo até a raiz, se necessário.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

22 / 33

## Página 65

Remoção

Se os casos 1 ou 2 levam a um nó folha que contém menos que o

número mínimo de chaves, então temos que ver os irmãos

imediatamente adjacentes à folha em questão:

◮Caso 3: Se um deles tem mais que o número mínimo de chaves, então

nós podemos promover uma de suas chaves para o pai e tomar a chave

pai em folha.

◮Caso 4: Se nenhum deles tem mais que o número de mínimo de

chaves, as folhas podem ser combinadas com seu pai (o oposto da

promoção de uma chave) e a nova folha terá o número correto de

chaves. Se este passo deixar o progenitor com muito poucas chaves,

repita o processo até a raiz, se necessário.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

22 / 33

## Página 66

Remoção

Se os casos 1 ou 2 levam a um nó folha que contém menos que o

número mínimo de chaves, então temos que ver os irmãos

imediatamente adjacentes à folha em questão:

◮Caso 3: Se um deles tem mais que o número mínimo de chaves, então

nós podemos promover uma de suas chaves para o pai e tomar a chave

pai em folha.

◮Caso 4: Se nenhum deles tem mais que o número de mínimo de

chaves, as folhas podem ser combinadas com seu pai (o oposto da

promoção de uma chave) e a nova folha terá o número correto de

chaves. Se este passo deixar o progenitor com muito poucas chaves,

repita o processo até a raiz, se necessário.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

22 / 33

## Página 67

Caso 1: Remoção Simples

Assumindo uma árvore B de grau mínimo 3:

Removendo a chave 2.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

23 / 33

## Página 68

Caso 1: Remoção Simples

Assumindo uma árvore B de grau mínimo 3:

Remove 2: as chaves são suﬁciente, basta remover.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

24 / 33

## Página 69

Caso 2: Remoção de um nó interno

Removendo a chave 52.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

25 / 33

## Página 70

Caso 2: Remoção de um nó interno

Remove 52: 52 é um nó interno, tomamos o sucessor emprestado.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

26 / 33

## Página 71

Caso 4: Poucas chaves nos nós irmãos

Removendo a chave 72.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

27 / 33

## Página 72

Caso 4: Poucas chaves nos nós irmãos

Remove 72: como há poucas chaves juntamos as chaves formando um

novo nó.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

28 / 33

## Página 73

Caso 4: Poucas chaves nos nós irmãos

Árvore resultante:

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

29 / 33

## Página 74

Caso 3: Irmãos suﬁcientes

Removendo a chave 22.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

30 / 33

## Página 75

Caso 3: Irmãos suﬁcientes

Remove 22: como os irmãos são suﬁcientes, rebaixa a chave raiz e

promove a chave folha.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

31 / 33

## Página 76

Caso 3: Irmãos suﬁcientes

Árvore resultante:

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

32 / 33

## Página 77

Aplicação

1 Dada a árvore B de grau mínimo 3 do último exercício: 3, 7, 9, 23,

45, 1, 5, 14, 25, 24, 13, 11, 8, 19, 4, 31, 35, 56, 15, 60, 16, 20 e 22.

Remova as chaves 4, 5, 7, 3 e 14.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

33 / 33