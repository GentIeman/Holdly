<template>
  <Popover.Root
    v-slot="{ id }"
    v-model="isOpen"
  >
    <Popover.Activator
      :class="triggerClass"
      :aria-label="trigger.ariaLabel"
    >
      <HIcon
        v-if="trigger.icon"
        :icon="trigger.icon"
        :size="trigger.size"
        :class="$style.icon"
      />
      <span v-if="trigger.label">{{ trigger.label }}</span>
    </Popover.Activator>

    <Popover.Content
      :id="id"
      :position-area="positionArea"
      :class="$style.menu"
      :style="{ marginTop: 'var(--spacing-xl)' }"
    >
      <template
        v-for="(group, groupIndex) in groups"
        :key="groupIndex"
      >
        <HSeparator
          v-if="groupIndex > 0"
          :class="$style.separator"
        />
        <!-- wrapper keeps the button width at the menu content width -->
        <div
          v-for="(item, index) in group"
          :key="index"
        >
          <HButton
            type="button"
            variant="ghost"
            color="neutral"
            size="md"
            :icon="item.icon"
            :class="$style.item"
            :label="item.label"
            :disabled="item.disabled"
            @click="select(item)"
          />
        </div>
      </template>
    </Popover.Content>
  </Popover.Root>
</template>

<script setup lang="ts">
import { computed, ref, useCssModule } from "vue"
import { Popover } from "@vuetify/v0"
import HButton from "./HButton.vue"
import type { HButtonColor, HButtonSize, HButtonVariant } from "./HButton.vue"
import HIcon from "./HIcon.vue"
import HSeparator from "./HSeparator.vue"

export type HDropdownMenuItem = {
  label?: string
  icon?: string
  disabled?: boolean
  onSelect?: () => void
}

export type HDropdownTrigger = {
  label?: string
  icon?: string
  ariaLabel?: string
  size?: HButtonSize
  variant?: HButtonVariant
  color?: HButtonColor
}

export type HDropdownMenuProps = {
  items?: HDropdownMenuItem[] | HDropdownMenuItem[][]
  trigger: HDropdownTrigger
  positionArea?: string
}

const props = withDefaults(defineProps<HDropdownMenuProps>(), {
  items: () => []
})

const isOpen = ref(false)

const style = useCssModule()

const groups = computed<HDropdownMenuItem[][]>(() => {
  const raw = props.items

  if (raw.length === 0 || Array.isArray(raw[0])) {
    return raw as HDropdownMenuItem[][]
  }

  return [raw as HDropdownMenuItem[]]
})

const triggerClass = computed(() => [
  "button",
  `size-${props.trigger.size ?? "md"}`,
  `variant-${props.trigger.variant ?? "outline"}`,
  `tone-${props.trigger.color ?? "neutral"}`,
  props.trigger.icon && !props.trigger.label && style.iconOnly
])

function select(item: HDropdownMenuItem) {
  item.onSelect?.()
  isOpen.value = false
}
</script>

<style module>
.menu {
  padding: var(--spacing-s);
  background: var(--color-zinc-900);
  border: 1px solid var(--color-zinc-700);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  min-width: 10rem;
  max-width: min(20rem, calc(100vw - 2rem));
  animation: menu-in 150ms ease;

  .separator {
    margin-block: var(--spacing-s);
  }

  .item {
    justify-content: start;
    width: 100%;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(calc(-1 * var(--spacing-s)));
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon {
  flex-shrink: 0;
}

.iconOnly {
  padding: var(--spacing-sm);
}
</style>