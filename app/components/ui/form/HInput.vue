<template>
  <Input.Root
    :id="id"
    v-model="model"
    :class="$style.field"
    :label="props.label"
    :name="props.name"
    :type="inputType"
    :required="props.required"
    :rules="resolvedRules"
  >
    <label
      v-if="props.label"
      :class="$style.label"
      :for="id"
    >
      {{ props.label }}
    </label>

    <div
      :class="[
        $style.input,
        `size-${props.size}`,
        `variant-${props.variant}`,
        `tone-${props.color}`
      ]"
    >
      <Input.Control
        :class="$style.control"
        :placeholder="props.placeholder"
        :autocomplete="props.autocomplete"
      />
      <span
        v-if="!!$slots.trailing"
        :class="$style.trailing"
      >
        <slot name="trailing" />
      </span>
    </div>

    <Input.Error
      v-if="!!resolvedRules?.length"
      v-slot="{ errors }"
      :class="$style.error"
    >
      <template v-if="errors.length">
        <span
          v-for="msg in errors"
          :key="msg"
          >{{ msg }}
        </span>
      </template>
    </Input.Error>
  </Input.Root>
</template>

<script setup lang="ts">
import { useId } from "vue"
import { Input, type InputRootProps } from "@vuetify/v0"
import { useFormSchema } from "~/utils/formSchema"

export type HInputSize = "sm" | "md" | "lg"

export type HInputVariant = "soft" | "outline"

export type HInputColor = "primary" | "neutral"

export type HInputProps = {
  label?: string
  placeholder?: string
  type?: string
  name?: string
  autocomplete?: string
  required?: boolean
  size?: HInputSize
  variant?: HInputVariant
  color?: HInputColor
}

const props = withDefaults(defineProps<HInputProps>(), {
  size: "md",
  variant: "outline",
  color: "neutral",
  autocomplete: "off"
})

const id = useId()

const formSchema = useFormSchema()

const resolvedRules = computed<InputRootProps["rules"]>(() => {
  const field = props.name ? formSchema?.value?.shape[props.name] : undefined

  return field ? [field] : []
})

const inputType = computed(() => props.type ?? "text")

const model = defineModel<string>({ required: true, default: "" })
</script>

<style module>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  .label {
    font-size: var(--font-size-sm);
    color: var(--color-zinc-300);
  }

  .input {
    display: flex;
    align-items: center;
    gap: var(--size-gap);
    padding: var(--va-padding, var(--size-padding));
    font-size: var(--size-font-size);
    border-radius: var(--radius-md);
    background: var(--va-bg);
    color: var(--va-text);
    border: 1px solid var(--va-border);
    width: 100%;

    &:focus-within {
      border-color: var(--va-focus-border);
      box-shadow: 0 0 0 2px var(--va-focus-ring);
    }

    .control {
      flex: 1;
      min-width: 0;
      background: transparent;
      border: none;
      outline: none;
      color: inherit;
      font-size: inherit;
      font-family: inherit;

      &::placeholder {
        color: var(--va-placeholder);
      }
    }

    .trailing {
      display: flex;
      align-items: center;
    }
  }

  .error {
    font-size: var(--font-size-xs);
    color: var(--color-red-500);
  }
}
</style>