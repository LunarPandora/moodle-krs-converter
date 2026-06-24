import * as XLSX from 'xlsx'

export function useExcelExporter() {
  function createWorkbook(records, sheetName = 'Rekap') {
    const worksheet = XLSX.utils.json_to_sheet(records)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    return workbook
  }

  function workbookToBlob(workbook) {
    const buffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })

    return new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
  }

  return {
    createWorkbook,
    workbookToBlob,
  }
}
