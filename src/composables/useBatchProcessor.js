import { useKrsParser } from './useKrsParser'
import { useExcelExporter } from './useExcelExporter'

export function useBatchProcessor() {
  const { parseHtml, getTables, extractRecords } = useKrsParser()
  const { createWorkbook, workbookToBlob } = useExcelExporter()

  async function processFile(file) {
    const html = await file.text()
    const document = parseHtml(html)
    const tables = getTables(document)

    const extractionResult = extractRecords(tables)
    const records = extractionResult.records

    const workbook = createWorkbook(records)
    const blob = workbookToBlob(workbook)

    return {
      records,
      blob,

      jumlahMahasiswa: extractionResult.jumlahMahasiswa,
      jumlahMataKuliah: extractionResult.jumlahMataKuliah,
    }
  }

  return {
    processFile,
  }
}
