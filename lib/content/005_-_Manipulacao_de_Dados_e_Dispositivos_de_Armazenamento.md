---
title: "Manipulação de Dados e Dispositivos de Armazenamento"
author: "Ricardo Jose Martins"
pages: 19
source: "005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento.pdf"
---

# 001

Manipula

Manipulação

ão de Dados e

de Dados e

Dispositivos

Dispositivos de

de Armazenamento

Armazenamento

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

AED III – Algoritmo e Estruturas de Dados III

Algoritmo e Estruturas de Dados III

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p1_img0.jpeg)

Existe uma diversidade de dispositivos de armazenamento de dados

num

sistema computacional. Em geral, estes dispositivos são classificados da

seguinte forma:

Dispositivos de Armazenamento Primário (exemplos: memória RAM e

cache): estes dispositivos são manipulados diretamente pela CPU; em

geral, são voláteis e possuem uma alta taxa de transferência de dados,

mas capacidade limitada devido ao alto custo.

Dispositivo de Armazenamento secundário (exemplos: HD, DVD, fitas):

estes dispositivos caracterizam-se por não serem voláteis e possuírem, em

sua maioria, uma maior capacidade de armazenamento a um custo menor;

possuem o problema de serem muito mais lentos que os dispositivos

primários.

Outras metodologias de classificação podem ser definidas segundo alguns

critérios, tais como: velocidade, o custo por unidade de dados;

confiabilidade, entre outros.

Armazenamento de Dados

Armazenamento de Dados

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p2_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p2_img1.jpeg)

•

Registradores –

pequena porção de memória interna à

CPU para

armazenamento de resultados intermediários.

•

Cache – memória de pequeno porte extremamente rápida se comparada à

memória principal. Geralmente apresenta-se organizada em dois níveis, cache

interna e externa.

•

Memória principal - meio de armazenamento volátil no qual os dados e

instruções estão disponíveis para uso pelo processador.

•

Armazenagem em disco – É o principal meio de armazenamento de dados

persistentes, ou seja, não voláteis. Para serem manipulados pela CPU é

necessária à transferência destes para a memória principal, normalmente este

processo é feito por um hardware especifico de controle do dispositivo.

Caracterizam-se pela alta capacidade de armazenamento e pelo baixo custo.

•

Armazenagem em fita - Normalmente usadas para armazenamento off-line

(cópias de segurança). É bem barato, mas seu acesso é muito mais lento e

seqüencial.

Exemplos de Dispositivos de Armazenamento de Dados

Exemplos de Dispositivos de Armazenamento de Dados

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p3_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p3_img1.jpeg)

Registradores

Cache no Chip

Cache externo

RAM

Dispositivos de armazenamento de massa

Velocidade

Custo relativo

Energia

Densidade

Capacidade

(Sencundário)

Hierarquia de Mem

Hierarquia de Memória

ria

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p4_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p4_img1.jpeg)

Em relação aos dispositivos de armazenagem secundária, pode-se considerar na sua análise ou

aquisição as seguintes características:

•

Capacidade - é a quantidade total de dados que pode ser armazenada no dispositivo (KB,

MB, GB, TB, dentre outros).

•

Portabilidade - as fitas magnéticas, CDR, CDRW, DVD, Zip drive e alguns outros

mecanismos são removíveis, permitindo o armazenagem off-line de arquivos e o transporte

destes dados, melhorando a confiabilidade das cópias de segurança.

•

Custo relativo - é definido como o preço (custo) por unidade de armazenagem.

Geralmente, o valor de um dispositivo aumenta proporcionalmente com a velocidade e

forma de acesso.

•

Tamanho do registro - representa o tamanho de um conjunto de dados contínuos que

podem ser endereçados pelo mecanismo.

•

Método de acesso - permite acesso direto e acesso seqüencial ou apenas seqüencial.

•

Velocidade de transferência de acesso - é a velocidade na qual os dados podem ser

transferidos entre a memória interna e o dispositivo.

Caracter

Características da Mem

sticas da Memória Secund

ria Secundária

ria

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p5_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p5_img1.jpeg)

•

Tempo de busca (seek time) ou posicionamento – para os dispositivos de disco

(HD, CD-ROM, dentre outros), a cada operação de leitura/gravação antecede uma

procura, que fisicamente consiste no tempo que leva para posicionar a cabeça de

leitura/gravação sobre a trilha (cilindro) que contém os dados (registro) a serem

recuperados.

•

Tempo de latência – após o mecanismo posicionar a cabeça de leitura/gravação

sobre a trilha desejada, este leva um tempo adicional de espera da rotação do

cilindro, antes que o início do setor ou registro a ser acessado fique posicionado

sob a cabeça de leitura/gravação; fita magnética é o tempo para alcançar a

velocidade de operação a partir da posição “parada”.

•

Tempo de transferência ou transmissão – é o tempo gasto para a que os dados

do disco, cujo início se encontra sob a cabeça de leitura/gravação, seja

apresentado a interface do disco e se torne disponível para manipulação. O tempo

de transferência = (bytes transferidos / bytes por trilha) X tempo de rotação

•

Densidade da área de armazenagem – é a capacidade relativa de armazenagem

(número de bits, por exemplo) do dispositivo. É definido como o número de bits ou

bytes que podem ser armazenados por unidade de área.

Caracter

Características da Mem

sticas da Memória Secund

ria Secundária

ria

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p6_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p6_img1.jpeg)

Dispositivos de Acesso Seqüencial

Exemplo típico: Fita

•

Extremamente lentos.

•

Utilizados para armazenar dados que serão acessados todos de uma só vez e não serão

alterados posteriormente.

•

Uso típico: Backup

•

Gerência de arquivos não se ocupa destes dispositivos.

Dispositivos de Acesso Randômico (Aleatório)

Exemplo típico: Disco

•

Relativamente rápidos.

•

Utilizados para dados que sofrem freqüentes pesquisas, dados muito alterados ou não

definitivos.

•

Uso típico: área de trabalho ou banco de dados.

•

Base para as técnicas que serão vistas.

Dispositivos Existentes

Dispositivos Existentes

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p7_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p7_img1.jpeg)

•

Exemplo típico para uma memória secundária de acesso

aleatório.

•

Compreender a forma de armazenamento é importante.

•

Modelo de estruturação do disco serve para todos os outros

meios secundários.

•

Dados são organizados em superfícies, trilhas e setores,

blocos.

•

Um arquivo pode ser imaginado como sendo constituído por

uma seqüência de dados no disco.

•

Acesso é feito através do posicionamento de um cabeçotes de

r/w em qualquer ponto.

•

Uma unidade de alocação do disco (um bloco ou um setor)

possui um endereço físico no disco.

Estrutura dos Discos

Estrutura dos Discos

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p8_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p8_img1.jpeg)

Modelo

Genérico

Estrutura dos Discos

Estrutura dos Discos

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p9_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p9_img1.png)

![Imagem 3](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p9_img2.jpeg)

Modelo mais realista

O

disco

pode

apresentar

fragmentação: i.é., os dados não

estão exatamente em espaços

contíguos, mas em unidades  de

alocação longe umas das outras,

encadeadas como uma lista.

Estrutura dos Discos

Estrutura dos Discos

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p10_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p10_img1.png)

![Imagem 3](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p10_img2.jpeg)

 Exemplo:

Exemplo: Disco R

Disco Rígido

gido

Pratos

Cabeças de leitura/gravação

Braços de controle de acesso

Cilindro

atual de

leitura

Eixo (Spindle)

deslocamento

Estrutura dos Discos

Estrutura dos Discos

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p11_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p11_img1.jpeg)

 Superfície

Setores

Setores

Trilhas

Trilhas

Organiza

Organização de um prato (trilhas e setores)

ão de um prato (trilhas e setores)

Gap

Gap

Estrutura dos Discos

Estrutura dos Discos

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p12_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p12_img1.jpeg)



Capacidade de Armazenamento

capac

capac. da trilha

. da trilha = número de setores por trilha X número bytes por setor

capac

capac. do cilindro

. do cilindro = número de trilhas por cilindro X capac. da trilha

capacidade do HD

capacidade do HD = número de cilindros X capacidade do cilindro



Tempo de Acesso

O tempo de acesso (access time) é dado pelo tempo de posicionamento

adicionado do tempo de latência, e o tempo de transferencia.



Ler um arquivo seqüencialmente é mais rápido, pois o acesso seqüencial

minimiza o tempo de busca e de latência.



Para uma leitura aleatória, quase todos os acessos terão tempo de busca,

tempo de latência e tempo de transferência.

Estrutura dos Discos

Estrutura dos Discos

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p13_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p13_img1.jpeg)

Considere uma unidade de disco magn

Considere uma unidade de disco magnético com as seguintes caracter

tico com as seguintes características :

sticas :



Setor

: 512 bytes



Taxa de transferencia       : 20 Mbytes/seg



Tempo de seek médio       : 8 ms



Tempo latência médio      : 4 ms



Capacidade por trilha

: 85 Kbytes



Capacidade total

: 9100 Mbytes



No. de pratos/superfícies

: 10/20

a. Qual

a. Qual é o numero de cilindros do disco ?

o numero de cilindros do disco ?

b. Quantos registros de 128 bytes podem ser armazenados em 1 cil

b. Quantos registros de 128 bytes podem ser armazenados em 1 cilindro do disco ?

indro do disco ?

c. Calcule o tempo gasto para a leitura seq

c. Calcule o tempo gasto para a leitura seqüencial de 50.000 setores.

encial de 50.000 setores.

d. Calcule o tempo gasto para a leitura aleat

d. Calcule o tempo gasto para a leitura aleatória de 50.000 setores.

ria de 50.000 setores.

Exerc

Exercício Dirigido

cio Dirigido

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p14_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p14_img1.jpeg)

a. Qual e o numero de cilindros do disco ?

9100 MB / 20 superfícies = 455 MB / superfície

455 * 1024 * 1024 Bytes / (85 * 1024 Bytes / trilha) = 5.481 trilhas/superfície.

O n

O número de cilindros no disco

mero de cilindros no disco é igual ao n

igual ao número de trilhas por

mero de trilhas por

superf

superfície. Portanto, h

cie. Portanto, há 5.481 cilindros no disco.

5.481 cilindros no disco.

Solu

Soluções para as Questões do Exerc

ões para as Questões do Exercício Dirigido

cio Dirigido

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p15_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p15_img1.jpeg)

b.

b. Quantos registros de 128 bytes podem ser armazenados em 1 cilind

Quantos registros de 128 bytes podem ser armazenados em 1 cilindro do disco ?

ro do disco ?

Em um cilindro do disco cabem (85 * 1024 bytes / trilha) * (20 trilhas / cilindro) = 1.740.800 bytes.

Portanto, cabem 1.740.800 bytes / (128 bytes / registros) = 13.6

Portanto, cabem 1.740.800 bytes / (128 bytes / registros) = 13.600 registros em

00 registros em

um cilindro.

um cilindro.

Solu

Soluções para as Questões do Exerc

ões para as Questões do Exercício Dirigido

cio Dirigido

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p16_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p16_img1.jpeg)

c.

c. Calcule o tempo gasto para a leitura seq

Calcule o tempo gasto para a leitura seqüencial de 50.000 setores.

encial de 50.000 setores.

A leitura seqüencial envolve um tempo de seek, um tempo de latência e o tempo gasto com a

transferência.

Tempo de seek: 8 ms

Tempo de latência: 4ms

Tempo de transferência: 50.000 setores * 512 bytes / setor = 25.600.000 bytes / (20 *

1024 * 1024 bytes / seg) = 1,22 seg

Tempo total: 0,008 + 0,004 + 1,22 = 1,23 seg

Tempo total: 0,008 + 0,004 + 1,22 = 1,23 seg

Solu

Soluções para as Questões do Exerc

ões para as Questões do Exercício Dirigido

cio Dirigido

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p17_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p17_img1.jpeg)

d.

d. Calcule o tempo gasto para a leitura aleat

Calcule o tempo gasto para a leitura aleatória de 50.000 setores.

ria de 50.000 setores.

A leitura de cada setor requer um tempo de seek, um tempo de latência e o tempo

de transferência. Dessa maneira, serão necessários 50.000 seeks e 50.000 latências

no total, além do tempo de transferência.

Tempo total: 50.000 * (0,008 + 0,004 seg) + 1,22 seg (tempo de t

Tempo total: 50.000 * (0,008 + 0,004 seg) + 1,22 seg (tempo de transferência,

ransferência,

calculado na questão anterior) = 601,22 seg

calculado na questão anterior) = 601,22 seg

Solu

Soluções para as Questões do Exerc

ões para as Questões do Exercício Dirigido

cio Dirigido

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p18_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p18_img1.jpeg)

e.

e. Calcule o tempo gasto para a leitura seq

Calcule o tempo gasto para a leitura seqüencial de 50.000 setores.

encial de 50.000 setores.

A leitura seqüencial envolve um tempo de seek, um tempo de latência e o tempo gasto com a

transferência.

Tempo de seek: 8 ms

Tempo de latência: 4ms

Tempo de transferência: 50.000 setores * 512 bytes / setor = 25.600.000 bytes / (20 *

1024 * 1024 bytes / seg) = 1,22 seg

Tempo total: 0,008 + 0,004 + 1,22 = 1,23 seg

Tempo total: 0,008 + 0,004 + 1,22 = 1,23 seg

Solu

Soluções para as Questões do Exerc

ões para as Questões do Exercício Dirigido

cio Dirigido

![Imagem 1](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p19_img0.png)

![Imagem 2](/images/005_-_Manipulacao_de_Dados_e_Dispositivos_de_Armazenamento_p19_img1.jpeg)
