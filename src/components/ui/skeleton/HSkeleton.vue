<template>
  <div
    :class="$style.group"
    :style="{ gap }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const { gap = "var(--spacing-sm)" } = defineProps<{
  gap?: string
}>()
</script>

<style module>
.group {
  display: grid;
}
</style>