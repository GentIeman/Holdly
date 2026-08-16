<template>
  <RouterLink
    v-if="to"
    v-slot="{ href: linkHref, navigate, isActive, isExactActive }"
    :to="to as RouteLocationRaw"
    custom
  >
    <a
      :href="disabled ? undefined : linkHref"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? -1 : undefined"
      :class="linkClass(isLinkActive({ isActive, isExactActive }))"
      @click="handleClick(navigate, $event)"
    >
      <slot :active="isLinkActive({ isActive, isExactActive })" />
    </a>
  </RouterLink>
  <a
    v-else
    :href="disabled ? undefined : href"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    :class="linkClass(false)"
    @click="handleClick(undefined, $event)"
  >
    <slot :active="false" />
  </a>
</template>

<script setup lang="ts">
import { computed, useCssModule } from "vue"
import { RouterLink } from "vue-router"
import type { RouteLocationRaw } from "vue-router"

export type HLinkProps = {
  to?: RouteLocationRaw
  href?: string
  active?: boolean
  exact?: boolean
  disabled?: boolean
  raw?: boolean
}

const props = defineProps<HLinkProps>()

const style = useCssModule()
const to = computed(() => props.to ?? props.href)

function isLinkActive({ isActive, isExactActive }: { isActive: boolean; isExactActive: boolean }) {
  if (props.active !== undefined) return props.active
  return props.exact ? isExactActive : isActive
}

function linkClass(active: boolean) {
  return [
    !props.raw && style.link,
    active && !props.raw && style.linkActive,
    props.disabled && style.linkDisabled
  ]
}

function handleClick(navigate: ((e?: MouseEvent) => unknown) | undefined, event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  navigate?.(event)
}
</script>

<style module>
.link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-zinc-300);
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-zinc-100);
  }

  &:focus-visible {
    outline: 2px solid var(--color-teal-500);
    outline-offset: 2px;
  }
}

.linkActive {
  color: var(--color-teal-500);

  &:hover {
    color: var(--color-teal-400);
  }
}

.linkDisabled {
  cursor: not-allowed;
  opacity: 0.75;
}
</style>