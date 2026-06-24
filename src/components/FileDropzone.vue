<template>
  <div
    class="
      relative
      overflow-hidden

      rounded-3xl
      p-10

      cursor-pointer

      transition-[transform,box-shadow]
      duration-300
      ease-out

      bg-white/70
      border border-white/70
      ring-1 ring-white/60

      shadow-[0_12px_40px_rgba(0,0,0,0.08)]

      dark:bg-white/[0.03]
      dark:border-white/[0.08]
      dark:ring-white/[0.04]

      dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
      will-change-transform
    "
    :class="{
      'scale-[1.02] ring-2 ring-blue-400/30 shadow-[0_0_50px_rgba(59,130,246,0.15),0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_0_60px_rgba(96,165,250,0.12),0_20px_60px_rgba(0,0,0,0.5)]':
        isDragging,
    }"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
    @click="fileInput?.click()"
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
    />

    <!-- Top Shine -->
    <div
      class="
        absolute top-0 left-0 right-0
        h-px

        bg-white

        dark:bg-white/20

        pointer-events-none
      "
    />

    <!-- Inner Border -->
    <div
      class="
        absolute inset-[1px]
        rounded-[inherit]

        border border-white/40

        dark:border-white/[0.06]

        pointer-events-none
      "
    />

    <!-- Reflection Streak -->
    <div
      class="
        absolute

        -top-10
        -left-24

        h-[200%]
        w-40

        rotate-[25deg]

        bg-gradient-to-r
        from-white/50
        via-white/15
        to-transparent

        dark:from-white/[0.12]
        dark:via-white/[0.04]

        pointer-events-none
      "
    />

    <!-- Drag Glow -->
    <div
      class="
        absolute inset-0
        bg-blue-500/5
        dark:bg-blue-400/5

        transition-opacity
        duration-300

        pointer-events-none
      "
      :class="{
        'opacity-100': isDragging,
        'opacity-0': !isDragging,
      }"
    />

    <!-- Ambient Glow -->
    <div
      class="
        absolute

        top-0
        right-0

        w-40
        h-40

        bg-white/20

        dark:bg-white/[0.04]

        blur-3xl

        pointer-events-none
      "
    />

    <input
      ref="fileInput"
      type="file"
      multiple
      accept=".xls,.xlsx"
      class="hidden"
      @change="handleBrowse"
    />

    <!-- Content -->
    <div class="relative z-10 text-center">
      <div
        class="
          mx-auto mb-4

          flex h-16 w-16 items-center justify-center

          rounded-2xl

          bg-white/50
          border border-white/50

          dark:bg-white/[0.04]
          dark:border-white/[0.08]

          transition-[transform,box-shadow]
          duration-300
          ease-in-out
          will-change-transform
        "
        :class="{
          'scale-110 rotate-3 shadow-[0_0_30px_rgba(59,130,246,0.15)]': isDragging,
        }"
      >
        📄
      </div>

      <p
        class="
          text-lg
          font-semibold

          text-slate-900
          dark:text-white
        "
      >
        Drop files here
      </p>

      <p
        class="
          mt-2
          text-sm

          text-slate-500
          dark:text-slate-400
        "
      >
        or click to browse
      </p>

      <p
        class="
          mt-4
          text-xs

          text-slate-400
          dark:text-slate-500
        "
      >
        Supports .xls and .xlsx files
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['files-selected'])

const isDragging = ref(false)
const fileInput = ref(null)

function handleBrowse(event) {
  emit('files-selected', [...event.target.files])
}

function handleDrop(event) {
  isDragging.value = false

  emit('files-selected', [...event.dataTransfer.files])
}

function handleDragLeave(event) {
  if (event.currentTarget === event.target) {
    isDragging.value = false
  }
}

function handleDragOver() {
  if (!isDragging.value) {
    isDragging.value = true
  }
}
</script>
