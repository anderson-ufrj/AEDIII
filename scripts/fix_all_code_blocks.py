#!/usr/bin/env python3
"""
Script final para corrigir TODOS os blocos de código nos arquivos markdown.
Remove linhas em branco desnecessárias e formata código C/C++ corretamente.
"""

import re
from pathlib import Path

def clean_code_content(content):
    """Remove linhas em branco extras dentro do código."""
    lines = content.split('\n')
    cleaned = []
    for line in lines:
        # Remove linhas completamente vazias entre código
        if line.strip() or (cleaned and cleaned[-1].strip()):
            cleaned.append(line)
    return '\n'.join(cleaned)

def process_markdown(filepath):
    """Processa arquivo markdown e corrige blocos de código."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove todos os code fences existentes primeiro
    content = re.sub(r'```c?\n?', '', content)

    # Split por seções (headers ##)
    parts = re.split(r'(^##[^\n]+$)', content, flags=re.MULTILINE)

    result = []
    for i, part in enumerate(parts):
        if part.startswith('##'):
            result.append(part)
        else:
            result.append(process_section(part))

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(''.join(result))

    print(f"✓ {filepath.name}")

def process_section(text):
    """Processa uma seção entre headers."""
    lines = text.split('\n')
    result = []
    code_buffer = []
    in_code = False

    for i, line in enumerate(lines):
        # Detecta início de código
        if not in_code and is_code_start(line):
            in_code = True
            code_buffer = [line]
        # Está coletando código
        elif in_code:
            # Verifica se deve parar
            if should_stop_code(line, lines, i):
                # Salva o código coletado
                if code_buffer:
                    code_text = '\n'.join(code_buffer)
                    # Remove linhas vazias excessivas
                    code_text = re.sub(r'\n\n\n+', '\n\n', code_text)
                    result.append('```c\n' + code_text + '\n```\n')
                    code_buffer = []
                in_code = False
                result.append(line)
            else:
                code_buffer.append(line)
        else:
            result.append(line)

    # Flush remaining code
    if code_buffer:
        code_text = '\n'.join(code_buffer)
        code_text = re.sub(r'\n\n\n+', '\n\n', code_text)
        result.append('```c\n' + code_text + '\n```\n')

    return '\n'.join(result)

def is_code_start(line):
    """Verifica se linha inicia um bloco de código."""
    patterns = [
        r'^\s*#include',
        r'^\s*#define',
        r'^\s*(int|void|bool|char|float|double|struct|class)\s+\w+.*\(',
        r'^\s*typedef\s+',
        r'^\s*//.*',
        r'^\s*/\*.*',
    ]
    return any(re.match(p, line) for p in patterns)

def should_stop_code(line, lines, index):
    """Verifica se deve parar de coletar código."""
    stripped = line.strip()

    # Linha vazia seguida de texto não-código
    if not stripped:
        if index + 1 < len(lines):
            next_line = lines[index + 1].strip()
            # Se próxima linha não é código e não é vazia
            if next_line and not is_code_line(next_line):
                return True
        return False

    # Texto descritivo (parágrafo)
    if len(stripped) > 60 and not any(c in stripped for c in ['{', '}', ';', '(', ')']):
        return True

    return False

def is_code_line(line):
    """Verifica se linha é código."""
    stripped = line.strip()
    if not stripped:
        return True  # Linhas vazias podem fazer parte do código

    # Comentários
    if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*/'):
        return True

    # Patterns de código
    code_indicators = [
        '#include', '#define', 'int ', 'void ', 'bool ', 'char ', 'float ',
        'double ', 'for ', 'while ', 'if ', 'else', 'return ', 'printf',
        'scanf', 'cout', 'cin', '{', '}', ';', '->', '::', 'struct ',
        'class ', 'typedef ', 'sizeof', '&&', '||', '++', '--'
    ]

    return any(indicator in stripped for indicator in code_indicators)

def main():
    content_dir = Path(__file__).parent.parent / 'lib' / 'content'

    files_to_fix = [
        'estruturas1.md',
        'estruturas2.md',
        'estruturas3.md',
        'estruturas4.md',
        '002_-_AVL-Implementacao.md',
        '007_-_Entrada_e_Saida_com_Arquivos_Utilizando_a_Linguagem_C.md',
        'pesquisa_completa.md',
    ]

    print("Corrigindo blocos de código...")
    for filename in files_to_fix:
        filepath = content_dir / filename
        if filepath.exists():
            process_markdown(filepath)
        else:
            print(f"✗ {filename} não encontrado")

    print("\n✅ Concluído!")

if __name__ == '__main__':
    main()
