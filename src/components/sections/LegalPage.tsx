import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";

type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

/**
 * Shared template for legal/policy pages. Content is drafted placeholder
 * text — have counsel review before treating any policy as final.
 */
export function LegalPage({
  title,
  lede,
  path,
  updated,
  sections,
}: {
  title: string;
  lede: string;
  path: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        lede={lede}
        crumbs={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <section className="bg-white">
        <Container className="max-w-3xl py-12 sm:py-16">
          <p className="text-sm text-ink-muted">Last updated: {updated}</p>
          <p className="mt-4 rounded-2xl border border-dashed border-line bg-neutral-light px-5 py-4 text-sm text-ink-muted">
            [Placeholder: this policy is a working draft. Have it reviewed by legal counsel and
            adjusted to your jurisdictions before publishing as final.]
          </p>
          {sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl font-extrabold tracking-tight text-ink">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-base leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 list-disc space-y-1.5 pl-6 text-base leading-relaxed text-ink-muted">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </Container>
      </section>
    </>
  );
}
