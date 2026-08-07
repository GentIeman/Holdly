<template>
  <Snackbar.Portal>
    <Snackbar.Queue
      v-slot="{ items }"
      :class="$style.queue"
    >
      <Snackbar.Root
        v-for="item in items"
        :id="item.id"
        :key="item.id"
        teleport="body"
        :class="[$style.toast, $style[`toast-${item.severity ?? 'info'}`]]"
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
    </Snackbar.Queue>
  </Snackbar.Portal>
</template>

<script setup lang="ts">
import { Snackbar } from "@vuetify/v0"
import HIcon from "./HIcon.vue"
</script>

<style module>
.queue {
  position: fixed;
  bottom: var(--spacing-2xl);
  right: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  z-index: 50;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) var(--spacing-2xl);
  border-radius: var(--radius-md);
  background: var(--color-zinc-800);
  color: var(--color-zinc-200);
  border: 1px solid var(--color-zinc-700);
  box-shadow: 0 10px 20px rgb(0 0 0 / 0.25);
  pointer-events: auto;

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