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
import { useFormSchema } from "@/composables/useFormSchema"

export type HFormProps = {
  id?: string
  schema?: ZodObject
}

const props = defineProps<HFormProps>()

const { setSchema } = useFormSchema()
setSchema(() => props.schema)

const emits = defineEmits<{
  submit: [payload: { valid: boolean }]
}>()
</script>

<style scoped></style>