"use client";

import type { ProductDto } from "@/lib/domain/dtos";
import type { CatalogQuery } from "@/lib/schemas/products";
import { ProductDrawer } from "./components/product-drawer";
import { ProductsActiveFilters } from "./components/products-active-filters";
import { ProductsBatchBar } from "./components/products-batch-bar";
import { ProductsHeader } from "./components/products-header";
import { ProductsPagination } from "./components/products-pagination";
import { ProductsStatusTabs } from "./components/products-status-tabs";
import { ProductsTable } from "./components/products-table";
import { ProductsToolbar } from "./components/products-toolbar";
import { useProductCommand } from "./hooks/use-product-command";
import { useProductsDrawer } from "./hooks/use-products-drawer";
import { useProductsNavigation } from "./hooks/use-products-navigation";
import { useProductsSelection } from "./hooks/use-products-selection";

export function ProductsListClient({
  landingId,
  query,
  products,
  categories,
  brands,
  sizes,
  total,
  page,
}: {
  landingId: string;
  query: CatalogQuery;
  products: ProductDto[];
  categories: string[];
  brands: string[];
  sizes: string[];
  total: number;
  page: number;
}) {
  const { drawer, open, openNew, openEdit, onOpenChange } = useProductsDrawer();
  const { pending, command, batchCommand } = useProductCommand(landingId);
  const navigation = useProductsNavigation(query);
  const selection = useProductsSelection(products);
  const drawerProduct = drawer.mode === "edit" ? drawer.product : null;
  const handleBatchPublish = () => {
    batchCommand(selection.selectedProducts, "publish");
    selection.clear();
  };
  const handleBatchArchive = () => {
    batchCommand(selection.selectedProducts, "archive");
    selection.clear();
  };

  return (
    <>
      <ProductsHeader total={total} onNew={openNew} />
      <section className="overflow-hidden rounded-2xl border border-line bg-surface-container-lowest shadow-soft">
        <div className="border-b border-line px-4 pt-4">
          <ProductsStatusTabs status={query.status} onStatusChange={navigation.setStatus} />
        </div>
        <ProductsToolbar
          key={`${query.q}:${query.sort}`}
          query={query}
          total={total}
          categories={categories}
          brands={brands}
          sizes={sizes}
          onSearch={navigation.setSearch}
          onApplyFilters={navigation.applyFilters}
          onSortChange={navigation.setSort}
        />
        <ProductsActiveFilters query={query} onRemove={navigation.removeFilter} onClear={navigation.clearFilters} />
        <ProductsBatchBar
          count={selection.selectedCount}
          pending={pending}
          onPublish={handleBatchPublish}
          onArchive={handleBatchArchive}
          onClear={selection.clear}
        />
        <ProductsTable
          products={products}
          selectedIds={selection.selectedIds}
          allSelected={selection.allSelected}
          indeterminate={selection.indeterminate}
          pending={pending}
          onToggleAll={selection.toggleAll}
          onToggle={selection.toggle}
          onEdit={openEdit}
          onCommand={command}
        />
        <ProductsPagination page={page} total={total} pageHref={navigation.pageHref} />
      </section>
      <ProductDrawer
        key={drawer.mode === "edit" ? `${drawer.product.id}:${drawer.product.version}` : drawer.mode === "new" ? "new" : "closed"}
        open={open}
        onOpenChange={onOpenChange}
        landingId={landingId}
        product={drawerProduct}
        categories={categories}
        brands={brands}
      />
    </>
  );
}
