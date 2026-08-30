"use client";

import { useCallback, useState } from "react";
import { copyText } from "@/lib/copy";

export type CopyStatus = "idle" | "copiado" | "falhou";

/**
 * A área de transferência é bloqueada em alguns navegadores e em janela sem
 * foco. Sem o estado "falhou", o clique não devolve nada e parece travado.
 */
export function useCopy(reset = 2400) {
  const [state, setState] = useState<{ status: CopyStatus; id: string | null }>({
    status: "idle",
    id: null,
  });

  const copy = useCallback(
    async (texto: string, id: string | null = null) => {
      const ok = await copyText(texto);
      setState({ status: ok ? "copiado" : "falhou", id });
      window.setTimeout(() => setState({ status: "idle", id: null }), reset);
    },
    [reset],
  );

  return { status: state.status, id: state.id, copy };
}
