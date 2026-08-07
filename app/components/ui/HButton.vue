<template>
  <Button.Root
    v-if="props.type != 'submit'"
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
    <Button.Content>
      {{ label }}
    </Button.Content>
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
  <!-- Button.Root has no type prop   -->
  <button
    v-else
    :type="props.type"
    :class="[
      $style.button,
      `size-${props.size}`,
      `variant-${props.variant}`,
      `tone-${props.color}`
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { Button } from "@vuetify/v0"
import HIcon from "./HIcon.vue"

export type HButtonSize = "xs" | "sm" | "md" | "lg"

export type HButtonVariant = "outline" | "soft" | "solid" | "ghost" | "link"

export type HButtonColor = "primary" | "neutral"

export type HButtonType = "submit" | "button" | "reset"

export type HButtonProps = {
  icon?: string
  label?: string
  trailingIcon?: string
  size?: HButtonSize
  variant?: HButtonVariant
  color?: HButtonColor
  type?: HButtonType
}

const props = withDefaults(defineProps<HButtonProps>(), {
  size: "md",
  variant: "soft",
  color: "primary",
  type: "submit"
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