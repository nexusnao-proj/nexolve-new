import Image from "next/image";
import type { ContentCover } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type CardCoverProps = {
  cover: ContentCover;
  sizes: string;
  className?: string;
};

/** Stable, reusable 16:9 media header for linked content cards. */
export function CardCover({ cover, sizes, className }: CardCoverProps) {
  return (
    <div
      className={cn("relative aspect-video w-full shrink-0 overflow-hidden bg-navy/5", className)}
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
      />
    </div>
  );
}
