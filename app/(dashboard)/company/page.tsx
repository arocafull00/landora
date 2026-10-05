import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { CompanyDetails } from "@/components/dashboard/company/page.client";
import { COMPANY_COPY } from "@/components/dashboard/company/company-copy";

export default function CompanyPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <DashboardPageHeader title={COMPANY_COPY.title} description={COMPANY_COPY.description} />
      <a href="#company-main" className="sr-only focus:not-sr-only focus:p-4">{COMPANY_COPY.skip}</a>
      <main id="company-main" className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl"><CompanyDetails /></div>
      </main>
    </div>
  );
}
