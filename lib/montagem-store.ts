import { STORAGE_KEY, itensMontagem } from "@/lib/montagem";

export type Marcados = Record<string, boolean>;

const padrao: Marcados = Object.fromEntries(
  itensMontagem.map((item) => [item.id, item.feito]),
);

const listeners = new Set<() => void>();

let rawCache: string | null = null;
let valorCache: Marcados = padrao;

export function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getSnapshot(): Marcados {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === rawCache) return valorCache;
  rawCache = raw;
  if (!raw) {
    valorCache = padrao;
    return valorCache;
  }
  try {
    valorCache = { ...padrao, ...(JSON.parse(raw) as Marcados) };
  } catch {
    valorCache = padrao;
  }
  return valorCache;
}

export function getServerSnapshot(): Marcados {
  return padrao;
}

export function alternar(id: string) {
  const atual = getSnapshot();
  const proximo = { ...atual, [id]: !atual[id] };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(proximo));
  listeners.forEach((notify) => notify());
}
