<template>
  <Snackbar.Root
    :id="item.id"
    :class="[$style.toast, $style[`toast-${item.severity ?? 'info'}`]]"
    :style="stackStyle(index)"
  >
    <Snackbar.Content :class="$style.content">
      {{ item.subject }}
    </Snackbar.Content>
    <Snackbar.Close :class="$style.close">
      <HIcon
        icon="tabler-x"
        size="sm"
      />
    </Snackbar.Close>
  </Snackbar.Root>
</template>

<script setup lang="ts">
import { Snackbar } from "@vuetify/v0"
import type { NotificationTicket } from "@vuetify/v0"
import HIcon from "../HIcon.vue"

defineProps<{
  item: NotificationTicket
  index: number
}>()

const MAX_STACK = 3
const PEEK = 10

function stackStyle(i: number) {
  if (i >= MAX_STACK) {
    const depth = MAX_STACK - 1
    return {
      zIndex: -1,
      translate: `0 ${-depth * PEEK}px`,
      scale: `${1 - depth * 0.04}`,
      opacity: 0,
      pointerEvents: "none" as const
    }
  }

  return {
    zIndex: MAX_STACK - i,
    translate: `0 ${-i * PEEK}px`,
    scale: `${1 - i * 0.04}`,
    pointerEvents: i === 0 ? ("auto" as const) : ("none" as const)
  }
}
</script>

<style module>
.toast {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  position: absolute;
  right: 0;
  bottom: 0;
  padding: var(--spacing-lg) var(--spacing-2xl);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-zinc-800) 60%, transparent);
  backdrop-filter: blur(12px);
  color: var(--color-zinc-200);
  width: max-content;
  max-width: 300px;

  .content {
    flex: 1;
    font-size: var(--font-size-sm);
  }

  .close {
    flex-shrink: 0;
    display: inline-flex;
    padding: var(--spacing-s);
    border: none;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-zinc-400);
    cursor: pointer;

    &:hover {
      color: var(--color-zinc-100);
      background-color: var(--color-zinc-700);
    }
  }
}

.toast-error {
  border-color: var(--color-red-500);
}

.toast-success {
  border-color: var(--color-teal-500);
}
</style>