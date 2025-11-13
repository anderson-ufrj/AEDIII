---
title: "AED III Árvores Binárias Balanceadas — AVL"
author: ""
pages: 27
source: "002_-_AVL-Implementacao.pdf"
---

# AED III Árvores Binárias Balanceadas — AVL


## Página 1

AED III

Árvores Binárias Balanceadas — AVL

Ciência da Computação – IFSULDEMINAS

Primeiro Semestre de 2014

## Página 2

Roteiro

1

Estrutura

2

Inserção em Árvore AVL

3

Remoção em Árvore AVL

4

Outra Proposta

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

2 / 15

## Página 3

Estrutura para Árvore AVL

Nó

Nó:

chave valor armazenado no nó;

fb fator de balanceamento do no nó;

direita ponteiro para o filho da direita;

esquerda ponteiro para o filho da esquerda;

pai ponteiro para o pai;

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

3 / 15

## Página 4

Inserção em Árvore AVL

Inserção

Insira o novo nó.

Iniciando com o nó pai do nó recém-inserido, teste se a propriedade

AVL foi violada neste nó:

◮Caso a condição AVL tenha sido violada: execute as operações de

rotação conforme for o caso (Rotação Simples ou Dupla).

◮Caso contrário, a árvore está correta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

4 / 15

## Página 5

Inserção em Árvore AVL

Inserção

Insira o novo nó.

Iniciando com o nó pai do nó recém-inserido, teste se a propriedade

AVL foi violada neste nó:

◮Caso a condição AVL tenha sido violada: execute as operações de

rotação conforme for o caso (Rotação Simples ou Dupla).

◮Caso contrário, a árvore está correta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

4 / 15

## Página 6

Inserção em Árvore AVL

Inserção

Insira o novo nó.

Iniciando com o nó pai do nó recém-inserido, teste se a propriedade

AVL foi violada neste nó:

◮Caso a condição AVL tenha sido violada: execute as operações de

rotação conforme for o caso (Rotação Simples ou Dupla).

◮Caso contrário, a árvore está correta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

4 / 15

## Página 7

Inserção em Árvore AVL

Inserção

Insira o novo nó.

Iniciando com o nó pai do nó recém-inserido, teste se a propriedade

AVL foi violada neste nó:

◮Caso a condição AVL tenha sido violada: execute as operações de

rotação conforme for o caso (Rotação Simples ou Dupla).

◮Caso contrário, a árvore está correta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

4 / 15

## Página 8

Inserção em Árvore AVL

Inserção

INSERIR(T, k) {

if T == NIL

Alocar um novo nó com chave k

T.raiz = novo;

if k < T.chave

INSERIR(T.esquerda, k);

// Ajustar ponteiro para nó pai

CALCULAR_FB(T);

BALANCEAR(T);

else

INSERIR(T.direita, k);

// Ajustar ponteiro para nó pai

CALCULAR_FB(T);

BALANCEAR(T);

}

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

5 / 15

## Página 9

Inserção em Árvore AVL

Parâmetros da função:

◮T: a raiz da árvore

◮k: valor a ser inserido

Usa as funções:

◮CALCULAR_FB(T): calcula o fator de balanceamento apenas de T.

O fator de balanceamento é dado pela diferença de alturas.

◮BALANCEAR(T): veriﬁca se a condição de AVL foi violada. Caso

tenha sido, veriﬁca o tipo de rotação a ser aplicada e executa as

rotações.

◮Observação:

ao rotacionar uma sub-árvore ajuste os fatores de

balanceamento.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 15

## Página 10

Inserção em Árvore AVL

Parâmetros da função:

◮T: a raiz da árvore

◮k: valor a ser inserido

Usa as funções:

◮CALCULAR_FB(T): calcula o fator de balanceamento apenas de T.

O fator de balanceamento é dado pela diferença de alturas.

◮BALANCEAR(T): veriﬁca se a condição de AVL foi violada. Caso

tenha sido, veriﬁca o tipo de rotação a ser aplicada e executa as

rotações.

◮Observação:

ao rotacionar uma sub-árvore ajuste os fatores de

balanceamento.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 15

## Página 11

Inserção em Árvore AVL

Parâmetros da função:

◮T: a raiz da árvore

◮k: valor a ser inserido

Usa as funções:

◮CALCULAR_FB(T): calcula o fator de balanceamento apenas de T.

O fator de balanceamento é dado pela diferença de alturas.

◮BALANCEAR(T): veriﬁca se a condição de AVL foi violada. Caso

tenha sido, veriﬁca o tipo de rotação a ser aplicada e executa as

rotações.

◮Observação:

ao rotacionar uma sub-árvore ajuste os fatores de

balanceamento.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 15

## Página 12

Inserção em Árvore AVL

Parâmetros da função:

◮T: a raiz da árvore

◮k: valor a ser inserido

Usa as funções:

◮CALCULAR_FB(T): calcula o fator de balanceamento apenas de T.

O fator de balanceamento é dado pela diferença de alturas.

◮BALANCEAR(T): veriﬁca se a condição de AVL foi violada. Caso

tenha sido, veriﬁca o tipo de rotação a ser aplicada e executa as

rotações.

◮Observação:

ao rotacionar uma sub-árvore ajuste os fatores de

balanceamento.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 15

## Página 13

Inserção em Árvore AVL

Parâmetros da função:

◮T: a raiz da árvore

◮k: valor a ser inserido

Usa as funções:

◮CALCULAR_FB(T): calcula o fator de balanceamento apenas de T.

O fator de balanceamento é dado pela diferença de alturas.

◮BALANCEAR(T): veriﬁca se a condição de AVL foi violada. Caso

tenha sido, veriﬁca o tipo de rotação a ser aplicada e executa as

rotações.

◮Observação:

ao rotacionar uma sub-árvore ajuste os fatores de

balanceamento.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 15

## Página 14

Inserção em Árvore AVL

Parâmetros da função:

◮T: a raiz da árvore

◮k: valor a ser inserido

Usa as funções:

◮CALCULAR_FB(T): calcula o fator de balanceamento apenas de T.

O fator de balanceamento é dado pela diferença de alturas.

◮BALANCEAR(T): veriﬁca se a condição de AVL foi violada. Caso

tenha sido, veriﬁca o tipo de rotação a ser aplicada e executa as

rotações.

◮Observação:

ao rotacionar uma sub-árvore ajuste os fatores de

balanceamento.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

6 / 15

## Página 15

Remoção em Árvore AVL

Remoção

Remova o nó.

Iniciando com o nó pai do nó removido, teste se a propriedade AVL

foi violada neste nó:

◮Caso a condição AVL tenha sido violada: execute as operações de

rotação conforme for o caso (Rotação Simples ou Dupla).

◮Caso contrário, a árvore está correta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

7 / 15

## Página 16

Remoção em Árvore AVL

Remoção

Remova o nó.

Iniciando com o nó pai do nó removido, teste se a propriedade AVL

foi violada neste nó:

◮Caso a condição AVL tenha sido violada: execute as operações de

rotação conforme for o caso (Rotação Simples ou Dupla).

◮Caso contrário, a árvore está correta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

7 / 15

## Página 17

Remoção em Árvore AVL

Remoção

Remova o nó.

Iniciando com o nó pai do nó removido, teste se a propriedade AVL

foi violada neste nó:

◮Caso a condição AVL tenha sido violada: execute as operações de

rotação conforme for o caso (Rotação Simples ou Dupla).

◮Caso contrário, a árvore está correta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

7 / 15

## Página 18

Remoção em Árvore AVL

Remoção

Remova o nó.

Iniciando com o nó pai do nó removido, teste se a propriedade AVL

foi violada neste nó:

◮Caso a condição AVL tenha sido violada: execute as operações de

rotação conforme for o caso (Rotação Simples ou Dupla).

◮Caso contrário, a árvore está correta.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

7 / 15

## Página 19

Remoção em Árvore AVL

Remoção

REMOVER(T, k) {

if T == NIL

termine;

else if T.chave == k

Casos da remoção

else if k < T.chave

REMOVER(T.esquerda, k);

CALCULAR_FB(T);

BALANCEAR(T);

else

REMOVER(T.direita, k);

CALCULAR_FB(T);

BALANCEAR(T);

}

Parâmetros da função:

◮T: a raiz da árvore

◮k: valor a ser removido

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

8 / 15

## Página 20

Remoção em Árvore AVL

Remoção

REMOVER(T, k) {

if T == NIL

termine;

else if T.chave == k

Casos da remoção

else if k < T.chave

REMOVER(T.esquerda, k);

CALCULAR_FB(T);

BALANCEAR(T);

else

REMOVER(T.direita, k);

CALCULAR_FB(T);

BALANCEAR(T);

}

Parâmetros da função:

◮T: a raiz da árvore

◮k: valor a ser removido

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

8 / 15

## Página 21

Outra Proposta de Inserção em Árvore AVL

Inserção

```c
int insereAVL(no **T, int x) {

// variável booleana que indica se a altura da árvore cresceu

int cresceu;

if (*T == NULL) {

```

*T = (no *) malloc(sizeof(no));

(*T)->chave = x;

(*T)->dir = (*T)->esq = NULL;

(*T)->bal = 0;

cresceu = 1;

```c
// Esta sub arvore cresceu

} else if ((*T)->chave > x) {

// chama inserção para esquerda

} else if ((*T)->chave < x) {

// chama inserção para direita

} else cresceu = 0;

```

return cresceu;

}

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

9 / 15

## Página 22

Analisando Inserção à Esquerda

Inserção

// Tenta inserir à esquerda e vê se a sub-árvore cresceu

cresceu = insereAVL(&(*T)->esq, x);

```c
if (cresceu) {

// Verifica o estado atual de balanceamento

switch((*T)->bal) {

```

case 1:

...

case 0:

...

case -1:

...

}

}

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

10 / 15

## Página 23

Analisando Inserção à Esquerda

A sub-árvore da direita era maior, não há crescimento

Inserção

case 1:

(*T)->bal = 0;

cresceu = 0;

break;

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

11 / 15

## Página 24

Analisando Inserção à Esquerda

A sub-árvore da direita tinha tamanho igual, houve crescimento

Inserção

case 0:

(*T)->bal = -1;

cresceu = 1;

break;

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

12 / 15

## Página 25

Analisando Inserção à Esquerda

A sub-árvore da direita era menor, houve crescimento

Inserção

case -1:

if ((*T)->esq->bal == -1) {

// FB filho esquerdo = -1

rot_dir(T);

(*T)->bal = (*T)->dir->bal = 0;

} else {

// FB filho esquerdo = 0 ou 1

rot_esq(&(*T)->esq);

rot_dir(T);

if ((*T)->bal == -1) {

(*T)->esq->bal = 0;

(*T)->dir->bal = 1;

} else {

(*T)->dir->bal = 0;

(*T)->esq->bal = -(*T)->bal;

}

(*T)->bal = 0;

}

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

13 / 15

## Página 26

Analisando Inserção à Esquerda

O fator de balanceamento do nó X é -1 e do seu ﬁlho à esquerda é -1.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

14 / 15

## Página 27

Analisando Inserção à Esquerda

O fator de balanceamento do nó X é -1 e do seu ﬁlho à esquerda é 1.

(Ciência da Computação – IFSULDEMINAS)

AED III

Primeiro Semestre de 2014

15 / 15