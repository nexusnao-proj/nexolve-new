import Image from "next/image";
import type { IconName } from "@/lib/content/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const logoAssets: Record<string, string> = {
  "SAP Ariba": "/brand/proof/sap-ariba.webp",
  Coupa: "/brand/proof/coupa.webp",
  "Oracle Procurement": "/brand/proof/oracle.webp",
  Oracle: "/brand/proof/oracle.webp",
  "SAP Fieldglass": "/brand/proof/sap-fieldglass.webp",
  SpendConsole: "/brand/proof/spendconsole.webp",
};

function fallbackIcon(name: string): IconName {
  if (/AI|Analytics|Reporting/i.test(name)) return "sparkles";
  if (/API|SOAP|REST|Integration/i.test(name)) return "api";
  if (/DocuSign|OpenText/i.test(name)) return "pen";
  if (/Portal|Web|Next\.js|TypeScript/i.test(name)) return "browser";
  if (/S\/4HANA|ECC|MM|SD|Data/i.test(name)) return "database";
  return "layers";
}

export function TechnologyMark({
  name,
  compact = false,
  className,
}: {
  name: string;
  compact?: boolean;
  className?: string;
}) {
  const logo = logoAssets[name];

  return (
    <span className={cn("technology-mark", compact && "technology-mark--compact", className)}>
      <span className="technology-mark__visual" aria-hidden="true">
        {logo ? (
          <Image src={logo} alt="" width={240} height={72} sizes="150px" />
        ) : (
          <Icon name={fallbackIcon(name)} size={compact ? 17 : 20} />
        )}
      </span>
      <span className="technology-mark__name">{name}</span>
    </span>
  );
}
