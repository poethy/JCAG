import Groq from "groq-sdk";
import { PDFParse } from "pdf-parse";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const JOB_PROFILE = `
Perfiles que JCAG S.A.S contrata frecuentemente:
- Técnico, Tecnólogo o Ingeniero en Electricidad, Electromecánica o afines
- Técnico o Ingeniero Civil con experiencia en infraestructura
- Técnico en Seguridad y Salud en el Trabajo (SST / HSEQ)
- Personal de montaje electromecánico con experiencia en alta tensión o subestaciones
- Auxiliar o asistente administrativo en el sector construcción/energía

Criterios mínimos de aceptación (debe cumplir al menos UNO):
1. Formación técnica, tecnológica o profesional en electricidad, electromecánica, civil o SST
2. Experiencia laboral de 2 o más años en sector eléctrico, energético o construcción
3. Certificaciones en alta tensión, RETIE, trabajo en alturas o espacios confinados
`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File;

    if (!file) {
      return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Archivo muy grande (máx. 5 MB)" }, { status: 400 });
    }
    if (!file.type.includes("pdf")) {
      return NextResponse.json({ error: "Solo se aceptan archivos PDF" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });
    const textResult = await parser.getText();
    const cvText = textResult.text;

    if (!cvText || cvText.trim().length < 50) {
      return NextResponse.json(
        { error: "No se pudo leer el contenido del PDF. Asegúrate de que no sea un PDF escaneado sin texto." },
        { status: 400 }
      );
    }

    const prompt = `Eres el evaluador de RRHH de JCAG S.A.S, empresa colombiana de infraestructura eléctrica.

PERFIL BUSCADO:
${JOB_PROFILE}

HOJA DE VIDA DEL CANDIDATO:
${cvText.slice(0, 3000)}

INSTRUCCIÓN: Evalúa si el candidato cumple al menos uno de los criterios mínimos de aceptación.
Responde ÚNICAMENTE en uno de estos dos formatos exactos, sin texto adicional:
APTO: [razón breve, máximo 12 palabras]
NO_APTO: [razón breve, máximo 12 palabras]`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 60,
      temperature: 0.1,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const isApto = raw.toUpperCase().startsWith("APTO");

    return NextResponse.json({ result: isApto ? "success" : "fail" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("CV screen error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
