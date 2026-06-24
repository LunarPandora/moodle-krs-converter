<template>
  <div
    class="
      relative
      overflow-hidden
      rounded-3xl

      bg-white/70
      border border-white/70
      ring-1 ring-white/60
      shadow-[0_12px_40px_rgba(0,0,0,0.08)]

      dark:bg-white/[0.03]
      dark:border-white/[0.08]
      dark:ring-white/[0.04]
      dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
    "
  >
    <!-- Main Reflection -->
    <div
      class="
        absolute inset-0

        bg-gradient-to-br
        from-white/60
        via-white/20
        to-transparent

        dark:from-white/[0.10]
        dark:via-white/[0.03]

        pointer-events-none
      "
    ></div>

    <!-- Top Shine -->
    <div
      class="
        absolute top-0 left-0 right-0
        h-px

        bg-white

        dark:bg-white/20

        pointer-events-none
      "
    ></div>

    <!-- Inner Border -->
    <div
      class="
        absolute inset-[1px]
        rounded-[inherit]

        border border-white/40

        dark:border-white/[0.06]

        pointer-events-none
      "
    ></div>

    <!-- Reflection Streak -->
    <div
      class="
        absolute

        -top-10
        -left-16

        w-40
        h-[200%]

        rotate-[25deg]

        bg-gradient-to-r
        from-white/50
        via-white/15
        to-transparent

        dark:-top-20
        dark:-left-20
        dark:w-48
        dark:h-[220%]

        dark:from-white/[0.12]
        dark:via-white/[0.04]

        pointer-events-none
      "
    ></div>

    <!-- Top Ambient Glow -->
    <div
      class="
        absolute

        -top-16
        left-1/2
        -translate-x-1/2

        w-96
        h-32

        opacity-0
        dark:opacity-100

        bg-white/[0.03]
        blur-3xl

        pointer-events-none
      "
    ></div>

    <!-- Corner Highlight / Glow -->
    <div
      class="
        absolute

        top-0
        right-0

        w-32
        h-32

        bg-white/20

        dark:w-40
        dark:h-40
        dark:bg-white/[0.04]

        blur-3xl

        pointer-events-none
      "
    ></div>

    <!-- Bottom Reflection -->
    <div
      class="
        absolute

        inset-x-0
        bottom-0

        h-20

        bg-gradient-to-t
        from-white/20
        to-transparent

        dark:h-24
        dark:from-white/[0.04]

        pointer-events-none
      "
    ></div>

    <div class="relative z-10 flex flex-col lg:flex-row items-start justify-between p-6 gap-4">
      <div>
        <h3 class="font-medium">
          {{ file.name }}
        </h3>

        <div class="mt-2 text-sm text-slate-500 dark:text-white space-y-1">
          <p>
            👨‍🎓 Mahasiswa Diproses:
            <strong>
              {{ file.jumlahMahasiswa }}
            </strong>
          </p>

          <p>
            📚 Mata Kuliah Diekstrak:
            <strong>
              {{ file.jumlahMataKuliah }}
            </strong>
          </p>

          <p>
            📦 Ukuran File:
            <strong>
              {{ formatBytes(file.originalSize) }}
            </strong>

            →

            <strong>
              {{ formatBytes(file.outputSize) }}
            </strong>
          </p>
        </div>
      </div>

      <div class="flex flex-row lg:flex-col gap-2">
        <button
          @click="$emit('download', file)"
          class="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Download
        </button>

        <button
          @click="$emit('preview', file)"
          class="px-4 py-2 text-sm rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300"
        >
          Preview
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFileFormatter } from '@/composables/useFileFormatter'

const { formatBytes } = useFileFormatter()

defineProps({
  file: {
    type: Object,
    required: true,
  },
})

defineEmits(['download', 'preview'])
</script>
