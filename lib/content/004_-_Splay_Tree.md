---
title: "Microsoft PowerPoint - splay"
author: "Ricardo"
pages: 10
source: "004_-_Splay_Tree.pdf"
---

# Microsoft PowerPoint - splay


AED III

Splay Tree


Contextualização

Uma árvore splay é uma árvore binária de busca autoajustável, com a

propriedade adicional de tornar os elementos recentemente acessados, fáceis de

acesso novamente, pois os mantém em sua raiz. Todas as suas operações colocam

o elemento envolvido na operação na raiz, através de rotações.

Para muitas sequências de operações não aleatórias, as árvores splay têm melhor

desempenho do que outras árvores de busca, mesmo quando o padrão específico

da sequência é desconhecido.

A árvore splay foi inventada por Daniel Sleator e Robert Tarjan em 1985.


Contextualização

Quando um nó n é acessado, uma operação de splay é executada em n para

movê-lo para a raiz. Para executar uma operação de splay, realizamos uma

sequência de rotações, cada um dos quais move n mais próximo da raiz. Ao

executar uma operação de splay no nó de interesse após cada acesso, os nós

recentemente acessados são mantidos perto da raiz e a árvore permanece

aproximadamente equilibrada.


Rotação simples

ZIG (Rotação para Direita) e ZAG (Rotação para Esquerda)

Se pai(B) é raiz fazemos apenas uma rotação para esquerda ou direita.

![Imagem 1](/images/004_-_Splay_Tree_p4_img0.jpeg)


Rotação dupla (ZIG-ZIG, ZAG-ZAG)

ZIG-ZIG e ZAG-ZAG

Se pai(C) não é raiz e C e pai(C) são filhos do mesmo lado, fazemos duas rotações

para direita ou duas rotações para a esquerda, no mesmo sentido começando

pelo pai(pai(C)).

![Imagem 1](/images/004_-_Splay_Tree_p5_img0.jpeg)


Rotação dupla ZIG-ZAG

ZIG-ZAG

Se pai(C) não é raiz e C e pai(C) são filhos do lado oposto, faz uma rotação em

pai(C) para direita e outra rotação no avô para esquerda de C.

![Imagem 1](/images/004_-_Splay_Tree_p6_img0.jpeg)


Rotação dupla ZAG-ZIG

ZAG-ZIG

Se pai(C) não é raiz e C e pai(C) são filhos do lado oposto, faz uma rotação em

pai(C) para esquerda e outra rotação no avô para direita de C.

![Imagem 1](/images/004_-_Splay_Tree_p7_img0.jpeg)


Busca

Como a Splay Tree é um algoritmo, que ao passar das operações ela vai se

balanceando, inicia na raiz da árvore t procurando pelo item i, se a busca

encontra um nó x que contenha i, o nó x é splayed. Se a busca não encontra i,

último nó não nulo da árvore é splayed e um ponteiro nulo é retornado.


Inserção

A inserção na Splay tree é parecida com a que ocorre nas Árvores Binárias de

Busca, apenas com uma adição que o elemento que foi adicionado se torna a

nova raiz.


Exercícios

Faça todas as etapas e como ficará a árvore após cada uma delas.

Inserir os valores 6 e 9;

Inserir 4;

Buscar 9;

Inserir 10;

Buscar 6.