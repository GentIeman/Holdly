<template>
  <Form
    :id="props.id"
    @submit="emits('submit', $event)"
  >
    <slot />
  </Form>
</template>

<script setup lang="ts">
import { Form } from "@vuetify/v0"
import type { ZodObject } from "zod"
import { provideFormSchema } from "~/utils/formSchema"

export type HFormProps = {
  id?: string
  schema?: ZodObject
}

const props = defineProps<HFormProps>()

provideFormSchema(() => props.schema)

const emits = defineEmits<{
  submit: [payload: { valid: boolean }]
}>()
</script>

<style scoped></style>