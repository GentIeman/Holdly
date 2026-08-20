<template>
  <HInput
    v-model="model"
    :label="props.label"
    :name="props.name"
    :required="props.required"
    :placeholder="props.placeholder"
    :size="props.size"
    :autocomplete="props.autocomplete"
    :type="show ? 'text' : 'password'"
  >
    <template #trailing>
      <HButton
        type="button"
        variant="link"
        :icon="show ? 'tabler-eye-off' : 'tabler-eye'"
        @click="show = !show"
      />
    </template>
  </HInput>
</template>

<script setup lang="ts">
import HInput from "~/components/ui/form/HInput.vue"
import HButton from "~/components/ui/HButton.vue"
import type { HInputProps } from "~/components/ui/form/HInput.vue"

const props = withDefaults(
  defineProps<{
    label?: string
    name?: string
    placeholder?: string
    required?: boolean
    autocomplete?: string
    size?: HInputProps["size"]
  }>(),
  {
    size: "md",
    autocomplete: "current-password"
  }
)

const model = defineModel<string>({ default: "" })

const show = ref(false)
</script>

<style scoped></style>