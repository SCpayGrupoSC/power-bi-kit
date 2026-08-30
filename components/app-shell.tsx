"use client";

import { CompareView } from "@/components/compare-view";
import { HomePanel } from "@/components/home-panel";
import { KitPanel } from "@/components/kit-panel";
import { ProposedLayout } from "@/components/proposed-layout";
import { WizardPanel } from "@/components/wizard-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { value: "inicio", label: "Início" },
  { value: "wizard", label: "Passo a passo" },
  { value: "pecas", label: "Peças para colar" },
  { value: "layout", label: "Layout proposto" },
  { value: "comparar", label: "Comparar" },
] as const;

export function AppShell() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-[#D5DEE3] bg-[#0B3D4A] text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4A017]">
              Grupo SC · conciliação
            </p>
            <p className="font-heading text-lg">Layout Spread · Power BI</p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/75 sm:text-right">
            Assistente para remontar o relatório no Desktop. As contas não mudam — só a posição das
            peças.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Tabs defaultValue="inicio" className="gap-6">
          <div className="overflow-x-auto">
            <TabsList className="min-w-max">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="inicio" className="outline-none">
            <HomePanel />
          </TabsContent>
          <TabsContent value="wizard" className="outline-none">
            <WizardPanel />
          </TabsContent>
          <TabsContent value="pecas" className="outline-none">
            <KitPanel />
          </TabsContent>
          <TabsContent value="layout" className="outline-none">
            <ProposedLayout />
          </TabsContent>
          <TabsContent value="comparar" className="outline-none">
            <CompareView />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-[#D5DEE3] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-[#7A8B99] sm:flex-row sm:justify-between sm:px-6">
          <p>Arquivos também na pasta power-bi-kit/ do repositório.</p>
          <p>Tela do relatório: 1280 × 720 · status Aguardando / OK / Divergente</p>
        </div>
      </footer>
    </div>
  );
}
