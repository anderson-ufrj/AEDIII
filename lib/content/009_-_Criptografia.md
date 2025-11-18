---
title: "Criptografia - Fundamentos e Aplicações"
author: "Prof. Ricardo José Martins"
pages: 38
source: "009_-_Criptografia.pdf"
---

# Criptografia - Fundamentos e Aplicações

## 📚 Pré-requisitos

Antes de estudar Criptografia, certifique-se de conhecer:

- **Aritmética modular**: Operações módulo, resto da divisão
- **Manipulação de caracteres**: ASCII, conversão char ↔ int
- **Strings em C/C++**: Manipulação, iteração, transformação
- **Conceitos básicos de segurança**: Confidencialidade, integridade, autenticação

**Tempo estimado de estudo**: 3-4 horas

---

## 1. Introdução à Criptografia

### 1.1 Definição

**Criptografia** é a ciência (ou arte) de escrever em códigos ou cifras, ou seja, é um conjunto de métodos que permite tornar incompreensível uma mensagem (ou informação), de forma que apenas pessoas autorizadas consigam decifrá-la e compreendê-la.

**Criptoanálise** é a arte ou ciência de recuperar uma determinada informação criptografada sem possuir a autorização (a chave, a senha ou até mesmo o conhecimento do algoritmo utilizado). Uma tentativa de criptoanálise é comumente chamada de **ataque**.

### 1.2 Motivação

A necessidade de **sigilo**, **integridade** e **autenticação** na comunicação existe há milênios:

- **Roma Antiga**: Júlio César usava cifras para comunicação militar
- **Segunda Guerra Mundial**: Máquina Enigma (Alemanha) vs Máquina Colossus (Inglaterra)
- **Era Digital**: E-commerce, banking online, mensagens privadas

### 1.3 Serviços de Segurança

#### Confidencialidade
A informação é mantida **privada** - apenas destinatários autorizados podem ler

**Analogia física**: Envelope selado

#### Autenticação
**Identificação** de uma pessoa ou entidade - garantia de quem é o remetente

**Analogia física**: Assinatura manuscrita

#### Integridade
A informação **não pode ser modificada** sem detecção

**Analogia física**: Timbre/selo de segurança

#### Não-repúdio
A origem da informação **não pode ser negada** pelo remetente

**Analogia física**: Assinatura autenticada em cartório

---

## 2. Fundamentos Matemáticos

### 2.1 Aritmética Modular

A base da maioria dos algoritmos criptográficos modernos.

**Operação módulo**: `a mod n` é o resto da divisão de `a` por `n`

**Exemplos**:
- `17 mod 5 = 2` (17 = 5×3 + 2)
- `26 mod 26 = 0`
- `30 mod 26 = 4`

**Propriedades úteis**:
- `(a + b) mod n = ((a mod n) + (b mod n)) mod n`
- `(a - b) mod n = ((a mod n) - (b mod n) + n) mod n`
- Importante: sempre adicionar `n` antes do módulo final para evitar negativos

### 2.2 Alfabeto e Mapeamento

Mapeamento padrão usado em criptografia clássica:

| Letra | A | B | C | D | E | F | G | H | I | J | K | L | M |
|-------|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Número | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |

| Letra | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|-------|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Número | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 |

**Conversão em C**:
```c
char letra = 'A';
int numero = letra - 'A';  // 0
char volta = numero + 'A';  // 'A'
```

---

## 3. Criptografia Clássica

### 3.1 Cifra de César

A cifra mais antiga e simples conhecida, usada por Júlio César (100-44 a.C.).

#### Princípio

**Deslocamento fixo** de k posições no alfabeto.

**Cifragem**: `C = (P + k) mod 26`
**Decifragem**: `P = (C - k + 26) mod 26`

Onde:
- `P` = caractere do texto **P**lano (original)
- `C` = caractere do texto **C**ifrado
- `k` = chave (deslocamento)

#### Exemplo (k = 3)

```
Texto plano:    ATAQUE AO AMANHECER
Texto cifrado:  DWDTXH DR DPDQKHFHU
```

Mapeamento:
- A (0) → D (3)
- T (19) → W (22)
- Q (16) → T (19)
- E (4) → H (7)

#### Implementação em C

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

void cifra_cesar(char *texto, int chave) {
    int i;
    char c;

    for (i = 0; texto[i] != '\0'; i++) {
        c = texto[i];

        // Apenas letras maiúsculas
        if (c >= 'A' && c <= 'Z') {
            // Converte para 0-25, aplica chave, volta para A-Z
            texto[i] = ((c - 'A' + chave) % 26) + 'A';
        }
        // Ignora espaços e outros caracteres
    }
}

void decifra_cesar(char *texto, int chave) {
    // Decifragem é cifragem com -chave
    // Adiciona 26 para evitar negativos
    cifra_cesar(texto, (26 - chave) % 26);
}

int main() {
    char mensagem[100];
    int chave = 3;

    printf("Digite a mensagem: ");
    fgets(mensagem, sizeof(mensagem), stdin);

    // Remove newline
    mensagem[strcspn(mensagem, "\n")] = 0;

    printf("\nOriginal: %s\n", mensagem);

    cifra_cesar(mensagem, chave);
    printf("Cifrado:  %s\n", mensagem);

    decifra_cesar(mensagem, chave);
    printf("Decifrado: %s\n", mensagem);

    return 0;
}
```

#### Vulnerabilidade

**Força bruta trivial**: apenas 25 chaves possíveis (excluindo k=0)

Um atacante pode testar todas em segundos:
```c
// Ataque de força bruta
for (int k = 1; k < 26; k++) {
    char copia[100];
    strcpy(copia, texto_cifrado);
    decifra_cesar(copia, k);
    printf("Chave %2d: %s\n", k, copia);
}
```

---

### 3.2 Cifra de Substituição

Generalização da Cifra de César.

#### Princípio

Cada letra é **mapeada** para outra letra através de uma **tabela de substituição** arbitrária.

**Exemplo de chave**:
```
Alfabeto:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Chave:     Q W E R T Y U I O P A S D F G H J K L Z X C V B N M
```

Então:
- A → Q
- B → W
- C → E
- etc.

#### Espaço de chaves

**26! ≈ 4 × 10²⁶** permutações possíveis!

Muito maior que César (25), mas ainda vulnerável a **análise de frequência**.

#### Análise de Frequência

Em português, algumas letras são mais comuns:

| Letra | Frequência |
|-------|------------|
| A     | ~14.6%     |
| E     | ~12.6%     |
| O     | ~10.7%     |
| S     | ~7.8%      |
| R     | ~6.5%      |

**Ataque**:
1. Conte frequência de cada letra no texto cifrado
2. A letra mais frequente provavelmente é 'A' ou 'E'
3. Substitua gradualmente baseado em padrões conhecidos
4. Teste palavras comuns (O, A, DE, QUE, etc.)

---

### 3.3 Cifra de Transposição

Em vez de **substituir** letras, **reordena** as letras do texto.

#### Transposição Colunar

**Algoritmo**:
1. Escolha uma **chave numérica** (ex: 4 1 3 2)
2. Escreva o texto em uma grade com número de colunas = tamanho da chave
3. Leia as colunas na ordem ditada pela chave

**Exemplo**:

Texto: `ATAQUE AO AMANHECER`
Chave: `4 1 3 2`

```
Escrita (linha por linha):
   4  1  3  2
   ─  ─  ─  ─
   A  T  A  Q
   U  E  A  O
   A  M  A  N
   H  E  C  E
   R
```

Leitura (na ordem 1-2-3-4):
```
Coluna 1: T E M E
Coluna 2: Q O N E
Coluna 3: A A A C
Coluna 4: A U A H R
```

**Texto cifrado**: `TEME QONE AAAC AUAHR`

#### Implementação simplificada

```c
void transposicao_colunar(char *texto, int *chave, int tam_chave) {
    int i, j, col;
    int len = strlen(texto);
    int linhas = (len + tam_chave - 1) / tam_chave; // Arredonda para cima

    char grade[linhas][tam_chave];
    char resultado[len + 1];
    int pos = 0;

    // Preenche a grade
    for (i = 0; i < len; i++) {
        grade[i / tam_chave][i % tam_chave] = texto[i];
    }

    // Preenche espaços vazios com 'X'
    while (i < linhas * tam_chave) {
        grade[i / tam_chave][i % tam_chave] = 'X';
        i++;
    }

    // Lê na ordem da chave
    for (i = 0; i < tam_chave; i++) {
        // Encontra qual coluna ler (chave[col] == i+1)
        for (col = 0; col < tam_chave; col++) {
            if (chave[col] == i + 1) break;
        }

        // Lê essa coluna
        for (j = 0; j < linhas; j++) {
            resultado[pos++] = grade[j][col];
        }
    }

    resultado[pos] = '\0';
    strcpy(texto, resultado);
}
```

---

## 4. Criptografia Moderna

### 4.1 Criptografia Simétrica

**Mesma chave** para cifrar e decifrar.

**Exemplos**: DES, AES, Blowfish

**Vantagem**: Rápida
**Desvantagem**: Distribuição segura da chave

### 4.2 Criptografia Assimétrica (Chave Pública)

**Duas chaves diferentes**:
- **Chave pública**: Distribui livremente, usada para **cifrar**
- **Chave privada**: Mantém secreta, usada para **decifrar**

**Exemplos**: RSA, ECC

**Propriedade fundamental**:
- Cifrado com chave pública → só decifra com chave privada
- Cifrado com chave privada → só decifra com chave pública (assinatura digital!)

---

## 5. Aplicações Práticas

### 5.1 HTTPS (Navegação Segura)

1. **Handshake inicial**: Cliente e servidor trocam chaves públicas (RSA)
2. **Troca de chave simétrica**: Cliente gera chave AES aleatória, cifra com chave pública do servidor
3. **Comunicação**: Dados trocados usando AES (rápido)

### 5.2 Assinatura Digital

1. **Criar hash** da mensagem (SHA-256)
2. **Cifrar hash** com chave privada → Assinatura
3. **Enviar**: Mensagem + Assinatura
4. **Verificar**: Decifrar assinatura com chave pública, comparar com hash da mensagem recebida

### 5.3 Blockchain/Criptomoedas

- **Endereços**: Derivados de chaves públicas
- **Transações**: Assinadas com chave privada
- **Mineração**: Prova de trabalho usando hashes SHA-256

---

## 💪 Exercícios Graduados

### 🟢 Nível Básico - Compreensão

**Exercício 1: Cifra de César Manual**
- Cifre a mensagem `CRIPTOGRAFIA` usando chave k=5
- Mostre os cálculos para cada letra
- Decifre o resultado para validar

**Exercício 2: Análise de Vulnerabilidade**
- Por que a Cifra de César é insegura?
- Quantas tentativas são necessárias para quebrar por força bruta?
- Compare com uma cifra de substituição arbitrária (26! chaves)

**Exercício 3: Serviços de Segurança**
- Explique a diferença entre **confidencialidade** e **integridade**
- Dê um exemplo real de cada serviço
- Por que **autenticação** é importante mesmo com confidencialidade?

### 🟡 Nível Intermediário - Implementação

**Exercício 4: Implementação de César Completa**
Implemente em C/C++:
- Função de cifragem que aceita maiúsculas E minúsculas
- Preserva espaços e pontuação
- Menu interativo: cifrar, decifrar ou atacar (força bruta)
- Teste com frases completas

**Exercício 5: Cifra de Substituição**
- Crie um programa que:
  - Gera uma chave aleatória (permutação de A-Z)
  - Cifra uma mensagem usando essa chave
  - Salva a chave em arquivo separado
  - Decifra usando chave do arquivo
- Implemente função para exibir a tabela de substituição claramente

**Exercício 6: Análise de Frequência**
- Leia um texto cifrado (substituição simples)
- Conte e exiba a frequência de cada letra
- Compare com frequências esperadas em português
- Sugira possíveis mapeamentos para as 5 letras mais frequentes

**Exercício 7: Transposição Colunar**
- Implemente cifragem e decifragem por transposição colunar
- A chave deve ser lida como string (ex: "CHAVE" → 3 4 1 5 2)
- Suporte mensagens de qualquer tamanho
- Preencha com 'X' quando necessário

### 🔴 Nível Avançado - Otimização e Extensão

**Exercício 8: Cifra de Vigenère**
A Cifra de Vigenère é uma evolução do César que usa **chave de múltiplas letras**:
- Chave: `CHAVE` = [2, 7, 0, 21, 4]
- Cada letra do texto usa um deslocamento diferente (repetindo a chave)
- Exemplo: `ATAQUE` com chave `ABC`:
  - A + A(0) = A
  - T + B(1) = U
  - A + C(2) = C
  - Q + A(0) = Q
  - U + B(1) = V
  - E + C(2) = G

Implemente:
- Cifragem de Vigenère
- Decifragem de Vigenère
- Cálculo do **Índice de Coincidência** para detectar tamanho da chave

**Exercício 9: Quebra de Vigenère (Ataque Kasiski)**
Implemente o ataque de Kasiski:
1. Encontre sequências repetidas no texto cifrado (ex: "THE" aparece em múltiplos lugares)
2. Calcule distâncias entre repetições
3. Encontre MDC das distâncias → tamanho provável da chave
4. Use análise de frequência em cada posição

**Exercício 10: Cifra Playfair**
Cifra mais complexa que usa **matriz 5×5** e cifra **pares de letras**:
- Implementação completa (cifragem + decifragem)
- Tratamento de letras iguais no par (inserir 'X')
- Mesclagem de I/J (alfabeto de 25 letras)

### 🎯 Projeto Integrador

**Sistema Completo de Criptografia Clássica**

Crie uma aplicação com menu interativo que oferece:

**Funcionalidades**:
1. **Cifras disponíveis**:
   - César (com chave numérica)
   - Substituição (chave aleatória ou customizada)
   - Transposição colunar
   - Vigenère
   - ROT13 (César com k=13, cifra = decifra)

2. **Operações**:
   - Cifrar texto (escolha o método)
   - Decifrar texto (com chave conhecida)
   - Atacar texto cifrado (força bruta ou análise de frequência)
   - Gerar chaves aleatórias

3. **Análise**:
   - Estatísticas do texto (frequência de letras)
   - Índice de Coincidência
   - Comparação com frequências esperadas

4. **Interface**:
   - Menu de texto claro e intuitivo
   - Opção de ler/gravar arquivos
   - Exibição formatada de resultados
   - Cores no terminal (opcional)

**Critérios de avaliação**:
- Corretude de todos os algoritmos
- Código modular e bem documentado
- Tratamento de erros (entrada inválida, arquivo não encontrado)
- Interface amigável
- Criatividade nas extensões (cifras adicionais, visualizações)

---

## 📖 Referências e Leituras Recomendadas

1. **Singh, Simon**. *O Livro dos Códigos*. Record, 2001.
   - História fascinante da criptografia desde César até RSA

2. **Schneier, Bruce**. *Applied Cryptography*. Wiley, 1996.
   - Referência técnica completa

3. **Stallings, William**. *Cryptography and Network Security*. Pearson.
   - Abordagem acadêmica moderna

4. **The Code Book** (Documentário BBC)
   - Visualização excelente da história da criptografia

---

## 🔐 Conceitos-Chave para Fixação

- **Confidencialidade**: Privacidade da informação
- **Integridade**: Detecção de modificações
- **Autenticação**: Verificação de identidade
- **Não-repúdio**: Impossibilidade de negar autoria
- **Cifra de César**: Deslocamento fixo no alfabeto
- **Cifra de Substituição**: Mapeamento arbitrário letra-a-letra
- **Cifra de Transposição**: Reordenação das letras
- **Análise de Frequência**: Ataque estatístico baseado em padrões da língua
- **Criptografia Simétrica**: Mesma chave para cifrar/decifrar
- **Criptografia Assimétrica**: Par de chaves (pública/privada)

---

**Bons estudos e bem-vindo ao fascinante mundo da Criptografia!** 🔐✨
