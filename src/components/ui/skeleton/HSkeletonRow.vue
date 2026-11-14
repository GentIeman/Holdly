<template>
  <div
    :class="$style.skeleton"
    :style="{
      width,
      height,
      borderRadius: radius
    }"
  />
</template>

<script setup lang="ts">
const {
  width = "100%",
  height = "1rem",
  radius = "var(--radius-sm)"
} = defineProps<{
  width?: string
  height?: string
  radius?: string
}>()
</script>

<style module>
.skeleton {
  background-color: var(--color-zinc-800);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}
</style>