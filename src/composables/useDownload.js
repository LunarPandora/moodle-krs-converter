import { saveAs } from 'file-saver'

export function useDownload() {
  function downloadFile(file) {
    saveAs(file.blob, file.name)
  }

  return {
    downloadFile,
  }
}
