<template>
  <HLink
    v-if="linkTo"
    v-bind="$attrs"
    :to="props.to"
    :href="props.href"
    :disabled="disabled"
    raw
    :class="buttonClass"
  >
    <HIcon
      v-if="icon"
      :icon="icon"
      :size="size"
      :class="$style.icon"
    />
    <span v-if="label">{{ label }}</span>
    <HIcon
      v-if="trailingIcon"
      :icon="trailingIcon"
      :size="size"
      :class="$style.icon"
    />
  </HLink>
  <Button.Root
    v-else-if="props.type != 'submit'"
    v-bind="$attrs"
    :disabled="disabled"
    :class="buttonClass"
  >
    <Button.Icon
      v-if="icon"
      :class="$style.icon"
    >
      <HIcon
        :icon="icon"
        :size="size"
      />
    </Button.Icon>
    <Button.Content v-if="label">
      {{ label }}
    </Button.Content>
    <Button.Icon
      v-if="trailingIcon"
      :class="$style.icon"
    >
      <HIcon
        :icon="trailingIcon"
        :size="size"
      />
    </Button.Icon>
  </Button.Root>
  <!-- Button.Root has no type prop   -->
  <button
    v-else
    v-bind="$attrs"
    :type="props.type"
    :disabled="disabled"
    :class="buttonClass"
  >
    <HIcon
      v-if="icon"
      :icon="icon"
      :size="size"
      :class="$style.icon"
    />
    <span v-if="label">{{ label }}</span>
    <HIcon
      v-if="trailingIcon"
      :icon="trailingIcon"
      :size="size"
      :class="$style.icon"
    />
  </button>
</template>

<script setup lang="ts">
import { computed, useCssModule } from "vue"
import type { RouteLocationRaw } from "vue-router"
import { Button } from "@vuetify/v0"
import HIcon from "./HIcon.vue"
import HLink from "./HLink.vue"

export type HButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

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
  to?: RouteLocationRaw
  href?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<HButtonProps>(), {
  size: "md",
  variant: "soft",
  color: "primary",
  type: "submit"
})

const linkTo = computed(() => props.to ?? props.href)

const style = useCssModule()

const isIconOnly = computed(() => (!!props.icon || !!props.trailingIcon) && !props.label)

const buttonClass = computed(() => [
  style.button,
  `size-${props.size}`,
  `variant-${props.variant}`,
  `tone-${props.color}`,
  isIconOnly.value && style.iconOnly
])
</script>

<style module>
.button {
  display: inline-flex;
  place-content: center;
  gap: var(--size-gap);
  font-size: var(--size-font-size);
  padding: var(--size-padding);
  line-height: var(--size-line-height, var(--size-font-size));
  font-weight: 500;
  border-radius: var(--radius-md);
  background: var(--va-bg);
  color: var(--va-text);
  border: 1px solid var(--va-border);
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease-in;

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

.icon {
  flex-shrink: 0;
}

.iconOnly {
  padding: var(--size-padding-icon);
}
</style>