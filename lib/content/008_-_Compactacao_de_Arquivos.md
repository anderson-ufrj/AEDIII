---
title: "Compactação de Arquivos - Técnicas e Algoritmos"
author: ""
pages: 17
source: "008_-_Compactacao_de_Arquivos.pdf"
---

# 


Compacta

Compactação

ão de

de Arquivos

Arquivos

Prof. Ricardo José Martins

ricardo.martins@muz.ifsuldeminas.edu.br

IFSULDEMINAS,

IFSULDEMINAS, campus

campus Muzambinho

Muzambinho

Curso de Ciência da Computa

Curso de Ciência da Computação

ão

Curso de Bacharelado em Ciência da Computa

Curso de Bacharelado em Ciência da Computação

ão

AED III

AED III – Algoritmo e Estruturas de Dados III

Algoritmo e Estruturas de Dados III

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p1_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p1_img1.png)


Compactadores de arquivos são softwares especializados em

gerar uma representação mais eficiente de vários arquivos dentro

de um único arquivo de modo que ocupem menos espaço na

mídia de armazenamento ou o tempo de transferência deles sobre

uma rede seja reduzido.

Os compactadores foram muito utilizados no passado quando as

mídias de armazenamento tinham preços elevados e era

necessário economizar espaço para armazenamento. Atualmente

o uso deles é mais voltado a transferência de arquivos pela

Internet para reduzir a massa de dados a ser transferida pela rede.

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p2_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p2_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p2_img2.png)


Run-length (ou RLE) é uma técnica para comprimir cadeias de

caracteres onde existem sequências longas de caracteres repetidos.

O princípio do funcionamento dessa codificação é simples: Quando

temos a ocorrência de uma repetição contínua de determinado

caractere, por exemplo, AAAAAAAAAAAA, é possível substituir

sua representação pelo par (12, A). Entretanto não podemos

simplesmente substituir no meio do texto a seqüencia de letras pelo

número, senão uma frase como:

2. all is too well.

Se tornaria:

2. a2l is t2o we2l.

Como identificar se o número 2 estava realmente presente no texto

original ou foi introduzido pela codificação? Neste caso precisamos

identificar o início da codificação por um caractere especial. Assim,

se usarmos por exemplo o símbolo de "@" como caractere especial,

teremos:

2. a@2l is t@2o we@2l.

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p3_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p3_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p3_img2.png)


E conseguimos identificar exatamente onde o número 2 realmente

existe na frase, e onde ele é parte da codificação. Entretanto, a cadeia

ao invés de ser comprimida, foi na verdade expandida. Usando um

caractere de escape a seqüencia mínima que podemos codificar sem

causar expansão do arquivo precisa ter tamanho 3. Além disso o

caractere especial não pode ser um dos caracteres que ocorrem dentro

do texto.

Uma solução alternativa para o caractere de escape foi usada pelo

protocolo MNP5, usado por fabricantes de modems. Nesse protocolo,

ao invés de um caractere de escape, sempre que encontra uma

repetição de 3 ou mais caracteres o codificador escreve os 3 primeiros

caracteres repetidos no arquivo de saída, seguidos do número de

repetições (além das 3 que já foram). Ou seja, se encontrar 3

caracteres "a" em seqüencia, imprime "aaa0", se forem 4 caracteres

"b": "bbb1" e assim por diante. Repare que ainda assim existe um

risco de expansão, mas ela é ligeiramente menor (e mais rara) do que

no caso do caractere de escape.

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p4_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p4_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p4_img2.png)


Na compressão de imagens esta técnica é mais promissora pois

imagens apresentam maiores áreas contínuas de uma mesma cor.

Desenhos e outras imagens com número limitados de cores tendem a

ser melhor comprimíveis usando esta técnica.

Uma abordagem interessante é a usada na compressão de imagens

monocromáticas. Nessas imagens cada pixel é representado por

apenas um bit. Assim o arquivo pode ser armazenado como uma lista

dos tamanhos das sequências alternadamente de pixels brancos (1) e

negros (0), sem precisar indicar qual o valor da próxima seqüencia.

Caso o primeiro pixel não seja da cor branca (1), o primeiro valor

armazenado é 0, indicando uma seqüencia de tamanho 0 de pixels

brancos.

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p5_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p5_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p5_img2.png)


Run-length bit a bit

Se a quantidade de valores forem bem definidas em um arquivo, podemos

compactar o arquivo armazenando em apenas alguns bit ao invés de um byte

todo: Por exemplo, imagine um arquivo apenas com as letras a, b, c e d. Como

são apenas quatro valores, apenas dois bits são capazes de diferenciar uma

informação da outra: a(00), b(01), c(10) e d(11). O texto a seguir

accaaddaadba

ao mudar as devidas associações, os valores binários ficam

00 10 10 00    00 11 11 00    00 11 01 00

convertendo para inteiro

40 60 52

finalmente para ASCII

(<4

Ou seja, o texto foi reduzido de 12 para 3 caracteres

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p6_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p6_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p6_img2.png)


Exercícios

1 - Implemente um compactador e um

descompactador para o exemplo definido

no slide anterior.

2 - Implemente um compactador e um

descompactador

para um arquivo que

possui 8 dígitos diferentes: a, b, c, d, e, f, g

e h.

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p7_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p7_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p7_img2.png)


Compressão Estatística

Baseia-se no uso de uma representação otimizada de

caracteres ou grupos de caracteres afim de reduzir o

tamanho dos dados. Caracteres de maior freqüência

de ocorrência são representados por códigos binários

pequenos,

e

os

de

menor

freqüência

são

representados por códigos proporcionalmente maiores.

Algoritmo de Huffman

Algoritmo de Shannon-Fano

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p8_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p8_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p8_img2.png)


•

Algoritmo de Huffman

–

Necessita-se de uma tabela com a probabilidade de

ocorrência de cada caractere;

Ex:

–

Aplicação de um algoritmo para geração dos códigos

otimizados de cada caractere através de uma árvore binária.

–

Ordena-se a tabela de ocorrências (ordem crescente)

–

Retira-se da lista os dois caracteres de menor valor;

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p9_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p9_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p9_img2.png)


![Imagem 4](/images/008_-_Compactacao_de_Arquivos_p9_img3.png)


•

Algoritmo de Huffman

–

Retira-se da lista os dois caracteres de menor

probabilidade, sendo que estes  formarão um novo

ramo cuja probabilidade será a soma dos mesmos.

Ex:

–

Insere-se este novo caractere ORDENADAMENTE na

lista.

–

Volta-se ao primeiro passo ate que reste somente um

elemento na lista, cuja probabilidade seja 1.

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p10_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p10_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p10_img2.png)


![Imagem 4](/images/008_-_Compactacao_de_Arquivos_p10_img3.png)


Exemplo de Codificação Huffman

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p11_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p11_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p11_img2.png)


![Imagem 4](/images/008_-_Compactacao_de_Arquivos_p11_img3.png)


![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p12_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p12_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p12_img2.png)


![Imagem 4](/images/008_-_Compactacao_de_Arquivos_p12_img3.png)


![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p13_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p13_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p13_img2.png)


![Imagem 4](/images/008_-_Compactacao_de_Arquivos_p13_img3.png)


Para se montar o código, gera-se "0" cada vez

que for para a esquerda e "1" cada vez que

for para a direita; assim o código formado fica

o seguinte:

101

100

0000

0101

001

011

0001

0100

11

comprimento

variável

i

h

g

f

e

d

c

b

a

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p14_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p14_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p14_img2.png)


• Algoritmo de Shannon-Fano

A forma desta técnica tem muitas semelhanças com a de

Huffman.

Necessita-se

de

uma

tabela

com

a

probabilidade de ocorrência de cada caractere, e de um

procedimento para a codificação em binário. Por outro

lado, o procedimento para a codificação, diferentemente

de Huffman, baseia-se na divisão de conjuntos de

probabilidades para a obtenção do código binário.

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p15_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p15_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p15_img2.png)


![Imagem 4](/images/008_-_Compactacao_de_Arquivos_p15_img3.png)


• Algoritmo de Shannon-Fano

Uma vez feito isso, divide-se a tabela em dois grupos

cuja soma de probabilidades seja igual ou semelhante.

No caso da tabela acima, serão obtidos dois grupos, um

composto pelo caractere C4 e outro pelos demais. O

primeiro grupo recebe como primeiro valor de código o

binário 0 e o segundo recebe 1:

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p16_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p16_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p16_img2.png)


![Imagem 4](/images/008_-_Compactacao_de_Arquivos_p16_img3.png)


• Algoritmo de Shannon-Fano

Para isso, repetimos o procedimento anterior, dividindo

em dois subgrupos de probabilidades equivalentes. O

caractere C2 forma o primeiro subgrupo e os demais

formam o segundo. Mais uma vez vamos colocar 0 para

distinguir o primeiro e 1 para o segundo. O processo se

repete ate que não haja mais grupos a dividir.

![Imagem 1](/images/008_-_Compactacao_de_Arquivos_p17_img0.png)


![Imagem 2](/images/008_-_Compactacao_de_Arquivos_p17_img1.png)


![Imagem 3](/images/008_-_Compactacao_de_Arquivos_p17_img2.png)


![Imagem 4](/images/008_-_Compactacao_de_Arquivos_p17_img3.png)


![Imagem 5](/images/008_-_Compactacao_de_Arquivos_p17_img4.png)
