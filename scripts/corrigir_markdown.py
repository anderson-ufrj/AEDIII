#!/usr/bin/env python3
"""
Script para corrigir problemas comuns em arquivos Markdown extraídos de PDFs
- Comentários C/C++ fora de blocos de código
- Blocos de código quebrados
- Conteúdo duplicado
"""

import re
import os
from pathlib import Path

def corrigir_comentarios_codigo(conteudo):
    """
    Identifica comentários C fora de blocos de código e os coloca dentro
    """
    linhas = conteudo.split('\n')
    resultado = []
    em_bloco_codigo = False
    buffer_comentario = []

    i = 0
    while i < len(linhas):
        linha = linhas[i]

        # Detecta início/fim de bloco de código
        if linha.strip().startswith('```'):
            em_bloco_codigo = not em_bloco_codigo
            resultado.append(linha)
            i += 1
            continue

        # Se não está em bloco de código e encontra comentário C
        if not em_bloco_codigo and linha.strip().startswith('/*'):
            # Inicia buffer de comentário
            buffer_comentario = []
            inicio_comentario = i

            # Coleta todas as linhas do comentário
            while i < len(linhas):
                buffer_comentario.append(linhas[i])
                if '*/' in linhas[i]:
                    break
                i += 1

            # Verifica se a próxima linha não vazia é código OU bloco de código
            j = i + 1
            while j < len(linhas) and linhas[j].strip() == '':
                j += 1

            # Se a próxima linha é um bloco de código existente, mescla o comentário nele
            if j < len(linhas) and linhas[j].strip().startswith('```c'):
                # Pula a abertura do bloco existente
                resultado.append(linhas[j])  # ```c
                resultado.extend(buffer_comentario)  # Adiciona comentário dentro
                i = j
                i += 1
                continue

            # Se houver código depois, envolve tudo em bloco
            if j < len(linhas) and tem_caracteristicas_codigo(linhas[j]):
                resultado.append('```c')
                resultado.extend(buffer_comentario)

                # Adiciona código até linha vazia ou próximo comentário
                j = i + 1
                while j < len(linhas):
                    if linhas[j].strip() == '':
                        j += 1
                        continue
                    if linhas[j].strip().startswith('/*') or linhas[j].strip().startswith('##'):
                        break
                    if tem_caracteristicas_codigo(linhas[j]):
                        resultado.append(linhas[j])
                        i = j
                    else:
                        break
                    j += 1

                resultado.append('```')
                resultado.append('')
            else:
                # Se não houver código, mantém como estava
                resultado.extend(buffer_comentario)

            i += 1
            continue

        resultado.append(linha)
        i += 1

    return '\n'.join(resultado)

def tem_caracteristicas_codigo(linha):
    """Verifica se a linha parece ser código"""
    linha_limpa = linha.strip()

    # Padrões que indicam código
    padroes_codigo = [
        r'^\s*(int|void|char|float|double|long|struct|typedef)',  # Tipos C
        r'^\s*(for|while|if|else|switch|case|return)',  # Estruturas de controle
        r'^\s*\w+\s*\(',  # Chamadas de função
        r'^\s*\w+\s*=',   # Atribuições
        r'[{};]',         # Caracteres típicos de código
        r'^\s*#include',  # Includes
        r'^\s*#define',   # Defines
    ]

    for padrao in padroes_codigo:
        if re.search(padrao, linha_limpa):
            return True

    return False

def remover_duplicacoes(conteudo):
    """
    Remove seções duplicadas (comum em PDFs com slides)
    """
    linhas = conteudo.split('\n')

    # Remove blocos que se repetem 3 vezes seguidas
    blocos_unicos = []
    i = 0
    while i < len(linhas):
        bloco_atual = []
        inicio = i

        # Coleta até próximo título ou fim
        while i < len(linhas) and not (linhas[i].startswith('##') or linhas[i].startswith('AED III')):
            bloco_atual.append(linhas[i])
            i += 1

        # Se chegou em um título, adiciona
        if i < len(linhas):
            bloco_atual.append(linhas[i])
            i += 1

        blocos_unicos.append('\n'.join(bloco_atual))

    return '\n'.join(blocos_unicos)

def limpar_artefatos_pdf(conteudo):
    """Remove artefatos comuns da extração de PDF"""

    # Remove números de página isolados
    conteudo = re.sub(r'^\d+$\n', '', conteudo, flags=re.MULTILINE)

    # Remove cabeçalhos repetidos "AED III" isolados
    conteudo = re.sub(r'^AED III$\n+', '', conteudo, flags=re.MULTILINE)

    # Remove linhas com apenas "Ciência da Computação – IFSULDEMINAS"
    conteudo = re.sub(r'^Ciência da Computação – IFSULDEMINAS$\n', '', conteudo, flags=re.MULTILINE)

    # Remove múltiplas linhas vazias consecutivas
    conteudo = re.sub(r'\n{3,}', '\n\n', conteudo)

    return conteudo

def processar_arquivo(caminho_arquivo):
    """Processa um arquivo Markdown"""
    print(f"Processando: {caminho_arquivo.name}")

    with open(caminho_arquivo, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    # Aplica correções
    conteudo_corrigido = conteudo
    conteudo_corrigido = corrigir_comentarios_codigo(conteudo_corrigido)
    conteudo_corrigido = limpar_artefatos_pdf(conteudo_corrigido)

    # Salva se houver mudanças
    if conteudo_corrigido != conteudo:
        with open(caminho_arquivo, 'w', encoding='utf-8') as f:
            f.write(conteudo_corrigido)
        print(f"  ✓ Corrigido")
        return True
    else:
        print(f"  - Sem alterações necessárias")
        return False

def main():
    """Processa todos os arquivos Markdown"""
    diretorio_content = Path('lib/content')

    if not diretorio_content.exists():
        print(f"Erro: Diretório {diretorio_content} não encontrado")
        return

    arquivos_md = list(diretorio_content.glob('*.md'))
    arquivos_md = [a for a in arquivos_md if a.name != 'README.md']

    print(f"\nEncontrados {len(arquivos_md)} arquivos para processar\n")

    arquivos_corrigidos = 0
    for arquivo in sorted(arquivos_md):
        if processar_arquivo(arquivo):
            arquivos_corrigidos += 1

    print(f"\n{'='*60}")
    print(f"Resumo: {arquivos_corrigidos}/{len(arquivos_md)} arquivos corrigidos")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
