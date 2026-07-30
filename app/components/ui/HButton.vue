<template>
  <Button.Root :class="[$style.button, `size-${props.size}`, `variant-${props.variant}`]">
    <Button.Icon v-show="icon">
      <HIcon
          :icon="icon"
          :size="props.size"
      />
    </Button.Icon>
    <span>{{ label }}</span>
    <Button.Icon v-show="trailingIcon">
      <HIcon
          :icon="trailingIcon"
          :size="props.size"
      />
    </Button.Icon>
  </Button.Root>
</template>

<script setup lang="ts">
import { Button } from "@vuetify/v0"
import HIcon from "./HIcon.vue"

export type HButtonSize = "sx" | "sm" | "md" | "lg"

export type HButtonVariant = "outline" | "soft" | "ghost" | "link"

export type HButtonProps = {
  icon?: string
  label?: string
  trailingIcon?: string
  size?: HButtonSize
  variant?: HButtonVariant
}

const props = withDefaults(defineProps<HButtonProps>(), {
  size: "md",
  variant: "soft"
})
</script>

<style module>
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--size-gap);
  padding: var(--va-padding, var(--size-padding));
  font-size: var(--size-font-size);
  border-radius: var(--radius-md);
  background: var(--va-bg);
  color: var(--va-text);
  border: 1px solid var(--va-border);
  cursor: pointer;

  &:hover {
    background: var(--va-hover-bg);
    color: var(--va-hover-text);
    border-color: var(--va-hover-border);
  }

  &:focus-visible {
    outline: 2px solid var(--va-focus-ring);
    outline-offset: 2px;
  }
}
</style>