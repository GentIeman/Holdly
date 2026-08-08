<template>
  <Snackbar.Portal teleport="body">
    <Snackbar.Queue
      v-slot="{ items }"
      :class="$style.queue"
    >
      <TransitionGroup name="snack-list-slide">
        <Snackbar.Root
          v-for="item in items"
          :id="item.id"
          :key="item.id"
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
      </TransitionGroup>
    </Snackbar.Queue>
  </Snackbar.Portal>
</template>

<script setup lang="ts">
import { Snackbar } from "@vuetify/v0"
import HIcon from "./HIcon.vue"
</script>

<style module>
.queue {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: var(--spacing-2xl);
  right: var(--spacing-2xl);
  gap: var(--spacing-md);
  pointer-events: none;

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
}

.toast-error {
  border-color: var(--color-red-500);
}

.toast-success {
  border-color: var(--color-teal-500);
}
</style>

<style scoped>
.snack-list-slide-move,
.snack-list-slide-enter-active,
.snack-list-slide-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s linear;
}

.snack-list-slide-enter-from,
.snack-list-slide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>