#!/usr/bin/env python3
"""
Script final para limpar e formatar blocos de código corretamente.
Remove linhas em branco extras, mantém indentação e formata código C/C++.
"""

import re
from pathlib import Path

def clean_code_block(code_content):
    """Limpa código removendo linhas vazias excessivas e fixando indentação."""
    lines = code_content.split('\n')
    cleaned = []
    prev_empty = False

    for line in lines:
        # Se linha está vazia
        if not line.strip():
            # Só adiciona se a anterior não era vazia (max 1 linha vazia consecutiva)
            if not prev_empty and cleaned:
                cleaned.append('')
                prev_empty = True
        else:
            cleaned.append(line)
            prev_empty = False

    # Remove linhas vazias no início e fim
    while cleaned and not cleaned[0].strip():
        cleaned.pop(0)
    while cleaned and not cleaned[-1].strip():
        cleaned.pop()

    return '\n'.join(cleaned)

def fix_indentation(code):
    """Fix indentação de código C/C++."""
    lines = code.split('\n')
    fixed_lines = []
    indent_level = 0

    for line in lines:
        stripped = line.strip()
        if not stripped:
            fixed_lines.append('')
            continue

        # Reduz indentação antes de }
        if stripped.startswith('}'):
            indent_level = max(0, indent_level - 1)

        # Aplica indentação
        fixed_lines.append('    ' * indent_level + stripped)

        # Aumenta indentação após {
        if stripped.endswith('{'):
            indent_level += 1
        # Reduz após } se não foi início de linha
        elif stripped.endswith('}') and not stripped.startswith('}'):
            indent_level = max(0, indent_level - 1)

    return '\n'.join(fixed_lines)

def detect_language(code):
    """Detecta se é C ou C++ baseado no conteúdo."""
    cpp_indicators = [
        'using namespace',
        'std::',
        'cout',
        'cin',
        'vector<',
        'set<',
        'map<',
        'string',
        'bitset<',
        'multiset<'
    ]

    for indicator in cpp_indicators:
        if indicator in code:
            return 'cpp'

    return 'c'

def process_markdown(filepath):
    """Processa arquivo markdown corrigindo blocos de código."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex para encontrar blocos de código
    pattern = r'```(?:c|cpp)?\n(.*?)```'

    def replace_code_block(match):
        code = match.group(1)

        # Limpa o código
        cleaned = clean_code_block(code)

        # Fix indentação
        formatted = fix_indentation(cleaned)

        # Detecta linguagem
        lang = detect_language(formatted)

        return f'```{lang}\n{formatted}\n```'

    # Substitui todos os blocos
    fixed_content = re.sub(pattern, replace_code_block, content, flags=re.DOTALL)

    # Escreve de volta
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed_content)

    print(f"✓ {filepath.name}")

def main():
    content_dir = Path(__file__).parent.parent / 'lib' / 'content'

    # Arquivos para processar
    files_to_fix = [
        'estruturas1.md',
        'estruturas2.md',
        'estruturas3.md',
        'estruturas4.md',
        '002_-_AVL-Implementacao.md',
        '007_-_Entrada_e_Saida_com_Arquivos_Utilizando_a_Linguagem_C.md',
        'pesquisa_completa.md',
    ]

    print("Limpando e formatando blocos de código...")
    for filename in files_to_fix:
        filepath = content_dir / filename
        if filepath.exists():
            process_markdown(filepath)
        else:
            print(f"✗ {filename} não encontrado")

    print("\n✅ Formatação concluída!")

if __name__ == '__main__':
    main()
