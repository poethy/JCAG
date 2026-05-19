import Groq from "groq-sdk";
import { getDocumentProxy, extractText } from "unpdf";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const JOB_PROFILE = `
Perfiles que JCAG S.A.S contrata frecuentemente:
- Tecnico, Tecnologo o Ingeniero en Electricidad, Electromecánica o afines
- Tecnico o Ingeniero Civil con experiencia en infraestructura
- Tecnico en Seguridad y Salud en el Trabajo (SST / HSEQ)
- Personal de montaje electromecanico con experiencia en alta tension o subestaciones
- Auxiliar o asistente administrativo en el sector construccion/energia

Criterios minimos de aceptacion (debe cumplir al menos UNO):
1. Formacion tecnica, tecnologica o profesional en electricidad, electromecanica, civil o SST
2. Experiencia laboral de 2 o mas anos en sector electrico, energetico o construccion
3. Certificaciones en alta tension, RETIE, trabajo en alturas o espacios confinados
`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File;

    if (!file) {
      return NextResponse.json({ error: "No se recibio archivo" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Archivo muy grande (max. 5 MB)" }, { status: 400 });
    }
    if (!file.type.includes("pdf")) {
      return NextResponse.json({ error: "Solo se aceptan archivos PDF" }, { status: 400 });
    }

    // Extract text using unpdf (works in serverless/Vercel without worker issues)
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
    const { text: cvText } = await extractText(pdf, { mergePages: true });

    if (!cvText || cvText.trim().length < 50) {
      return NextResponse.json(
        { error: "No se pudo leer el contenido del PDF. Asegurate de que no sea un PDF escaneado sin texto." },
        { status: 400 }
      );
    }

    const prompt = `Eres el evaluador de RRHH de JCAG S.A.S, empresa colombiana de infraestructura electrica.

PERFIL BUSCADO:
${JOB_PROFILE}

HOJA DE VIDA DEL CANDIDATO:
${cvText.slice(0, 3000)}

INSTRUCCION: Evalua si el candidato cumple al menos uno de los criterios minimos de aceptacion.
Responde UNICAMENTE en uno de estos dos formatos exactos, sin texto adicional:
APTO: [razon breve, maximo 12 palabras]
NO_APTO: [razon breve, maximo 12 palabras]`;

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
