import Image from "next/image";
import type { IconName } from "@/lib/content/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Icon } from "@/components/ui/Icon";

const firmStats: { value: string; label: string; icon: IconName }[] = [
  { value: "15+", label: "Enterprise programmes", icon: "compass" },
  { value: "24+", label: "Years combined delivery", icon: "book" },
  { value: "9", label: "Platforms & modules", icon: "layers" },
  { value: "2", label: "Delivery regions", icon: "flow" },
];

/** Navy band carrying the firm statement and the delivery numbers behind it. */
export function ImpactBand() {
  return (
    <section className="impact-band" aria-labelledby="firm-statement-title">
      <div className="impact-band__media" aria-hidden="true">
        <Image
          src="/images/editorial/logistics-automation.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="max-w-[1440px] py-14 sm:py-20 lg:px-12">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="editorial-label text-white/55">The impact</p>
            <h2
              id="firm-statement-title"
              className="mt-5 max-w-lg text-3xl leading-[1.08] font-bold tracking-[-0.04em] text-white sm:text-[2.5rem]"
            >
              Procurement transformation only works when it runs in live operations.
            </h2>
            <p className="mt-6 max-w-xl text-[0.9375rem] leading-7 text-white/60">
              We design how organisations source, buy and pay — then implement it, integrate it and
              stay through adoption. Process credibility, platform depth and software engineering
              remain under one roof.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {firmStats.map((stat) => (
              <div key={stat.label} className="stat-tile">
                <Icon name={stat.icon} size={24} className="stat-tile__icon" />
                <div>
                  <dd className="stat-tile__value">{stat.value}</dd>
                  <dt className="stat-tile__label">{stat.label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
