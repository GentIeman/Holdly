<template>
  <Button.Root
    :class="[
      $style.button,
      `size-${props.size}`,
      `variant-${props.variant}`,
      `tone-${props.color}`
    ]"
  >
    <Button.Icon
      v-if="icon"
      :class="$style.icon"
    >
      <HIcon
        :icon="icon"
        :size="props.size"
      />
    </Button.Icon>
    <span>{{ label }}</span>
    <Button.Icon
      v-if="trailingIcon"
      :class="$style.icon"
    >
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

export type HButtonColor = "primary" | "neutral"

export type HButtonProps = {
  icon?: string
  label?: string
  trailingIcon?: string
  size?: HButtonSize
  variant?: HButtonVariant
  color?: HButtonColor
}

const props = withDefaults(defineProps<HButtonProps>(), {
  size: "md",
  variant: "soft",
  color: "primary"
})
</script>

<style module>
.button {
  display: inline-flex;
  place-content: center;
  gap: var(--size-gap);
  padding: var(--va-padding, var(--size-padding));
  font-size: var(--size-font-size);
  line-height: var(--size-line-height, var(--size-font-size));
  font-weight: 500;
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

  .icon {
    flex-shrink: 0;
  }
}
</style>