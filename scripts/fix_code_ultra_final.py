#!/usr/bin/env python3
"""
Script ultra final para limpar blocos de código.
Remove TODAS as linhas vazias desnecessárias.
"""

import re
from pathlib import Path

def clean_code_aggressively(code):
    """Remove linhas vazias agressivamente, mantendo apenas onde faz sentido."""
    lines = code.split('\n')
    result = []
    prev_line = ""

    for line in lines:
        stripped = line.strip()

        # Pula linhas completamente vazias
        if not stripped:
            # Só mantém linha vazia se a anterior e próxima forem código
            # E a anterior não for { e próxima não for }
            continue

        # Remove indentação errada e reconstrói
        result.append(stripped)
        prev_line = stripped

    return result

def apply_proper_indentation(lines):
    """Aplica indentação correta baseada em C/C++."""
    result = []
    indent = 0

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        # Diminui indentação se linha começa com }
        if stripped.startswith('}'):
            indent = max(0, indent - 1)

        # Adiciona linha com indentação
        result.append('    ' * indent + stripped)

        # Aumenta indentação se termina com {
        if stripped.endswith('{'):
            indent += 1
        # Se linha é }, diminui
        elif stripped == '}':
            pass  # já diminuiu antes

    # Agora adiciona linhas vazias apenas onde semanticamente apropriado
    final = []
    for i, line in enumerate(result):
        final.append(line)

        # Adiciona linha vazia após }  se próxima linha não for } e não for última
        if i < len(result) - 1:
            if line.strip().endswith('}') and not result[i + 1].strip().startswith('}'):
                # Mas não se for o último } da função
                if not (line.strip() == '}' and i + 1 < len(result) and result[i + 1].strip() == '}'):
                    final.append('')

    # Remove linha vazia final se existir
    while final and final[-1] == '':
        final.pop()

    return '\n'.join(final)

def detect_language(code):
    """Detecta linguagem."""
    cpp_keywords = ['using namespace', 'cout', 'cin', 'std::', 'vector<', 'set<', 'map<', 'string', 'bitset<']
    return 'cpp' if any(kw in code for kw in cpp_keywords) else 'c'

def process_file(filepath):
    """Processa arquivo removendo linhas vazias dos códigos."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def fix_code_block(match):
        lang_tag = match.group(1) or ''
        code = match.group(2)

        # Limpa agressivamente
        cleaned_lines = clean_code_aggressively(code)

        # Aplica indentação
        formatted = apply_proper_indentation(cleaned_lines)

        # Detecta linguagem se não especificada
        if not lang_tag:
            lang_tag = detect_language(formatted)
        else:
            lang_tag = lang_tag.strip()

        return f'```{lang_tag}\n{formatted}\n```'

    # Pattern para blocos de código
    pattern = r'```(c|cpp)?\s*\n(.*?)```'
    fixed = re.sub(pattern, fix_code_block, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed)

    print(f"✓ {filepath.name}")

def main():
    content_dir = Path(__file__).parent.parent / 'lib' / 'content'

    files = [
        'estruturas1.md',
        'estruturas2.md',
        'estruturas3.md',
        'estruturas4.md',
        '002_-_AVL-Implementacao.md',
        '007_-_Entrada_e_Saida_com_Arquivos_Utilizando_a_Linguagem_C.md',
        'pesquisa_completa.md',
    ]

    print("Limpeza agressiva de blocos de código...")
    for filename in files:
        filepath = content_dir / filename
        if filepath.exists():
            process_file(filepath)
        else:
            print(f"✗ {filename}")

    print("\n✅ Concluído!")

if __name__ == '__main__':
    main()
