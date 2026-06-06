"use client";

import { settingCategories, settingPages } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { ActionButton, IconButton, Panel, StatusBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";

export function SettingsSection() {
  const activeCategory = useDashboardStore(
    (state) => state.activeSettingCategory,
  );
  const activePage = useDashboardStore((state) => state.activeSettingPage);
  const setActiveCategory = useDashboardStore(
    (state) => state.setActiveSettingCategory,
  );
  const setActivePage = useDashboardStore((state) => state.setActiveSettingPage);

  return (
    <>
      <aside className="flex w-64 shrink-0 flex-col border-r border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-outline-variant p-4">
          <h2 className="text-body-sm font-medium text-on-surface">
            Configuration
          </h2>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto p-2">
          {settingCategories.map((category) => (
            <button
              className={`w-full rounded-md px-3 py-2 text-left text-body-sm transition-colors ${
                activeCategory === category
                  ? "bg-surface-container-low font-medium text-primary"
                  : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
              }`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </aside>
      <aside className="flex w-72 shrink-0 flex-col border-r border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-outline-variant p-4">
          <h2 className="text-body-sm font-medium text-on-surface">
            {activeCategory}
          </h2>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto p-2">
          {settingPages.map((page) => (
            <button
              className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors ${
                activePage === page
                  ? "bg-surface-container-low text-primary"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`}
              key={page}
              onClick={() => setActivePage(page)}
              type="button"
            >
              <span className="text-body-sm font-medium">{page}</span>
              {activePage === page ? <Icon name="chevron" className="h-4 w-4" /> : null}
            </button>
          ))}
        </div>
      </aside>
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-surface-bg">
        <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest p-6">
          <StatusBadge status="Live" />
          <IconButton icon="more" label="More settings" />
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-3xl space-y-10">
            <section>
              <h3 className="mb-6 font-headline text-headline-md text-on-surface">
                Project Information
              </h3>
              <Panel className="space-y-6 p-6">
                <Field label="PROJECT NAME">
                  <input
                    className="w-full rounded-md border border-outline-variant bg-surface-bg px-3 py-2 text-body-sm text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    defaultValue="Landora CMS"
                    type="text"
                  />
                  <p className="mt-1.5 text-[12px] text-on-surface-variant">
                    This is the name displayed in your dashboard and communications.
                  </p>
                </Field>
                <Field label="PROJECT ID">
                  <div className="flex items-center">
                    <input
                      className="w-full rounded-l-md border border-outline-variant bg-surface-variant px-3 py-2 font-mono text-[13px] text-on-surface-variant"
                      disabled
                      type="text"
                      value="prj_x7y8z9a1b2c3"
                    />
                    <button
                      aria-label="Copy project ID"
                      className="flex h-[38px] items-center justify-center rounded-r-md border-y border-r border-outline-variant bg-surface-container-high px-4 text-on-surface transition-colors hover:bg-outline-variant"
                      type="button"
                    >
                      <Icon name="copy" className="h-4 w-4" />
                    </button>
                  </div>
                </Field>
              </Panel>
            </section>
            <section>
              <h3 className="mb-6 font-headline text-headline-md text-on-surface">
                Appearance
              </h3>
              <Panel className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-body-sm font-medium text-on-surface">
                      Dark Mode
                    </h4>
                    <p className="mt-0.5 text-[12px] text-on-surface-variant">
                      Force dark mode for all users of this project.
                    </p>
                  </div>
                  <button
                    aria-label="Dark mode disabled"
                    className="relative h-6 w-11 rounded-full bg-primary opacity-70"
                    type="button"
                  >
                    <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
                <div className="flex items-center justify-between border-t border-outline-variant pt-4">
                  <div>
                    <h4 className="text-body-sm font-medium text-on-surface">
                      Accent Color
                    </h4>
                    <p className="mt-0.5 text-[12px] text-on-surface-variant">
                      Brand color used across the application.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {["#0066ff", "#10B981", "#F59E0B"].map((color, index) => (
                      <button
                        aria-label={`Select ${color}`}
                        className={`h-6 w-6 rounded-full border border-outline-variant ${
                          index === 0 ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                        key={color}
                        style={{ backgroundColor: color }}
                        type="button"
                      />
                    ))}
                  </div>
                </div>
              </Panel>
            </section>
            <div className="flex justify-end gap-3 pt-4">
              <ActionButton>Cancel</ActionButton>
              <ActionButton variant="primary">Save Changes</ActionButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      {children}
    </label>
  );
}
