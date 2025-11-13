#!/usr/bin/env python3
"""
PDF to Markdown Converter for AED III Course Materials
Extracts text and images from PDFs and converts to organized Markdown files
"""

import os
import sys
from pathlib import Path
from typing import List, Dict
import argparse

try:
    import PyPDF2
    import pymupdf  # fitz
    from PIL import Image
except ImportError:
    print("Installing required packages...")
    os.system("pip install PyPDF2 pymupdf Pillow")
    import PyPDF2
    import pymupdf
    from PIL import Image


class PDFExtractor:
    def __init__(self, docs_dir: str, output_dir: str):
        self.docs_dir = Path(docs_dir)
        self.output_dir = Path(output_dir)
        self.images_dir = self.output_dir / "images"

        # Create output directories
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.images_dir.mkdir(parents=True, exist_ok=True)

    def extract_pdf_metadata(self, pdf_path: Path) -> Dict:
        """Extract metadata from PDF"""
        try:
            doc = pymupdf.open(pdf_path)
            metadata = {
                'title': doc.metadata.get('title', pdf_path.stem),
                'author': doc.metadata.get('author', 'IFSULDEMINAS'),
                'pages': len(doc),
                'file_size': pdf_path.stat().st_size,
            }
            doc.close()
            return metadata
        except Exception as e:
            print(f"Error extracting metadata from {pdf_path.name}: {e}")
            return {
                'title': pdf_path.stem,
                'author': 'IFSULDEMINAS',
                'pages': 0,
                'file_size': pdf_path.stat().st_size,
            }

    def extract_text_and_images(self, pdf_path: Path) -> str:
        """Extract text and images from PDF and convert to Markdown"""
        try:
            doc = pymupdf.open(pdf_path)
            markdown_content = []

            # Add frontmatter
            metadata = self.extract_pdf_metadata(pdf_path)
            markdown_content.append("---")
            markdown_content.append(f"title: \"{metadata['title']}\"")
            markdown_content.append(f"author: \"{metadata['author']}\"")
            markdown_content.append(f"pages: {metadata['pages']}")
            markdown_content.append(f"source: \"{pdf_path.name}\"")
            markdown_content.append("---")
            markdown_content.append("")
            markdown_content.append(f"# {metadata['title']}")
            markdown_content.append("")

            # Process each page
            for page_num, page in enumerate(doc, start=1):
                # Extract text
                text = page.get_text()
                if text.strip():
                    # Clean and format text
                    text = self._clean_text(text)
                    markdown_content.append(f"\n## Página {page_num}\n")
                    markdown_content.append(text)

                # Extract images
                image_list = page.get_images()
                for img_index, img in enumerate(image_list):
                    try:
                        xref = img[0]
                        base_image = doc.extract_image(xref)
                        image_bytes = base_image["image"]
                        image_ext = base_image["ext"]

                        # Save image
                        image_filename = f"{pdf_path.stem}_p{page_num}_img{img_index}.{image_ext}"
                        image_path = self.images_dir / image_filename

                        with open(image_path, "wb") as img_file:
                            img_file.write(image_bytes)

                        # Add image reference to markdown
                        markdown_content.append(f"\n![Imagem {img_index + 1}](../images/{image_filename})\n")
                    except Exception as e:
                        print(f"Error extracting image {img_index} from page {page_num}: {e}")

            doc.close()
            return "\n".join(markdown_content)

        except Exception as e:
            print(f"Error processing {pdf_path.name}: {e}")
            return f"# Erro ao processar {pdf_path.name}\n\nErro: {str(e)}"

    def _clean_text(self, text: str) -> str:
        """Clean and format extracted text"""
        # Remove excessive whitespace
        lines = [line.strip() for line in text.split('\n')]
        lines = [line for line in lines if line]

        # Join lines
        cleaned = '\n\n'.join(lines)

        return cleaned

    def get_topic_order(self, filename: str) -> int:
        """Extract order number from filename"""
        # Try to extract number from filename like "001_-_AVL.pdf"
        try:
            if filename[0].isdigit():
                return int(filename.split('_')[0])
        except:
            pass
        return 999  # Put files without number at the end

    def process_all_pdfs(self):
        """Process all PDFs in the docs directory"""
        pdf_files = sorted(
            list(self.docs_dir.glob("*.pdf")),
            key=lambda x: self.get_topic_order(x.name)
        )

        print(f"Found {len(pdf_files)} PDF files to process")

        # Create index file
        index_content = ["# Material Didático - Algoritmos e Estruturas de Dados III\n"]
        index_content.append("## Tópicos do Curso\n")

        for pdf_file in pdf_files:
            print(f"\nProcessing: {pdf_file.name}")

            # Extract content
            markdown_content = self.extract_text_and_images(pdf_file)

            # Save markdown file
            output_file = self.output_dir / f"{pdf_file.stem}.md"
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(markdown_content)

            print(f"  ✓ Saved to: {output_file.name}")

            # Add to index
            metadata = self.extract_pdf_metadata(pdf_file)
            index_content.append(f"- [{metadata['title']}](./{pdf_file.stem}.md)")

        # Save index file
        index_file = self.output_dir / "README.md"
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(index_content))

        print(f"\n✓ All PDFs processed successfully!")
        print(f"✓ Index created: {index_file}")
        print(f"✓ Output directory: {self.output_dir}")


def main():
    parser = argparse.ArgumentParser(
        description='Extract PDFs to Markdown for AED III course'
    )
    parser.add_argument(
        '--docs-dir',
        default='./docs',
        help='Directory containing PDF files (default: ./docs)'
    )
    parser.add_argument(
        '--output-dir',
        default='./content',
        help='Output directory for Markdown files (default: ./content)'
    )

    args = parser.parse_args()

    extractor = PDFExtractor(args.docs_dir, args.output_dir)
    extractor.process_all_pdfs()


if __name__ == "__main__":
    main()
