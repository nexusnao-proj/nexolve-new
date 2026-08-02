import type { Faq } from "@/lib/content/types";
import { Reveal } from "@/components/animation/Reveal";

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Reveal group className="border-b border-black">
      {items.map((faq) => (
        <details key={faq.question} data-reveal className="group border-t border-black bg-white">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-bold text-ink sm:text-lg [&::-webkit-details-marker]:hidden">
            {faq.question}
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-black transition-transform duration-200 group-open:rotate-45"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </summary>
          <p className="max-w-2xl pb-7 pr-10 text-base leading-7 text-ink-muted">{faq.answer}</p>
        </details>
      ))}
    </Reveal>
  );
}
