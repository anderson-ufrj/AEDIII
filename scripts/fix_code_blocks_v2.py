#!/usr/bin/env python3
"""
Better script to wrap C/C++ code blocks - identifies complete code sections.
"""

import re
from pathlib import Path

def process_file(filepath):
    """Process markdown file to wrap code sections in fences."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into sections by headers
    sections = re.split(r'(^##[^\n]+$)', content, flags=re.MULTILINE)

    new_sections = []
    for section in sections:
        if section.strip().startswith('##'):
            new_sections.append(section)
        else:
            # Process section content
            new_sections.append(wrap_code_in_section(section))

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(''.join(new_sections))

    print(f"Processed: {filepath.name}")

def wrap_code_in_section(text):
    """Wrap code blocks in a section."""
    lines = text.split('\n')
    result = []
    in_fence = False
    code_block = []

    i = 0
    while i < len(lines):
        line = lines[i]

        # Already in fence
        if line.strip().startswith('```'):
            result.append(line)
            in_fence = not in_fence
            i += 1
            continue

        if in_fence:
            result.append(line)
            i += 1
            continue

        # Check for code pattern start
        if re.match(r'^\s*(#include|#define|int |void |bool |char |float |double |struct |class )', line):
            # Start collecting code
            code_block = [line]
            j = i + 1

            # Collect until we hit a clear non-code line
            while j < len(lines):
                next_line = lines[j]

                # Stop conditions
                if next_line.strip() == '' and (j + 1 >= len(lines) or lines[j + 1].strip() == ''):
                    # Two blank lines
                    break
                if next_line.strip().startswith('##'):
                    break
                if next_line.strip() and not is_code_or_blank(next_line):
                    break

                code_block.append(next_line)
                j += 1

            # If we collected enough code lines, wrap it
            non_blank = [l for l in code_block if l.strip()]
            if len(non_blank) >= 3:
                result.append('```c')
                result.extend(code_block)
                result.append('```')
                result.append('')
                i = j
            else:
                result.extend(code_block)
                i = j
        else:
            result.append(line)
            i += 1

    return '\n'.join(result)

def is_code_or_blank(line):
    """Check if line is code or blank."""
    stripped = line.strip()
    if not stripped:
        return True

    # Comments
    if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*/') or stripped.startswith('*'):
        return True

    # Code patterns
    code_patterns = [
        r'^#(include|define|ifdef|ifndef|endif)',
        r'^(int|void|bool|char|float|double|long|short|unsigned|signed)\s',
        r'^(for|while|if|else|return|switch|case|break|continue|do|goto)\s*[\(\{]',
        r'^\{',
        r'^\}',
        r'^(printf|scanf|cout|cin|std::)',
        r'^\w+\s*\(',  # Function calls
        r'^\w+\s*=',   # Assignments
        r'^\w+\s*\[',  # Array access
        r'->',         # Pointer access
        r'[;,]$',      # Ends with ; or ,
    ]

    return any(re.search(pattern, stripped) for pattern in code_patterns)

def main():
    content_dir = Path(__file__).parent.parent / 'lib' / 'content'

    # First, remove all existing code fences to start fresh
    md_files = list(content_dir.glob('*.md'))
    print(f"Found {len(md_files)} files")

    for md_file in md_files:
        if md_file.name == 'README.md':
            continue
        process_file(md_file)

    print("Done!")

if __name__ == '__main__':
    main()
