export type Respuesta = "C" | "NC";

export interface InspeccionItem {
  criterio: string;
  respuesta: Respuesta;
  observaciones: string;
}

export interface Persona {
  nombre: string;
  firma: string;
}

export interface InspeccionAceptacion {
  operador: Persona;
  elaborado_por: Persona;
}

export interface InspeccionPayload {
  proyecto: string;
  fecha_inspeccion: string;
  inspector_responsable: string;
  inspeccion: InspeccionItem[];
  personal: InspeccionItem[];
  aceptacion: [InspeccionAceptacion];
}

export interface InspeccionRegistro extends InspeccionPayload {
  id: string;
  ref: string;
  created_at: string;
}

const STORAGE_KEY = "inspeccion:registros";

const safeParse = (raw: string | null): InspeccionRegistro[] => {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const listRegistros = (): InspeccionRegistro[] => {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(STORAGE_KEY));
};

export const getRegistro = (id: string): InspeccionRegistro | null => {
  if (typeof window === "undefined") return null;
  return listRegistros().find((r) => r.id === id) || null;
};

const generateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `ins_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

const generateRef = (existing: InspeccionRegistro[]) => {
  const used = new Set(existing.map((r) => r.ref));
  for (let i = 0; i < 50; i += 1) {
    const candidate = "INS-" + String(Math.floor(Math.random() * 9000) + 1000);
    if (!used.has(candidate)) return candidate;
  }
  return "INS-" + Date.now().toString().slice(-4);
};

export const saveRegistro = (
  payload: InspeccionPayload,
  meta?: { id?: string; ref?: string; created_at?: string }
): InspeccionRegistro => {
  const existing = listRegistros();
  const registro: InspeccionRegistro = {
    ...payload,
    id: meta?.id || generateId(),
    ref: meta?.ref || generateRef(existing),
    created_at: meta?.created_at || new Date().toISOString(),
  };
  const next = [registro, ...existing.filter((r) => r.id !== registro.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return registro;
};

export const deleteRegistro = (id: string): void => {
  if (typeof window === "undefined") return;
  const next = listRegistros().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const clearRegistros = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
