"use client";

import type { CatalogQuery } from "@/lib/schemas/products";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";

const TAB_ITEMS = [
  { value: "all", label: PRODUCTS_LIST_COPY.tabs.all },
  { value: "published", label: PRODUCTS_LIST_COPY.tabs.published },
  { value: "draft", label: PRODUCTS_LIST_COPY.tabs.draft },
  { value: "archived", label: PRODUCTS_LIST_COPY.tabs.archived },
] as const;

const TRIGGER_CLASS =
  "h-auto flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2.5 text-sm font-medium text-ink-subtle shadow-none after:hidden hover:text-ink data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none dark:data-[state=active]:border-primary dark:data-[state=active]:bg-transparent";

export function ProductsStatusTabs({
  status,
  onStatusChange,
}: {
  status: CatalogQuery["status"];
  onStatusChange: (status: CatalogQuery["status"]) => void;
}) {
  return (
    <Tabs value={status} onValueChange={(value) => onStatusChange(value as CatalogQuery["status"])} className="gap-0 pl-0">
      <TabsList variant="line" className="group-data-[orientation=horizontal]/tabs:h-auto w-full justify-start gap-1 rounded-none p-0">
        {TAB_ITEMS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className={TRIGGER_CLASS}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
