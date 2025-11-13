#!/usr/bin/env python3
"""
Script para adicionar tabelas no arquivo mochila.md
"""

from pathlib import Path
import re

def add_tables_to_mochila():
    filepath = Path(__file__).parent.parent / 'lib' / 'content' / 'mochila.md'

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Padrão para tabelas de itens (que se repetem várias vezes)
    table_pattern = r'Item\n\nValor \(R\$\)\n\nPeso \(Kg\)\n\nValor por Kg\n\n1\n\n60\n\n10\n\n6\n\n2\n\n100\n\n20\n\n5\n\n3\n\n120\n\n30\n\n4'

    table_replacement = '''| Item | Valor (R$) | Peso (Kg) | Valor por Kg |
|------|------------|-----------|--------------|
| 1    | 60         | 10        | 6            |
| 2    | 100        | 20        | 5            |
| 3    | 120        | 30        | 4            |'''

    # Substitui todas as ocorrências
    content = content.replace(table_pattern, table_replacement)

    # Escreve de volta
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print("✓ Tabelas adicionadas em mochila.md")

if __name__ == '__main__':
    add_tables_to_mochila()
