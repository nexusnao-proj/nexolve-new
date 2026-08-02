import { cn } from "@/lib/utils";

type MatrixMarkProps = {
  className?: string;
  dark?: boolean;
  animated?: boolean;
  title?: string;
  cut?: "full" | "compact" | "micro";
};

/** Official Matrix O construction with the mandated size-reduction cuts. */
export function MatrixMark({
  className,
  dark = false,
  animated = false,
  title,
  cut = "full",
}: MatrixMarkProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      className={cn(
        "matrix-mark",
        `matrix-mark--${cut}`,
        dark && "matrix-mark--dark",
        animated && "matrix-mark--animated",
        className,
      )}
    >
      <g fill="none">
        <circle className="matrix-mark__ring matrix-mark__ring--outer" cx="48" cy="48" r="38" strokeWidth="10" strokeDasharray="3 10.264" />
        {cut !== "micro" ? <circle className="matrix-mark__ring matrix-mark__ring--middle" cx="48" cy="48" r="27" strokeWidth="7" strokeDasharray="2.5 8.81" /> : null}
        {cut === "full" ? <circle className="matrix-mark__ring matrix-mark__ring--inner" cx="48" cy="48" r="17" strokeWidth="5" strokeDasharray="2 6.901" /> : null}
      </g>
      <circle className="matrix-mark__core" cx="48" cy="48" r={cut === "full" ? 5 : cut === "compact" ? 7 : 11} />
    </svg>
  );
}
