<template>
    <Transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-20">
            <div class="modal-box bg-white w-full max-w-4xl rounded-xl p-6 space-y-6 transition-all duration-300 ease-in-out will-change-auto">
            <!-- HEADER -->
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold">Preview Data</h2>

                    <button @click="close" class="text-slate-500">✕</button>
                </div>

                <!-- RINGKASAN -->
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                        <p class="text-slate-500">Nama File</p>
                        <p class="font-medium">{{ file?.name }}</p>
                    </div>

                    <div>
                        <p class="text-slate-500">Jumlah Data</p>
                        <p class="font-medium">
                            {{ file?.records?.length || 0 }}
                        </p>
                    </div>

                    <div>
                        <p class="text-slate-500">Ukuran File</p>
                        <p class="font-medium">{{ file?.outputSize || 0 }} bytes</p>
                    </div>
                </div>

                <!-- PREVIEW TABLE -->
                <div class="overflow-auto border rounded-lg">
                    <table class="w-full text-sm">
                        <thead class="bg-slate-100">
                            <tr>
                                <th class="p-2 text-left">NIM</th>
                                <th class="p-2 text-left">Nama</th>
                                <th class="p-2 text-left">Kode MK</th>
                                <th class="p-2 text-left">Mata Kuliah</th>
                                <th class="p-2 text-left">SKS</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(row, i) in previewRows" :key="i" class="border-t">
                                <td class="p-2">{{ row.NIM }}</td>
                                <td class="p-2">{{ row.Nama }}</td>
                                <td class="p-2">{{ row['Kode MK'] }}</td>
                                <td class="p-2">{{ row['Mata Kuliah'] }}</td>
                                <td class="p-2">{{ row.SKS }}</td>
                            </tr>
                        </tbody>
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
