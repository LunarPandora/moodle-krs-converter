<script setup>
import { storeToRefs } from 'pinia'

import AppHeader from '@/components/AppHeader.vue'
import FileDropzone from '@/components/FileDropzone.vue'
import ProcessingQueue from '@/components/ProcessingQueue.vue'
import DownloadCard from '@/components/DownloadCard.vue'

import { useProcessorStore } from '@/stores/processorStore'
import { useDownload } from '@/composables/useDownload'
import PreviewModal from '@/components/PreviewModal.vue'

const processorStore = useProcessorStore()
const { processingFiles, completedFiles } = storeToRefs(processorStore)

const { downloadFile } = useDownload()

function handlePreview(file) {
  processorStore.openPreview(file)
}

function handleFiles(files) {
  processorStore.addFiles(files)
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 dark:bg-[#161624] dark:text-white">
    <AppHeader />

    <main class="max-w-7xl mx-auto p-6 space-y-6">
      <FileDropzone @files-selected="handleFiles" />

      <ProcessingQueue :files="processingFiles" />

      <section>
        <h2 class="font-semibold mb-4" v-if="completedFiles.length">Downloads</h2>

        <TransitionGroup
          name="queue"
          tag="div"
          class="grid grid-cols-1 lg:grid-cols-2 gap-3"
        >
          <DownloadCard
            v-for="file in completedFiles"
            :key="file.id"
            :file="file"
            @download="downloadFile"
            @preview="handlePreview"
          />
        </TransitionGroup>
      </section>

      <PreviewModal
        :file="processorStore.previewFile"
        :is-open="processorStore.isPreviewOpen"
        @close="processorStore.closePreview"
      />
    </main>
  </div>
</template>
