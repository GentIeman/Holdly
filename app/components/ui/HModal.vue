<template>
  <Dialog.Root v-model="isOpen">
    <Dialog.Activator v-if="$slots.trigger">
      <slot name="trigger" />
    </Dialog.Activator>
    <Dialog.Content :class="$style.dialog">
      <header :class="$style.header">
        <div
          v-if="title || description"
          :class="$style.heading"
        >
          <h2
            v-if="title"
            :class="$style.title"
          >
            {{ title }}
          </h2>
          <p
            v-if="description"
            :class="$style.description"
          >
            {{ description }}
          </p>
        </div>
        <Dialog.Close :class="$style.close">
          <HIcon icon="tabler-x" />
        </Dialog.Close>
      </header>
      <slot name="body" />
      <footer
        v-if="$slots.footer || $slots.default"
        :class="$style.footer"
      >
        <slot name="footer" />
        <slot />
      </footer>
    </Dialog.Content>
  </Dialog.Root>
</template>

<script setup lang="ts">
import { watch } from "vue"
import { Dialog } from "@vuetify/v0"
import HIcon from "./HIcon.vue"

export type HModalProps = {
  title?: string
  description?: string
}

defineProps<HModalProps>()

const isOpen = defineModel<boolean>({ default: false })

const emits = defineEmits<{
  close: []
}>()

watch(isOpen, (value) => {
  if (!value) emits("close")
})
</script>

<style module>
.dialog {
  width: min(90vw, 28rem);
  max-height: min(90vh, 40rem);
  overflow: auto;
  margin: auto;
  color: var(--color-zinc-200);
  background: var(--color-zinc-900);
  border: 1px solid var(--color-zinc-700);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3xl);

  &::backdrop {
    background: rgba(0, 0, 0, 0.6);
    animation: backdrop-in 200ms ease;
  }

  &[open] {
    animation: dialog-in 200ms ease;
  }

  .header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);

    .heading {
      display: grid;
      gap: var(--spacing-sm);
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: var(--font-size-lg);
    }

    .description {
      font-size: var(--font-size-sm);
      color: var(--color-zinc-400);
    }

    .close {
      display: grid;
      place-items: center;
      margin-left: auto;
      flex-shrink: 0;
      padding: var(--spacing-sm);
      border: 1px solid transparent;
      border-radius: var(--radius-md);
      color: var(--color-zinc-400);
      background: transparent;
      cursor: pointer;
      transition: background-color 0.3s ease-out;

      &:hover {
        color: var(--color-zinc-100);
        background: var(--color-zinc-800);
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--spacing-3xl);
  }
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: translateY(0.5rem) scale(0.97);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes backdrop-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>