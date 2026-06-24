<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-20"
    >
      <div
        class="modal-box w-full max-w-7xl rounded-3xl p-6 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 ease-in-out"
      >
        <!-- HEADER -->
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
            📄 Preview Hasil Konversi
          </h2>

          <button
            @click="close"
            class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- RINGKASAN -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p class="text-slate-500 dark:text-slate-400">Nama File</p>
            <p class="font-medium text-slate-900 dark:text-white">{{ file?.name }}</p>
          </div>

          <div>
            <p class="text-slate-500 dark:text-slate-400">Jumlah Data</p>
            <p class="font-medium text-slate-900 dark:text-white">
              {{ file?.records?.length || 0 }}
            </p>
          </div>

          <div>
            <p class="text-slate-500 dark:text-slate-400">Ukuran File</p>
            <p class="font-medium text-slate-900 dark:text-white">
              {{ file?.outputSize || 0 }} bytes
            </p>
          </div>
        </div>

        <!-- PREVIEW TABLE -->
        <div class="overflow-x-scroll overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table class="w-full text-sm text-slate-700 dark:text-slate-200">
            <thead class="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th class="p-2 text-left">Username</th>
                <th class="p-2 text-left">Email</th>
                <th class="p-2 text-left">Firstname</th>
                <th class="p-2 text-left">Lastname</th>
                <th class="p-2 text-left">ID Number</th>
                <th class="p-2 text-left">Course</th>
                <th class="p-2 text-left">Role</th>
              </tr>
            </thead>

            <tr
              v-for="(row, i) in previewRows"
              :key="i"
              class="border-t border-slate-200 dark:border-slate-800"
            >
              <td class="p-2">{{ row.username }}</td>
              <td class="p-2">{{ row.email }}</td>
              <td class="p-2">{{ row.firstname }}</td>
              <td class="p-2">{{ row.lastname }}</td>
              <td class="p-2">{{ row.idnumber }}</td>
              <td class="p-2">{{ row.course1 }}</td>
              <td class="p-2">{{ row.role1 }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  file: Object,
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

const previewRows = computed(() => {
  return (props.file?.records || []).slice(0, 10)
})

function close() {
  emit('close')
}
</script>
