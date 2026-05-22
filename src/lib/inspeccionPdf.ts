import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { InspeccionRegistro } from "./inspeccionStore";

const formatCreatedAt = (iso: string): string => {
  try {
    const d = new Date(iso);
    return d.toLocaleString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const sanitizeFilename = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80) || "inspeccion";

export const buildInspeccionPdf = (registro: InspeccionRegistro): jsPDF => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 15);
  doc.text("JCAG S.A.S", margin, margin);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 110);
  doc.text(
    "INSPECCION PRE-OPERACIONAL  ·  REF " + registro.ref,
    pageWidth - margin,
    margin,
    { align: "right" }
  );

  doc.setDrawColor(20, 20, 15);
  doc.setLineWidth(0.6);
  doc.line(margin, margin + 8, pageWidth - margin, margin + 8);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 15);
  doc.text("Inspeccion Pre-operacional", margin, margin + 38);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 88, 79);
  doc.text(
    "Registro generado el " + formatCreatedAt(registro.created_at),
    margin,
    margin + 54
  );

  // Datos generales (tabla)
  autoTable(doc, {
    startY: margin + 70,
    head: [["Campo", "Valor"]],
    body: [
      ["Proyecto", registro.proyecto],
      ["Fecha de inspeccion", registro.fecha_inspeccion],
      ["Inspector responsable", registro.inspector_responsable],
      ["Referencia", registro.ref],
    ],
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      textColor: [20, 20, 15],
      lineColor: [200, 198, 188],
      lineWidth: 0.4,
      cellPadding: 6,
    },
    headStyles: {
      fillColor: [20, 20, 15],
      textColor: [244, 243, 238],
      fontStyle: "bold",
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 140, fontStyle: "bold" },
    },
    margin: { left: margin, right: margin },
  });

  const docWithLast = doc as unknown as { lastAutoTable?: { finalY: number } };

  // Inspeccion section title
  let cursorY = (docWithLast.lastAutoTable?.finalY ?? margin + 70) + 22;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 15);
  doc.text("Inspeccion del equipo", margin, cursorY);

  // Inspeccion table
  autoTable(doc, {
    startY: cursorY + 6,
    head: [["#", "Criterio", "Resp.", "Observaciones"]],
    body: registro.inspeccion.map((it, i) => [
      String(i + 1).padStart(2, "0"),
      it.criterio,
      it.respuesta,
      it.observaciones || "-",
    ]),
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      textColor: [20, 20, 15],
      lineColor: [200, 198, 188],
      lineWidth: 0.4,
      cellPadding: 5,
      valign: "middle",
    },
    headStyles: {
      fillColor: [20, 20, 15],
      textColor: [244, 243, 238],
      fontStyle: "bold",
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 28, halign: "center" },
      2: { cellWidth: 50, halign: "center", fontStyle: "bold" },
    },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 2) {
        const val = String(data.cell.raw);
        if (val === "C") {
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fillColor = [20, 20, 15];
        } else if (val === "NC") {
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fillColor = [179, 38, 30];
        }
      }
    },
    margin: { left: margin, right: margin },
  });

  cursorY = (docWithLast.lastAutoTable?.finalY ?? cursorY) + 22;

  // Personal
  if (cursorY > pageHeight - margin - 80) {
    doc.addPage();
    cursorY = margin;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Personal", margin, cursorY);

  autoTable(doc, {
    startY: cursorY + 6,
    head: [["#", "Criterio", "Resp.", "Observaciones"]],
    body: registro.personal.map((it, i) => [
      String(i + 1).padStart(2, "0"),
      it.criterio,
      it.respuesta,
      it.observaciones || "-",
    ]),
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      textColor: [20, 20, 15],
      lineColor: [200, 198, 188],
      lineWidth: 0.4,
      cellPadding: 5,
      valign: "middle",
    },
    headStyles: {
      fillColor: [20, 20, 15],
      textColor: [244, 243, 238],
      fontStyle: "bold",
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 28, halign: "center" },
      2: { cellWidth: 50, halign: "center", fontStyle: "bold" },
    },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 2) {
        const val = String(data.cell.raw);
        if (val === "C") {
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fillColor = [20, 20, 15];
        } else if (val === "NC") {
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fillColor = [179, 38, 30];
        }
      }
    },
    margin: { left: margin, right: margin },
  });

  cursorY = (docWithLast.lastAutoTable?.finalY ?? cursorY) + 24;

  // Aceptacion (firmas)
  const blockHeight = 130;
  if (cursorY > pageHeight - margin - blockHeight) {
    doc.addPage();
    cursorY = margin;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Aceptacion", margin, cursorY);
  cursorY += 8;

  const ace = registro.aceptacion[0];
  const colWidth = (pageWidth - margin * 2 - 20) / 2;
  const blocks: { title: string; persona: { nombre: string; firma: string } }[] = [
    { title: "Operador", persona: ace.operador },
    { title: "Elaborado por", persona: ace.elaborado_por },
  ];

  blocks.forEach((b, i) => {
    const x = margin + i * (colWidth + 20);
    doc.setDrawColor(200, 198, 188);
    doc.setLineWidth(0.4);
    doc.rect(x, cursorY, colWidth, blockHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(20, 20, 15);
    doc.text(b.title.toUpperCase(), x + 10, cursorY + 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 88, 79);
    doc.text("Nombre:", x + 10, cursorY + 32);

    doc.setTextColor(20, 20, 15);
    const nombreLines = doc.splitTextToSize(b.persona.nombre || "-", colWidth - 70);
    doc.text(nombreLines, x + 60, cursorY + 32);

    if (b.persona.firma && b.persona.firma.startsWith("data:image")) {
      try {
        const imgFmt = b.persona.firma.includes("image/jpeg") ? "JPEG" : "PNG";
        doc.addImage(b.persona.firma, imgFmt, x + 10, cursorY + 50, colWidth - 20, 60);
      } catch {
        doc.setTextColor(179, 38, 30);
        doc.text("(No se pudo renderizar la firma)", x + 10, cursorY + 70);
      }
    } else {
      doc.setTextColor(179, 38, 30);
      doc.text("(Sin firma)", x + 10, cursorY + 70);
    }

    doc.setDrawColor(20, 20, 15);
    doc.setLineWidth(0.4);
    doc.line(x + 10, cursorY + blockHeight - 16, x + colWidth - 10, cursorY + blockHeight - 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 110);
    doc.text("Firma", x + 10, cursorY + blockHeight - 6);
  });

  // Footer en cada pagina
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p += 1) {
    doc.setPage(p);
    doc.setDrawColor(200, 198, 188);
    doc.setLineWidth(0.4);
    doc.line(
      margin,
      pageHeight - margin + 6,
      pageWidth - margin,
      pageHeight - margin + 6
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 110);
    doc.text(
      "JCAG S.A.S  ·  Sistema de Gestion SST",
      margin,
      pageHeight - margin + 18
    );
    doc.text(
      "Pagina " + p + " de " + totalPages,
      pageWidth - margin,
      pageHeight - margin + 18,
      { align: "right" }
    );
  }

  return doc;
};

export const inspeccionPdfFilename = (registro: InspeccionRegistro): string => {
  const proyecto = sanitizeFilename(registro.proyecto);
  const fecha = registro.fecha_inspeccion.replace(/\//g, "-");
  return `inspeccion_${proyecto}_${fecha}_${registro.ref}.pdf`;
};

export const downloadInspeccionPdf = (registro: InspeccionRegistro): void => {
  const doc = buildInspeccionPdf(registro);
  doc.save(inspeccionPdfFilename(registro));
};
