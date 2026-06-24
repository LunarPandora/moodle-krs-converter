<template>
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold">Processing Queue</h2>

      <span class="text-sm text-slate-500"> {{ files.length }} file(s) </span>
    </div>

    <TransitionGroup
      name="queue"
      tag="div"
      class="grid grid-cols-1 lg:grid-cols-2 gap-3"
    >
      <div
        v-for="file in files"
        :key="file.id"
      >
        <ProgressCard :file="file" />
      </div>
    </TransitionGroup>
  </section>
</template>

<script setup>
import ProgressCard from './ProgressCard.vue'

defineProps({
  files: {
    type: Array,
    default: () => [],
  },
})
</script>