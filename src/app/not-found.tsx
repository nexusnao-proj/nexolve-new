import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="bg-grid relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-32 right-[-10%] size-[420px] rounded-full bg-gradient-brand-soft blur-3xl"
      />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <LogoMark size={64} />
        <p className="mt-8 text-xs font-bold tracking-[0.22em] text-violet uppercase">Error 404</p>
        <h1 className="mt-4 max-w-xl text-4xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl">
          This page took a different path.
        </h1>
        <p className="mt-5 max-w-md text-lg text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
          somewhere useful.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/" size="lg">
            Back to home
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="secondary">
            Explore services
          </ButtonLink>
        </div>
        <p className="mt-10 text-sm text-ink-muted">
          Looking for something specific?{" "}
          <Link href="/contact" className="font-bold text-violet underline">
            Ask us directly
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
