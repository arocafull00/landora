import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_COPY } from "../company-copy";

export function CompanyDetailsLink() {
  return <Button variant="outline" asChild><Link href="/company"><Building2 aria-hidden className="size-4" />{COMPANY_COPY.link}</Link></Button>;
}
