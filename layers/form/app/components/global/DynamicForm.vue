<template>
  <UForm
      novalidate
      :state="state"
      :schema="validationSchema"
      @submit.prevent="$emit('submit', state)">
    <ULegend
        v-if="schema.legend"
        :text="schema.legend"
        class="block text-center text-xl font-bold"/>
    <UFormField
        v-for="(field, index) of schema.fields"
        :key="index"
        :name="field.name"
        :label="field.label"
        :required="field.required"
    >
      <Component
          :is="componentMap[field.name] ?? UInput"
          v-model="state[field.name]"
          v-bind="field"
          class="w-full"/>
    </UFormField>
    <UButton
        v-bind="schema.button"
        class="h-fit"/>
  </UForm>
</template>

<script setup lang="ts">
import ULegend from "~~/layers/form/app/components/ULegend.vue";
import UInputPassword from "~~/layers/form/app/components/UInputPassword.vue";
import {UInput} from "#components";
import type {FormSchema} from "~/utils/getFormSchema";

export type FormState = Record<string, string | undefined | null | number>

defineProps<{
  schema: FormSchema
  validationSchema: object
}>()

const state = defineModel<FormState>('state', {required: true})

const componentMap: Record<string, Component> = {
  "password": UInputPassword,
}

defineEmits<{
  (e: 'submit', state: FormState): void
}>()

</script>