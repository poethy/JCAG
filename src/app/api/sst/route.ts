import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, cedula, cargo, empresa, tipoFormulario, firma } = body;

    if (!nombre || !cedula || !cargo || !tipoFormulario || !firma) {
      return NextResponse.json({ error: "Campos requeridos incompletos" }, { status: 400 });
    }

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      // Sin Apps Script configurado, simular éxito en desarrollo
      console.log("SST form submitted (no Apps Script URL configured):", { nombre, cedula, cargo, tipoFormulario });
      return NextResponse.json({ success: true, message: "Formulario registrado (modo desarrollo)" });
    }

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        cedula,
        cargo,
        empresa: empresa || "",
        tipoFormulario,
        firma,
        fecha: new Date().toLocaleDateString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Error en Apps Script");
    }

    return NextResponse.json({ success: true, message: "Formulario registrado exitosamente" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("SST error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
