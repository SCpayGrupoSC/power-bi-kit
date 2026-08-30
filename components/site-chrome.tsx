import { SiteNav } from "@/components/site-nav";
import { Wordmark } from "@/components/wordmark";

export function SiteChrome({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-hairline bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <Wordmark />
            <span className="hidden h-6 w-px bg-hairline sm:block" />
            <p className="text-sm font-medium text-brand-navy">Conciliação · Spread previsto</p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted-ink sm:text-right">
            Retoma de onde o .pbix parou. As contas não mudam — só a posição das peças e as cores.
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <SiteNav pathname={pathname} />
        {children}
      </main>

      <footer className="border-t border-hairline bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted-ink-light sm:flex-row sm:justify-between sm:px-6">
          <p>Arquivos também na pasta power-bi-kit/ do repositório.</p>
          <p>Tela do relatório: 1280 × 720 · status Aguardando / OK / Divergente</p>
        </div>
      </footer>
    </div>
  );
}
