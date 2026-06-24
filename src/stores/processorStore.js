import { defineStore } from 'pinia'
import { ref, nextTick } from 'vue'

import { useBatchProcessor } from '@/composables/useBatchProcessor'

export const useProcessorStore = defineStore('processor', () => {
  const processingFiles = ref([])
  const completedFiles = ref([])
  const failedFiles = ref([])

  const academicYear = ref('26')
  const semester = ref('1')

  const { processFile } = useBatchProcessor()

  const previewFile = ref(null)
  const isPreviewOpen = ref(false)

  function openPreview(file) {
    previewFile.value = file
    isPreviewOpen.value = true
  }

  function closePreview() {
    previewFile.value = null
    isPreviewOpen.value = false
  }

  function updateAcademicSettings(
    year,
    sem
  ) {
    academicYear.value = year
    semester.value = sem
  }

  async function addFiles(files) {
    // 1. CREATE ALL JOBS FIRST (queue snapshot)
    const jobs = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      status: "waiting",
    }));

    // 2. PUSH ALL JOBS IMMEDIATELY (so UI shows full queue)
    processingFiles.value.push(...jobs);

    // 3. PROCESS SEQUENTIALLY
    for (const job of jobs) {
      try {
        job.status = "processing";

        const startTime = Date.now();
        const result =
          await processFile(
            job.file,
            academicYear.value,
            semester.value
          )

        const elapsedTime = Date.now() - startTime;
        const minimumDuration = 1200 + Math.random() * 800;

        if (elapsedTime < minimumDuration) {
          await new Promise((resolve) =>
            setTimeout(resolve, minimumDuration - elapsedTime)
          );
        }

        job.status = "completed";

        completedFiles.value.push({
          id: job.id,
          name: job.file.name.replace(/\.xls$/i, ".xlsx"),
          blob: result.blob,
          records: result.records,

          // keep your extra metadata if already added:
          jumlahMahasiswa: result.jumlahMahasiswa,
          jumlahMataKuliah: result.jumlahMataKuliah,
          originalSize: job.file.size,
          outputSize: result.blob.size,
        });

        await nextTick()
        job.status = "leaving"

        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        )

        processingFiles.value = processingFiles.value.filter(
          (p) => p.id !== job.id
        )
      } catch (error) {
        job.status = "failed";

        failedFiles.value.push({
          id: crypto.randomUUID(),
          filename: job.file.name,
          error: error.message || "Unknown error",
        });

        await nextTick()
        job.status = "leaving"

        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        )

        processingFiles.value = processingFiles.value.filter(
          (p) => p.id !== job.id
        )
      }
    }
  }

  return {
    processingFiles,
    completedFiles,
    failedFiles,

    addFiles,

    previewFile,
    isPreviewOpen,
    openPreview,
    closePreview,

    academicYear,
    semester,

    updateAcademicSettings,
  }
})
