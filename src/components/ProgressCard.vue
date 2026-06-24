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

      transition-all
      duration-300
      ease-out

      will-change-transform
    "

    :class="{
      'opacity-0 -translate-y-4 pointer-events-none':
        file.status === 'leaving'
    }"
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

    <div class="flex flex-col p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-medium truncate">
          {{ file.name }}
        </h3>

        <span class="text-xs px-2 py-1 rounded"
          :class="badgeClass"
        >
          {{ statusLabel }}
        </span>
      </div>

      <div class="text-sm text-slate-500 dark:text-white">
        <p v-if="file.status === 'waiting'">
          ⌛ Menunggu antrian
        </p>

        <p v-else-if="file.status === 'processing'">
          ⏳ Sedang diproses
        </p>

        <p v-else-if="file.status === 'completed'">
          ✅ Selesai
        </p>

        <p v-else-if="file.status === 'leaving'">
          👋 Menghapus dari antrian
        </p>

        <p v-else-if="file.status === 'failed'">
          ❌ Gagal diproses
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
});

const statusLabel = computed(() => {
  switch (props.file.status) {
    case "waiting":
      return "Waiting";
    case "processing":
      return "Processing";
    case "completed":
      return "Done";
    case "failed":
      return "Failed";
    case "leaving":
      return "Removing";
    default:
      return "Unknown";
  }
});

const badgeClass = computed(() => {
  switch (props.file.status) {
    case "waiting":
      return "bg-slate-200 text-slate-600";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "leaving":
      return "bg-slate-100 text-slate-500";
    default:
      return "bg-gray-100";
  }
});
</script>