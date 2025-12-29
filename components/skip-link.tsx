interface SkipLinkItem {
  href: string;
  label: string;
}

interface SkipLinkProps {
  links?: SkipLinkItem[];
}

const defaultLinks: SkipLinkItem[] = [
  { href: "#main-content", label: "Pular para o conteúdo principal" },
  { href: "#navigation", label: "Pular para a navegação" },
  { href: "#search", label: "Pular para a busca" },
];

export function SkipLink({ links = defaultLinks }: SkipLinkProps) {
  return (
    <div className="skip-links">
      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:shadow-lg"
          style={{
            top: `${16 + index * 48}px`,
            left: "16px",
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
