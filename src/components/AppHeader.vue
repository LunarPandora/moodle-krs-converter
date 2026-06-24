<script setup>
import { useThemeStore } from "@/stores/themeStore";

const themeStore = useThemeStore();
</script>

<template>
  <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">KRS Rekap Generator</h1>

        <p class="text-sm text-slate-500">Convert KRS exports into structured Excel reports</p>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="themeStore.toggleTheme()"
          class="
            rounded-lg
            border
            px-3
            py-2
            dark:border-slate-700
          "
        >
          {{ themeStore.isDark ? "☀️" : "🌙" }}
        </button>
      </div>
    </div>
  </header>
</template>
