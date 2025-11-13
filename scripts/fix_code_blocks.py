#!/usr/bin/env python3
"""
Script to automatically detect and wrap C/C++ code blocks in markdown files.
Identifies code patterns and adds proper markdown code fences.
"""

import re
import os
from pathlib import Path

def is_code_line(line):
    """Check if a line looks like C/C++ code."""
    code_patterns = [
        r'^\s*#include\s*<',
        r'^\s*#define\s+',
        r'^\s*(int|void|bool|char|float|double|long|short|unsigned)\s+\w+',
        r'^\s*(for|while|if|else|return|switch|case|break|continue)\s*[\(\{]',
        r'^\s*\/\/',  # Single line comment
        r'^\s*\/\*',  # Multi-line comment start
        r'^\s*\*\/',  # Multi-line comment end
        r'^\s*\{',    # Opening brace
        r'^\s*\}',    # Closing brace
        r'^\s*printf\s*\(',
        r'^\s*scanf\s*\(',
        r'^\s*cout\s*<<',
        r'^\s*cin\s*>>',
        r'^\s*std::',
        r'^\s*using\s+namespace',
        r'^\s*class\s+\w+',
        r'^\s*struct\s+\w+',
    ]

    stripped = line.strip()
    if not stripped or stripped.startswith('##'):
        return False

    return any(re.match(pattern, line) for pattern in code_patterns)

def process_markdown_file(filepath):
    """Process a markdown file and wrap code blocks."""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    code_buffer = []
    code_line_count = 0
    blank_line_tolerance = 0

    i = 0
    while i < len(lines):
        line = lines[i]

        # Skip if already in a code fence
        if line.strip().startswith('```'):
            new_lines.append(line)
            i += 1
            continue

        # Skip headers
        if line.strip().startswith('##'):
            # Flush code buffer if exists
            if code_line_count >= 3:
                new_lines.append('```c\n')
                new_lines.extend(code_buffer)
                new_lines.append('```\n\n')
            else:
                new_lines.extend(code_buffer)
            code_buffer = []
            code_line_count = 0
            blank_line_tolerance = 0
            new_lines.append(line)
            i += 1
            continue

        # Check if this looks like code
        if is_code_line(line):
            code_buffer.append(line)
            code_line_count += 1
            blank_line_tolerance = 3  # Allow up to 3 blank lines within code
        elif line.strip() == '' and blank_line_tolerance > 0:
            # Empty line within code block
            code_buffer.append(line)
            blank_line_tolerance -= 1
        else:
            # Not code line - flush buffer if we have enough code
            if code_line_count >= 3:
                new_lines.append('```c\n')
                new_lines.extend(code_buffer)
                new_lines.append('```\n\n')
            else:
                new_lines.extend(code_buffer)

            code_buffer = []
            code_line_count = 0
            blank_line_tolerance = 0
            new_lines.append(line)

        i += 1

    # Flush any remaining code
    if code_line_count >= 3:
        new_lines.append('```c\n')
        new_lines.extend(code_buffer)
        new_lines.append('```\n')
    elif code_buffer:
        new_lines.extend(code_buffer)

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    print(f"Processed: {filepath.name}")

def main():
    """Process all markdown files in lib/content."""
    content_dir = Path(__file__).parent.parent / 'lib' / 'content'

    if not content_dir.exists():
        print(f"Error: {content_dir} does not exist")
        return

    md_files = list(content_dir.glob('*.md'))
    print(f"Found {len(md_files)} markdown files")

    for md_file in md_files:
        if md_file.name == 'README.md':
            continue
        process_markdown_file(md_file)

    print("Done!")

if __name__ == '__main__':
    main()
