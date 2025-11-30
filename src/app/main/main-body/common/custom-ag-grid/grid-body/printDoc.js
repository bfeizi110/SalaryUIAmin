import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// در نسخه‌های جدید pdfFonts ممکنه pdfMake undefined باشه
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

import getDocDefinition from "./docDefinition";

function printDoc(printParams, gridApi, columnApi) {
  console.log("Exporting to PDF...");
  const docDefinition = getDocDefinition(printParams, gridApi, columnApi);
  pdfMake.createPdf(docDefinition).download();
}

export default printDoc;
