#!/usr/bin/env python3
"""
Script completo para substituir todas as tabelas no mochila.md
"""

from pathlib import Path
import re

def fix_mochila_tables():
    filepath = Path(__file__).parent.parent / 'lib' / 'content' / 'mochila.md'

    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    result = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Detecta início de tabela (linha "Item")
        if line == "Item" and i + 1 < len(lines) and lines[i + 1].strip() == "":
            # Verifica se é seguido por "Valor (R$)"
            if i + 2 < len(lines) and lines[i + 2].strip() == "Valor (R$)":
                # É uma tabela! Pula todas as linhas da tabela mal formatada
                # e adiciona tabela markdown
                result.append("\n")
                result.append("| Item | Valor (R$) | Peso (Kg) | Valor por Kg |\n")
                result.append("|------|------------|-----------|--------------|\n")
                result.append("| 1    | 60         | 10        | 6            |\n")
                result.append("| 2    | 100        | 20        | 5            |\n")
                result.append("| 3    | 120        | 30        | 4            |\n")
                result.append("\n")

                # Pula as 24 linhas da tabela mal formatada
                # Item, vazio, Valor, vazio, Peso, vazio, Valor por Kg, vazio,
                # 1, vazio, 60, vazio, 10, vazio, 6, vazio,
                # 2, vazio, 100, vazio, 20, vazio, 5, vazio,
                # 3, vazio, 120, vazio, 30, vazio, 4, vazio
                i += 25  # 24 linhas + linha atual
                continue

        result.append(lines[i])
        i += 1

    # Escreve de volta
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(result)

    print("✓ Todas as tabelas corrigidas em mochila.md")

if __name__ == '__main__':
    fix_mochila_tables()
