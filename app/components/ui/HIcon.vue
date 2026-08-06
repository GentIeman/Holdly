<template>
  <Icon
      :icon="icon"
      :style="iconStyle"
  />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import type { IconifyIcon } from "@iconify/vue"

export type HIconSize = "sx" | "sm" | "md" | "lg"

export type HIconProps = {
  icon: IconifyIcon | string
  height?: string
  size?: HIconSize
}

const props = withDefaults(defineProps<HIconProps>(), {
  size: "md"
})

const sizeMap: Record<HIconSize, string> = {
  xs: "16px",
  sm: "16px",
  md: "20px",
  lg: "20px"
}

const iconStyle = computed(() => {
  const sizeValue = props.height ?? sizeMap[props.size]

  return {
    width: sizeValue,
    height: sizeValue
  }
})
</script>

<style scoped>
svg {
  display: block;
}
</style>