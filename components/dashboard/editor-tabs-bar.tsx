"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EditorTab } from "@/lib/template-registry";

function TabTrigger({ tab }: { tab: EditorTab }) {
  return (
    <TabsTrigger
      className="mr-unit-md rounded-none border-b-[3px] border-transparent px-unit-md py-3 font-body text-body-sm font-medium text-on-surface-variant transition-colors duration-150 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
      id={tab.id === "Hero" ? "tutorial-hero-tab" : undefined}
      value={tab.id}
    >
      {tab.label}
    </TabsTrigger>
  );
}

export function EditorTabsBar({
  activeTab,
  onTabChange,
  tabs,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: EditorTab[];
}) {
  const sectionTabs = tabs.filter((t) => t.group !== "config");
  const configTabs = tabs.filter((t) => t.group === "config");

  return (
    <div className="border-b border-outline-variant bg-surface-container-lowest px-unit-lg">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <div className="flex items-stretch">
          <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
            {sectionTabs.map((tab) => (
              <TabTrigger key={tab.id} tab={tab} />
            ))}
          </TabsList>
          {configTabs.length > 0 ? (
            <>
              <div className="ml-auto flex items-stretch">
                <div className="mx-1 my-2 w-px bg-outline-variant" />
                <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
                  {configTabs.map((tab) => (
                    <TabTrigger key={tab.id} tab={tab} />
                  ))}
                </TabsList>
              </div>
            </>
          ) : null}
        </div>
      </Tabs>
    </div>
  );
}
