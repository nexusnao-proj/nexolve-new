import { techStack } from "@/lib/content/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/animation/Marquee";
import { Reveal } from "@/components/animation/Reveal";

const marqueeItems = techStack.flatMap((group) => group.items);

export function TechStackSection() {
  return (
    <section className="bg-white">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="Platform landscape"
          title="The stack we work across"
          lede="Four layers, from the source-to-pay platform down to the integration fabric — implemented and supported in live operation."
          align="center"
        />
      </Container>
      <Marquee className="border-y border-line py-5" trackClassName="gap-0">
        {marqueeItems.map((item) => (
          <span
            key={item}
            className="mx-3 inline-flex items-center gap-2 rounded-full border border-line bg-neutral-light px-5 py-2 text-sm font-bold whitespace-nowrap text-ink"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-gradient-brand" />
            {item}
          </span>
        ))}
      </Marquee>
      <Container className="pt-14 pb-20">
        <Reveal group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((group) => (
            <div key={group.group} data-reveal className="rounded-3xl border border-line p-6">
              <h3 className="text-sm font-extrabold tracking-wide text-ink">{group.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-neutral-light px-3 py-1 text-xs font-semibold text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
