<template>
  <AlertDialog.Root v-model="isOpen">
    <AlertDialog.Activator
      v-if="$slots.trigger"
      renderless
      v-slot="{ attrs }"
    >
      <slot
        name="trigger"
        :attrs="attrs"
      />
    </AlertDialog.Activator>

    <AlertDialog.Content
      :class="$style.dialog"
      closeOnEscape
    >
      <header :class="$style.header">
        <AlertDialog.Title :class="$style.title">
          {{ title }}
        </AlertDialog.Title>
        <AlertDialog.Description
          v-if="description"
          :class="$style.description"
        >
          {{ description }}
        </AlertDialog.Description>
      </header>

      <p
        v-if="message"
        :class="$style.message"
      >
        {{ message }}
      </p>

      <footer :class="$style.footer">
        <AlertDialog.Cancel
          v-if="showCancel"
          renderless
          v-slot="{ attrs }"
        >
          <HButton
            v-bind="attrs"
            type="button"
            :label="cancel.label"
            :icon="cancel.icon"
            :trailing-icon="cancel.trailingIcon"
            :size="cancel.size"
            :variant="cancel.variant"
            :color="cancel.color"
            :disabled="cancel.disabled"
            @click="emit('cancel')"
          />
        </AlertDialog.Cancel>

        <AlertDialog.Action
          renderless
          v-slot="{ attrs, isPending }"
          @action="onAction"
        >
          <HButton
            v-bind="attrs"
            type="button"
            :label="action.label"
            :icon="action.icon"
            :trailing-icon="action.trailingIcon"
            :size="action.size"
            :variant="action.variant"
            :color="action.color"
            :disabled="action.disabled || isPending"
          />
        </AlertDialog.Action>
      </footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { AlertDialog } from "@vuetify/v0"
import type { AlertDialogActionEvent } from "@vuetify/v0"
import HButton from "./HButton.vue"
import type { HButtonColor, HButtonSize, HButtonVariant } from "./HButton.vue"

export type HAlertButton = {
  label?: string
  icon?: string
  trailingIcon?: string
  size?: HButtonSize
  variant?: HButtonVariant
  color?: HButtonColor
  disabled?: boolean
}

export type HAlertButtons = {
  cancel?: HAlertButton | false
  action?: HAlertButton
}

export type HAlertProps = {
  title: string
  description?: string
  message?: string
  buttons?: HAlertButtons
}

const props = withDefaults(defineProps<HAlertProps>(), {
  buttons: () => ({})
})

const emit = defineEmits<{
  confirm: [event: AlertDialogActionEvent]
  cancel: []
}>()

const isOpen = defineModel<boolean>({ default: false })

const showCancel = computed(() => props.buttons.cancel !== false)

const cancel = computed<HAlertButton>(() => ({
  label: "Cancel",
  variant: "outline",
  color: "neutral",
  ...(typeof props.buttons.cancel === "object" ? props.buttons.cancel : {})
}))

const action = computed<HAlertButton>(() => ({
  label: "Confirm",
  variant: "solid",
  color: "rose",
  ...props.buttons.action
}))

function onAction(event: AlertDialogActionEvent) {
  emit("confirm", event)
}
</script>

<style module>
.dialog {
  width: min(90vw, 28rem);
  color: var(--color-zinc-200);
  background: var(--color-zinc-900);
  border: 1px solid var(--color-zinc-700);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3xl);

  &::backdrop {
    background: rgba(0, 0, 0, 0.6);
    animation: backdrop-in 200ms ease;
  }

  .header {
    .title {
      font-size: var(--font-size-lg);
    }

    .description {
      font-size: var(--font-size-sm);
      color: var(--color-zinc-400);
    }
  }

  .message {
    margin-top: var(--spacing-xl);
    font-size: var(--font-size-sm);
    line-height: 1.5;
    color: var(--color-zinc-400);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-3xl);
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