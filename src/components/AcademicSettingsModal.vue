<template>
  <Transition name="modal">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6">
        <h2 class="text-lg font-semibold mb-4">Pengaturan Akademik</h2>

        <div class="space-y-4">
          <div>
            <label class="block mb-1 text-sm"> Tahun Akademik </label>

            <input
              v-model="localYear"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="26"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm"> Semester </label>

            <select v-model="localSemester" class="w-full border rounded-lg px-3 py-2">
              <option value="1">Ganjil</option>
              <option value="2">Genap</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button @click="$emit('close')" class="px-4 py-2 rounded-lg border">Batal</button>

          <button @click="save" class="px-4 py-2 rounded-lg bg-blue-600 text-white">Simpan</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        open: Boolean,
        academicYear: String,
        semester: String,
    })

    const emit = defineEmits(['close', 'save'])

    const localYear = ref('')
    const localSemester = ref('1')

    watch(
        () => props.open,
        () => {
            localYear.value = props.academicYear
            localSemester.value = props.semester
        },
    )

    function save() {
        emit('save', {
            academicYear: localYear.value,
            semester: localSemester.value,
        })
    }
</script>

<style scoped>
    .modal-enter-active,
    .modal-leave-active {
    transition: opacity 0.2s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
    opacity: 0;
    }
</style>
