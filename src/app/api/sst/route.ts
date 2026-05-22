import { NextRequest, NextResponse } from "next/server";

type Item = { criterio: string; respuesta: "C" | "NC"; observaciones: string };
type Persona = { nombre: string; firma: string };

interface InspeccionPayload {
  proyecto: string;
  fecha_inspeccion: string;
  inspector_responsable: string;
  inspeccion: Item[];
  personal: Item[];
  aceptacion: [{ operador: Persona; elaborado_por: Persona }];
}

const isNonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<InspeccionPayload>;
    const {
      proyecto,
      fecha_inspeccion,
      inspector_responsable,
      inspeccion,
      personal,
      aceptacion,
    } = body;

    if (!isNonEmpty(proyecto) || !isNonEmpty(fecha_inspeccion) || !isNonEmpty(inspector_responsable)) {
      return NextResponse.json(
        { error: "Campos requeridos incompletos: proyecto, fecha_inspeccion o inspector_responsable" },
        { status: 400 }
      );
    }

    if (!Array.isArray(inspeccion) || inspeccion.length === 0) {
      return NextResponse.json({ error: "La lista de inspección está vacía" }, { status: 400 });
    }
    if (!Array.isArray(personal) || personal.length === 0) {
      return NextResponse.json({ error: "La lista de personal está vacía" }, { status: 400 });
    }

    const invalidInspeccion = inspeccion.find(
      (it) => !it || (it.respuesta !== "C" && it.respuesta !== "NC")
    );
    const invalidPersonal = personal.find(
      (it) => !it || (it.respuesta !== "C" && it.respuesta !== "NC")
    );
    if (invalidInspeccion || invalidPersonal) {
      return NextResponse.json(
        { error: "Todos los criterios deben tener respuesta C o NC" },
        { status: 400 }
      );
    }

    const ace = aceptacion?.[0];
    if (
      !ace ||
      !isNonEmpty(ace.operador?.nombre) ||
      !isNonEmpty(ace.operador?.firma) ||
      !isNonEmpty(ace.elaborado_por?.nombre) ||
      !isNonEmpty(ace.elaborado_por?.firma)
    ) {
      return NextResponse.json(
        { error: "Aceptación incompleta: nombres y firmas son obligatorios" },
        { status: 400 }
      );
    }

    const payload: InspeccionPayload = {
      proyecto: proyecto.trim(),
      fecha_inspeccion: fecha_inspeccion.trim(),
      inspector_responsable: inspector_responsable.trim(),
      inspeccion,
      personal,
      aceptacion,
    };

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      console.log("Inspección registrada (sin Apps Script):", {
        proyecto: payload.proyecto,
        fecha_inspeccion: payload.fecha_inspeccion,
        inspector_responsable: payload.inspector_responsable,
        inspeccion_count: payload.inspeccion.length,
        personal_count: payload.personal.length,
      });
      return NextResponse.json({
        success: true,
        message: "Inspección registrada (modo desarrollo)",
      });
    }

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Error en Apps Script");
    }

    return NextResponse.json({ success: true, message: "Inspección registrada exitosamente" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Inspección error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
