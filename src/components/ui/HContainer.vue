<template>
  <div :style="styles">
    <slot />
  </div>
</template>

<script setup lang="ts">
export type HContainerProps = {
  styles?: Record<string, string>
}

defineProps<HContainerProps>()
</script>