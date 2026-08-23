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
      { label: "Insights", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: footerNav.legal,
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 py-12 lg:grid-cols-[1.25fr_1.35fr] lg:py-16">
          <div>
            <Link href="/" aria-label="Nexolve Technologies — home" className="inline-flex min-h-11 items-center">
              <BrandLogo light className="h-10" />
            </Link>
            <p className="mt-6 max-w-md text-xl font-bold tracking-[-0.035em] text-white sm:text-2xl">
              Procurement, solved.
            </p>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-[1.65] text-white/55">
              Supply chain and procurement transformation on SAP, Coupa and Oracle — with the integration, analytics and software engineering that connect everything together.
            </p>
            <div className="mt-6 text-[0.9375rem] leading-[1.65] text-white/55">
              <p>{site.email}</p>
              <p>{site.address}</p>
              <p>PSEB registered</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.title} aria-label={`Footer — ${column.title}`}>
                <h2 className="editorial-label text-white/45">{column.title}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link href={link.href} className="text-[0.8125rem] text-white/65 transition-colors hover:text-white">
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
        <div className="flex flex-col gap-4 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
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
