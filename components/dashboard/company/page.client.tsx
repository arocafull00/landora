"use client";

import { CompanyDetailsForm } from "./components/company-details-form";
import { useCompanyDetails } from "./hooks/use-company-details";

export function CompanyDetails() {
  const details = useCompanyDetails();
  return <CompanyDetailsForm {...details} />;
}
