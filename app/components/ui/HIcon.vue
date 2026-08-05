<template>
  <Icon
    :icon="icon"
    :height="height ?? sizeMap[size]"
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

const { size = "md" } = defineProps<HIconProps>()

const sizeMap: Record<HIconSize, string> = {
  sx: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px"
}
</script>

<style scoped></style>