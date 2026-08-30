import { SiteNav } from "@/components/site-nav";

export function SiteChrome({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
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

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <SiteNav pathname={pathname} />
        {children}
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
