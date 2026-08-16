<template>
  <div
    role="separator"
    :aria-orientation="orientation"
    :class="['separator', `separator-${orientation}`]"
  >
    <template v-if="label">
      <div class="separator-line" />
      <span class="separator-label">{{ label }}</span>
      <div class="separator-line" />
    </template>
    <div
      v-else
      class="separator-line"
    />
  </div>
</template>

<script setup lang="ts">
export type HSeparatorProps = {
  label?: string
  orientation?: "horizontal" | "vertical"
}

const { orientation = "horizontal" } = defineProps<HSeparatorProps>()
</script>

<style scoped>
.separator {
  display: flex;
  align-items: center;
  border: none;
  margin: 0;
  padding: 0;

  &.separator-horizontal {
    width: 100%;
    flex-direction: row;
  }

  &.separator-vertical {
    flex-direction: column;
    height: 100%;
  }

  .separator-line {
    flex: 1;
    border: none;
  }

  &.separator-horizontal {
    .separator-line {
      border-top: 1px solid var(--color-zinc-700);
    }
  }

  &.separator-vertical {
    .separator-line {
      border-left: 1px solid var(--color-zinc-700);
    }
  }

  .separator-label {
    padding: 0 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-zinc-200);
    white-space: nowrap;
  }

  &.separator-vertical {
    .separator-label {
      padding: 0.75rem 0;
    }
  }
}
</style>