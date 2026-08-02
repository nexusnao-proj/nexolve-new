import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { isPlaceholder } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Platforms", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Work", href: "/work" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t-2 border-white/15 bg-[#0e1418] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 py-12 lg:grid-cols-[1.35fr_1fr] lg:py-16">
          <div>
            <Link href="/" aria-label="Nexolve Technologies — home" className="inline-flex min-h-11 items-center">
              <BrandLogo light className="h-10" />
            </Link>
            <p className="mt-7 max-w-md text-2xl font-semibold tracking-[-0.04em] text-white/90 sm:text-3xl">
              Procurement, solved.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Supply chain and procurement transformation on SAP, Coupa and Oracle — with the integration, analytics and software engineering that connect everything together.
            </p>
            <div className="mt-7 border-l border-white/25 pl-4 text-sm leading-7 text-white/60">
              <p>{site.email}</p>
              <p>{site.address}</p>
              <p>PSEB registered</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {columns.map((column) => (
              <nav key={column.title} aria-label={`Footer — ${column.title}`}>
                <h2 className="editorial-label text-white/55">{column.title}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="hairline-spectrum" />
        <div className="flex flex-col gap-5 py-7 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footerNav.legal.map((link) => (
                <li key={link.href}><Link href={link.href} className="transition-colors hover:text-white">{link.label}</Link></li>
              ))}
            </ul>
          </nav>
          {Object.values(site.social).some((value) => !isPlaceholder(value)) && (
            <nav aria-label="Social media">
              <ul className="flex gap-4">
                {Object.entries(site.social).filter(([, url]) => !isPlaceholder(url)).map(([name, url]) => (
                  <li key={name}><a href={url} target="_blank" rel="noreferrer" className="capitalize hover:text-white">{name}</a></li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
