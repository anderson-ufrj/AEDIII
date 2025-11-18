---
title: "Estruturas C++ - Vector e Iterator"
author: "Ricardo"
pages: 5
source: "estruturas1.pdf"
---

# Microsoft PowerPoint - estruturas1

Estruturas C++

Vector

Iterator

Vector

A classe vector é uma alternativa à representação de array primitivo (vetor).

vector<int> v;

Alguns métodos:

v.size(); // retorna tamanho do vetor v

v.empty(); // determina se vetor v está vazio

v.resize(novo_tamanho); // redimensiona vector v

v2 = v; // cópia v em v2

v.push_back(x); // inserir elemento no vector

v.pop_back(); // retira o ultimo elemento do vector

v.erase(v.begin(), v.end()); // limpa o vetor

sort(v.begin(),v.end()); //ordena o vetor

Iterator

É o mecanismo usado para "andar", elemento por elemento, por uma coleção de

dados. É uma forma abstrata e genérica de tratar o avanço entre os elementos

dessa coleção. Esse avanço pode se dar de várias formas, inclusive ao contrário.

O funcionamento exato depende de cada tipo de dado, o importante é que se um

tipo possui um iterador em conformidade com a linguagem toda operação que

iteração poderá ser feita com aquele objeto. Não importa para ele a

complexidade da operação, nem como ela deverá ser feita. É uma forma

independente da implementação de acessar os dados da coleção.

Ele possui os métodos begin() e end() pra indicar onde começa e onde termina a

iteração.

Iterator

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, x;
    vector <int> v;
    vector <int>:: iterator it;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d", &x);
        v.push_back(x);
    }

    for (it = v.begin(); it != v.end(); ++it)
    {
        printf("%d ", *it);
    }

    printf("\n");
    return 0;
}
```

Problema

Dado um vetor com números inteiros positivos e negativos, encontre a sublista

contígua de maior soma a partir de uma lista de números. Por exemplo, dado o

vetor V a seguir:

A sublista contígua de maior soma é:

-17 20

-1

-30 10

-17 20

-1

-30 10

V

V